package com.cafeNasun.backend_api.services;

import com.cafeNasun.backend_api.dtos.VentaRequestDTO;
import com.cafeNasun.backend_api.dtos.ItemVentaDTO;
import com.cafeNasun.backend_api.models.*;
import com.cafeNasun.backend_api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VentaService {

    @Autowired private ProductoSKURepository productoRepo;
    @Autowired private VentaRepository ventaRepo;
    @Autowired private DetalleVentaRepository detalleRepo;
    @Autowired private InventarioCafeRepository inventarioRepo;

    // La etiqueta @Transactional es vital: o se guarda todo (venta, detalles, inventario), o no se guarda nada.
    @Transactional
    public String procesarVenta(VentaRequestDTO request) {

        // 1. Crear la cabecera de la venta
        Venta nuevaVenta = new Venta();
        nuevaVenta.setCliente(request.getCliente());
        nuevaVenta.setIdVendedor(request.getIdVendedor());
        // Guardamos la venta inicialmente para que Postgres le asigne un ID (lo necesitamos para el detalle)
        nuevaVenta.setComentarios(request.getComentarios()); // Guardamos si es para llevar, etc.
        nuevaVenta.setTotalVenta(0.0); // <--- ¡ESTA ES LA LÍNEA MÁGICA QUE FALTA!

        nuevaVenta = ventaRepo.save(nuevaVenta);

        double totalVenta = 0.0;

        // 2. Iterar sobre los productos del carrito
        for (ItemVentaDTO item : request.getDetalles()) {
            ProductoSKU productoDB = productoRepo.findById(item.getIdSku())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getIdSku()));

            double subtotal = productoDB.getPrecioVenta() * item.getCantidad();
            totalVenta += subtotal;

            // 3. Lógica de Descuento de Inventario
            if ("CAFE".equals(productoDB.getTipoItem())) {
                double kilosARestar = (productoDB.getPesoGramos() * item.getCantidad()) / 1000.0;

                InventarioCafe inventario = inventarioRepo.findById(productoDB.getIdInventarioMateria())
                        .orElseThrow(() -> new RuntimeException("Inventario físico no encontrado"));

                // Actualizamos y guardamos el nuevo stock en kilogramos
                inventario.setCantidadKg(inventario.getCantidadKg() - kilosARestar);
                inventarioRepo.save(inventario);

                System.out.println("Restados " + kilosARestar + " kg. Nuevo stock: " + inventario.getCantidadKg());
            } else {
                // Es accesorio, se restan unidades enteras en la tabla producto_sku
                productoDB.setStockUnidades(productoDB.getStockUnidades() - item.getCantidad());
                productoRepo.save(productoDB);
            }

            // 4. Crear el Detalle_Venta para el historial
            DetalleVenta detalle = new DetalleVenta(nuevaVenta, productoDB, item.getCantidad(), productoDB.getPrecioVenta());
            detalleRepo.save(detalle);
        }

        // 5. Finalmente, actualizar el total oficial en la cabecera
        nuevaVenta.setTotalVenta(totalVenta);
        ventaRepo.save(nuevaVenta);

        return "Venta procesada con éxito. ID Transacción: " + nuevaVenta.getIdVenta() + " | Total: $" + totalVenta;
    }
}
package com.cafeNasun.backend_api.services;

import com.cafeNasun.backend_api.dtos.VentaRequestDTO;
import com.cafeNasun.backend_api.dtos.ItemVentaDTO;
import com.cafeNasun.backend_api.models.*; // Asumiendo que crearás las entidades Venta, DetalleVenta, etc.
import com.cafeNasun.backend_api.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VentaService {

    @Autowired private ProductoSKURepository productoRepo;
    // @Autowired private VentaRepository ventaRepo;
    // @Autowired private DetalleVentaRepository detalleRepo;
    // @Autowired private InventarioCafeRepository inventarioRepo;

    // La etiqueta @Transactional es vital: o se guarda todo (venta, detalles, inventario), o no se guarda nada.
    @Transactional
    public String procesarVenta(VentaRequestDTO request) {

        // 1. Crear la cabecera de la venta (Aún no la guardamos hasta calcular el total)
        // Venta nuevaVenta = new Venta();
        // nuevaVenta.setCliente(request.getCliente());
        // nuevaVenta.setIdVendedor(request.getIdVendedor());

        double totalVenta = 0.0;

        // 2. Iterar sobre los productos del carrito
        for (ItemVentaDTO item : request.getDetalles()) {
            // Buscamos el precio y datos REALES en la base de datos
            ProductoSKU productoDB = productoRepo.findById(item.getIdSku())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getIdSku()));

            double subtotal = productoDB.getPrecioVenta() * item.getCantidad();
            totalVenta += subtotal;

            // 3. Lógica de Descuento de Inventario
            if ("CAFE".equals(productoDB.getTipoItem())) {
                // Matemáticas: (Gramos * Cantidad) / 1000 = Kilogramos a restar
                double kilosARestar = (productoDB.getPesoGramos() * item.getCantidad()) / 1000.0;

                // Aquí llamarías al inventarioRepo para restar esos kilos
                System.out.println("Restando " + kilosARestar + " kg al inventario ID: " + productoDB.getIdInventarioMateria());
            } else {
                // Es accesorio, se restan unidades enteras
                System.out.println("Restando " + item.getCantidad() + " unidades del accesorio " + productoDB.getIdSku());
            }

            // 4. Crear el Detalle_Venta para el historial
            // DetalleVenta detalle = new DetalleVenta(nuevaVenta, productoDB, item.getCantidad(), subtotal);
            // detalleRepo.save(detalle);
        }

        // 5. Finalmente, guardar el total oficial en la cabecera
        // nuevaVenta.setTotalVenta(totalVenta);
        // ventaRepo.save(nuevaVenta);

        return "Venta procesada con éxito. Total: $" + totalVenta;
    }
}
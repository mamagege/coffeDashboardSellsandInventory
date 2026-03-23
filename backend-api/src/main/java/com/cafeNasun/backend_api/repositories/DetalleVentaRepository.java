package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.DetalleVenta;
import com.cafeNasun.backend_api.dtos.ProductoTopDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {

    // KPI 3: Agrupamos por producto y sumamos las cantidades vendidas (Top Ventas)
    @Query("SELECT d.producto.nombreDisplay AS nombre, SUM(d.cantidadVendida) AS cantidad " +
            "FROM DetalleVenta d GROUP BY d.producto.nombreDisplay ORDER BY SUM(d.cantidadVendida) DESC")
    List<ProductoTopDTO> obtenerTopProductosVendidos();
}
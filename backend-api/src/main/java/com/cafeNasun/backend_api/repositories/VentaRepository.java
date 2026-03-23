package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Integer> {

    // KPI 1: Suma total de dinero ingresado
    @Query("SELECT COALESCE(SUM(v.totalVenta), 0) FROM Venta v")
    Double sumarIngresosTotales();

    // KPI 2: Conteo total de facturas/tiquetes
    @Query("SELECT COUNT(v) FROM Venta v")
    Integer contarTransacciones();
}
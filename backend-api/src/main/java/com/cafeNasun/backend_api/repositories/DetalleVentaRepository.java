package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {
}
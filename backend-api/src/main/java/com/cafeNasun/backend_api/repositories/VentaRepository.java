package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Integer> {
}
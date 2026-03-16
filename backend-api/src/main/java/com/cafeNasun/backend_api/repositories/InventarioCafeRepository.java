package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.InventarioCafe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioCafeRepository extends JpaRepository<InventarioCafe, Integer> {
}
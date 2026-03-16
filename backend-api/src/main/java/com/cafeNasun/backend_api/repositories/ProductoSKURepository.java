package com.cafeNasun.backend_api.repositories;

import com.cafeNasun.backend_api.models.ProductoSKU; // Importa tu modelo
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoSKURepository extends JpaRepository<ProductoSKU, String> {
    // ¡No tienes que escribir nada aquí adentro!
    // JpaRepository ya trae por defecto métodos como findAll(), save(), deleteById().
}
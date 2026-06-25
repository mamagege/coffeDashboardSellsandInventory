package com.cafeNasun.backend_api.controllers;
import com.cafeNasun.backend_api.models.ProductoSKU;
import com.cafeNasun.backend_api.repositories.ProductoSKURepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin(origins = "https://cafe-dashboard-eight.vercel.app") // Permite que tu React (Vite) se conecte sin bloqueos de seguridad
public class ProductoController {

    @Autowired
    private ProductoSKURepository productoRepository;

    @GetMapping
    public List<ProductoSKU> obtenerCatalogo() {
        // Esto va a la base de datos, hace un "SELECT * FROM producto_sku",
        // lo convierte a formato JSON y lo envía al navegador.
        return productoRepository.findAll();
    }
}



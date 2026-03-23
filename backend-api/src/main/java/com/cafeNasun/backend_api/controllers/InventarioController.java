package com.cafeNasun.backend_api.controllers;

import com.cafeNasun.backend_api.models.InventarioCafe;
import com.cafeNasun.backend_api.repositories.InventarioCafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventario")
@CrossOrigin(origins = "http://localhost:5173")
public class InventarioController {

    @Autowired
    private InventarioCafeRepository inventarioRepo;

    @GetMapping
    public List<InventarioCafe> obtenerInventarioFisico() {
        // Un simple SELECT * FROM inventario_cafe, convertido a JSON automáticamente
        return inventarioRepo.findAll();
    }
}
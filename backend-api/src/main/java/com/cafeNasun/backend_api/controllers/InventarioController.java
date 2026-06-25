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
@CrossOrigin(origins = {"https://cafe-dashboard-dc2nv95t9-mamageges-projects.vercel.app", "https://cafe-dashboard-77wl52ni3-mamageges-projects.vercel.app", "https://cafe-dashboard-eight.vercel.app"})
public class InventarioController {

    @Autowired
    private InventarioCafeRepository inventarioRepo;

    @GetMapping
    public List<InventarioCafe> obtenerInventarioFisico() {
        // Un simple SELECT * FROM inventario_cafe, convertido a JSON automáticamente
        return inventarioRepo.findAll();
    }
}
package com.cafeNasun.backend_api.controllers;

import com.cafeNasun.backend_api.repositories.VentaRepository;
import com.cafeNasun.backend_api.repositories.DetalleVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin(origins = "https://cafe-dashboard-dc2nv95t9-mamageges-projects.vercel.app")
public class DashboardController {

    @Autowired private VentaRepository ventaRepo;
    @Autowired private DetalleVentaRepository detalleRepo;

    @GetMapping("/resumen")
    public Map<String, Object> obtenerResumenGerencial() {
        Map<String, Object> respuesta = new HashMap<>();

        // Empaquetamos los KPIs ejecutando las consultas que acabamos de crear
        respuesta.put("ingresosTotales", ventaRepo.sumarIngresosTotales());
        respuesta.put("totalTransacciones", ventaRepo.contarTransacciones());
        respuesta.put("topProductos", detalleRepo.obtenerTopProductosVendidos());

        return respuesta;
    }
}
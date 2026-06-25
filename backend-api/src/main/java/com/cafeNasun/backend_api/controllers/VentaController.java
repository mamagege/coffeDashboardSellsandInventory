package com.cafeNasun.backend_api.controllers;

import com.cafeNasun.backend_api.dtos.VentaRequestDTO;
import com.cafeNasun.backend_api.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ventas")
@CrossOrigin(originPatterns = {"https://*.vercel.app", "http://localhost:*"})
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping
    public ResponseEntity<String> registrarVenta(@RequestBody VentaRequestDTO request) {
        try {
            String resultado = ventaService.procesarVenta(request);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar la venta: " + e.getMessage());
        }
    }
}
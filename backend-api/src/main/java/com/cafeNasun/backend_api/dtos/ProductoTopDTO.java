package com.cafeNasun.backend_api.dtos;

// Esto es una "Proyección" de Spring Boot.
// Solo define los getters de lo que queremos extraer del SQL.
public interface ProductoTopDTO {
    String getNombre();
    Integer getCantidad();
}
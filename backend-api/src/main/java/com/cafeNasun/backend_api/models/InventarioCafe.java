package com.cafeNasun.backend_api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario_cafe")
public class InventarioCafe {

    // @GeneratedValue le dice a Java que Postgres generará este ID automáticamente (el SERIAL)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventario_materia")
    private Integer idInventarioMateria;

    @Column(name = "origen_sabor")
    private String origenSabor;

    @Column(name = "es_molido")
    private Boolean esMolido;

    @Column(name = "cantidad_kg")
    private Double cantidadKg;

    // --- GETTERS Y SETTERS ---
    public Integer getIdInventarioMateria() { return idInventarioMateria; }
    public void setIdInventarioMateria(Integer idInventarioMateria) { this.idInventarioMateria = idInventarioMateria; }

    public String getOrigenSabor() { return origenSabor; }
    public void setOrigenSabor(String origenSabor) { this.origenSabor = origenSabor; }

    public Boolean getEsMolido() { return esMolido; }
    public void setEsMolido(Boolean esMolido) { this.esMolido = esMolido; }

    public Double getCantidadKg() { return cantidadKg; }
    public void setCantidadKg(Double cantidadKg) { this.cantidadKg = cantidadKg; }
}
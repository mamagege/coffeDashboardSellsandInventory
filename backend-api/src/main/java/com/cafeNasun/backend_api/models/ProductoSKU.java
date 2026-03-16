package com.cafeNasun.backend_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "producto_sku")
public class ProductoSKU {

    @Id
    @Column(name = "id_sku")
    private String idSku;

    @Column(name = "nombre_display")
    private String nombreDisplay;

    @Column(name = "tipo_item")
    private String tipoItem;

    @Column(name = "precio_venta")
    private Double precioVenta;

    // --- NUEVOS CAMPOS AÑADIDOS ---

    @Column(name = "id_inventario_materia")
    private Integer idInventarioMateria;

    @Column(name = "peso_gramos")
    private Integer pesoGramos;

    @Column(name = "stock_unidades")
    private Integer stockUnidades;

    // --- GETTERS Y SETTERS ---

    public String getIdSku() { return idSku; }
    public void setIdSku(String idSku) { this.idSku = idSku; }

    public String getNombreDisplay() { return nombreDisplay; }
    public void setNombreDisplay(String nombreDisplay) { this.nombreDisplay = nombreDisplay; }

    public String getTipoItem() { return tipoItem; }
    public void setTipoItem(String tipoItem) { this.tipoItem = tipoItem; }

    public Double getPrecioVenta() { return precioVenta; }
    public void setPrecioVenta(Double precioVenta) { this.precioVenta = precioVenta; }

    public Integer getIdInventarioMateria() { return idInventarioMateria; }
    public void setIdInventarioMateria(Integer idInventarioMateria) { this.idInventarioMateria = idInventarioMateria; }

    public Integer getPesoGramos() { return pesoGramos; }
    public void setPesoGramos(Integer pesoGramos) { this.pesoGramos = pesoGramos; }

    public Integer getStockUnidades() { return stockUnidades; }
    public void setStockUnidades(Integer stockUnidades) { this.stockUnidades = stockUnidades; }
}
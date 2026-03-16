package com.cafeNasun.backend_api.dtos;

public class ItemVentaDTO {
    private String idSku;
    private Integer cantidad;

    // Getters y Setters
    public String getIdSku() { return idSku; }
    public void setIdSku(String idSku) { this.idSku = idSku; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
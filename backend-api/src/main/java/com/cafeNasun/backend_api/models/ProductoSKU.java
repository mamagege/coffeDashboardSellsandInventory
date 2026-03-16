package com.cafeNasun.backend_api.models; // Ojo: cambia esto por tu paquete real

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

    // Getters y Setters (Si añadiste Lombok al crear el proyecto,
    // puedes borrar todo esto y simplemente poner @Data arriba de la clase)

    public String getIdSku() { return idSku; }
    public void setIdSku(String idSku) { this.idSku = idSku; }

    public String getNombreDisplay() { return nombreDisplay; }
    public void setNombreDisplay(String nombreDisplay) { this.nombreDisplay = nombreDisplay; }

    public String getTipoItem() { return tipoItem; }
    public void setTipoItem(String tipoItem) { this.tipoItem = tipoItem; }

    public Double getPrecioVenta() { return precioVenta; }
    public void setPrecioVenta(Double precioVenta) { this.precioVenta = precioVenta; }
}
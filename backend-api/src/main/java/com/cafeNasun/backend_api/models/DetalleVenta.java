package com.cafeNasun.backend_api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_venta")
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Integer idDetalle;

    // Relación: Muchos detalles pertenecen a UNA venta
    @ManyToOne
    @JoinColumn(name = "id_venta", nullable = false)
    private Venta venta;

    // Relación: Muchos detalles pueden ser del mismo UN producto (SKU)
    @ManyToOne
    @JoinColumn(name = "id_sku", nullable = false)
    private ProductoSKU producto;

    @Column(name = "cantidad_vendida")
    private Integer cantidadVendida;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    // insertable=false, updatable=false porque Postgres calcula el subtotal automáticamente con "GENERATED ALWAYS AS"
    @Column(name = "subtotal", insertable = false, updatable = false)
    private Double subtotal;

    // Constructor vacío exigido por Java Spring
    public DetalleVenta() {}

    // Constructor para facilitarnos la vida en el Service
    public DetalleVenta(Venta venta, ProductoSKU producto, Integer cantidadVendida, Double precioUnitario) {
        this.venta = venta;
        this.producto = producto;
        this.cantidadVendida = cantidadVendida;
        this.precioUnitario = precioUnitario;
    }

    // --- GETTERS Y SETTERS ---
    public Integer getIdDetalle() { return idDetalle; }
    public void setIdDetalle(Integer idDetalle) { this.idDetalle = idDetalle; }

    public Venta getVenta() { return venta; }
    public void setVenta(Venta venta) { this.venta = venta; }

    public ProductoSKU getProducto() { return producto; }
    public void setProducto(ProductoSKU producto) { this.producto = producto; }

    public Integer getCantidadVendida() { return cantidadVendida; }
    public void setCantidadVendida(Integer cantidadVendida) { this.cantidadVendida = cantidadVendida; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
}
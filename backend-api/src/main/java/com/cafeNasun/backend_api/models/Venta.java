package com.cafeNasun.backend_api.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "venta")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Integer idVenta;

    @Column(name = "id_vendedor")
    private Integer idVendedor;

    @Column(name = "cliente")
    private String cliente;

    // Generamos la fecha exacta desde Java al momento de crear el objeto
    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora = LocalDateTime.now();

    @Column(name = "comentarios")
    private String comentarios;

    @Column(name = "total_venta")
    private Double totalVenta;

    // --- GETTERS Y SETTERS ---
    public Integer getIdVenta() { return idVenta; }
    public void setIdVenta(Integer idVenta) { this.idVenta = idVenta; }

    public Integer getIdVendedor() { return idVendedor; }
    public void setIdVendedor(Integer idVendedor) { this.idVendedor = idVendedor; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public Double getTotalVenta() { return totalVenta; }
    public void setTotalVenta(Double totalVenta) { this.totalVenta = totalVenta; }
}
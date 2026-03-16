package com.cafeNasun.backend_api.dtos;
import java.util.List;

public class VentaRequestDTO {
    private String cliente;
    private String comentarios;
    private Integer idVendedor; // Por ahora lo podemos quemar en el frontend como 1
    private List<ItemVentaDTO> detalles;

    // Getters y Setters
    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }
    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }
    public Integer getIdVendedor() { return idVendedor; }
    public void setIdVendedor(Integer idVendedor) { this.idVendedor = idVendedor; }
    public List<ItemVentaDTO> getDetalles() { return detalles; }
    public void setDetalles(List<ItemVentaDTO> detalles) { this.detalles = detalles; }
}
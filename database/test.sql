-- 1. Insertamos un poco de inventario físico (Bodega)
INSERT INTO Inventario_Cafe (origen_sabor, es_molido, cantidad_kg) VALUES
                                                                       ('Huila', FALSE, 50.00), -- 50 kilos de Huila en Grano
                                                                       ('Huila', TRUE, 20.00),  -- 20 kilos de Huila Molido
                                                                       ('Antioquia', TRUE, 30.00);

-- 2. Insertamos el catálogo de venta (Lo que verá el cajero)
INSERT INTO Producto_SKU (id_sku, nombre_display, tipo_item, precio_venta, id_inventario_materia, peso_gramos, stock_unidades) VALUES
                                                                                                                                   ('CAF-HUI-GRA-500', 'Café Huila Grano 500g', 'CAFE', 25000.00, 1, 500, 0),
                                                                                                                                   ('CAF-HUI-MOL-250', 'Café Huila Molido 250g', 'CAFE', 15000.00, 2, 250, 0),
                                                                                                                                   ('CAF-ANT-MOL-500', 'Café Antioquia Molido 500g', 'CAFE', 22000.00, 3, 500, 0),
                                                                                                                                   ('ACC-PRENSA-FRA', 'Prensa Francesa 600ml', 'ACCESORIO', 45000.00, NULL, NULL, 15);
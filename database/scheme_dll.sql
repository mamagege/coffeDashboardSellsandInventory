-- 1. Tabla de Vendedores (Usuarios del sistema)
CREATE TABLE Vendedor (
    id_vendedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    documento VARCHAR(20) UNIQUE NOT NULL
);

-- 2. Inventario Físico de Materia Prima (El control en Kilogramos)
-- Aquí solo nos importa el tipo de café y si está molido o en grano.
CREATE TABLE Inventario_Cafe (
    id_inventario_materia SERIAL PRIMARY KEY,
    origen_sabor VARCHAR(50) NOT NULL,
    es_molido BOOLEAN NOT NULL, -- TRUE: Molido, FALSE: Grano
    cantidad_kg DECIMAL(10, 2) DEFAULT 0.00,
    -- Aseguramos que no haya duplicados del mismo tipo físico
    CONSTRAINT unique_materia UNIQUE (origen_sabor, es_molido) 
);

-- 3. Catálogo de Venta (Los "Botones" del Frontend)
-- Esta tabla unifica TODO lo que se puede vender (SKUs). 
CREATE TABLE Producto_SKU (
    id_sku VARCHAR(30) PRIMARY KEY, -- Ej: 'CAF-HUI-MOL-500' o 'ACC-MOL-MAN'
    nombre_display VARCHAR(100) NOT NULL,
    tipo_item VARCHAR(20) NOT NULL, -- Puede ser 'CAFE' o 'ACCESORIO'
    precio_venta DECIMAL(10, 2) NOT NULL,
    
    -- Si es café, lo vinculamos a su inventario físico y definimos su tamaño
    id_inventario_materia INT REFERENCES Inventario_Cafe(id_inventario_materia),
    peso_gramos INT, -- Ej: 250, 500. (NULL si es accesorio)
    
    -- Si es accesorio, llevamos el inventario en unidades directamente aquí
    stock_unidades INT DEFAULT 0 
);

-- 4. Cabecera de la Venta (El registro general de la transacción)
CREATE TABLE Venta (
    id_venta SERIAL PRIMARY KEY,
    id_vendedor INT NOT NULL REFERENCES Vendedor(id_vendedor),
    cliente VARCHAR(100) DEFAULT 'Consumidor Final',
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentarios TEXT,
    total_venta DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- 5. Detalle de la Venta (Los items individuales dentro de la factura)
CREATE TABLE Detalle_Venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL REFERENCES Venta(id_venta) ON DELETE CASCADE,
    id_sku VARCHAR(30) NOT NULL REFERENCES Producto_SKU(id_sku),
    cantidad_vendida INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    -- El subtotal se puede calcular al vuelo, pero guardarlo facilita reportes
    subtotal DECIMAL(12, 2) GENERATED ALWAYS AS (cantidad_vendida * precio_unitario) STORED
);
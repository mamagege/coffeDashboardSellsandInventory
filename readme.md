# ☕ Café ERP & POS System

![Arquitectura](https://img.shields.io/badge/Arquitectura-3--Tier-blue)
![Backend](https://img.shields.io/badge/Backend-Spring_Boot_3-6DB33F?logo=springboot)
![Frontend](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?logo=react)
![Base de Datos](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)

Un sistema integral de Planificación de Recursos Empresariales (ERP) y Punto de Venta (POS) diseñado para la gestión operativa, control de inventarios y análisis de rendimiento de negocios en la industria del café.

## 🎯 Visión del Proyecto y Enfoque Sistémico

Este proyecto fue concebido aplicando principios de **Teoría de Sistemas y Pensamiento Sistémico**. En lugar de ser un simple registro de datos, el sistema orquesta tres capas independientes que interactúan bajo reglas de negocio estrictas:

1. **Gestión Transaccional Segura:** El registro de ventas desencadena automáticamente actualizaciones precisas en la base de datos física (descuento de materia prima en kilogramos).
2. **Integridad Financiera:** Aplicación estricta de **Transacciones ACID** en PostgreSQL mediante Spring Boot, garantizando que ninguna falla en la red comprometa el inventario o la contabilidad.
3. **Análisis Estratégico:** Transformación de datos operativos en indicadores clave de rendimiento (KPIs) en tiempo real para facilitar la toma de decisiones gerenciales.

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto está dividido en dos subsistemas principales fuertemente desacoplados, comunicados a través de una API RESTful.

* **Backend (Lógica de Negocio):** Java + Spring Boot (MVC). Utiliza Spring Data JPA para el mapeo objeto-relacional (ORM) y la gestión de transacciones.
* **Frontend (Capa de Presentación):** React.js + Vite. Construido como una SPA (Single Page Application) reactiva. Gestión de estado inmutable y visualización de datos con `Recharts`.
* **Persistencia (Fuente de la Verdad):** PostgreSQL. Modelo de datos normalizado separando el catálogo comercial de las métricas físicas de bodega.

## 🚀 Metodología de Desarrollo

El ciclo de vida del software se ejecutó utilizando principios de **Gestión de Proyectos Ágil y Programación Extrema (XP)**:
* **Cortes Verticales (Vertical Slicing):** El desarrollo no se hizo por capas horizontales aisladas, sino implementando funcionalidades completas de extremo a extremo (End-to-End) por iteración.
* Iteración 1: Catálogo interactivo y registro de ventas (ACID).
* Iteración 2: Sincronización de inventario físico en tiempo real.
* Iteración 3: Dashboard gerencial y agregación de datos (Business Intelligence).

## ⚙️ Instrucciones de Ejecución Local

Para replicar este entorno de desarrollo en una máquina local, sigue estos pasos:

### 1. Base de Datos
1. Instalar PostgreSQL.
2. Crear una base de datos vacía llamada `cafe_erp`.
3. Ejecutar los scripts ubicados en la carpeta `database/`:
   * Ejecutar primero `scheme_dll.sql` (Estructura).
   * Ejecutar luego `test.sql` (Datos Semilla).

### 2. Levantar el Backend (Spring Boot)
1. Navegar a la carpeta `backend-api/`.
2. Abrir `src/main/resources/application.properties` y actualizar `spring.datasource.password` con tu contraseña local de Postgres.
3. Ejecutar el proyecto mediante tu IDE (IntelliJ/VS Code) o por terminal usando Maven:
   ```bash
   ./mvnw spring-boot:run
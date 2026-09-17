# Propuesta de Proyecto: Sistema Web para el Control de Inventarios, Acervos y Gestión de Servicios Comunitarios

## Problemática

En instituciones educativas, bibliotecas públicas y departamentos de atención comunitaria, la administración de recursos físicos (acervos bibliográficos, equipos informáticos, material de laboratorio) y la gestión del servicio social o comunitario se realiza de manera empírica, descentralizada y, en muchos casos, mediante hojas de cálculo individuales o registros en papel.

Esta falta de unificación tecnológica genera tres consecuencias críticas:

* **Pérdida de trazabilidad e inconsistencia en inventarios:** La ausencia de un catálogo digitalizado con validación en tiempo real provoca discrepancias frecuentes entre las existencias registradas y el stock físico real. Esto ocasiona pérdidas de material por falta de seguimiento a préstamos vencidos, omisión de correcciones en registros erróneos y duplicidad de códigos de identificación.
* **Cuellos de botella en la atención al usuario:** Cuando un estudiante o visitante requiere un recurso o consulta la disponibilidad de un título/equipo, el personal operativo debe realizar búsquedas manuales lentas. Esto genera largas filas en los mostradores y una alta tasa de insatisfacción en la experiencia del usuario.
* **Opacidad y retraso en informes administrativos:** La consolidación de métricas (horas de servicio comunitario completadas, tasa de rotación del material, tasa de pérdida o mantenimiento) requiere horas de trabajo manual al final de cada periodo. La falta de reportes automatizados impide a la dirección tomar decisiones informadas a tiempo.

---

## Propuesta de Solución en Software

Desarrollar una plataforma web centralizada construida sobre la arquitectura **Laravel + React**, diseñada para automatizar el ciclo de vida completo de los recursos comunitarios y el control de usuarios.

### Componentes y Funcionalidades Clave

#### 1. Catálogo e Inventario Dinámico (Backend Laravel)
* Control de acervos mediante códigos únicos, categorías y estados (*Disponible*, *En Préstamo*, *En Mantenimiento*, *Dado de Baja*).
* Módulo de transacciones seguras que evita la asignación doble de un mismo recurso en el mismo instante.
* Registro de auditoría (*logs*) para rastrear qué operador modificó o corrigió la información de un ítem.

#### 2. Búsqueda y Gestión Reactiva (Frontend React + Inertia)
* Buscador en tiempo real con filtros combinados (por autor, categoría, estado o ubicación física) que devuelve resultados instantáneos sin recargar la página.
* Interfaz de recepción y devolución rápida mediante lectores de código de barras o búsqueda por ID.

#### 3. Módulo de Servicios Comunitarios y Alumnos
* Registro de estudiantes asignados a actividades de servicio o apoyo operativo.
* Control digital de horas acumuladas, tareas asignadas e historial de incidencias o revisiones aprobadas.

#### 4. Dashboard de Indicadores y Exportación de Reportes
* Panel visual interactivo con gráficas de rendimiento, recursos más solicitados y alertas automáticas por préstamos vencidos.
* Generación automatizada de reportes finales en formato PDF o Excel con un solo clic.

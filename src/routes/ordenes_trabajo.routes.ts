import express from "express";
import { getOrdenTrabajoById, getOrdenesTrabajoByEstado, getOrdenesTrabajoByVehiculo, newOrdenTrabajo, updateAprobarOrdenTrabajo, updateFinalizarOrdenTrabajo } from "../controllers/orden_trabajo.controller";
import validateToken from "./validate_token";

const router = express.Router();


/**
 * @openapi
 * /api/ordenesTrabajo/newOrden:
 *   post:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Crear nueva orden de trabajo
 *     description: Crea una nueva orden de trabajo en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos de la nueva orden de trabajo
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               tiempo_estimado:
 *                 type: integer
 *               tipo_mantenimiento:
 *                 type: string
 *               fk_id_usuario_correo:
 *                 type: string
 *               fk_id_vehiculo:
 *                 type: string
 *               fk_id_categoria:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Orden de trabajo creada exitosamente
 *       '400':
 *         description: Error en la solicitud o falta de campos requeridos
 *       '404':
 *         description: No se encontró el usuario o vehículo asociado
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/newOrden', validateToken, newOrdenTrabajo);

/**
 * @openapi
 * /api/ordenesTrabajo/finalizarOrden/{id_orden_trabajo}:
 *   put:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Finalizar orden de trabajo
 *     description: Actualiza una orden de trabajo para marcarla como finalizada.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_orden_trabajo
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la orden de trabajo a actualizar
 *     requestBody:
 *       description: Datos para finalizar la orden de trabajo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               observaciones:
 *                 type: string
 *               tiempo_ejecucion:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Orden de trabajo finalizada exitosamente
 *       '404':
 *         description: No se encontró la orden de trabajo especificada
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/finalizarOrden/:id_orden_trabajo', validateToken, updateFinalizarOrdenTrabajo);

/**
 * @openapi
 * /api/ordenesTrabajo/aprobarOrden/{id_orden_trabajo}:
 *   put:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Aprobar orden de trabajo
 *     description: Actualiza una orden de trabajo para marcarla como aprobada.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_orden_trabajo
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la orden de trabajo a actualizar
 *     responses:
 *       '200':
 *         description: Orden de trabajo aprobada exitosamente
 *       '404':
 *         description: No se encontró la orden de trabajo especificada
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/aprobarOrden/:id_orden_trabajo', validateToken, updateAprobarOrdenTrabajo);

/**
 * @openapi
 * /api/ordenesTrabajo/getAll/{estado}:
 *   get:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Obtener órdenes de trabajo por estado
 *     description: Obtiene todas las órdenes de trabajo filtradas por estado.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: estado
 *         schema:
 *           type: string
 *         required: true
 *         description: Estado de las órdenes de trabajo a buscar
 *     responses:
 *       '200':
 *         description: Órdenes de trabajo obtenidas exitosamente
 *       '400':
 *         description: Falta el estado en la solicitud
 *       '404':
 *         description: No se encontraron órdenes de trabajo con ese estado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/getAll/:estado', validateToken, getOrdenesTrabajoByEstado);

/**
 * @openapi
 * /api/ordenesTrabajo/orden/{id_orden_trabajo}:
 *   get:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Obtener una orden de trabjo
 *     description: Obtiene una orden de trabjo especificando su id.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_orden_trabajo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Estado de la orden de trabajo a buscar
 *     responses:
 *       '200':
 *         description: Orden de trabajo obtenida exitosamente.
 *       '400':
 *         description: Falta el id en la solicitud
 *       '404':
 *         description: No se encontró la orden de trabajo con el id especificado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/orden/:id_orden_trabajo', validateToken, getOrdenTrabajoById);

/**
 * @openapi
 * /api/ordenesTrabajo/orden/vehiculo/{id_vehiculo}:
 *   get:
 *     tags:
 *       - Órdenes de Trabajo
 *     summary: Obtener órdenes de trabajo por vehículo
 *     description: Obtiene todas las órdenes de trabajo asociadas a un vehículo específico.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_vehiculo
 *         schema:
 *           type: string
 *         required: true
 *         description: Placa del vehículo para el cual se desean obtener las órdenes de trabajo
 *     responses:
 *       '200':
 *         description: Órdenes de trabajo obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ordenesTrabajo:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/orden_trabajo'  # Referencia al esquema de OrdenTrabajo
 *       '400':
 *         description: La placa del vehículo es requerida o tiene un formato inválido
 *       '404':
 *         description: No se encontraron órdenes de trabajo asociadas a la placa del vehículo especificado
 *       '500':
 *         description: Error interno del servidor
 */

router.get('/orden/vehiculo/:id_vehiculo', validateToken, getOrdenesTrabajoByVehiculo);



export default router;
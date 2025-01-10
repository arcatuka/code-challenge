import { Router, Request, Response } from "express";
import {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller";

const router = Router();

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *             example:
 *               name: Test Resource
 *               description: This is a sample resource
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  await createResource({ name, description }, res.json.bind(res));
});

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: List all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Server error
 */
router.get("/", async (req: Request, res: Response) => {
  await listResources({}, res.json.bind(res));
});

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: The resource details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await getResource({ id }, res.json.bind(res));
});

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Updated Resource
 *               description: Updated description
 *     responses:
 *       200:
 *         description: The updated resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await updateResource({ id, name, description }, res.json.bind(res));
});

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: The resource was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteResource({ id }, res.json.bind(res));
});

export default router;

const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing Customers and Agents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email
 *         role:
 *           type: string
 *           enum: [customer, agent]
 *           description: User role (customer or agent)
 *         profilePicture:
 *           type: string
 *           description: Profile image URL
 *         relationshipStatus:
 *           type: string
 *           description: Relationship status
 *         height:
 *           type: number
 *           description: Height in cm
 *         age:
 *           type: integer
 *           description: Age in years
 *         profession:
 *           type: string
 *           description: User's profession
 *         lookingFor:
 *           type: string
 *           enum: [male, female]
 *           description: Looking for male or female
 *         city:
 *           type: string
 *           description: User's city/location
 *       example:
 *         id: "64bfbf2d5c3b021b5c6b0f9b"
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         role: "customer"
 *         profilePicture: "https://example.com/profile.jpg"
 *         relationshipStatus: "Single"
 *         height: 180
 *         age: 30
 *         profession: "Software Developer"
 *         lookingFor: "female"
 *         city: "New York"
 */


/**
 * @swagger
 * /api/v1/users/{role}/id/{id}:
 *   get:
 *     summary: Get a user by ID and role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [customer, agent]
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:role/id/:id", authenticate(["admin"]), userController.getUserById);


module.exports = router;

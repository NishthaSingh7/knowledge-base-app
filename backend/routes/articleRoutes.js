const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, createArticle);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

// Public Routes
router.get("/", getArticles);
router.get("/:id", getArticleById);


module.exports = router;

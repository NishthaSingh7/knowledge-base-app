const Article = require("../models/Article");

// CREATE
exports.createArticle = async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;

    const article = await Article.create({
      title,
      description,
      content,
      tags,
      createdBy: req.user,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9; // articles per page

    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.createdBy.toString() !== req.user)
      return res.status(401).json({ message: "Unauthorized" });

    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.createdBy.toString() !== req.user)
      return res.status(401).json({ message: "Unauthorized" });

    await article.deleteOne();

    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


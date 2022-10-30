import CategoriesRepository from "../repositories/CategoryRepository.js";

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    res.status(200).json(categories);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await CategoriesRepository.create({
      name,
    });
    res.status(200).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });
    res.status(200).json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }
}

export default new CategoryController();

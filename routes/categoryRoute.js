const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { isAuth, isAdmin } = require('../middleware/authParameters');


//create new category
router.post("/createCategory", isAuth, isAdmin, async (req, res) => {
  try{
	const { name, description } = req.body;
	const usedCategory = await Category.findOne({name: name});
    if (usedCategory) {
      return res.status(400).json({ message: "Category already exists" });
    };
	
    let categoryFields = {};
    if (name) categoryFields.name = name;
    if (description) categoryFields.description = description;
	
    const newCategory = await new Category(categoryFields).save();
    res.json(newCategory);
  }
  catch (error){
	return res.status(400).json({ message: "Category couldn't be created" });
  }
});


//list all categories
router.get("/", async (req, res) => {
	const categories = await Category.find();
	if (!categories){
      return res.status(400).json({ message: "Categories Not Found" });
	}
    res.status(200).json(categories);
});


//delete a category
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try{
	const deletedCategory = await Category.findById(req.params.id);
	console.log(deletedCategory);
	if (deletedCategory) {
      await deletedCategory.remove();
      return res.status(200).json({ message: "Category Deleted" });
    }
  }
  catch (error){
	return res.status(400).json({ message: "Error in deleting category" });
  }
});


module.exports = router;
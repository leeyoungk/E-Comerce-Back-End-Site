const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });
    console.log( '\n----- ALL CATEGORIES FOUND -----\n' );
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    console.log( `\n----- CATEGORY ${categoryData.category_name} FOUND -----\n` );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    
		console.log( `\n----- CATEGORY ${req.body.category_name} ADDED -----\n` );
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
		const updatedCategory = await Category.update( req.body, {
			where: {
				id: req.params.id,
			}
		} );

		console.log( `\n----- CATEGORY ${req.body.category_name} UPDATED -----\n` );
		res.status( 200 ).json( updatedCategory );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    console.log( `\n----- CATEGORY WITH ID:${req.params.id} DELETED -----\n` );
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const Product = require('../models/Product');
const router = require('express').Router();

// CREATE/ADD PRODUCTS //

router.post('/', async(req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
});

// UPDATE PRODUCT //

router.put('/:id', async (req, res) => {
        try {
            const upatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
            res.status(200).json(upatedProduct);
        } catch (error){res.status(500).json(error)} {
        }
    });

// // DELETE PRODUCT //

router.delete('/:id', async(req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Product has been deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    });

// // GET PROUDCTS //

router.get('/find/:id', async(req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    });

// // GET ALL PRODUCTS //

router.get('/', async(req, res) => {
    const queryNew = req.query.new;
    const queryCatergoy = req.query.category;
    try {
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (queryCatergoy) {
            products = await Product.find({categories:{
                $in:[queryCatergoy]
            }
        });
    } else {
        products = await Product.find();
    }
    res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
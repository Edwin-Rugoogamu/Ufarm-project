const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
const Cart = require("../models/cartModel");
const multer = require("multer");

let storage = multer.diskStorage({ 
  destination: (req, file, cb) => {cb(null, "./public/images")}, 
  filename: (req, file, cb) => {cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });


// Cart

router.get("/cart", connectEnsureLogin.ensureLoggedIn(),(req, res) => {
  res.render("cart");
});

router.post("/cart", upload.single("image"), async (req, res) => {
  try {
    const products = new Cart(req.body);
    products.image = req.file.originalname;
    await products.save();
    res.redirect("/cart");
    console.log(req.body);
  } catch (error) {
    res.send("image upload failed ${error}");
  }
  // res.render("aoDash")
});




















































// // router.get('/cart', async (req, res) => {
// //   try {
// //     // Get the user's cart
// //     const cart = await Cart.findOne({ user: req.user._id })
// //       .populate('items.product');

// //     res.render("cart",{products:cart})
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });





// // router.post('/cart/add', async (req, res) => {
// //   try {
// //     // Get the user's cart
// //     const cart = await Cart.findOne({ user: req.user._id });

// //     // Check if the product is already in the cart
// //     const itemIndex = cart.items.findIndex(p => p.product == req.body.productId);
// //     if (itemIndex > -1) {
// //       // If so, increment the quantity
// //       cart.items[itemIndex].quantity += req.body.quantity;
// //     } else {
// //       // Otherwise, add the new product
// //       cart.items.push({ product: req.body.productId, quantity: req.body.quantity });
// //     }

// //     // Save the updated cart
// //     const updatedCart = await cart.save();

// //     // res.status(200).json(updatedCart);
// //   } catch (err) {
// //     console.error(err);
// //     // res.status(500).json({ message: 'Server Error' });
// //   }
// // });







  module.exports = router;
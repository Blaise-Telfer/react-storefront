const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const { isAuth, isAdmin } = require('../middleware/authParameters');
const config = require("../config/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_URI);


//create an order
router.post("/", isAuth, async (req, res) => {
  const { user } = req;
  const { shipping, orderItems, itemsPriceFix, shippingPriceFix, totalPriceFix } = req.body;
  try{
	if(!shipping.address || !shipping.city || !shipping.postalCode || !shipping.country){
	  res.status(400).json({message: "Make sure all fields are filled."})
	} else {
	  const newOrder = new Order({
		orderItems: orderItems,
		user: user.id,
		shipping: shipping,
		itemsPrice: itemsPriceFix,
		shippingPrice: shippingPriceFix,
		totalPrice: totalPriceFix
	  });
	  
	  const newOrderCreated = await newOrder.save();
	  if (newOrderCreated) {
		res.status(201).json({ message: "New Order Created", data: newOrderCreated });
	  } else {
		res.status(400).json({message: "Order couldn't be created; try again or check your connection."})
	  }
	}
  } catch(error){
	res.status(400).json({message: "Order couldn't be created; try again or check your connection."})
  }
});


//list all orders
router.get("/", isAuth, isAdmin, async (req, res) => {
  try{
	const orders = await Order.find( {} ).populate('user');
    if (orders) {
      res.json(orders);
    }
  }
  catch (error){
	res.status(400).json({message: "Orders couldn't be loaded; try again or check your connection."})
  }
});


//list user's orders
router.get("/mine", isAuth, async (req, res) => {
  try{
	const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.json(orders);
    }
  }
  catch (error){
	res.status(400).json({message: "Your orders couldn't be loaded; try again or check your connection."})
  }
});


//single order details
router.get("/:id", isAuth, async (req, res) => {
  try{
	const order = await Order.findOne({ _id: req.params.id });
	if (order) {
	  res.json(order);
	}
  }
  catch (error){
	res.status(400).json({message: "That order serial number doesn't match our records."})
  }
});


//make the payment
router.put("/:id/pay", isAuth, async (req, res) => {
  try{
	  const { user } = req;
	  const order = await Order.findById(req.params.id);
	  if (order) {
		order.orderItems.map(item => {
		  const newStock = item.countInStock - item.qty;
		  Product.findByIdAndUpdate( item.product, {countInStock: newStock}, function(err, result){
			if(err){
			  console.log(err);
			}
			if(result){
			  console.log(result);
			}
		  });
		});
		
		order.isPaid = true;
		order.paidAt = Date.now();
		order.payment = {
		  paymentMethod: 'paypal',
		  paymentResult: {
			payerID: req.body.payerID,
			orderID: req.body.orderID,
			paymentID: req.body.paymentID
		  }
		}
		const verificationMessage = {
		  to: `${user.email}`,
		  from: "blaisetelfer@gmail.com",
		  subject: "Order Confirmation",
		  html: `<h2>Hello ${user.username}.</h2>` +
		  `<p>Your order number is ${order._id}. Thank you for your business.</p>`
		};
		
		const updatedOrder = await order.save();
		res.json({ message: 'Order Paid.', order: updatedOrder });
		sgMail.send(verificationMessage);
	  } else {
		res.status(400).json({message: "That order ID doesn't match our records."})
	  }
  } catch (error){
	res.status(400).json({message: "Something went wrong; try again."})
  }
});


//delete an order
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try{
	const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.json(deletedOrder);
    }
  }
  catch (error){
	res.status(400).json({message: "Order couldn't be deleted; try again or check your connection."})
  }
  
});

module.exports = router;

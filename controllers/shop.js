const Cart = require('../models/cart');
const Product=require('../models/product')
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err)=>{
    console.log(err)
  })
   
  };

  exports.getProduct=(req,res,next)=>{
    const productId=req.params.id
    // Product.findAll({where:{id:productId}}).then((product)=>{
    //   res.render('shop/product-detail',
    //   {product:product[0],pageTitle:product[0].title,path:'/products'})
    // }).catch((err)=>{
    //   console.log(err)
    // })

    Product.findById(productId)
    .then((product)=>{
         res.render('shop/product-detail',
      {product:product,pageTitle:product.title,path:'/products'})
    })
    .catch((err)=>{
      console.log(err)
    })

  
    
  }
  
  exports.getIndex = (req, res, next) => {

    Product.findAll().then((products)=>{
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch((err)=>{
      console.log(err)
    })
  

  };
  
  exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  };

  exports.postCart=(req,res,next)=>{
   const prodId=req.body.productId
    Product.getProductById(prodId,(product)=>{
      Cart.addProduct(prodId,product.price)
    })
   res.redirect('/cart')
  }
  
  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };
  
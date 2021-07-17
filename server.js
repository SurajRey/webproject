 const express = require('express');
 const mongoose = require('mongoose');
 const dotenv = require('dotenv');
 const data = require('./data');
 const path = require('path');

 dotenv.config();
 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({extended:true}));



 mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/selforderkiosk',{
   useNewUrlParser:true,
   useCreateIndex:true,
   useUnifiedTopology:true,
 });

// mongoose.connect('mongodb://localhost:27017/selforderkiosk',{useNewUrlParser:true,useUnifiedTopology:true},
//     err => {
//         if (!err)
//             console.log('Mongodb connection succeeded.')
//         else
//             console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
//     })

 const Product = mongoose.model('products',
 new mongoose.Schema({
     name : String,
     description : String,
     image : String,
     price : Number,
     calorie : Number,
     category : String
 })
 );

 app.get('/api/products/seed', async (req, res) => {
  // await Product.remove({});
  const products = await Product.insertMany(data.products);
  res.send({ products });
});

 app.get('/api/categories',(req,res)=>{
     res.send(data.categories);
 });

 app.get('/api/products',async(req,res)=>{
   const {category} = req.query;
   const products = await Product.find(category?{category}:{});
  res.send(products);
});

app.post('/api/products',async(req,res)=>{
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
 res.send(savedProduct);
});


const Order = mongoose.model(
  'order',
  new mongoose.Schema(
      {
      number : {type:Number,default:0},
      orderType : String,
      paymentType : String,
      isPaid : {type:Boolean,default:false},
      isReady : {type : Boolean,default:false},
      isProgress : {type : Boolean,default:true},
      isCanceled : {type : Boolean,default:false},
      isDelivered : {type : Boolean,default:false},
      totalPrice : Number,
      taxPrice : Number,
      orderItems:[
        {
          name:String,
          price:Number,
          qunatity : Number,
        },
      ],
    },
    {
        timestamps : true,
    }
  )   
);

app.post('/api/orders',async(req,res)=>{
  const lastOrder =  await Order.find().sort({number:-1}).limit(1);
  const lastNumber = 1;
  if(!req.body.orderType || !req.body.paymentType || !req.body.orderItems)
  {
       return res.send({message:'data is required'});
  }
  const order = await Order({...req.body,number:lastNumber+1}).save();
  res.send(order);

});

app.get('/api/orders',async(req,res)=>{
  const orders = await Order.find({isDelivered:true,isCanceled:false});
  res.send(orders);

});

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

 const port  = process.env.PORT || 5000;
app.listen(port, () => console.log(`serve at http://localhost:${port}`));
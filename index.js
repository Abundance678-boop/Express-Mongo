const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const Product = require('./models/product.model');

app.listen(3000, () => {
    console.log('server is running on port 3000');
})

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Hello! World</h1>");
});


app.get ('/api/products', async (req,res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




mongoose.connect("mongodb+srv://uzochukwujachinma:Ecvs3Rrp0G4WxjRw@cluster0.rliq7gj.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")


.then(() => {
    console.log('Conected to database');
})
.catch(()=>{
    console.log("Connection Failed!");
});




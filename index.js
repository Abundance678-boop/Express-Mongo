const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const Product = require('./models/product.model');
const User = require('./models/user.model');

app.listen(3000, () => {
    console.log('server is running on port 3000');
})

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Hello! World</h1>");
});

//Product Module
app.get ('/api/products', async (req,res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

app.put("/api/products/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id ,req.body);
    
    if(!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);


  } catch (error) {
    res.status(500).json({ message:error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json(deletedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Module

app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const updatedProduct = await User.findById(id);

    res.status(200).json(updatedProduct);
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




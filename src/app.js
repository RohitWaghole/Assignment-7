const express = require("express");
require("./db/conn");
const dab = require("./db/database");
const app = express();
const Product = require("./models/productuserSchema");
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DOCKER IS WORKING PROPERLY");
});

// MONGODB DATABASE REQUESTS

app.get("/products", async (req, res) => {
  try {
    const productsData = await Product.find();
    res.send(productsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const detail = new Product(req.body);
    const createNewUser = await detail.save();
    res.status(201).send(createNewUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/getProduct/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const productData = await Product.findById({ _id: product_id });

    if (!productData) {
      return res.status(404).send();
    } else {
      res.send(productData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  try {
    const product_id = req.params.id;

    const updateProduct = await Product.findByIdAndUpdate(
      { _id: product_id },
      req.body
    );
    res.send(updateProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(
      { _id: product_id },
      req.body
    );
    res.send(deleteProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

// MYSQL DATABASE REQUESTS

app.get("/employee", async (req, res) => {
  try {
    const result = await dab.promise().query(`select * from new_employee`);
    res.status(200).send(result[0]);
  } catch (e) {
    console.log(e);
  }
});

app.post("/addEmployee", (req, res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const age = req.body.age;

  dab.query(
    `INSERT INTO new_employee (id,name,age,gender) VALUES (UNIX_TIMESTAMP(now()),'${name}','${age}','${gender}')`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ msg: "Employee added successfully!" });
      }
    }
  );
});

app.get("/getEmployee/:id", async (req, res) => {
  const temp_id = req.params.id;

  try {
    const result = await dab
      .promise()
      .query(`select * from new_employee where id='${temp_id}'`);

    res.status(200).send(result[0]);
  } catch (e) {
    console.log(e);
  }
});

app.put("/updateEmployee/:id", (req, res) => {
  const temp_id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;

  dab.query(
    `UPDATE new_employee SET name='${name}',age='${age}',gender='${gender}' WHERE id='${temp_id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("updated the details");
      }
    }
  );
});

app.delete("/deleteEmployee/:name", (req, res) => {
  const temp_id = req.params.name;

  dab.query(
    `DELETE FROM new_employee WHERE name='${temp_id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("DELETED SUCCESSFULLY");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

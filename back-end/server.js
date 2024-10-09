import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const port = 8368;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const sql = neon(`${process.env.DATABASE_URL}`);

// app.get("/", async (request, response) => {
//   const sqlREsponse = await sql`SELECT * FROM products`;
//   response.json({ sqlREsponse });
// });

app.get("/products", async (request, response) => {
  try {
    const sqlResponse = await sql`SELECT * FROM products`;
    response.json(sqlResponse);
  } catch (error) {
    console.error("Error fetching products:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/product", async (request, response) => {
  const { name, description, price, image_url } = request.body;

  if (!name || !description || !price || !image_url) {
    return response.status(400).json({ error: "All fields are required." });
  }

  if (isNaN(price) || price <= 0) {
    return response
      .status(400)
      .json({ error: "Price must be a positive number." });
  }

  try {
    const sqlResponse = await sql`
      INSERT INTO products ( name, description, price, image_url)
      VALUES ( ${name}, ${description}, ${price}, ${image_url})
      RETURNING *;`;

    response.json(sqlResponse);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === "23505") {
      // PostgreSQL unique violation code
      return response
        .status(409)
        .json({ error: "Product with this ID already exists." });
    }
    response
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
app.post("/cart", async (request, response) => {
  const { name, description, price, image_url } = request.body;

  if (!name || !description || !price || !image_url) {
    return response.status(400).json({ error: "All fields are required." });
  }

  if (isNaN(price) || price <= 0) {
    return response
      .status(400)
      .json({ error: "Price must be a positive number." });
  }

  try {
    const sqlResponse = await sql`
      INSERT INTO order_items ( order_id, product_id, quantity, price)
      VALUES ( ${order_id}, ${product_id}, ${quantity}, ${price})
      RETURNING *;`;

    response.json(sqlResponse);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === "23505") {
      // PostgreSQL unique violation code
      return response
        .status(409)
        .json({ error: "Product with this ID already exists." });
    }
    response
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// app.delete("/product", async (request, response) => {
//   const { id } = request.body;
//   try {
//     const sqlResponse = await sql`DELETE FROM products WHERE id`;
//     response.json(sqlResponse);
//   } catch (error) {
//     console.log("Error");
//   }
// });

app.put("/product", (request, response) => {
  const { id, productName, category, price } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const editedData = dbData.map((data) => {
      if (data?.id === id) {
        return {
          id,
          productName,
          category,
          price,
        };
      }
      return data;
    });

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(editedData),
      (error) => {
        if (error) {
          response.json({
            success: false,
            error: error,
          });
        } else {
          response.json({
            success: true,
            products: editedData,
          });
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});

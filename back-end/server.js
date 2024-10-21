import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

const port = 8368;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const sql = neon(`${process.env.DATABASE_URL}`);

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
  }
});

app.post("/orders", async (request, response) => {
  const { cart } = request.body;

  try {
    const customer_id = 9;
    const totalSumOfCart = 100;
    const sqlOrdersResponse = await sql`
    INSERT INTO orders ( customer_id, order_date, total_amount)
    VALUES ( ${customer_id}, CURRENT_TIMESTAMP, ${totalSumOfCart})
    RETURNING *;`;
    console.log("orders-n response:", sqlOrdersResponse);
    const order_id = sqlOrdersResponse[0].id;
    const sqlOrderItemsResponse = await sql`
    INSERT INTO order_items ( order_id, product_id, quantity, price)
    VALUES ${cart.map((item) => {
      return `( ${order_id}, ${item.id}, ${item.count}, ${item.price})`;
    })},
    RETURNING *;`;
    console.log("order_items-n response:", sqlOrderItemsResponse);
    response.json(sqlOrdersResponse);
  } catch (error) {
    console.error("Error create customer:", error);
  }
});

app.delete("/product", async (request, response) => {
  const { id } = request.body;

  try {
    const sqlResponse = await sql`
      DELETE FROM products WHERE id=${id}
      RETURNING *;`;

    response.json(sqlResponse);
  } catch (error) {
    console.error("Error create customer:", error);
  }
});
// app.post("/cart", async (request, response) => {
//   const { name, description, price, image_url } = request.body;

//   if (!name || !description || !price || !image_url) {
//     return response.status(400).json({ error: "All fields are required." });
//   }

//   if (isNaN(price) || price <= 0) {
//     return response
//       .status(400)
//       .json({ error: "Price must be a positive number." });
//   }

//   try {
//     const sqlResponse = await sql`
//       INSERT INTO order_items ( order_id, product_id, quantity, price)
//       VALUES ( ${order_id}, ${product_id}, ${quantity}, ${price})
//       RETURNING *;`;

//     response.json(sqlResponse);
//   } catch (error) {
//     console.error("Error adding product:", error);
//     if (error.code === "23505") {
//       // PostgreSQL unique violation code
//       return response
//         .status(409)
//         .json({ error: "Product with this ID already exists." });
//     }
//     response
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// });

// app.delete("/product", async (request, response) => {
//   const { id } = request.body;
//   try {
//     const sqlResponse = await sql`DELETE FROM products WHERE id`;
//     response.json(sqlResponse);
//   } catch (error) {
//     console.log("Error");
//   }
// });

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});

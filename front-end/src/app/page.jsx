"use client";

import { Cart } from "@/components/Cart";
import { Card } from "@/components/Card";
import { CreateModal } from "@/components/CreateModel";
import { BACKEND_ENDPOINT } from "@/contants/constants";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/products`);
      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const AddToCartButton = (id, name, description, price) => {
    const cart = { id, name, description, price, count: 1 };

    setCart((prevItems) => {
      const isExists = prevItems.find((item) => item.id === id);
      if (isExists) {
        return prevItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        });
      }

      return [...prevItems, cart];
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center w-full p-6">
      <div className="max-w-[1200px]">
        <div className="flex justify-end gap-[23px] items-center">
          <Cart cart={cart} setCart={setCart} />
          <CreateModal setProducts={setProducts} />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10">
          {products?.map((product) => {
            return (
              <Card
                key={product?.id}
                product={product}
                setProducts={setProducts}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                AddToCartButton={AddToCartButton}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

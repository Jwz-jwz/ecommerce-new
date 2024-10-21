import { useEffect, useState } from "react";
import { User } from "./User";
import { BACKEND_ENDPOINT } from "@/contants/constants";

export const Cart = ({ cart, setCart }) => {
  const [totalSumOfCart, setTotalSumOfCart] = useState(0);

  const handleCheckOut = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(cart),
      };

      const response = await fetch(`${BACKEND_ENDPOINT}/orders`, options);
      const data = await response.json();
      console.log(data);
    } catch {
      console.log("error");
    }

    document.getElementById("my_modal_2").close();
  };
  const handleDecrease = (id) => {
    setCart((prevCardItems) => {
      return prevCardItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            count: item.count - 1,
          };
        }
        return item;
      });
    });
  };
  const handleIncrease = (id) => {
    setCart((prevCardItems) => {
      return prevCardItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      });
    });
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, current) => {
      return acc + current.price * current.count;
    }, 0);
    setTotalSumOfCart(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div>
      <button
        className="btn text-red-500 "
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Cart {cart.length}
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col gap-[20px]">
          <h3 className="font-bold text-lg">Order information!</h3>
          <div className="flex flex-col gap-3 mt-4">
            {cart?.map((product, index) => {
              return (
                <div className="flex justify-between items-center" key={index}>
                  <p>product id:{product.id}</p>
                  <p>name:{product.name}</p>
                  <div className="flex items-center justify-center gap-[5px]">
                    <button onClick={() => handleDecrease(product.id)}>
                      -
                    </button>
                    <p>{product.count}</p>
                    <button onClick={() => handleIncrease(product.id)}>
                      +
                    </button>
                  </div>
                  <p>{product.count * product.price}$</p>
                </div>
              );
            })}
          </div>
          <p>Total price:{totalSumOfCart}$</p>
          <div className="modal-action">
            <form className="flex  gap-[10px]" method="dialog">
              <button className="btn">Close</button>
              <button onClick={handleCheckOut} className="btn">
                Check-out
              </button>
              {/* <User cart={cart} totalSumOfCart={totalSumOfCart} /> */}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

import { useState } from "react";

export const Cart = ({ cart, setCart }) => {
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

  return (
    <div>
      <button
        className="btn text-red-500 "
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Cart {cart.length}
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
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
                  <p>{product.count}</p>
                </div>
              );
            })}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

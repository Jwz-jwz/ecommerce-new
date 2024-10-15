import { useState } from "react";
import { Counter } from "./Counter";

export const Cart = ({ cart }) => {
  const [quantity, setQuantity] = useState(0);
  const { id, name, description, price } = cart;

  const handleDecrease = () => {
    setQuantity((prevCount) => prevCount - 1);
  };
  const handleIncrease = () => {
    setQuantity((prevCount) => prevCount + 1);
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
                  {/* <div className="flex items-center justify-center gap-[5px]">
                    quantity:
                    <button onClick={handleDecrease}>-</button>
                    <p>{quantity}</p>
                    <button onClick={handleIncrease}>+</button>
                  </div> */}
                  <Counter
                    quantity={quantity}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                  />
                  <p>price:$</p>
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

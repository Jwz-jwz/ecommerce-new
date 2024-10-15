export const Counter = ({ handleDecrease, quantity, handleIncrease }) => {
  return (
    <div className="flex items-center justify-center gap-[5px]">
      <button onClick={handleDecrease}>-</button>
      <p>{quantity}</p>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

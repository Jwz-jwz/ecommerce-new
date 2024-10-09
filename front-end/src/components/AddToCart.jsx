export const AddToCart = () => {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Add to cart
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order information!</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              name="name"
              type="text"
              placeholder="order_id"
              className="w-full input input-bordered"
            />
            <input
              name="description"
              type="text"
              placeholder="product_id"
              className="w-full input input-bordered"
            />
            <input
              name="price"
              type="text"
              placeholder="quantity"
              className="w-full input input-bordered"
            />
            <input
              name="image_url"
              type=""
              placeholder="price"
              className="w-full input input-bordered"
            />
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

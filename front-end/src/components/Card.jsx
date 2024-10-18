import { BACKEND_ENDPOINT } from "@/contants/constants";

export const Card = ({
  AddToCartButton,
  product,
  selectedProduct,
  setSelectedProduct,
  setProducts,
}) => {
  const { id, name, description, price, image_url } = product;
  const handleDeleteCard = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: id }),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts((prevProducts) =>
        prevProducts.filter((product) => data[0]?.id !== product?.id)
      );
    } catch (error) {
      console.log("error:", error);
    }
    // document.getElementById("my_modal_2").close();
  };

  return (
    <div class="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={image_url} alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{name}</h2>
        <div className="flex justify-between">
          <p>{description}</p>
          <p>{price}$</p>
        </div>
      </div>
      <div className="justify-end p-4 pt-0 card-actions">
        <button
          onClick={() =>
            AddToCartButton(
              product?.id,
              product?.name,
              product?.description,
              product?.price
            )
          }
          className="btn"
        >
          Add to cart
        </button>
        <button className="btn">Veiw details</button>
        <button onClick={() => handleDeleteCard(product?.id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

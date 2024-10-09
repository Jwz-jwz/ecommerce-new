import { BACKEND_ENDPOINT } from "@/contants/constants";
import { EditModal } from "./EditModal";
import { Cart } from "@/svg/Cart";
import { AddToCart } from "./AddToCart";

export const Card = ({
  product,
  selectedProduct,
  setSelectedProduct,
  setProducts,
}) => {
  const { name, description, price, image_url } = product;

  console.log(product);

  const handleDelete = async (id) => {
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
      const data = await response.json();

      setProducts((prevProducts) =>
        prevProducts.filter((product) => data?.product?.id !== product?.id)
      );
    } catch {
      console.log("error");
    }
    document.getElementById("my_modal_2").close();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(selectedProduct),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json(response);
      setProducts(data.products);
    } catch {
      console.log("error");
    }
    document.getElementById("my_modal_2").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSelectedProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <div class="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src={image_url}
          alt="Shoes"
          // <img src={image_url} alt="image" />
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{name}</h2>
        <div className="flex justify-between">
          <p>{description}</p>
          <p>{price}$</p>
        </div>
      </div>
      <div className="justify-end p-4 pt-0 card-actions">
        {/* <button className="btn">Add to cart</button> */}
        <AddToCart />
        <button className="btn">Veiw details</button>

        {/* <EditModal
          product={product}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        /> */}
        {/* <button onClick={() => handleDelete(product?.id)} className="btn">
          Delete
        </button> */}
      </div>
    </div>
  );
};

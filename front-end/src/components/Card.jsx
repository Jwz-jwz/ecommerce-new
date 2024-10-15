export const Card = ({
  AddToCartButton,
  product,
  selectedProduct,
  setSelectedProduct,
  setProducts,
}) => {
  const { id, name, description, price, image_url } = product;

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
      </div>
    </div>
  );
};

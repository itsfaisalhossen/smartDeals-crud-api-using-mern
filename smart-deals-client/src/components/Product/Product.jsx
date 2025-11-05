import { Link } from "react-router";

const Product = ({ product }) => {
  const { title, price_min, price_max, image, _id } = product;
  return (
    <div>
      <div className="card w-full bg-base-100 shadow-sm">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{price_min}</p>
          <p>{price_max}</p>
          <div className="card-actions justify-end">
            <Link
              to={`/product-details/${_id}`}
              className="bg-[linear-gradient(125.07deg,rgba(99,46,227,1),rgba(159,98,242,1)_100%)] btn btn-primary w-full"
            >
              Vire Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;

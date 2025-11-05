import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id: productId } = useLoaderData();
  const bidModalRef = useRef(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId]);

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const bidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bidAmount = e.target.bidAmount.value;
    console.log({ productId, name, email, bidAmount });

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bidAmount,
      buyer_image: user?.photoURL,
      status: "pending",
    };

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid", data);
        if (data.insertedId) {
          bidModalRef.current.close();
        }
        alert("Bid place Successfull");
        // add the new bid to the state
        newBid._id = data.insertedId;
        const newBids = [...bids, newBid];
        newBids.sort((a, b) => b.bid_price - a.bid_price);
        setBids(newBids);
      });
  };

  return (
    <div>
      <div>
        {/* ProfuctIfnfo */}
        <div>
          <button onClick={handleBidModal} className="btn btn-primary">
            I want to buy this product
          </button>
          <dialog ref={bidModalRef} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Give Seller Your Offered Price
              </h3>
              <form onSubmit={bidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    readOnly
                    name="name"
                    defaultValue={user?.displayName}
                    className="input w-full"
                  />
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    readOnly
                    name="email"
                    defaultValue={user?.email}
                    className="input w-full"
                  />

                  {/* Bid amount */}
                  <label className="label">Bid Amout</label>
                  <input
                    type="text"
                    required
                    name="bidAmount"
                    className="input w-full"
                    placeholder="Your bid"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place Your Bid
                  </button>
                </fieldset>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        {/* Bids for this product */}
        <div>
          <h3>Bids for this products: {bids.length}</h3>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold"> {bid?.buyer_name} </div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{bid?.buyer_email}</td>
                    <td> {bid?.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

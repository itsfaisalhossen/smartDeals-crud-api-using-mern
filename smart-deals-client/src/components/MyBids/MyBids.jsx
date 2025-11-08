import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  console.log(user.accessToken);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bids?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]);
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:5000/bids?email=${user?.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    console.log(_id);
    fetch(`http://localhost:5000/bids/${_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    const remainingBids = bids.filter((bid) => bid._id !== _id);
    setBids(remainingBids);
  };

  return (
    <div>
      <h3>MyBids {bids.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th>Status</th>
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
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{bid?.buyer_email}</td>
                <td> {bid?.bid_price}</td>
                <td>
                  <div className="badge badge-warning">{bid?.status}</div>
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid?._id)}
                    className="btn btn-outline btn-sm"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyBids;

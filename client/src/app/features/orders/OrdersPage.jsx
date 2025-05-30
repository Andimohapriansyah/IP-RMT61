import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, payOrder, cancelOrder, createOrder } from "./ordersSlice";
import { useLocation } from "react-router-dom";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menuId = params.get("menuId");
  const [quantity, setQuantity] = useState(1);
  const [preorder, setPreorder] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch, token]);

  const handleOrder = () => {
    if (menuId) {
      dispatch(createOrder({ menuId, quantity, preorder, token }));
    }
  };

  const handlePay = (orderId) => {
    dispatch(payOrder({ orderId, token }));
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder({ orderId, token }));
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="section">
      <h2>Your Orders</h2>
      {menuId && (
        <div style={{ marginBottom: "2rem" }}>
          <h3>Order Menu ID: {menuId}</h3>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={preorder}
              onChange={(e) => setPreorder(e.target.checked)}
            />
            Preorder
          </label>
          <button onClick={handleOrder} style={{ marginLeft: "1rem" }}>
            Order
          </button>
        </div>
      )}
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id}>
            <span>
              <b>{order.menuName}</b> - {order.status}
            </span>
            <span className="order-actions">
              {order.status === "unpaid" && (
                <>
                  <button onClick={() => handlePay(order.id)}>Pay</button>
                  <button onClick={() => handleCancel(order.id)}>Cancel</button>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ...after receiving the token from backend:
window.snap.pay(midtransToken, {
  onSuccess: function (result) {
    /* handle success */
  },
  onPending: function (result) {
    /* handle pending */
  },
  onError: function (result) {
    /* handle error */
  },
  onClose: function () {
    /* handle close */
  },
});

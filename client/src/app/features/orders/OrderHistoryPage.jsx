import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./ordersSlice";

export default function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchOrders(token));
  }, [dispatch, token]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="section">
      <h2>Order History</h2>
      <ul className="order-list">
        {orders
          .filter((order) => order.status === "paid")
          .map((order) => (
            <li key={order.id}>
              <span>
                <b>{order.menuName}</b> - {order.status} - {order.createdAt}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

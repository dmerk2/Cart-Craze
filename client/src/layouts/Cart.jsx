
import { useSelector } from "react-redux";

function Cart() {

  const cart = useSelector((state) => state.product.cart);

  console.log(cart);
  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.image} />
            {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
            Description: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;

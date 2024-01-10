import { Card, Image, Button, Container } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartFromLocalStorage } from "../utils/productSlice";
import { useEffect } from "react";

function Cart() {
  const cart = useSelector((state) => state.product.cart) || [];
  const dispatch = useDispatch();
  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Get cart data from localStorage when the component mounts
    const storedData = JSON.parse(localStorage.getItem("cart-craze"));

    // Only update Redux state if localStorage has data
    if (storedData) {
      dispatch(updateCartFromLocalStorage(storedData));
    }
  }, [dispatch]);
  // Update localStorage whenever the cart changes
  useEffect(() => {
    console.log("Updating cart", cart);
    localStorage.setItem("cart-craze", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <h2>Your Cart</h2>
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        {cart.map((item) => (
          <Card.Group key={item._id}>
            <Card style={{ margin: "1rem" }}>
              <Image src={item.image} alt={item.image} wrapped ui={false} />
              <Card.Content>
                <Card.Description>{item.description}</Card.Description>
                <Card.Meta>Price: ${item.price}</Card.Meta>
                <Card.Meta>Quantity: {item.quantity}</Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        ))}
      </Container>
      <Container>
        Total: ${totalPrice.toFixed(2)}
        <Button>Checkout</Button>
      </Container>
    </>
  );
}

export default Cart;

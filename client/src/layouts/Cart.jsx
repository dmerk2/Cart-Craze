import { useEffect } from "react";
import { Card, Image, Button, Container, Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartFromLocalStorage, removeItem } from "../utils/productSlice";

function Cart() {
  const cart = useSelector((state) => state.product.cart) || [];
  const dispatch = useDispatch();
  const itemTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = cart.reduce((total, item) => total + item.price * 0.07, 0);
  const totalWithTax = itemTotal + tax;

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("cart-craze"));
      console.log("Parsed storedData:", storedData);
      if (storedData) {
        console.log("Dispatch updateCartFromLocalStorage");
        dispatch(updateCartFromLocalStorage(storedData));
      }
    } catch (error) {
      console.error("Error parsing or accessing localStorage:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Updating localStorage", cart);
    localStorage.setItem("cart-craze", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <h2>Your Cart</h2>
      <Grid stackable columns={2}>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Container className="cartContainer">
              {cart.map((item) => (
                <Card.Group key={item.id}>
                  <Card>
                    <Image
                      src={item.image}
                      alt={item.image}
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <h3>{item.name}</h3>
                      <Card.Description>{item.description}</Card.Description>
                      <Card.Meta>Price: ${item.price}</Card.Meta>
                      <Card.Meta>Quantity: {item.quantity}</Card.Meta>
                    </Card.Content>
                    <Button
                      className="removeItem"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Card>
                </Card.Group>
              ))}
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
            <Container className="checkoutContainer">
              <Card.Content>
                <p>
                  Items: <b>${itemTotal.toFixed(2)}</b>
                </p>
                <p>
                  Tax: <b>${tax.toFixed(2)}</b>
                </p>
                <p>
                  Total: <b>${totalWithTax.toFixed(2)}</b>
                </p>
              </Card.Content>
              <Button>Checkout</Button>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Cart;

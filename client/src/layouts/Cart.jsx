import { useEffect } from "react";
import { Card, Image, Button, Container, Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartFromLocalStorage, removeItem } from "../utils/productSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations"; // Replace with the correct path

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Cart() {
  const [addOrder, { data }] = useMutation(ADD_ORDER);
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
    // Handle redirection after successful checkout
    if (data && data.addOrder) {
      // Assuming session ID is inside the first product in the products array
      const sessionId = data.addOrder.products[0].session;
  
      if (sessionId) {
        stripePromise.then((stripe) => {
          stripe.redirectToCheckout({ sessionId });
        });
      } else {
        console.error("SessionId not found in addOrder response:", data.addOrder);
      }
    }
  }, [data]);
  
  
  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem("cart-craze"));
      if (storedData) {
        dispatch(updateCartFromLocalStorage(storedData));
      }
    } catch (error) {
      console.error("Error parsing or accessing localStorage:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart-craze", JSON.stringify(cart));
  }, [cart]);

  async function submitCheckout() {
    const productIds = [];
  
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        productIds.push(item.id);
      }
    });
  
    console.log("Product Ids in submitCheckout function:", productIds);
  
    try {
      const { data } = await addOrder({
        variables: { products: productIds },
      });
  
      if (data && data.addOrder) {
        // Handle successful order creation if needed
  
        // Redirect to Stripe Checkout after order creation
        const sessionId = data.addOrder.session;
        stripePromise.then((stripe) => {
          stripe.redirectToCheckout({ sessionId });
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }
  

  return (
    <>
      <h2>Your Cart</h2>
      <Grid stackable columns={2}>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Container className="cartContainer">
              {cart.length === 0 ? (
                <>
                  <h3>No items in your cart</h3>
                </>
              ) : (
                cart.map((item) => (
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
                ))
              )}
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
              <Button onClick={submitCheckout}>Checkout</Button>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Cart;

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_INDIVIDUAL_PRODUCT } from "../utils/queries";
import { useDispatch } from "react-redux";
import { Card, Image, Button, Container } from "semantic-ui-react";
import { addProduct } from "../utils/productSlice";
import auth from "../utils/auth";

function Product() {
  const isLoggedIn = auth.loggedIn();
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_INDIVIDUAL_PRODUCT, {
    variables: { id: productId },
  });

  const dispatch = useDispatch();
  const product = data?.product;

  const handleAddToCart = () => {
    if (!product) {
      console.error("Product data not available");
      return;
    }

    dispatch(
      addProduct({
        id: product._id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        {product && location.pathname.includes("/product/") && (
          <h2>{product.name}</h2>
        )}

        {product && (
          <Card.Group>
            <Card key={product._id}>
              <Image
                src={product.image}
                alt={product.image}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Description>{product.description}</Card.Description>
                <Card.Meta>Price: ${product.price}</Card.Meta>
                <Card.Meta>Quantity: {product.quantity}</Card.Meta>
                {isLoggedIn && (
                  <Button onClick={handleAddToCart}>Add To Cart</Button>
                )}
              </Card.Content>
            </Card>
          </Card.Group>
        )}
      </Container>
    </>
  );
}

export default Product;

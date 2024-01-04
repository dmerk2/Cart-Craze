import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_INDIVIDUAL_PRODUCT } from "../utils/queries";
import { useDispatch } from "react-redux";
import { Card, Image, Button } from "semantic-ui-react";
import { addProduct } from "../utils/productSlice";
import auth from "../utils/auth";

function Product() {
  const isLoggedIn = auth.loggedIn();
  const { productId } = useParams()
  const { loading, data } = useQuery(QUERY_INDIVIDUAL_PRODUCT, {
    variables: { id: productId },
  });

  const dispatch = useDispatch();
  if (loading) return <div>Loading...</div>
  const product = data?.product;

  const handleAddToCart = (product) => {
    console.log("Product added:", product);
    dispatch(
      addProduct({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <>
      {location.pathname.includes("/product/") && <h2>{product.name}</h2>}
      <Card.Group>
        <Card key={product._id}>
          <Image src={product.image} alt={product.image} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{product.description}</Card.Description>
            <Card.Meta>Price: ${product.price}</Card.Meta>
            <Card.Meta>Quantity: {product.quantity}</Card.Meta>
            {isLoggedIn ? (
              <Button onClick={handleAddToCart}>
                Add To Cart
              </Button>
            ) : null}
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
}

export default Product;

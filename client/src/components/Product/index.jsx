import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { addProduct } from "../../utils/productSlice";
import auth from "../../utils/auth";

function Product() {
  const isLoggedIn = auth.loggedIn();
  const { categoryId } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryId },
  });
  console.log(data);

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  if (loading) {
    return <div>Loading...</div>;
  }

  const products = data?.products || [];

  const handleAddToCart = (product) => {
    console.log("Product added:", product);
    // Dispatch the addProduct action with the product details
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
    <Card.Group>
      {products.map((product) => (
        <Card key={product._id}>
          <Image src={product.image} alt={product.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Description>{product.description}</Card.Description>
            <Card.Meta>Price: ${product.price}</Card.Meta>
            <Card.Meta>Quantity: {product.quantity}</Card.Meta>
            {isLoggedIn ? (
              <Button onClick={() => handleAddToCart(product)}>
                Add To Cart
              </Button>
            ) : null}
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default Product;

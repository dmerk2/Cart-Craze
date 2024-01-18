import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { addProduct } from "../../utils/productSlice";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

// eslint-disable-next-line react/prop-types
function Product({ limit }) {
  const isLoggedIn = auth.loggedIn();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { category: categoryId },
  });

  const dispatch = useDispatch();

  if (loading) {
    return <div>Loading...</div>;
  }

  const category = data?.products[0]?.category.name || {};
  const categoryName = category || "Unknown Category";

  const products = data?.products || [];
  // Use the slice method to limit the number of products
  const limitedProducts = limit ? products.slice(0, limit) : products;
  const handleAddToCart = (product) => {
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId._id}`);
  };

  return (
    <>
      {location.pathname.includes("/category/") && <h2>{categoryName}</h2>}
      <Card.Group>
        {limitedProducts.map((product) => (
          <Card key={product._id}>
            <Image src={product.image} alt={product.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Description>{product.description}</Card.Description>
              <Card.Meta>Price: ${product.price}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Grid centered columns={2}>
                <Grid.Column textAlign="center">
                  <Button primary onClick={() => handleProductClick(product)}>
                    View More
                  </Button>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  {isLoggedIn && (
                    <Button
                      secondary
                      style={{ width: "110px" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      <TiShoppingCart />
                    </Button>
                  )}
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}

export default Product;

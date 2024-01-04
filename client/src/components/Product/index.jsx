import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { addProduct } from "../../utils/productSlice";
import auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function Product() {
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
  console.log(products)
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId._id}`);
  };

  return (
    <>
      {location.pathname.includes("/category/") && <h2>{categoryName}</h2>}
      <Card.Group>
        {products.map((product) => (
          <Card key={product._id}>
            <Image src={product.image} alt={product.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Description>{product.description}</Card.Description>
              <Card.Meta>Price: ${product.price}</Card.Meta>
              <Button onClick={() => handleProductClick(product)}>
                View More
              </Button>
              {isLoggedIn ? (
                <Button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </Button>
              ) : null}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
}

export default Product;

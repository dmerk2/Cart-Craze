import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { QUERY_PRODUCTS } from "../utils/queries";

function Category() {
  const { categoryId } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const products = data?.products || [];

  return (
    <div>
      <div>Category: {categoryId}</div>

      <Card.Group>
        {products.map((product) => (
          <Card key={product._id}>
            <Image src={product.image} alt={product.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Description>{product.description}</Card.Description>
              <Card.Meta>Price: ${product.price}</Card.Meta>
              <Card.Meta>Quantity: {product.quantity}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default Category;

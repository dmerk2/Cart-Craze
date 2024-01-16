import { Card, Container, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function Order() {
  const { error, loading, data } = useQuery(QUERY_USER);
  if (loading) return <div>Loading...</div>;

  // Check for errors
  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error fetching user data</div>;
  }

  // Check if data is available
  if (!data || !data.user) {
    console.error("No user data found");
    return <div>No user data found</div>;
  }

  const userData = data.user;

  return (
    <Container>
      <h2>Previous Orders</h2>
      {userData.orders.map((order) => {
        const purchaseDate = new Date(parseInt(order.purchaseDate, 10));
        const purchased = purchaseDate.toDateString();

        // Group products by name and calculate total quantity
        const groupedProducts = order.products.reduce((acc, product) => {
          const existingProduct = acc.find((p) => p.name === product.name);

          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            acc.push({
              ...product,
              quantity: 1,
            });
          }

          return acc;
        }, []);

        return (
          <div key={order._id}>
            <h3>Purchase On: {purchased}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {groupedProducts.map((groupedProduct) => (
                <div key={groupedProduct._id} style={{ margin: "10px" }}>
                  <Card>
                    <Image
                      src={groupedProduct.image}
                      alt={groupedProduct.image}
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <Card.Header>{groupedProduct.name}</Card.Header>
                      <Card.Description>
                        {groupedProduct.description}
                      </Card.Description>
                      <Card.Meta>Price: ${groupedProduct.price}</Card.Meta>
                      <Card.Meta>Quantity: {groupedProduct.quantity}</Card.Meta>
                    </Card.Content>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  );
}

export default Order;

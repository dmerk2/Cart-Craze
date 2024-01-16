import { Button, Grid, Segment } from "semantic-ui-react";
import SideBar from "../components/Sidebar/index";
import Product from "../components/Product/index";
import { useState } from "react";

function Home() {
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleViewMore = () => {
    setItemsToShow((prevItems) => prevItems + 10);
  };

  return (
    <Grid stackable columns="equal" style={{ margin: "10px" }}>
      <Grid.Row centered>
        <Grid.Column mobile={16} tablet={6} computer={4}>
          <Segment style={{ width: "100%" }}>
            <h2>Search</h2>
            <SideBar />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={12}>
          <Segment>
            <h2>Products</h2>
            <Product limit={itemsToShow} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleViewMore}
                primary
                style={{ marginTop: "10px", width: "200px" }}
              >
                View More
              </Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;

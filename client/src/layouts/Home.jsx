import { Grid, Segment } from "semantic-ui-react";
import SideBar from '../components/Sidebar/index'
import Product from '../components/Product/index'

function Home() {
  return (
    <Grid columns="equal" style={{ margin: "10px" }}>
      <Grid.Row textAlign="center">
        <Grid.Column>
          <Segment style={{ position: "fixed", left: 50, width: "290px" }}>
            <h2>Search</h2>
            <SideBar />
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <h2>Products</h2>
            <Product />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;

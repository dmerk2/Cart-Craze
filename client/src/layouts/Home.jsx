import { Grid, Segment } from "semantic-ui-react";
import SideBar from '../components/Sidebar/index'

function Home() {
  return (
    <Grid columns="equal" style={{ margin: "10px" }}>
      <Grid.Row textAlign="center">
        <Grid.Column>
          <Segment>
            <h2>Categories</h2>
            <SideBar />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <h2>Column 2</h2>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <h2>Column 3</h2>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;

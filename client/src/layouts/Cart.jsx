import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";

function Cart() {

  const { userId } = useParams();
  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { id: userId },
  });
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
  console.log(data);
  return <div>Cart</div>;
}

export default Cart;

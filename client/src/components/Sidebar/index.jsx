import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES, QUERY_ALL_PRODUCTS } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

function Sidebar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading: loadingCategories, data: allCategories } =
    useQuery(QUERY_CATEGORIES);
  const { loading: loadingProducts, data: allProducts } =
    useQuery(QUERY_ALL_PRODUCTS);

  if (loadingCategories || loadingProducts) {
    return <div>Loading...</div>;
  }

  const categories = allCategories?.categories || [];
  const products = allProducts?.products || [];

  const handleProductChange = (event, data) => {
    const value = data.searchQuery;
    setSearchTerm(value || "");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const productOptions = products
    .filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .map((product) => ({
      key: product._id,
      text: product.name,
      value: product._id,
      price: product.price,
    }));

  return (
    <div>
      <div>
        <Dropdown
          placeholder="Search products..."
          fluid
          search
          selection
          options={productOptions}
          onSearchChange={handleProductChange}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Custom rendering of dropdown items with onClick event */}
          <Dropdown.Menu>
            {productOptions.map((option) => (
              <Dropdown.Item
                key={option.key}
                onClick={() => handleProductClick(option.value)}
              >
                {option.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div>Pick a Category:</div>
      {categories.map((item) => (
        <div key={item._id}>
          <a href={`/category/${item._id}`}>{item.name}</a>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

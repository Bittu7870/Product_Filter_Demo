import { useEffect, useState } from "react";

const ProductsFilter = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    // Check if the clicked category is the same as the selected category
    if (selectedCategory === category) {
      // If it's the same category, clear the filter
      setSelectedCategory("");
    } else {
      // Otherwise, set the clicked category as the filter
      setSelectedCategory(category);
    }
  };

  return (
    <div className="my-10">
      <div className="flex justify-center items-center mb-4">
        {[...new Set(products.map((product) => product.category))].map(
          (category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`focus:outline-none text-white ${
                selectedCategory === category
                  ? "bg-purple-800"
                  : "bg-purple-700 hover:bg-purple-800"
              } focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900`}
            >
              {category.toUpperCase()}
            </button>
          )
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-8">
        {products
          .filter((item) =>
            selectedCategory ? item.category === selectedCategory : true
          )
          .map((item, index) => (
            <div key={index} className="border py-2">
              <p className="text-center text-red-600 text-xl">{item.title}</p>
              <p className="text-center text-blue-600 font-light">
                {item.category}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsFilter;

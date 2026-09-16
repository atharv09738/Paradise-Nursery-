import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const plants = [
  { id: 1, name: "Snake Plant", price: 20, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1593691509543-c55fb32fd674?w=300" },
  { id: 2, name: "Spider Plant", price: 18, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=300" },
  { id: 3, name: "Peace Lily", price: 25, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300" },
  { id: 4, name: "Pothos", price: 15, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300" },
  { id: 5, name: "ZZ Plant", price: 30, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300" },
  { id: 6, name: "Rubber Plant", price: 28, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300" },

  { id: 7, name: "Aloe Vera", price: 12, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300" },
  { id: 8, name: "Tulsi", price: 10, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300" },
  { id: 9, name: "Mint", price: 8, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300" },
  { id: 10, name: "Neem", price: 15, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300" },
  { id: 11, name: "Lavender", price: 18, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300" },
  { id: 12, name: "Rosemary", price: 14, category: "Medicinal Plants", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=300" },

  { id: 13, name: "Jasmine", price: 22, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300" },
  { id: 14, name: "Rose", price: 20, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=300" },
  { id: 15, name: "Orchid", price: 35, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=300" },
  { id: 16, name: "Gardenia", price: 26, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=300" },
  { id: 17, name: "Hibiscus", price: 18, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300" },
  { id: 18, name: "Marigold", price: 12, category: "Aromatic Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=300" }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.id]: true }));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    "Indoor Plants",
    "Medicinal Plants",
    "Aromatic Plants",
  ];

  return (
    <div>
      <nav
        style={{
          background: "green",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Paradise Nursery</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>

          <Link to="/products" style={{ color: "white" }}>
            Plants
          </Link>

          <Link to="/cart" style={{ color: "white" }}>
            Cart ({cartCount})
          </Link>
        </div>
      </nav>

      {categories.map((category) => (
        <div key={category} style={{ padding: "20px" }}>
          <h2>{category}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div
                  key={plant.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{
                      width: "170px",
                      height: "170px",
                      objectFit: "cover",
                    }}
                  />

                  <h3>{plant.name}</h3>

                  <p>Price: $ {plant.price}</p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedItems[plant.id]}
                    style={{
                      background: addedItems[plant.id] ? "gray" : "green",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      cursor: addedItems[plant.id]
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    {addedItems[plant.id]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

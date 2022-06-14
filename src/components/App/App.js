import React, { useState, useEffect } from "react";
import "./App.css";
import apiCalls from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiCalls.getOrders().then((data) => setOrders(data.orders));
  }, []);

  const addNewOrder = () => {
    apiCalls.getOrders().then((data) => setOrders(data.orders));
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addNewOrder={addNewOrder} />
      </header>
      <Orders orders={orders} />
    </main>
  );
};

export default App;

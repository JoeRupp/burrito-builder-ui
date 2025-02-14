const apiCalls = {
  getOrders: () => {
    return fetch("http://localhost:3001/api/v1/orders")
      .then((response) => {
        if (!response.ok) {
          throw Error(response);
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log(err));
  },

  makeOrder: (order) => {
    return fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response);
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log(err));
  },
};

export default apiCalls;

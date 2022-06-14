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
};

export default apiCalls;

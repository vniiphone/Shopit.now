const api_endpoints = {
  userOrders: "/user/orders",
  userSaveLater: "/user/save-later",
  userCart: "/user/cart",
  adminApi: "/admin",
  userApi: "/auth",
  userOperations: "/user",
  productApi: "/products",
  productAddApi: "/products/add-item",
};

const formUrl = (endpoints) => {
  const { REACT_APP_BASE_URL } = process.env;
  return REACT_APP_BASE_URL + endpoints;
};

export { api_endpoints, formUrl };

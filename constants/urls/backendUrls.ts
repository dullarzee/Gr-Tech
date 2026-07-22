const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const params = new URLSearchParams();
params.append("apikey", api_key as string);
export const backendUrl =
  environment === "dev" ? "http://localhost:8080" : "https://grtech.vercel.app";

const EPs = {
  get_users: `${backendUrl}/api/auth/users`,
  register_user: `${backendUrl}/api/auth/register`,
  login_user: `${backendUrl}/api/auth/login`,
  check_user_auth_status: `${backendUrl}/api/auth/checkAuth`,
  logout: `${backendUrl}/api/auth/logout`,
  get_products: (limit?: number, sortBy?: string) =>
    `${backendUrl}/api/products?limit=${limit}&sortBy=${sortBy}`,
  get_single_product: (id: string) => `${backendUrl}/api/products/${id}`,
  add_product: `${backendUrl}/api/products`,
  update_product: (id: string) => `${backendUrl}/api/products/${id}`,
  delete_product: (id: string) => `${backendUrl}/api/products/${id}`,
  upload_product_image: `${backendUrl}/api/products/upload-image`,
  add_to_cart: `${backendUrl}/api/cart/add`,
  get_cart_items: (userId: string) => `${backendUrl}/api/cart/getAll/${userId}`, // flag  /cart/getAll/:userId
  delete_cart_item: (userId: string, productId: string) =>
    `${backendUrl}/api/cart/delete/${userId}/${productId}`,
  update_cart_item: (userId: string, productId: string, quantity: number) =>
    `${backendUrl}/api/cart/update/${userId}/${productId}/${quantity}`,
  clear_cart: (userId: string) => `${backendUrl}/api/cart/clearCart/${userId}`,
  submit_order: (userId: string) =>
    `${backendUrl}/api/orders/submitOrder/${userId}`,
  get_orders: `${backendUrl}/api/orders`,
  delete_order: (id: string) => `${backendUrl}/api/orders/delete/${id}`,
  delete_user: (id: string) => `${backendUrl}/api/auth/${id}`,
  get_user_orders: (userId: string) =>
    `${backendUrl}/api/orders/userOrders/${userId}`,
  send_mail: `${backendUrl}/api/contact/contactEmail`,
};

type BEendpointTypes = typeof EPs;

//intercepts file read for EPs variable to perform stipulated operation
export const BEendpoints = new Proxy(EPs, {
  get(target, prop: keyof typeof EPs) {
    const value = target[prop];

    // Handle normal URL strings
    if (typeof value === "string") {
      return encodeURI(`${value}?${params.toString()}`);
    }

    // Handle URL builder functions
    if (typeof value === "function") {
      return (...args: any[]) => {
        const rawUrl = value(...args);
        // Safely check if the URL already has parameters or not
        const separator = rawUrl.includes("?") ? "&" : "?";
        return encodeURI(`${rawUrl}${separator}${params.toString()}`);
      };
    }

    return value;
  },
}) as BEendpointTypes;

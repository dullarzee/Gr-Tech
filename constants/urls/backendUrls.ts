const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const params = new URLSearchParams();
params.append("apikey", api_key as string);
export const backendUrl =
  environment === "dev" ? "http://localhost:8080" : "https://grtech.vercel.app";

const EPs = {
  get_users: `${backendUrl}/api/auth/getAllUsers`,
  register_user: `${backendUrl}/api/auth/register`,
  login_user: `${backendUrl}/api/auth/login`,
  check_user_auth_status: `${backendUrl}/api/auth/checkAuth`,
  logout: `${backendUrl}/api/auth/logout`,
  get_products: (limit?: number) => `${backendUrl}/api/products?limit=${limit}`,
  get_single_product: (id: string) => `${backendUrl}/api/products/${id}`,
};

type BEendpointTypes = typeof EPs;

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

import { MetadataRoute } from "next";
import { BEendpoints } from "@/constants/urls/backendUrls";
import axios from "axios";
import { ProductTypes } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_BASE_URL as string;

  const res = await axios.get(BEendpoints.get_products());
  const products: ProductTypes[] = res.data.data;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
    },

    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}

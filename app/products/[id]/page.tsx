import ProductDetailPage from "@/components/pageViews/productDetailsPage";
import { Metadata } from "next";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { ProductTypes } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const res = await axios.get(BEendpoints.get_single_product(id));
  const product: ProductTypes = res.data.data;

  return {
    title: `${product.name} Details | GR Tech`,
    description: `View complete details and specifications for product ${product.name} with ID of ${id}.`,
  };
}
const ProductDetailsPage = () => {
  return <ProductDetailPage />;
};

export default ProductDetailsPage;

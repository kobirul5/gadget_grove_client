import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProducts, getProductBySlug, getProductSlug } from "@/components/home/data";
import ProductDetailPage from "@/components/products/ProductDetailPage";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: getProductSlug(product) }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | Gadget Grove" };
  }

  return {
    title: `${product.name} | Gadget Grove`,
    description: `${product.name} from our ${product.category} collection at Gadget Grove.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailPage key={slug} product={product} />;
}

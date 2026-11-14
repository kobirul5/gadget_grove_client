import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-background-soft">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm text-text-secondary" role="status">
              Loading product details...
            </p>
          </div>
        </main>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailPage key={slug} product={product} />;
}

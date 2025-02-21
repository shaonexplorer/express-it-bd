import ProductCard from "@/components/ProductCard";

export async function generateMetadata({ searchParams }) {
  const id = (await searchParams).id;
  const response = await fetch(
    "https://glore-bd-backend-node-mongo.vercel.app/api/product"
  );

  const data = await response.json();

  const product = data.data.filter((item) => item._id === id);

  return {
    title: product[0].name,
    description: product[0].description,
  };
}

async function Page({ searchParams }) {
  const { id } = await searchParams;
  const response = await fetch(
    "https://glore-bd-backend-node-mongo.vercel.app/api/product"
  );

  const data = await response.json();

  const products = JSON.parse(JSON.stringify(data));

  const singleProduct = products.data.filter((item) => item._id === id);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <ProductCard product={singleProduct[0]} />
    </div>
  );
}

export default Page;

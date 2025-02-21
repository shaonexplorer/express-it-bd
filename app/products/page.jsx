import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Products",
  description: "Browse our products",
};

export default async function Products() {
  const response = await fetch(
    "https://glore-bd-backend-node-mongo.vercel.app/api/product"
  );

  const data = await response.json();

  const products = JSON.parse(JSON.stringify(data));
  console.log(products.data);
  return (
    <div className="w-screen py-[50px] xl:py-0  min-h-screen flex items-center mx-auto">
      <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[32px]  ">
        {products.data.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

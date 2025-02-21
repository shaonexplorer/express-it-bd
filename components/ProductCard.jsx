"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductCard({ product }) {
  const router = useRouter();
  return (
    <div className="w-[340px] pb-[24px] rounded-[24px] flex flex-col overflow-hidden bg-[#FFFFFF] shadow-sm shadow-stone-300">
      <Image
        src={product.images[0].secure_url}
        alt="image"
        width={340}
        height={450}
        loading="lazy"
        className="w-full h-[450px] object-center  "
      ></Image>
      <div className="w-full flex flex-col gap-[12px] px-[20px] pt-[24px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-bold text-[20px] text-[#363636]">
            {product.name}
          </h1>
          <p className="text-[#828282] text-[16px]">{product.description}</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#363636] font-bold text-[16px]">
            BDT {product.price}
          </p>
          <span className="w-full h-[1px] bg-[#CCCCCC]"></span>
          <div className="flex items-center gap-[8px] text-[12px] text-[#9C9C9C] ">
            <span className="flex items-center gap-[5px]">
              <Image
                src="/assests/shipping.png"
                alt="image"
                width={15}
                height={11}
              />
              <p>Free Shipping</p>
            </span>
            <span className="flex items-center gap-[5px]">
              <Image
                src="/assests/Union.png"
                alt="image"
                width={15}
                height={11}
              />
              <p>Free Gift</p>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(`/product?id=${product._id}`)}
            className="bg-[#18A661] rounded-[38px] px-[24px] py-[10px] text-[16px] text-white font-bold w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

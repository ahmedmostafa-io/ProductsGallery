import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import StarRating from "../Rating/StarRating";
import { MoveLeft } from "lucide-react";
import SkeletonLoader from "./SkeletonLoader";
import { useQuery } from "@tanstack/react-query";
import Error from "../Error/Error";

const fetchProduct = async (id) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data;
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(`product-${id}-rating`);
    setUserRating(stored !== null ? Number(stored) : 0);
  }, [id]);

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (userRating > 0) {
      localStorage.setItem(`product-${id}-rating`, userRating);
    }
  }, [userRating, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading) return <SkeletonLoader />;
  if (isError)
    return (
      <Error
        error={error?.message || "OoPs Something went wrong"}
        className="max-h-[90vh] max-w-screen  "
      />
    );
  if (!product)
    return (
      <Error
        error={error?.message || "could'nt fetch the Products"}
        className="max-h-[90vh] max-w-screen  "
      />
    );

  return (
    <div className="pt-28 pb-8 container mx-auto px-4">
      <button
        className="mb-4 cursor-pointer px-2 py-1.5 rounded-2xl border-gray-300 border-2 text-gray-300 hover:bg-gray-300 hover:text-white transition-colors duration-300"
        onClick={() => navigate(-1)}
      >
        <MoveLeft />
      </button>

      <div className="md:grid md:gap-16 md:grid-cols-12 flex-col space-y-7">
        <div className="md:col-span-4">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="md:col-span-8">
          <h2 className="text-2xl font-medium mb-2">{product.title}</h2>
          <h4 className="text-xl font-semibold text-main mb-4">
            {product.category}
          </h4>
          <p className="text-lg text-main-light mb-4">{product.description}</p>
          <div className="flex justify-between items-center mb-5">
            <h4 className="text-xl font-bold">{product.price} EGP</h4>
            <h4 className="text-xl">⭐ {product?.rating?.rate}</h4>
          </div>

          <div className="flex flex-col justify-center items-center h-24 my-5">
            <div className="bg-gray-300 w-72 h-20 rounded-2xl flex justify-center items-center dark:bg-black dark:text-white transition-colors duration-300">
              {userRating > 0 ? (
                <p className="text-main-light text-xl">
                  You rated this product{" "}
                  <span className="text-black text-xl">⭐ {userRating}</span>
                </p>
              ) : (
                <StarRating
                  maxRating={5}
                  color="#fcc419"
                  size={30}
                  onSetRating={setUserRating}
                  defaultRating={userRating}
                />
              )}
            </div>
            {userRating > 0 && (
              <button
                className="mt-2 cursor-pointer px-2 py-1.5 rounded-2xl border-gray-300 border-2 text-gray-300 hover:bg-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => {
                  setUserRating(0);
                  localStorage.removeItem(`product-${id}-rating`);
                }}
              >
                Change your rate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

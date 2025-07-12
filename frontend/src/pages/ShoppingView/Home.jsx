import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  Footprints,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { FaFemale } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllShopProduct,
  fetchProductDetails,
} from "@/store/Shop/shopSlice";
import ShoppingProductTile from "@/components/ShoppingView/ProductTile";
import { adidas, h_m, levi, nike, puma, zara } from "@/Config";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/Shop/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: FaFemale },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "adidas", label: "Adidas", image: adidas },
  { id: "nike", label: "Nike", image: nike },
  { id: "puma", label: "Puma", image: puma },
  { id: "levi", label: "Levi's", image: levi },
  { id: "zara", label: "Zara", image: zara },
  { id: "h&m", label: "H&M", image: h_m },
];
const ShoppingHome = () => {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  function handleNavigateToListingPage(getCurrentCategoryId, category) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [category]: [getCurrentCategoryId],
    };
    navigate("/shop/list");
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  }
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(currenProductId) {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    dispatch(
      addToCart({ userId: user?.id, productId: currenProductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to cart",
        });
      }
    });
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllShopProduct({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  return (
    <div className="flex  flex-col min-h-screen">
      <div className="relative w-full h-xs-banner h-60 sm:h-80 md:h-[400px] lg:h-[600px] overflow-hidden">
        {slides.map((item, index) => (
          <img
            key={index}
            src={item}
            className={` ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }  absolute top-0  left-0 w-full h-full object-cover transition-opacity duration-500`}
            alt=""
            style={{ objectPosition: "center" }}
          />
        ))}

        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hidden md:flex"
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hidden md:flex"
          variant="outline"
          size="icon"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50 px-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem.id, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="sm:w-12 sm:h-12 mt-5 text-primary" />
                  <span className="font-bold text-[13px] sm:text-sm">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50 px-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() =>
                  handleNavigateToListingPage(brandItem.id, "brand")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.image}
                    className="sm:w-12 sm:h-12 mt-5 text-primary"
                  />
                  <span className="font-bold text-[13px] sm:text-sm">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-full max-w-sm mx-auto">
                  <Skeleton className="w-full h-[300px] rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))
            ) : productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  handleAddToCart={handleAddToCart}
                  product={productItem}
                />
              ))
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;

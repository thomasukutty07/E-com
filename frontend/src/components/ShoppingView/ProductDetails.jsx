import React from "react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const mockReviews = [
  {
    user: "Jane Doe",
    avatar: "JD",
    rating: 5,
    text: "Absolutely love this product! Highly recommend.",
  },
  {
    user: "John Smith",
    avatar: "JS",
    rating: 4,
    text: "Very good quality, but shipping was slow.",
  },
];

const ProductDetails = ({ productDetails, handleAddToCart }) => {
  if (!productDetails) return null;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Use productDetails.image as the only image if no gallery is provided
  const gallery = productDetails.gallery && productDetails.gallery.length > 0
    ? productDetails.gallery
    : [productDetails.image];
  const [selectedImage, setSelectedImage] = React.useState(gallery[0]);

  function handleAddToCartWithAuth() {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    handleAddToCart(productDetails._id);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-0 sm:p-4">
      <div className="w-full bg-white rounded-2xl shadow-lg p-2 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8">
        {/* Left: Gallery */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4" style={{ minHeight: 200 }}>
            <img
              src={selectedImage}
              alt={productDetails?.title}
              className="object-contain w-full max-h-[400px]"
            />
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 mt-2">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  className={`w-16 h-16 rounded border-2 ${selectedImage === img ? "border-primary" : "border-transparent"} overflow-hidden focus:outline-none`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={img} alt="Gallery thumbnail" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-6 justify-between w-full">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">{productDetails?.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              {productDetails?.salePrice && productDetails.salePrice > 0 ? (
                <>
                  <span className="text-2xl font-bold text-muted-foreground line-through">${productDetails?.price}</span>
                  <span className="text-3xl font-bold text-primary">${productDetails?.salePrice}</span>
                  <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">Sale</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">${productDetails?.price}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-primary" />
              ))}
              <span className="ml-2 text-lg text-muted-foreground">(4.5)</span>
            </div>
            <p className="text-base text-muted-foreground mb-4">
              {productDetails?.description}
            </p>
            <Button className="w-full py-6 text-lg font-bold mt-2" onClick={handleAddToCartWithAuth}>
              Add to cart
            </Button>
          </div>
          <Separator className="my-6" />
          {/* Reviews */}
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <div className="flex flex-col gap-4">
              {mockReviews.map((review, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-gray-50 rounded-lg p-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base">{review.user}</h3>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Input type="text" placeholder="Write a review" className="flex-1" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

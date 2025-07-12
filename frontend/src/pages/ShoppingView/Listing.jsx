import ProductFilter from "@/components/ShoppingView/Filter";
import ProductDetailsDialog from "@/components/ShoppingView/ProductDetails";
import ShoppingProductTile from "@/components/ShoppingView/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/Config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/Shop/cartSlice";
import {
  fetchAllShopProduct,
  fetchProductDetails,
} from "@/store/Shop/shopSlice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ShoppingList = () => {
  const { productList, isLoading } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {toast} = useToast()
  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleAddToCart(currenProductId) {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    dispatch(
      addToCart({ userId: user?.id, productId: currenProductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title:"Added to cart"
        })
      }
    });
  }

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(fetchAllShopProduct({ filterParams: filter, sortParams: sort }));
  }, [dispatch, sort, filter]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm ">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length || 0} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 12 }).map((_, index) => (
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
                handleAddToCart={handleAddToCart}
                key={productItem._id}
                product={productItem}
              />
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

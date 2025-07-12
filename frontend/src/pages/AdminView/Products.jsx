import ProductUploadImage from "@/components/AdminView/ImageUpload";
import AdminProductTile from "@/components/AdminView/ProductTile";
import CommonForm from "@/components/Common/Common";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { addProductFormElements } from "@/Config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "@/store/Admin/productSlice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList } = useSelector((state) => state.admin);
  const initialState = {
    image: null,
    title: "",
    category: "",
    description: "",
    price: "",
    salePrice: "",
    brand: "",
    totalStock: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentEditedProduct, setCurrentEditedProduct] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      if (currentEditedProduct !== null) {
        const editResponse = await dispatch(
          updateProduct({
            id: currentEditedProduct,
            formData,
          })
        );
        if (editResponse?.payload?.success) {
          toast({ title: editResponse.payload.message });
          dispatch(fetchAllProducts());
          setOpenCreateProductDialog(false);
          setFormData("");
          return;
        }
      }
      const response = await dispatch(
        addNewProduct({ ...formData, image: uploadedImageUrl })
      ).unwrap();
      toast({ title: response.message });

      if (response.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setFormData(initialState);
        setUploadedImageUrl("");
        setImageFile(null);
      }
    } catch (error) {
      toast({ title: error.message });
    } finally {
      setIsLoading(false);
    }
  }
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  async function handleDeleteProduct(getCurrentProductId) {
    try {
      const response = await dispatch(deleteProduct(getCurrentProductId));
      if (response?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({ title: response?.payload?.message });
      }
    } catch (error) {
      // Error handling
    }
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add Product
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((item) => (
              <AdminProductTile
                setCurrentEditedProduct={setCurrentEditedProduct}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setFormData={setFormData}
                key={item._id}
                product={item}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setFormData(initialState);
          setCurrentEditedProduct(null);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>
              {currentEditedProduct !== null
                ? "Update the product"
                : "Add the product"}
            </SheetTitle>
          </SheetHeader>
          <ProductUploadImage
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setImageFile={setImageFile}
            imageFile={imageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentEditedProduct !== null}
          />
          <div className="py-6">
            <CommonForm
              isBtnDisabled={!isFormValid()}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedProduct !== null ? "Update" : "Add the Product"
              }
              onSubmit={handleSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;

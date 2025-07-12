import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductUploadImage = ({
  uploadedImageUrl,
  setUploadedImageUrl,
  imageFile,
  setImageFile,
  isLoading,
  setIsLoading,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files, "files");

    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleOnDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  function handleFileOnClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  async function uploadImageToCloudinary() {
    setIsLoading(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `/api/admin/products/upload-image`,
      data
    );
    console.log(response, "response");
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.secure_url);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="font-semibold text-lg block mb-2">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        className="border-2 border-dashed rounded-lg p-4 "
      >
        <Input
          onClick={handleFileOnClick}
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32  cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            } `}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload</span>
          </Label>
        ) : isLoading ? (
          <Skeleton className="h-10 bg-slate-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 mr-2 text-primary" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
              className="text-muted-foreground "
            >
              <XIcon />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUploadImage;

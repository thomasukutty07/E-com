import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../Common/Common";
import { addressFormControls } from "@/Config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/Shop/addressSlice";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  phone: "",
  city: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast({ title: "You can only addd 3 address", variant: "destructive" });
      setFormData(initialAddressFormData);
      return;
    }
    if (currentEditedId) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast({ title: "Address Updated" });
        }
      });
    } else {
      dispatch(addNewAddress({ ...formData, userId: user.id })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user.id));
          setFormData(initialAddressFormData);
          toast({ title: "Address Added" });
        }
      });
    }
  }

  function isFormValid() {
    return Object.values(formData).every((value) => value !== "");
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Address Deleted", variant: "destructive" });
        dispatch(fetchAllAddress(user.id));
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      address: getCurrentAddress?.address || "",
      phone: getCurrentAddress?.phone || "",
      notes: getCurrentAddress?.notes || "",
      pincode: getCurrentAddress?.pincode || "",
      city: getCurrentAddress?.city || "",
    });
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressList) => (
              <AddressCard
                key={singleAddressList._id}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                addressInfo={singleAddressList}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;

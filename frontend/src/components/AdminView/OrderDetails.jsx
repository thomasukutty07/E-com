import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../Common/Common";
import { DialogTitle } from "@radix-ui/react-dialog";

const initialFormData = { status: "" };

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdatedStatus(event) {
    event.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>
          <h1 className="text-2xl">Order Details</h1>
        </DialogTitle>
        <Separator />
        <DialogDescription>
          <span className="sr-only">
            This section contains detailed information about the selected order.
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>12455</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>27 Dec 2025</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>Paid</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$6</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product one</span>
                <span>$333</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2"></div>
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>Name</span>
            <span>Address</span>
            <span>City</span>
            <span>Pincode</span>
            <span>Notes</span>
          </div>
        </div>

        <div>
          <CommonForm
            setFormData={setFormData}
            formData={formData}
            buttonText={"Update Status"}
            onSubmit={handleUpdatedStatus}
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inShipping", label: "In Shippping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "deliver", label: "Delivered" },
                ],
              },
            ]}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;

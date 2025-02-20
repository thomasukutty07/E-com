import { MinusIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const UserCartItemsContent = ({cartItem}) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1">
          <Button className='h-8 w-8 rounded-full' variant="outline" size="icon">
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCartItemsContent;

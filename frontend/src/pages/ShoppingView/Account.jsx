import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccImg from "../../assets/account.jpg";
import Orders from "@/components/ShoppingView/Orders";
import Address from "@/components/ShoppingView/Address";

function ShoppingAccount() {
  return (
    <div className="flex flex-col ">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          width={1600}
          height={600}
          className="w-full h-full object-center object-cover"
          src={AccImg}
          alt=""
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;

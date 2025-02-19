import CommonForm from "@/components/Common/Common";
import { LoginFormControls } from "@/Config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/Auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function LoginUser() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  
  const { toast } = useToast();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl text-foreground font-bold tracking-tight">
          Login to you account
        </h1>
        <p className="mt-2">
          Don't have an account{" "}
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to={"/auth/register"}
          >
            Create Account
          </Link>{" "}
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText={"Login"}
      />
    </div>
  );
}

export default LoginUser;

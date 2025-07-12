import CommonForm from "@/components/Common/Common";
import { registerFormControls } from "@/Config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/Auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function RegisterUser() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
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
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account{" "}
          <Link
            to="/auth/login"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Login
          </Link>{" "}
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}

export default RegisterUser;

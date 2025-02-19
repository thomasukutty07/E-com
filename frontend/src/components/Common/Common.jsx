import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectItem } from "../ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  isBtnDisabled,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputsByComponentType(controlItem) {
    let element = null;
    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            id={controlItem.name}
            value={value}
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [controlItem.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            value={value}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            id={controlItem.name}
            value={value} // Added missing value binding
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            <Label className="font-semibold text-sm">{control.label}</Label>
            {renderInputsByComponentType(control)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} className="mt-2 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

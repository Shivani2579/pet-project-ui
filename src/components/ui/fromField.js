import { Field } from "formik";
import { TextField } from "formik-mui";

const FormField = (props) => {
  return (
    <Field margin="normal" component={TextField} {...props}>
      {props.children}
    </Field>
  );
};

export default FormField;

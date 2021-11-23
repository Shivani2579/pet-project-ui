import { Field } from "formik";
import { TextField } from "formik-mui";

const FormField = ({ children, ...rest }) => {
  return (
    <Field margin="normal" component={TextField} {...rest}>
      {children}
    </Field>
  );
};

export default FormField;

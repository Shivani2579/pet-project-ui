import Button from "@mui/material/Button";
import "./button.css";

const BaseButton = ({ children, ...rest }) => {
  return (
    <Button className="base-button" variant="contained" {...rest}>
      {children}
    </Button>
  );
};

export default BaseButton;

import Button from "@mui/material/Button";
import "./button.css";

const BaseButton = (props) => {
  return (
    <Button className="base-button" variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

export default BaseButton;

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { withRouter } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./header.css";

const Header = (props) => {
  let backIcon;
  if (props.location.pathname !== "/") {
    backIcon = (
      <ArrowBackIcon
        className="go-back"
        onClick={() => props.history.goBack()}
      />
    );
  }
  return (
    <AppBar className="app-header">
      <Toolbar>
        {backIcon}
        <Typography>Candidates</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);

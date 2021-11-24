import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { withRouter } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./header.css";

const Header = ({ history, location }) => {
  return (
    <AppBar className="app-header">
      <Toolbar>
        {location.pathname !== "/" ? (
          <ArrowBackIcon className="go-back" onClick={() => history.goBack()} />
        ) : (
          ""
        )}
        <Typography>Candidates</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);

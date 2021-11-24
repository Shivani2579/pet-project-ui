import CircularProgress from "@mui/material/CircularProgress";
import "./loader.css";

const Loader = () => {
  return (
    <div className="test">
      <div className="loader-container">
        <CircularProgress className="loader" />
      </div>
    </div>
  );
};

export default Loader;

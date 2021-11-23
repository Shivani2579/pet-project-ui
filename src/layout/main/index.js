import Header from "layout/header";
import "./main.css";
import { Fragment } from "react";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <div>
        <Header></Header>
      </div>
      <main>{children}</main>
    </Fragment>
  );
};

export default MainLayout;

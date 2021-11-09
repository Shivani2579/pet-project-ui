import Header from "./header";
import { Wrapper } from "./wrapper";
import "./layout.css";

const Layout = (props) => {
  return (
    <Wrapper>
      <div>
        <Header></Header>
      </div>
      <main>{props.children}</main>
    </Wrapper>
  );
};

export default Layout;

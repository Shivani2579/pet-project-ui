import { useContext } from "react";
import { PagedataContext } from "contexts/pagedataContext";
import { MenuItem } from "@mui/material";

//Not in use (In progress)
const RoleDropDownItems = () => {
  const pageData = useContext(PagedataContext);
  return pageData.roles
    ? pageData.roles.map((menu) => {
        return (
          <MenuItem key={menu._id} value={menu._id}>
            {menu.role}
          </MenuItem>
        );
      })
    : "";
};

export default RoleDropDownItems;

import { useContext } from "react";
import TableCell from "@mui/material/TableCell";
import { PagedataContext } from "contexts/pagedataContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { getCandidateDetails } from "services/candidateService";

const CustomTableCell = ({ row, name, mapWith, onChange, updateRows }) => {
  const pageData = useContext(PagedataContext);
  return (
    <TableCell align="left">
      {updateRows[row._id] ? (
        <TextField
          select
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
        >
          {pageData[mapWith]
            ? pageData[mapWith].map((menu) => {
                return (
                  <MenuItem key={menu._id} value={menu._id}>
                    {menu[name]}
                  </MenuItem>
                );
              })
            : ""}
        </TextField>
      ) : (
        getCandidateDetails(pageData[mapWith], name, row[name])
      )}
    </TableCell>
  );
};

export default CustomTableCell;

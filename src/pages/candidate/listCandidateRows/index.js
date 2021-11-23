import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import BaseButton from "components/base/button";
import CustomTableCell from "components/common/customTableCell";
import { getUiDateFormat } from "services/candidateService";
import "./listCandidateRows.css";

const ListCandidateRows = ({
  rows,
  onChange,
  onRevert,
  onToggleEditMode,
  handleDeleteRow,
  updateRows,
}) => {
  return (
    <TableBody>
      {rows
        ? rows.map((row, i) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.surname}</TableCell>
              <CustomTableCell
                {...{
                  row,
                  name: "status",
                  mapWith: "statuses",
                  onChange,
                  updateRows,
                }}
              />
              <CustomTableCell
                {...{
                  row,
                  name: "role",
                  mapWith: "roles",
                  onChange,
                  updateRows,
                }}
              />
              <CustomTableCell
                {...{
                  row,
                  name: "outcome",
                  mapWith: "outcomes",
                  onChange,
                  updateRows,
                }}
              />
              <TableCell>{getUiDateFormat(row.created_at)}</TableCell>
              <TableCell>{getUiDateFormat(row.updated_at)}</TableCell>
              <TableCell>
                {updateRows[row._id] ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row._id, "update")}
                    >
                      <DoneAllIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row._id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row._id, "edit")}
                  >
                    <BaseButton
                      startIcon={
                        <EditIcon aria-label="edit" className="custom-css" />
                      }
                    >
                      Fields
                    </BaseButton>
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                <Link to={`/candidate/${row._id}`}>
                  <EditIcon />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteOutlineIcon onClick={(i) => handleDeleteRow(row._id)} />
              </TableCell>
            </TableRow>
          ))
        : ""}
    </TableBody>
  );
};

export default ListCandidateRows;

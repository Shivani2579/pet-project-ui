import { useContext } from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { PagedataContext } from "../../contexts/pagedataContext";
import { getCandidateDetails } from "../../utilities/candidateUtilities";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { Link } from "react-router-dom";

const ListCandidateRows = (props) => {
  const pagedata = useContext(PagedataContext);
  return (
    <TableBody>
      {props.candidates
        ? props.candidates.map((row, i) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>
                {pagedata.statuses
                  ? getCandidateDetails(pagedata.statuses, "status", row.status)
                  : ""}
              </TableCell>
              <TableCell>
                {pagedata.roles
                  ? getCandidateDetails(pagedata.roles, "role", row.role)
                  : ""}
              </TableCell>
              <TableCell>
                {pagedata.outcomes
                  ? getCandidateDetails(
                      pagedata.outcomes,
                      "outcome",
                      row.outcome
                    )
                  : ""}
              </TableCell>
              <TableCell>
                {moment(row.created_at).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {moment(row.updated_at).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {/* Edit Candidate functionality is in progress */}
                <Link to={`/candidate/edit/${row._id}`}>
                  <EditIcon color="disabled" />
                </Link>
              </TableCell>
              <TableCell>
                <DeleteOutlineIcon
                  onClick={(i) => props.handleDeleteRow(i, row._id)}
                />
              </TableCell>
            </TableRow>
          ))
        : ""}
    </TableBody>
  );
};

export default ListCandidateRows;

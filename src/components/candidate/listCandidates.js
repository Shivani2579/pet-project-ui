import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCandidates, deleteCandidate } from "../../api/candidateApis";
import BaseButton from "../ui/button";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ListCandidateRows from "./listCandidateRows";
import "./listCandidate.css";

const ListCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getCandidateData();
  }, []);

  const getCandidateData = () => {
    getCandidates().then((res) => {
      setCandidates(res.data.candidates);
    });
  };

  const handleDeleteRow = (i, id) => {
    let list = [...candidates];
    list.splice(i, 1);
    setCandidates(list);
    deleteCandidate(id);
  };

  return (
    <Fragment>
      <BaseButton component={Link} to="/newcandidate/add">
        Add Candidate
      </BaseButton>
      <TableContainer
        component={Paper}
        className="list-candidate-table-container"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Posssible Role</TableCell>
              <TableCell>Outcome</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Last Change Date</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <ListCandidateRows
            candidates={candidates}
            handleDeleteRow={handleDeleteRow}
          ></ListCandidateRows>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ListCandidates;

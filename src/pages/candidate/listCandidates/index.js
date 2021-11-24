import { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCandidate, updateSelected } from "api/candidateApis";
import BaseButton from "components/base/button";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ListCandidateRows from "../listCandidateRows";
import "./listCandidates.css";
import { useQueryClient, useMutation } from "react-query";
import { useCandidates } from "hooks/useCandidates";
import Loader from "components/base/loader";
import { LoaderContext } from "contexts";

const ListCandidates = () => {
  const [rows, setRows] = useState();
  const [updateRows, setUpdateRows] = useState({});

  const { data } = useCandidates();
  const queryClient = useQueryClient();

  const { loading, setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setRows(data?.candidates ?? []);
    setUpdateRows({});
  }, [data?.candidates]);

  const onToggleEditMode = (id, action) => {
    if (action === "edit") {
      setUpdateRows({ ...updateRows, [id]: {} });
    } else if (action === "update") {
      updateQuery.mutate({ ...updateRows[id], id });
      onRevert(id);
      setLoading(true);
    }
  };

  const onChange = (e, row) => {
    setUpdateRows((state) => ({
      ...state,
      [row._id]: {
        ...state[row._id],
        [name]: value,
      },
    }));
    const value = e.target.value;
    const name = e.target.name;
    const { _id } = row;
    const newRows = rows.map((row) => {
      if (row._id === _id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id) => {
    const updated = { ...updateRows };
    delete updated[id];
    setUpdateRows(updated);
    setRows(data?.candidates);
  };

  const updateQuery = useMutation(updateSelected, {
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
    },
  });

  const deleteQuery = useMutation(deleteCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
    },
  });

  const handleDeleteRow = (id) => {
    deleteQuery.mutate(id);
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <ListCandidateRows
            rows={rows}
            updateRows={updateRows}
            handleDeleteRow={handleDeleteRow}
            onChange={onChange}
            onRevert={onRevert}
            onToggleEditMode={onToggleEditMode}
            setRows={setRows}
          ></ListCandidateRows>
        </Table>
      </TableContainer>
      {loading ? <Loader /> : ""}
    </Fragment>
  );
};

export default ListCandidates;

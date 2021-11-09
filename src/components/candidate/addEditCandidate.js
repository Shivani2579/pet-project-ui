import React, { useState, useContext, useEffect } from "react";
import { PagedataContext } from "../../contexts/pagedataContext";
import { LinearProgress, MenuItem, Typography, Paper } from "@mui/material";
import { Formik } from "formik";
import { getDefaultCandidateValues } from "../../utilities/candidateUtilities";
import { createCandidate } from "../../api/candidateApis";
import FormField from "../ui/fromField";
import BaseButton from "../ui/button";
import { withRouter } from "react-router";
import "./addEditCandidate.css";

const defaultValues = {
  status: "CV screening",
  outcome: "In progress",
  role: "Not defined",
};

const AddEditCandidate = (props) => {
  const pagedata = useContext(PagedataContext);
  const [action, setAction] = useState("");

  useEffect(() => {
    setAction(props.match.params.action);
  }, [props.match.params]);

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        status: pagedata.statuses
          ? getDefaultCandidateValues(
              pagedata.statuses,
              "status",
              defaultValues.status
            )
          : "",
        outcome: pagedata.outcomes
          ? getDefaultCandidateValues(
              pagedata.outcomes,
              "outcome",
              defaultValues.outcome
            )
          : "",
        role: pagedata.roles
          ? getDefaultCandidateValues(
              pagedata.roles,
              "role",
              defaultValues.role
            )
          : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.surname) {
          errors.surname = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          createCandidate(values);
          props.history.goBack();
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Paper className="add-edit-candidate-form" elevation={3}>
          <Typography variant="h6" className="add-edit-candidate-form-heading">
            {action === "edit" ? "Edit Candidate" : "Add Candidate"}
          </Typography>
          <FormField type="text" name="name" label="Name" />
          <br />
          <FormField type="text" name="surname" label="Surname" />
          <br />
          <FormField name="email" type="email" label="Email" />
          <br />
          <FormField type="text" name="status" label="Select Status" select>
            {pagedata.statuses
              ? pagedata.statuses.map((menu) => {
                  return (
                    <MenuItem key={menu._id} value={menu._id}>
                      {menu.status}
                    </MenuItem>
                  );
                })
              : ""}
          </FormField>
          <br />
          <FormField type="text" name="outcome" label="Select Outcome" select>
            {pagedata.outcomes
              ? pagedata.outcomes.map((menu) => {
                  return (
                    <MenuItem key={menu._id} value={menu._id}>
                      {menu.outcome}
                    </MenuItem>
                  );
                })
              : ""}
          </FormField>
          <br />
          <FormField type="text" name="role" label="Select Role" select>
            {pagedata.roles
              ? pagedata.roles.map((menu) => {
                  return (
                    <MenuItem key={menu._id} value={menu._id}>
                      {menu.role}
                    </MenuItem>
                  );
                })
              : ""}
          </FormField>
          {isSubmitting && <LinearProgress />}
          <br />
          <BaseButton
            onClick={submitForm}
            className="add-edit-candidate-form-submit"
            sx={{ width: "60ch", margin: "15px" }}
          >
            Submit
          </BaseButton>
        </Paper>
      )}
    </Formik>
  );
};

export default withRouter(AddEditCandidate);

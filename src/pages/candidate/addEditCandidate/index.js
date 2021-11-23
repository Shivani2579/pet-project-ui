import { useState, useContext, useEffect } from "react";
import { PagedataContext } from "contexts/pagedataContext";
import { LinearProgress, MenuItem, Typography, Paper } from "@mui/material";
import { Formik } from "formik";
import {
  getDefaultCandidateValues,
  getCandidateById,
} from "services/candidateService";
import { createCandidate, updateCandidate } from "api/candidateApis";
import FormField from "components/base/formField";
import BaseButton from "components/base/button";
import { withRouter } from "react-router";
import "./addEditCandidate.css";
import { useCandidates } from "hooks/useCandidates";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import { LoaderContext } from "contexts";

const defaultValues = {
  status: "CV screening",
  outcome: "In progress",
  role: "Not defined",
};

const AddEditCandidate = ({ history, match }) => {
  const { id } = match.params;
  const isAddMode = !id;

  const [candidate, setCandidate] = useState({
    name: "",
    surname: "",
    email: "",
    status: "",
    role: "",
    outcome: "",
  });

  const pageData = useContext(PagedataContext);
  const { setLoading } = useContext(LoaderContext);

  const { data } = useCandidates();
  const queryClient = useQueryClient();

  const createCandidates = useMutation(createCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
    },
  });

  const updateCandidates = useMutation(updateCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries("candidates");
    },
  });

  useEffect(() => {
    if (!isAddMode && data) {
      const candidate = getCandidateById(data.candidates, id);
      setCandidate(candidate);
    }
  }, [data, id, isAddMode]);

  const { _id, name, surname, email, status, role, outcome } = candidate;

  const initialValues = {
    name: name,
    surname: surname,
    email: email,
    status: isAddMode
      ? getDefaultCandidateValues(
          pageData?.statuses,
          "status",
          defaultValues.status
        )
      : status,
    outcome: isAddMode
      ? getDefaultCandidateValues(
          pageData?.outcomes,
          "outcome",
          defaultValues.outcome
        )
      : outcome,
    role: isAddMode
      ? getDefaultCandidateValues(pageData?.roles, "role", defaultValues.role)
      : role,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    status: Yup.string().required("Status is required"),
    role: Yup.string().required("Role is required"),
    outcome: Yup.string().required("Outcome is required"),
  });

  const handleSubmit = (setSubmitting) => {
    setSubmitting(false);
    setLoading(true);
    history.goBack();
  };

  const onSubmit = (values, { setStatus, setSubmitting }) => {
    setStatus();
    if (isAddMode) {
      createCandidates.mutate(values);
      handleSubmit(setSubmitting);
    } else {
      updateCandidates.mutate({ ...values, _id });
      handleSubmit(setSubmitting);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Paper className="add-edit-candidate-form" elevation={3}>
          <Typography variant="h6" className="add-edit-candidate-form-heading">
            {isAddMode ? "Add Candidate" : "Edit Candidate"}
          </Typography>
          <FormField type="text" name="name" label="Name" />
          <br />
          <FormField type="text" name="surname" label="Surname" />
          <br />
          <FormField name="email" type="email" label="Email" />
          <br />
          <FormField type="text" name="status" label="Select Status" select>
            {pageData.statuses
              ? pageData.statuses.map((menu) => {
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
            {pageData.outcomes
              ? pageData.outcomes.map((menu) => {
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
            {pageData.roles
              ? pageData.roles.map((menu) => {
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

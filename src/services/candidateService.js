export const getDefaultCandidateValues = (data, value, query) => {
  let defaultValue = "";
  data?.map((item) => {
    if (item[value] === query) {
      defaultValue = item._id;
    }
  });
  return defaultValue;
};

import moment from "moment";

export const getCandidateDetails = (data, value, query) => {
  let detail = "";
  data?.map((item) => {
    if (item._id === query) {
      detail = item[value];
    }
  });
  return detail;
};

export const getCandidateById = (candidates, id) => {
  let candidate = "";
  candidates?.map((item) => {
    if (item._id === id) {
      candidate = item;
    }
  });
  return candidate;
};

export const getUiDateFormat = (date) => {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }
};

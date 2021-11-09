export const getDefaultCandidateValues = (data, value, query) => {
  let defaultValue = "";
  data.map((item) => {
    if (item[value] === query) {
      defaultValue = item._id;
    }
  });
  return defaultValue;
};

export const getCandidateDetails = (data, value, query) => {
  let detail = "";
  data.map((item) => {
    if (item._id === query) {
      detail = item[value];
    }
  });
  return detail;
};

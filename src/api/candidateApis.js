import instance from "./baseUrl";

//Error handling is in progress
export const getCandidates = async () => {
  const { data } = await instance.get("/api/candidates");
  return data.data;
};

export const createCandidate = async (postData) => {
  try {
    const result = await instance.post("/api/candidates", {
      name: postData.name,
      surname: postData.surname,
      email: postData.email,
      role: postData.role,
      status: postData.status,
      outcome: postData.outcome,
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

export const deleteCandidate = async (id) => {
  try {
    const result = await instance.delete(`api/candidates/${id}`);
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

export const updateCandidate = async (postData) => {
  const { data } = await instance.patch(`/api/candidates/${postData._id}`, {
    name: postData.name,
    surname: postData.surname,
    email: postData.email,
    role: postData.role,
    status: postData.status,
    outcome: postData.outcome,
  });
  return data.data;
};

export const updateSelected = async (postData) => {
  const { data } = await instance.patch(`/api/candidates/${postData.id}`, {
    role: postData.role,
    status: postData.status,
    outcome: postData.outcome,
  });
  return data.data;
};

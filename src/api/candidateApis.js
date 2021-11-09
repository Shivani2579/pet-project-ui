import axios from "axios";

// Error handling is in progress
export const getCandidates = async () => {
  try {
    const result = await axios.get("/api/candidates");
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

export const createCandidate = async (postData) => {
  try {
    const result = await axios.post("/api/candidates", {
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
    const result = await axios.delete(`api/candidates/${id}`);
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

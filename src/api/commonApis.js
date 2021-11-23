import instance from "./baseUrl";

//Error handling is in progress
export const getPageData = async () => {
  try {
    const res = await instance.get("/api/pageData");
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

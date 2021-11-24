import { useContext } from "react";
import { useQuery } from "react-query";
import { getCandidates } from "api/candidateApis";
import { LoaderContext } from "contexts";

export const useCandidates = () => {
  const { setLoading } = useContext(LoaderContext);
  return useQuery("candidates", getCandidates, {
    onSuccess: () => {
      setLoading(false);
    },
  });
};

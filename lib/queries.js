import axios from "axios";
import { useMutation } from "react-query";

export const useGeneratePDF = (url) =>
  useMutation(
    async (site) => {
      const { data, error } = await axios.post(url, site);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: (data) => data,
      onError: (error) => error,
    }
  );

export const useEditPDF = (url) =>
  useMutation(
    async (site) => {
      const { data, error } = await axios.patch(url, site);
      if (error) throw error;
      return data;
    },
    {
      onSuccess: (data) => data,
      onError: (error) => error,
    }
  );

export function handleSupabaseError({ error, ...rest }) {
  if (error) {
    throw error;
  }
  return rest;
}

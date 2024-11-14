import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

// fetch all elves
export const useElves = () => {
  return useQuery({
    queryKey: ["elves"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/api/elve`);
      return data;
    },
  });
};

// add new elve
export const useAddElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newElve) => axios.post(`${MOCKURL}/api/elve`, newElve),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};

// update elve
export const useUpdateElves = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedElve) =>
      axios.put(`${MOCKURL}/api/elve/${updatedElve.id}`, updatedElve),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elves"] });
    },
  });
};

// logical delete elve
export function useLogicalDeleteElves() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (elveId) => {
      const response = await axios.patch(`${MOCKURL}/api/delete/${elveId}`, { isDeleted: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elves'] });
    },
  });
}

// restore elve
export function useRestoreElves() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (elveId) => {
      const response = await axios.patch(`${MOCKURL}/api/elve/delete/${elveId}`, { isDeleted: false });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elves'] });
    },
  });
}
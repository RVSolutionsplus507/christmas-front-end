import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { promise } from "zod";

// const URL = import.meta.env.VITE_API_URL;
const MOCKURL = import.meta.env.VITE_MOCK_API_URL;

// fetch all reindeers
export const useReindeers = () => {
  return useQuery({
    queryKey: ["reindeers"],
    queryFn: async () => {
      const { data } = await axios.get(`${MOCKURL}/allReindeers`);
      return data;
    },
  });
};

// add new reindeer
export const useAddReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newReindeer) =>
      axios.post(`${MOCKURL}/allReindeers`, newReindeer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// update reindeer
export const useUpdateReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedreindeer) =>
      axios.put(
        `${MOCKURL}/allReindeers/${updatedreindeer.id}`,
        updatedreindeer
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// update  checked reindeers
export const useUpdateCheckedReindeers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedCheckedReindeers) =>
      axios.all(
        updatedCheckedReindeers.map((reindeer) =>
          axios.put(`${MOCKURL}/allReindeers/${reindeer.id}`, reindeer)
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

// delete reindeer
export const useDeleteReindeer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deletedReindeer) =>
      axios.delete(
        `${MOCKURL}/allReindeers/${deletedReindeer.id}`,
        deletedReindeer
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reindeers"] });
    },
  });
};

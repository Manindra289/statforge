import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../actions";
import toast from "react-hot-toast";


function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateData, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast.success("username successfully edited, Kindly Refresh");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateData };
}

export default useUpdateUserData
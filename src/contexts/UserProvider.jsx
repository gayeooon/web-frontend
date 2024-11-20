import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMemberInfo,
  getCategories,
  getPublishers,
  updateMemberInfo,
  updateCategories,
  updatePublishers,
} from "@/lib/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: userProfile = {}, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMemberInfo,
    select: ({ result }) => ({
      name: result?.nickname ?? "",
      email: result?.email ?? "",
      phone: result?.phone ?? "",
      birth: result?.birth?.split("T")[0] ?? "",
      gender: result?.gender ?? "",
    }),
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.result.preferredCategories,
  });

  const { data: publishers = [], isLoading: isLoadingPublishers } = useQuery({
    queryKey: ["publishers"],
    queryFn: getPublishers,
    select: (data) => data.result.preferredPress,
  });

  const updateUserProfile = useMutation({
    mutationFn: updateMemberInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  const updateUserCategories = useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateUserPublishers = useMutation({
    mutationFn: updatePublishers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
  });

  if (isLoadingProfile || isLoadingCategories || isLoadingPublishers) {
    return (
      <>
        <div>Loading...</div>
        {/* <div>{children}</div> */}
      </>
    );
  }

  return (
    <UserContext.Provider
      value={{
        userProfile,
        categories,
        publishers,
        updateUserProfile,
        updateUserCategories,
        updateUserPublishers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMemberInfo,
  getCategories,
  getPublishers,
  updateMemberInfo,
  updatePublishers,
  updateCategories,
} from "@/lib/api";

const AuthContext = createContext({
  userProfile: {
    name: "",
    email: "",
    phone: "",
    birth: "",
    gender: "",
  },
  categories: [],
  publishers: [],
  login: () => {},
  logout: () => {},
  updateUserProfile: () => {},
  updateUserCategories: () => {},
  updateUserPublishers: () => {},
});

export function AuthProvider({ children }) {
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
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const updateUserCategories = useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const updateUserPublishers = useMutation({
    mutationFn: updatePublishers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  /**
   * @TODO 로딩 컴포넌트 구현
   */
  if (isLoadingProfile || isLoadingCategories || isLoadingPublishers) {
    return (
      <>
        <div>Loading...</div>
        <div>{children}</div>
      </>
    );
  }

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthPrvider 안에서 사용해야 합니다.");
  }

  return context;
}

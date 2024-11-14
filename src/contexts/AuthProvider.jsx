import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMemberInfo, getCategories, getPublishers } from "@/lib/api";

const AuthContext = createContext({
  userProfile: null,
  categories: null,
  publishers: null,
  login: () => {},
  logout: () => {},
  updateUserProfile: () => {},
  updateUserCategories: () => {},
  updateUserPublishers: () => {},
});

export function AuthProvider({ children }) {
  const { data: userProfile = {}, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getMemberInfo,
    select: ({ result }) => ({
      name: result?.nickname ?? "",
      email: result?.email ?? "",
      phone: result?.phone ?? "",
      birth: result?.birth.split("T")[0] ?? "",
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

  if (isLoadingProfile || isLoadingCategories || isLoadingPublishers) {
    /**
     * @TODO 로딩 컴포넌트 구현
     */
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ userProfile, categories, publishers }}>
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

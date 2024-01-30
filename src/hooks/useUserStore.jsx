import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set(() => ({ user })),
        setIsAuthenticated: (isAuthenticated) =>
          set(() => ({ isAuthenticated })),
        logout: () => {
          set(() => ({ user: null, isAuthenticated: false }));
          localStorage.removeItem("userData");
        },
      }),
      { name: "userData" }
    )
  )
);

export default useUserStore;

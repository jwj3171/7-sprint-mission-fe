"use client";
//components/Contexts/UserContext.js
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchCurrentUser } from "@/utils/apiRequest";
import {
  User,
  CurrentUserResponse,
  CurrentUserResponseSchema,
} from "@/types/user";

type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isFetchUserLoading: boolean;
  fetchUser: () => Promise<void>;
  isLoggedIn: boolean;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetchUserLoading, setIsFetchUserLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsFetchUserLoading(true);
      const data = await fetchCurrentUser();
      // const data = (await fetchCurrentUser()) as unknown;
      setUser(data.user);
    } catch (err) {
      console.error("사용자 정보 로딩 실패:", err);
    } finally {
      setIsFetchUserLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
    // fetchUser는 promise<void> 를 반환 Promise 결과를 쓰지말고 그냥 실행만 해라
  }, []);
  const isLoggedIn = useMemo(() => !!user, [user]);

  const value : UserContextValue={user,setUser,isFetchUserLoading,fetchUser,isLoggedIn}

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser 은 UserProvider 내부에서 사용돼야합니다");
  return ctx;
}
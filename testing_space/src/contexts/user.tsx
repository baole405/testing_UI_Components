// import { ID, type Models } from "appwrite";
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import { account } from "../lib/appwrite";

// export interface UserContextType {
//   current: Models.User<Models.Preferences> | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export function useUser() {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// export function UserProvider({ children }: UserProviderProps) {
//   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

//   async function login(email: string, password: string) {
//     const loggedIn = await account.createEmailPasswordSession(email, password);
//     console.log(loggedIn);
//     window.location.replace("/");
//   }

//   async function logout() {
//     await account.deleteSession("current");
//     setUser(null);
//   }

//   async function register(email: string, password: string) {
//     await account.create(ID.unique(), email, password);
//     await login(email, password);
//   }

//   async function init() {
//     try {
//       const loggedIn = await account.get();
//       setUser(loggedIn);
//     } catch (err) {
//       setUser(null);
//     }
//   }

//   useEffect(() => {
//     init();
//   }, []);

//   return (
//     <UserContext.Provider value={{ current: user, login, logout, register }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

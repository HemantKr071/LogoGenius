import { createContext } from "react";

export interface UserDetailContextType {
    userDetail: any;
    setUserDetail: React.Dispatch<React.SetStateAction<any>>;
}
export const UserDetailContext = createContext<UserDetailContextType>({
    userDetail: null,
    setUserDetail: () => {}
});
import {createContext, useContext, ReactNode, useState, Dispatch, SetStateAction} from "react";
import { IAccount } from "./util";


type ChildrenProp = {
    children: ReactNode;
};

type AccountContextType = {
    addAccounts: Dispatch<SetStateAction<IAccount[]>>;
    accounts: IAccount[]
};
  
const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({children}: ChildrenProp) => {
    const [accounts, addAccounts] = useState<IAccount[]>([])

    return (
        <AccountContext.Provider value={{
            accounts,
            addAccounts
        }}>
            {children}
        </AccountContext.Provider>
    )

}

export const useAccountContext = () => {
    const context = useContext(AccountContext)
    if (context === undefined) {
        throw new Error(
          `useAccountContext must be used within SearchContext Provider`
        );
      }
      return context;
}

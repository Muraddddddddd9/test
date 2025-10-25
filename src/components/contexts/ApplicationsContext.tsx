import { createContext, useContext } from "react";

interface ApplicationsContextProps {
    searchInput: string;
    setSearchInput: (value: string) => void;
    selectFilter: string;
    setSelectFilter: (value: string) => void;
}

export const ApplicationsContext = createContext<ApplicationsContextProps | null>(null);

export const useApplicationsContext = () => {
    const ctx = useContext(ApplicationsContext);
    if (!ctx) throw new Error("useApplicationsContext должен использоваться внутри ApplicationsContext.Provider");
    return ctx;
};

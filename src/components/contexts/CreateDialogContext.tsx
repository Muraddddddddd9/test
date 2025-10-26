import { createContext, useContext } from "react";

interface CreateDialogContextProps {
    pharmacyData: { pharmacy_number: number; pharmacy_city: string; pharmacy_address: string } | null;
    setPharmacyData: (value: { pharmacy_number: number; pharmacy_city: string; pharmacy_address: string } | null) => void;
    categortData: string;
    setCategortData: (value: string) => void;
    priorityData: "high" | "medium" | "low" | "critical" | null;
    setPriorityData: (value: "high" | "medium" | "low" | "critical" | null) => void;
    fileData: File[] | null;
    setFileData: (value: File[] | null) => void;
    inputRef: React.RefObject<HTMLInputElement | null>
    uploadKey: number
    setUploadKey: React.Dispatch<React.SetStateAction<number>>
}

export const CreateDialogContext = createContext<CreateDialogContextProps | null>(null);

export const useCreateDialogContext = () => {
    const ctx = useContext(CreateDialogContext);
    if (!ctx) throw new Error("useCreateDialogContext должен использоваться внутри CreateDialogContext.Provider");
    return ctx;
};

import { UserData } from "@/mock"

export interface ISendProps {
    pharmacy_number: number
    pharmacy_city: string
    pharmacy_address: string
    priority: "high" | "medium" | "low" | "critical"
    topic: string
    category: string
    description: string
    warranty: boolean
    file: File[] | null
}

export interface ISendRequest extends ISendProps {
    created: number
    id_creator: number | null
}

export const useSendRequest = () => {
    const SendRequest = ({ new_req }: { new_req: ISendProps }) => {
        const data: ISendRequest = {
            pharmacy_number: new_req.pharmacy_number,
            pharmacy_city: new_req.pharmacy_city,
            pharmacy_address: new_req.pharmacy_address,
            created: Date.now(),
            priority: new_req.priority,
            topic: new_req.topic,
            category: new_req.category,
            description: new_req.description,
            id_creator: UserData.id,
            warranty: new_req.warranty,
            file: new_req.file
        }

        console.log(data)
    }

    return { SendRequest }
} 
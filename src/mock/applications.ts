export interface IApplications {
    id: string
    pharmacy_number: number
    pharmacy_city: string
    pharmacy_address: string
    created: number
    priority: "high" | "medium" | "low" | "critical"
    topic: string
    category: string
    id_creator: number | null
    id_technician: number | null
    technician: string | null
    reaction: number
    decision: number | null
    status: "new" | "rejected" | "pending" | "in_progress" | "waiting_parts" | "ready" | "closed" | "all"
}

export const ApplicationsData: IApplications[] = [
    {
        id: "КС-0002",
        pharmacy_number: 65,
        pharmacy_city: "Геленджик",
        pharmacy_address: "Островского 7",
        created: Date.now() - 1000 * 60 * 5,
        priority: "high",
        topic: "Поломка кассы",
        category: "Кассы",
        id_technician: null,
        id_creator: 2,
        technician: null,
        reaction: Date.now(),
        decision: null,
        status: "new",
    },
    {
        id: "ХЛ-0002",
        pharmacy_number: 150,
        pharmacy_city: "Кореновск",
        pharmacy_address: "Красная 108",
        created: 1761368869000,
        priority: "medium",
        topic: "Холодильник сильно гудит",
        category: "Холодильники",
        id_creator: 1,
        id_technician: 1,
        technician: "Федоровский Н.",
        reaction: 1761368969000,
        decision: null,
        status: "in_progress",
    },
    {
        id: "КН-0002",
        pharmacy_number: 45,
        pharmacy_city: "Тимашевск",
        pharmacy_address: "Интернац 3Б",
        created: 1761368869000,
        priority: "low",
        topic: "Конденсат на внутреннем блоке",
        category: "Холодильники",
        id_creator: 2,
        id_technician: 2,
        technician: "Максимов П.",
        reaction: 1761368980000,
        decision: 1761369969000,
        status: "ready",
    },
    {
        id: "ИЗ-0002",
        pharmacy_number: 164,
        pharmacy_city: "РнД",
        pharmacy_address: "Сельмаш 92",
        created: 1761209969000,
        priority: "critical",
        topic: "Нужно поверить гигрометр",
        category: "Изм. оборуд.",
        id_creator: 1,
        id_technician: 1,
        technician: "Алексеев М.",
        reaction: 1761210069000,
        decision: 1761215069000,
        status: "ready",
    },
    {
        id: "ПО-0002",
        pharmacy_number: 190,
        pharmacy_city: "Геленджик",
        pharmacy_address: "Душистая 24",
        created: 1761369969000,
        priority: "high",
        topic: "Заметили крыс у входа",
        category: "Помещения",
        id_creator: 1,
        id_technician: 3,
        technician: "Сидоров Е.",
        reaction: 1761370469000,
        decision: 1761375969000,
        status: "closed",
    },
    {
        id: "ИТ-0002",
        pharmacy_number: 267,
        pharmacy_city: "Анапа",
        pharmacy_address: "Парковая 67к2",
        created: 1761369969000,
        priority: "high",
        topic: "Нужен новый компьютер",
        category: "ИТ",
        id_creator: 4,
        id_technician: 4,
        technician: "Китов Я.",
        reaction: 1761370369000,
        decision: 1761370969000,
        status: "closed",
    },
    {
        id: "СА-0002",
        pharmacy_number: 150,
        pharmacy_city: "Кореновск",
        pharmacy_address: "Красная 108",
        created: 1761369969000,
        priority: "medium",
        topic: "Унитаз перестал смывать",
        category: "Сантехника",
        id_creator: 5,
        id_technician: 5,
        technician: "Малахов Н.",
        reaction: 1761370969000,
        decision: 1761390969000,
        status: "ready",
    },
]
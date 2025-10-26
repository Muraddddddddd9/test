import { createListCollection } from "@chakra-ui/react"
import { CriticalPrioritySVG, HighPrioritySVG, LowPrioritySVG, MediumPrioritySVG } from "@/svg";
import type { JSX } from "react";

export interface IPharmacy {
    number: number
    city: string
    address: string
}

export const PharmacyData: IPharmacy[] = [
    {
        number: 65,
        city: "Геленджик",
        address: "Островского 7",
    },
    {
        number: 150,
        city: "Кореновск",
        address: "Красная 108",
    },
    {
        number: 45,
        city: "Тимашевск",
        address: "Интернац 3Б",
    },
    {
        number: 164,
        city: "РнД",
        address: "Сельмаш 92",
    },
    {
        number: 190,
        city: "Геленджик",
        address: "Душистая 24",
    },
    {
        number: 267,
        city: "Анапа",
        address: "Парковая 67к2",
    },
]

export const CategoryData: string[] = [
    "Кассы",
    "Холодильники",
    "Изм. оборуд.",
    "Помещения",
    "ИТ",
    "Сантехника",
]

export interface IPriority {
    title: string
    description: string
    value: "high" | "medium" | "low" | "critical"
    svg: () => JSX.Element
}

export const PriorityData: IPriority[] = [
    {
        title: "Низкий",
        description: "минимальное влияние на работу, не требует немедленного вмешательства",
        value: "low",
        svg: LowPrioritySVG
    },
    {
        title: "Средний",
        description: "влияет на эффективность, но не стопорит",
        value: "medium",
        svg: MediumPrioritySVG
    },
    {
        title: "Высокий",
        description: "существенно влияет на работу, требует немедленного внимания",
        value: "high",
        svg: HighPrioritySVG
    },
    {
        title: "Критический",
        description: "простой в работе, риск потери товара",
        value: "critical",
        svg: CriticalPrioritySVG
    },
]

export const PriorityList = createListCollection({
    items: PriorityData,
})

export const CategoryList = createListCollection({
    items: CategoryData,
})

export const PharmacyList = createListCollection({
    items: PharmacyData,
    itemToValue: (item) => item.number.toString(),
})
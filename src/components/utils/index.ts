import type { IApplications } from "@/mock";
import { CriticalPrioritySVG, HighPrioritySVG, LowPrioritySVG, MediumPrioritySVG, SuccTimeSVG, WaitTimeSVG, WarTimeSVG } from "@/svg";
import type { JSX } from "react";

export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return {
        date: `${day}.${month}.${year}`,
        time: `${hours}:${minutes}:${seconds}`,
    };
}

export function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

export function getPriority(priority: "high" | "medium" | "low" | "critical") {
    var label: string = ""
    var svg: () => JSX.Element

    switch (priority) {
        case "high": label = "Высокий"; svg = HighPrioritySVG; break;
        case "medium": label = "Средний"; svg = MediumPrioritySVG; break;
        case "low": label = "Низкий"; svg = LowPrioritySVG; break;
        case "critical": label = "Критич."; svg = CriticalPrioritySVG; break;
    }

    return {
        label: label,
        svg: svg
    }
}

export function getStatus(status: "new" | "rejected" | "pending" | "in_progress" | "waiting_parts" | "ready" | "closed" | "all") {
    var label: string = ""
    var color: string = ""

    switch (status) {
        case "new":
            label = "Новая";
            color = "rgba(240, 205, 250, 1)";
            break;
        case "rejected":
            label = "Отклонена";
            color = "rgba(255, 204, 204, 1)";
            break;
        case "pending":
            label = "На рассмотрении";
            color = "rgba(204, 224, 255, 1)";
            break;
        case "in_progress":
            label = "В работе";
            color = "rgba(255, 235, 179, 1)";
            break;
        case "waiting_parts":
            label = "Ожидает запчасти";
            color = "rgba(255, 220, 180, 1)";
            break;
        case "ready":
            label = "Готово";
            color = "rgba(162, 227, 164, 1)";
            break;
        case "closed":
            label = "Закрыто";
            color = "rgba(241, 241, 241, 1)";
            break;
    }


    return {
        label: label,
        color: color
    }
}

export function getDecision(decision: number | null, reaction: number) {
    if (!decision) {
        return {
            time: formatDuration(Date.now() - reaction),
            svg: WaitTimeSVG,
            color: "rgba(28, 28, 28, 1)"
        }
    }

    return {
        time: formatDuration(decision - reaction),
        svg: decision - reaction >= 10800000 ? WarTimeSVG : SuccTimeSVG,
        color: decision - reaction >= 10800000 ? "rgba(185, 60, 60, 1)" : "rgba(14, 116, 17, 1)"
    }
}

export const RU_MONTHS_PREP: Record<number, string> = {
    0: "январе",
    1: "феврале",
    2: "марте",
    3: "апреле",
    4: "мае",
    5: "июне",
    6: "июле",
    7: "августе",
    8: "сентябре",
    9: "октябре",
    10: "ноябре",
    11: "декабре",
};

export function sectionTitleForDate(d: Date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const compare = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    if (compare(d, today)) return "СЕГОДНЯ";
    if (compare(d, yesterday)) return "ВЧЕРА";

    const monthPrep = RU_MONTHS_PREP[d.getMonth()];
    const year = d.getFullYear();
    return `В ${monthPrep.toUpperCase()} ${year}`;
}

export function groupByDate(items: IApplications[]) {
    const groups: Record<string, IApplications[]> = {};
    const order: string[] = [];

    const sorted = [...items].sort((a, b) => b.created - a.created);

    for (const it of sorted) {
        const date = new Date(it.created);
        const title = sectionTitleForDate(date);

        if (!groups[title]) {
            groups[title] = [];
            order.push(title);
        }
        groups[title].push(it);
    }

    return { groups, order };
}
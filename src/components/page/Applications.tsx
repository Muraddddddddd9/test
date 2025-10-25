import { ActionBar } from "@/components/common"
import { useEffect, useMemo, useState } from "react"
import { ApplicationsContext } from "@/components/contexts"
import { Box, For, SkeletonText, Span, Table } from "@chakra-ui/react"
import { MdOutlineFilterAlt } from "react-icons/md"
import { ApplicationsData, UserData, type IApplications } from "@/mock"
import { CriticalPrioritySVG, HighPrioritySVG, LowPrioritySVG, MediumPrioritySVG, WaitTimeSVG, SuccTimeSVG, WarTimeSVG } from "@/svg"
import type { JSX } from "@emotion/react/jsx-runtime"

export const Applications = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const [selectFilter, setSelectFilter] = useState<string>("all")
    const [appFilterData, setAppFilterData] = useState<IApplications[] | null>(null)

    const value = useMemo(() => ({
        searchInput,
        setSearchInput,
        selectFilter,
        setSelectFilter,
    }), [searchInput, selectFilter])

    useEffect(() => {
        var appStatusFilter = ApplicationsData

        switch (selectFilter) {
            case "all": break;
            case "my": appStatusFilter = ApplicationsData.filter(data => data.id_creator === UserData.id); break;
            default: appStatusFilter = ApplicationsData.filter(data => data.status === selectFilter);
        }

        var appSearchFilter = appStatusFilter.filter(data => data.id.toLowerCase().includes(searchInput.toLowerCase()) || data.topic.toLowerCase().includes(searchInput.toLowerCase()))

        setAppFilterData(appSearchFilter)
    }, [selectFilter, searchInput])

    function formatTimestamp(timestamp: number) {
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

    function formatDuration(ms: number) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");

        if (hours > 0) {
            return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function getPriority(priority: "high" | "medium" | "low" | "critical") {
        var label: string = ""
        var svg: JSX.Element | null = null

        switch (priority) {
            case "high": label = "Высокий"; svg = <HighPrioritySVG />; break;
            case "medium": label = "Средний"; svg = <MediumPrioritySVG />; break;
            case "low": label = "Низкий"; svg = <LowPrioritySVG />; break;
            case "critical": label = "Критич."; svg = <CriticalPrioritySVG />; break;
        }

        return {
            label: label,
            svg: svg
        }
    }

    function getStatus(status: "new" | "rejected" | "pending" | "in_progress" | "waiting_parts" | "ready" | "closed" | "all") {
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

    function getDecision(decision: number | null, reaction: number) {
        if (!decision) {
            return {
                time: formatDuration(Date.now() - reaction),
                svg: <WaitTimeSVG />,
                color: "rgba(28, 28, 28, 1)"
            }
        }

        return {
            time: formatDuration(decision - reaction),
            svg: decision - reaction >= 10800000 ? <WarTimeSVG /> : <SuccTimeSVG />,
            color: decision - reaction >= 10800000 ? "rgba(185, 60, 60, 1)" : "rgba(14, 116, 17, 1)"
        }
    }

    return (
        <>
            <ApplicationsContext.Provider value={value}>
                <ActionBar />
            </ApplicationsContext.Provider>
            <Box margin={"20px 20px 0px 20px"}>
                {appFilterData ?
                    <Table.Root size="sm" variant="outline" w={"100%"} css={{
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "none",
                    }}>
                        <Table.ColumnGroup>
                            <For each={["90px", "260px", "160px", "120px", "300px", "200px", "180px", "120px", "120px", "290px"]}>
                                {(items, index) =>
                                    <Table.Column key={index} htmlWidth={items} />
                                }
                            </For>
                        </Table.ColumnGroup>
                        <Table.Header fontSize={"14px"} fontWeight={400} >
                            <Table.Row >
                                <For each={["№", "Аптека", "Создана", "Приоритет", "Тема", "Категория", "Техник", "Реакция", "Решение", "Статус"]}>
                                    {(items, index) =>
                                        <Table.ColumnHeader key={index}
                                            borderBottom={"1px solid rgba(217, 225, 236, 1)"}
                                        >
                                            <Box display={'flex'} alignItems={'center'} justifyContent={"space-between"}>
                                                {items} <MdOutlineFilterAlt color={"rgba(28, 28, 28, 0.4)"} cursor={"pointer"} />
                                            </Box>
                                        </Table.ColumnHeader>
                                    }
                                </For>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {appFilterData.map((item) => {
                                var createFormat = formatTimestamp(item.created)
                                let reactionFormat: string | null = null;
                                if (item.reaction) {
                                    const diff = item.reaction - item.created;
                                    reactionFormat = formatDuration(diff);
                                }
                                var statusData = getStatus(item.status)
                                var priorityData = getPriority(item.priority)
                                var decisionData = getDecision(item.decision, item.reaction)

                                return (
                                    <Table.Row key={item.id} fontSize={"14px"}
                                        borderBottom={"1px solid rgba(217, 225, 236, 1)"}
                                    >
                                        <Table.Cell>{item.id}</Table.Cell>
                                        <Table.Cell display={"flex"} alignItems={"center"} gap={"5px"}>
                                            <Span
                                                display={'flex'}
                                                bg={"rgba(241, 241, 241, 1)"} padding={"0px 3px"}
                                                fontWeight={"bold"} letterSpacing={"8%"} fontSize={"12px"}
                                                alignItems={'center'} borderRadius={"4px"} h={"20px"}
                                            >
                                                {String(item.pharmacy_number).padStart(3, '0')}
                                            </Span>
                                            {item.pharmacy_city} {item.pharmacy_address}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Span display={'flex'} gap={"5px"}>
                                                {createFormat.date}
                                                <Span color={"rgba(28, 28, 28, 0.4)"}>{createFormat.time}</Span>
                                            </Span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Span display={'flex'} alignItems={"center"} gap={"10px"}>
                                                {priorityData.svg}
                                                <Span
                                                    color={"rgba(28, 28, 28, 0.4)"}
                                                    fontWeight={500}
                                                >{priorityData.label}</Span>
                                            </Span>
                                        </Table.Cell>
                                        <Table.Cell>{item.topic}</Table.Cell>
                                        <Table.Cell>{item.category}</Table.Cell>
                                        <Table.Cell>{item.technician ? item.technician : <Span color={"rgba(28, 28, 28, 0.4)"}>—</Span>}</Table.Cell>
                                        <Table.Cell>{!item.technician ?
                                            <Span
                                                display={"flex"} alignItems={"center"}
                                                gap={"5px"}
                                            ><WaitTimeSVG />{reactionFormat}</Span>
                                            :
                                            <Span
                                                display={"flex"} alignItems={"center"}
                                                gap={"5px"} color={"rgba(14, 116, 17, 1)"}
                                            ><SuccTimeSVG />{reactionFormat}</Span>
                                        }</Table.Cell>
                                        <Table.Cell>{
                                            item.technician ?
                                                <Span display={"flex"} alignItems={"center"}
                                                    gap={"5px"} color={decisionData.color}
                                                >{decisionData.svg} {decisionData.time}</Span>
                                                :
                                                <Span color={"rgba(28, 28, 28, 0.4)"}>—</Span>
                                        }
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Span
                                                bg={statusData.color} padding={"2px 6px"} borderRadius={"4px"}
                                                fontWeight={"400"}
                                            >
                                                {statusData.label}
                                            </Span>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table.Root>
                    :
                    <SkeletonText noOfLines={3} gap="4" />
                }
            </Box >
        </>
    )
} 
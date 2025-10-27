import { Box, For, SkeletonText, Span, Table } from "@chakra-ui/react"
import { MdOutlineFilterAlt } from "react-icons/md"
import { WaitTimeSVG, SuccTimeSVG } from "@/svg"
import type { IApplications } from "@/mock"
import { formatTimestamp, formatDuration, getPriority, getStatus, getDecision } from "@/components/utils"

const COLUMNS_CONFIG = [
    { title: "№", group: "90px", hideOnXl: false },
    { title: "Аптека", group: "260px", hideOnXl: false },
    { title: "Создана", group: "160px", hideOnXl: false },
    { title: "Приоритет", group: "120px", hideOnXl: false },
    { title: "Тема", group: "300px", hideOnXl: false },
    { title: "Категория", group: "200px", hideOnXl: true },
    { title: "Техник", group: "180px", hideOnXl: false },
    { title: "Реакция", group: "120px", hideOnXl: true },
    { title: "Решение", group: "120px", hideOnXl: false },
    { title: "Статус", group: "290px", hideOnXl: false }
];

export const TableApp: React.FC<{ appFilterData: IApplications[] | null }> = ({ appFilterData }) => {
    return (
        <Box margin={"20px 40px 0px 40px"}>
            {appFilterData ?
                <Table.Root size="sm" variant="outline" w={"100%"} css={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "none",
                }}>
                    <Table.ColumnGroup>
                        <For each={COLUMNS_CONFIG}>
                            {(items, index) =>
                                <Table.Column key={index} display={items.hideOnXl ? { base: "none", lg: "table-cell" } : "table-cell"} htmlWidth={items.group} />
                            }
                        </For>
                    </Table.ColumnGroup>
                    <Table.Header fontSize={"14px"} fontWeight={400} maxHeight={"40px"} >
                        <Table.Row>
                            <For each={COLUMNS_CONFIG}>
                                {(items, index) =>
                                    <Table.ColumnHeader key={index}
                                        borderBottom={"1px solid rgba(217, 225, 236, 1)"} padding={"7.25px"}
                                        display={items.hideOnXl ? { base: "none", lg: "table-cell" } : "table-cell"}
                                    >
                                        <Box display={'flex'} alignItems={'center'} justifyContent={"space-between"}>
                                            {items.title} <MdOutlineFilterAlt color={"rgba(28, 28, 28, 0.4)"} cursor={"pointer"} />
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
                                    padding={"0px"} maxH={"40px"}
                                >
                                    <Table.Cell padding={"0px 10px"} h={"40px"}>{item.id}</Table.Cell>
                                    <Table.Cell padding={"0px 10px"} h={"40px"} display={"flex"} alignItems={"center"} gap={"5px"}>
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
                                    <Table.Cell padding={"0px 10px"} h={"40px"}>
                                        <Span display={'flex'} gap={"5px"}>
                                            {createFormat.date}
                                            <Span color={"rgba(28, 28, 28, 0.4)"}>{createFormat.time}</Span>
                                        </Span>
                                    </Table.Cell>
                                    <Table.Cell padding={"0px 10px"} h={"40px"}>
                                        <Span display={'flex'} alignItems={"center"} gap={"10px"}>
                                            <priorityData.svg />
                                            <Span
                                                color={"rgba(28, 28, 28, 0.4)"}
                                                fontWeight={500}
                                            >{priorityData.label}</Span>
                                        </Span>
                                    </Table.Cell>
                                    <Table.Cell padding={"0px 10px"} h={"40px"}>{item.topic}</Table.Cell>
                                    <Table.Cell padding={"0px 10px"}
                                        display={{ base: "none", lg: "block" }}
                                    >{item.category}</Table.Cell>
                                    <Table.Cell padding={"0px 10px"}>{item.technician ? item.technician : <Span color={"rgba(28, 28, 28, 0.4)"}>—</Span>}</Table.Cell>
                                    <Table.Cell padding={"0px 10px"} display={{ base: "none", lg: "block" }}>{!item.technician ?
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
                                    <Table.Cell padding={"0px 10px"}>
                                        {
                                            item.technician ?
                                                <Span display={"flex"} alignItems={"center"}
                                                    gap={"5px"} color={decisionData.color}
                                                ><decisionData.svg /> {decisionData.time}</Span>
                                                :
                                                <Span color={"rgba(28, 28, 28, 0.4)"}>—</Span>
                                        }
                                    </Table.Cell>
                                    <Table.Cell padding={"0px 10px"}>
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
    )
}
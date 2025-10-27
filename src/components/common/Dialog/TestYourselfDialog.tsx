import { TestYourselfSVG } from "@/svg"
import { Box, Dialog, Flex, List, Portal, Span } from "@chakra-ui/react"
import { LuArrowLeft } from "react-icons/lu";
import { IoMdWarning } from "react-icons/io";

export const TestYourselData = () => {
    return (
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }} gap={"12px"} justifyContent={"center"}>
            <Box bg={"rgba(255, 250, 212, 1)"} padding={"10px"} borderRadius={"10px"} height={"fit-content"}>
                <Span fontSize={{ base: "14px", md: "10px" }}
                    display={"flex"} alignItems={"center"} gap={"3px"}
                >
                    <IoMdWarning /> Заявка нужна, если:
                </Span>
                <List.Root marginTop={"5px"} marginLeft={"20px"} fontSize={{ base: "13px", md: "10px" }} lineHeight={{ base: "20px", md: "15px" }} css={{
                    '& li::marker': {
                        color: 'black'
                    }
                }}>
                    <List.Item>
                        температура в камере выше допустимой нормы (+2…+8 °C) и не восстанавливается
                    </List.Item>
                    <List.Item>
                        оборудование издаёт необычные шумы (гул, стук, вибрация)
                    </List.Item>
                    <List.Item>
                        есть ошибка на дисплее или аварийный сигнал
                    </List.Item>
                    <List.Item>
                        дверь не закрывается/сломаны уплотнители
                    </List.Item>
                    <List.Item>
                        холодильник не включается или выключается самопроизвольно
                    </List.Item>
                </List.Root>
            </Box>
            <Box bg={"rgba(255, 234, 234, 1)"} padding={"10px"} borderRadius={"10px"} height={"fit-content"}>
                <Span fontSize={{ base: "14px", md: "10px" }}>
                    ❌ Заявка не нужна, если:
                </Span>
                <List.Root marginTop={"5px"} marginLeft={"20px"} fontSize={{ base: "13px", md: "10px" }} lineHeight={{ base: "20px", md: "15px" }} css={{
                    '& li::marker': {
                        color: 'black'
                    }
                }}>
                    <List.Item>
                        просто загружено много товара, и температура временно повысилась
                    </List.Item>
                    <List.Item>
                        дверь была оставлена открытой, и холодильник «догоняет» температуру
                    </List.Item>
                    <List.Item>
                        требуется только разморозка (согласно регламенту её выполняет персонал аптеки)
                    </List.Item>
                </List.Root>
            </Box>
        </Flex>
    )
}

export const TestYourselfDialog = () => {
    return (
        <Dialog.Root size={"full"}>
            <Dialog.Trigger asChild>
                <Span
                    display={"flex"} alignItems={"center"} gap={"5px"}
                    fontSize={"12px"}
                    color={"rgba(68, 10, 241, 1)"}
                    css={{
                        '& svg': {
                            width: '20px',
                            height: '20px'
                        }
                    }} cursor={"pointer"}
                >
                    <TestYourselfSVG /> Проверьте себя
                </Span>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header
                            d={"flex"} padding={"24px 16px"} alignItems={"center"}
                            borderBottom={"1px solid rgba(221, 221, 221, 1)"}
                        >
                            <Dialog.CloseTrigger all={"unset"} cursor={"pointer"}><LuArrowLeft size={"24px"} /></Dialog.CloseTrigger>
                            <Dialog.Title fontSize={"20px"} fontWeight={"600"}>Проверьте себя</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body padding={"17px"}>
                            <TestYourselData />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
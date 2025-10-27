import { Box, Button, Checkbox, Dialog, Grid, Portal, Span, Textarea } from "@chakra-ui/react"
import { HiPlus } from "react-icons/hi"
import { TestYourselData, TestYourselfDialog } from "./TestYourselfDialog"
import { LuArrowLeft } from "react-icons/lu"
import { IoCloseSharp } from "react-icons/io5";
import { PrioritySelect, CategorySelect, PharmacySelect, UploadFile, UploadFileDialog } from "@/components/common";
import { Field } from "@ark-ui/react";
import { useMemo, useRef, useState, useCallback } from "react";
import { CreateDialogContext } from "@/components/contexts";
import { useSendRequest, type ISendProps } from "@/hooks";

export const CreateDialog = () => {
    const { SendRequest } = useSendRequest()

    const [pharmacyData, setPharmacyData] = useState<{ pharmacy_number: number; pharmacy_city: string; pharmacy_address: string } | null>(null)
    const [categortData, setCategortData] = useState<string>("")
    const [priorityData, setPriorityData] = useState<"high" | "medium" | "low" | "critical" | null>(null)
    const [warrantyData, setWarrantyData] = useState<boolean>(false)
    const [fileData, setFileData] = useState<File[] | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploadKey, setUploadKey] = useState(0);

    const topicRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const value = useMemo(() => ({
        pharmacyData,
        setPharmacyData,
        categortData,
        setCategortData,
        priorityData,
        setPriorityData,
        fileData,
        setFileData,
        inputRef,
        uploadKey,
        setUploadKey
    }), [pharmacyData, categortData, priorityData, fileData, uploadKey])

    const SendNewReq = useCallback(() => {
        const topicValue = topicRef.current?.value || "";
        const descriptionValue = descriptionRef.current?.value || "";

        if (!pharmacyData || !priorityData || topicValue.trim().length <= 0 || categortData.trim().length <= 0 || descriptionValue.trim().length <= 0) return

        const new_req: ISendProps = {
            pharmacy_number: pharmacyData?.pharmacy_number,
            pharmacy_city: pharmacyData?.pharmacy_city,
            pharmacy_address: pharmacyData?.pharmacy_address,
            priority: priorityData,
            topic: topicValue,
            category: categortData,
            description: descriptionValue,
            warranty: warrantyData,
            file: fileData,
        }

        SendRequest({ new_req })
    }, [pharmacyData, priorityData, categortData, warrantyData, fileData, SendRequest])

    return (
        <CreateDialogContext.Provider value={value}>
            <Dialog.Root size={{ mdDown: "full", md: "lg" }} placement={"center"}>
                <Dialog.Trigger asChild>
                    <Button
                        fontSize={"16px"}
                        order={{ base: 3, sm: 2 }}
                        position={{ base: 'fixed', sm: 'static' }}
                        bottom={{ base: '20px', sm: 'auto' }}
                        right={{ base: '20px', sm: 'auto' }}
                        zIndex={{ base: 10, sm: 'auto' }}
                        paddingLeft={"15px"} paddingRight={"15px"}
                        height={"40px"}
                        bg={"1C1C1C"}
                        css={{
                            '& svg': {
                                width: '20px',
                                height: '20px'
                            }
                        }}
                    >
                        <HiPlus /> Создать новую заявку
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content padding={{ base: "0px", md: "0px 30px" }} borderRadius={{ base: "0px", md: "15px" }} minW={{ base: "auto", md: "1000px" }}>
                            <Dialog.Header
                                d={"flex"} padding={"24px 16px"} alignItems={"center"}
                                borderBottom={{ base: "1px solid rgba(221, 221, 221, 1)", md: "none" }}
                            >
                                <Dialog.CloseTrigger all={"unset"} display={{ base: "block", md: "none" }}><LuArrowLeft size={"24px"} cursor={"pointer"} /></Dialog.CloseTrigger>
                                <Dialog.Title fontSize={"24px"} fontWeight={"600"}>Создание заявки</Dialog.Title>
                                <Dialog.CloseTrigger
                                    all={"unset"}
                                    display={{ base: "none", md: "block" }}
                                    margin={"auto"}
                                    marginRight={"0px"}
                                >
                                    <IoCloseSharp color="rgba(28, 28, 28, 0.4)" size={"28px"} cursor={"pointer"} />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body padding={"17px"}>
                                <Grid
                                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                                    gapX="32px" gapY={"15px"}
                                    autoRows="min-content"
                                    alignItems="flex-start"
                                >
                                    <Box order={{ base: 1, md: 1 }} gridColumn={{ base: "1", md: "1" }}>
                                        <PharmacySelect />
                                    </Box>

                                    <Box order={{ base: 2, md: 3 }} gridColumn={{ base: "1", md: "1" }}>
                                        <CategorySelect />

                                        <Box display={"flex"} justifyContent={"space-between"} marginTop={"10px"}>
                                            <Checkbox.Root gap={"8px"} cursor={"pointer"} checked={warrantyData} onCheckedChange={() => setWarrantyData(!warrantyData)}>
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control cursor={"pointer"} w={"20px"} h={"20px"} borderRadius={"5px"} border={"1px solid rgba(176, 176, 176, 1)"} />
                                                <Checkbox.Label fontSize={"14px"} fontWeight={"400"}>Гарантийный случай?</Checkbox.Label>
                                            </Checkbox.Root>
                                            <Span display={{ base: "block", md: "none" }}>
                                                <TestYourselfDialog />
                                            </Span>
                                        </Box>
                                    </Box>

                                    <Box order={{ base: 3, md: 2 }} gridColumn={{ base: "1", md: "2" }}>
                                        <Field.Root>
                                            <Field.Label>
                                                <Span fontSize="14px" fontWeight="400">
                                                    Тема заявки
                                                </Span>
                                            </Field.Label>
                                            <Textarea
                                                ref={topicRef}
                                                placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
                                                mt="7.5px"
                                                fontSize="14px"
                                                p="13px 16px"
                                                border="1px solid rgba(176, 176, 176, 1)"
                                                borderRadius="8px"
                                                lineHeight={"17px"}
                                                autoresize
                                                h={"75px"}
                                                maxH={"75px"}
                                            />
                                        </Field.Root>
                                    </Box>

                                    <Box order={{ base: 4, md: 4 }} gridColumn={{ base: "1", md: "2" }}>
                                        <PrioritySelect />
                                    </Box>
                                </Grid>

                                <Grid
                                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                                    gapX="32px" gapY={"24px"}
                                    autoRows="min-content"
                                    alignItems="flex-start"
                                >

                                    <Span display={{ base: "none", md: "block" }} marginTop={"16px"}>
                                        <TestYourselData />
                                    </Span>
                                    <Box height={"fit-content"}>
                                        <Field.Root>
                                            <Field.Label>
                                                <Span fontSize="14px" fontWeight="400">
                                                    Описание проблемы
                                                </Span>
                                            </Field.Label>
                                            <Textarea
                                                ref={descriptionRef}
                                                placeholder={`Кратко опишите проблему:\n  • что случилось? \n  • дата и время произошедшего? \n  • сколько длится проблема? \n  • насколько она влияет на вашу работу?`}
                                                mt="7.5px"
                                                fontSize="14px"
                                                p="13px 16px"
                                                lineHeight={"20px"}
                                                border="1px solid rgba(176, 176, 176, 1)"
                                                autoresize
                                                borderRadius="8px"
                                                h={"130px"}
                                                maxH={"130px"}
                                            />
                                        </Field.Root>

                                        <Box
                                            display={{ base: "none", md: "block" }}
                                        >

                                            <Field.Root >
                                                <Field.Label >
                                                    <Span fontSize="14px" fontWeight="400">
                                                        Прикрепите файлы
                                                    </Span>
                                                </Field.Label>
                                                <Box mt="7.5px">
                                                    <UploadFile />
                                                </Box>
                                            </Field.Root>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Dialog.Body>
                            <Dialog.Footer flexDir={{ base: "column", md: "row" }} justifyContent={"start"} padding={"0px 17px"} paddingBottom={"40px"} fontSize={"16px"}>
                                <UploadFileDialog />
                                <Dialog.ActionTrigger asChild>
                                    <Button onClick={SendNewReq} padding={"8px 17px"} height={"40px"} w={{ base: "100%", md: "auto" }} fontSize={{ base: "16px", md: "auto" }}>Создать заявку</Button>
                                </Dialog.ActionTrigger>
                                <Dialog.ActionTrigger asChild display={{ base: "none", md: "block" }}>
                                    <Button variant="outline" padding={"0px 10px"} height={"40px"} border={"1px solid black"}>Отмена</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root >
        </CreateDialogContext.Provider>
    )
}
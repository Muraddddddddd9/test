import { ButtonCustom } from "@/components/ui/custon"
import { Button, Dialog, FileUpload, Portal, Span } from "@chakra-ui/react"
import { FaRegFolder } from "react-icons/fa6"
import { LuArrowLeft } from "react-icons/lu"
import { ShowUploadFile } from "@/components/common"
import { HiPlus } from "react-icons/hi"
import { useCreateDialogContext } from "@/components/contexts"

export const UploadFileDialog = () => {
    const { fileData, setFileData, inputRef } = useCreateDialogContext()

    return (
        <Dialog.Root size={"full"}>
            <Dialog.Trigger asChild>
                <ButtonCustom display={{ base: "flex", md: "none" }} border={"none"} w={"100%"} padding={"8px 17px"} fontSize={"16px"} height={"40px"} css={{
                    '& svg': {
                        width: '15px',
                        height: '15px'
                    }
                }}>
                    {fileData && fileData.length >= 1 ?
                        <>
                            <FaRegFolder />Прикрепленные файлы
                            <Span bg={"white"} display={"flex"} alignItems={'center'} justifyContent={"center"} w={"20px"} h={"20px"} borderRadius={"50px"}>{fileData.length}</Span>
                        </>
                        :
                        <>
                            <HiPlus /> Прикрепить файлы
                        </>
                    }
                </ButtonCustom>
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
                            <Dialog.Title fontSize={"20px"} fontWeight={"600"}>Прикрепленные файлы</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body padding={"17px"}>
                            <ShowUploadFile />
                        </Dialog.Body>
                        <Dialog.Footer padding={"10px 17px"}>
                            <FileUpload.Root onFileAccept={(detail) => {
                                const incoming = detail.files;
                                const unique = [
                                    ...(fileData || []),
                                    ...incoming.filter(
                                        (f) =>
                                            !(fileData || []).some(
                                                (e) => e.name === f.name && e.size === f.size
                                            )
                                    )
                                ];

                                setFileData(unique);

                                if (inputRef.current) inputRef.current.value = "";
                            }}>
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button padding={"8px 17px"} height={"40px"} w={{ base: "100%", md: "auto" }} fontSize={{ base: "16px", md: "auto" }}><HiPlus /> Прикрепить файлы</Button>
                                </FileUpload.Trigger>
                            </FileUpload.Root>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
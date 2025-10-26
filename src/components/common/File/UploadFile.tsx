import { useCreateDialogContext } from "@/components/contexts"
import { ImageSVG } from "@/svg"
import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { ShowUploadFile } from "./ShowUploadFile"

export const UploadFile = () => {
    const { fileData, setFileData, inputRef, uploadKey } = useCreateDialogContext()

    return (
        <FileUpload.Root
            key={uploadKey}
            w="100%"
            display={{ base: "none", md: "flex" }}
            gap="12px"
            maxFiles={10}
            onFileAccept={(detail) => {
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
            }}
        >

            <FileUpload.HiddenInput ref={inputRef} />

            <Box w={"100%"} display={"flex"} gap={"10px"}>
                <FileUpload.Dropzone minHeight="100px" height={"fit-content"} w="100%" borderRadius={"14px"}>
                    <FileUpload.DropzoneContent>
                        <Box fontWeight="300" fontSize="14px">
                            Выберите или перетащите фото или файл
                        </Box>
                    </FileUpload.DropzoneContent>
                    <Icon size="md" color="fg.muted">
                        <ImageSVG />
                    </Icon>
                </FileUpload.Dropzone>

                <ShowUploadFile />
            </Box>
        </FileUpload.Root>
    )
}

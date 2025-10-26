import { useCreateDialogContext } from "@/components/contexts"
import { PDFRedSVG } from "@/svg"
import { Box, CloseButton, HStack, Image, Text } from "@chakra-ui/react"

export const ShowUploadFile = () => {
    const { fileData, setFileData, inputRef, setUploadKey } = useCreateDialogContext()

    if (!fileData) {
        return null
    }

    return (

        <Box display="flex" flexDir="column" gap="8px">
            {fileData.map((file, index) => (
                <HStack
                    key={index}
                    justify="space-between"
                    h={{ base: "60px", md: "32px" }} w={{ base: "100%", md: "200px" }}
                    bg="rgba(241, 241, 241, 1)"
                >
                    <HStack marginLeft={"10px"}>
                        {file.type.startsWith("image/") ? (
                            <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                w={{ base: "60px", md: "24px" }} height={{ base: "40px", md: "16px" }}
                                borderRadius="2px"
                                objectFit="cover"
                            />
                        ) : <PDFRedSVG />}

                        <Text
                            fontSize="14px"
                            fontWeight="400"
                            maxW={{ base: "100px", md: "90px" }}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            color={"rgba(28, 28, 28, 0.6)"}
                            textOverflow="ellipsis"
                            borderRadius={"2px"}
                        >
                            {file.name}
                        </Text>
                    </HStack>

                    <CloseButton w={"13px"} h={"13px"}
                        onClick={() => {
                            const newFiles = fileData.filter((_, idx) => idx !== index);
                            setFileData(newFiles);

                            if (inputRef.current) inputRef.current.value = "";
                            setUploadKey(prev => prev + 1);
                        }}
                    />
                </HStack>
            ))}
        </Box>
    )
}
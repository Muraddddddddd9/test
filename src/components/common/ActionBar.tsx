import { Box, Button, Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { ButtonCustom } from "../ui/custon"
import { PDFSVG } from "@/svg"
import { HiPlus } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const SearchAndCreateBar = () => {
    const [openSearch, setOpenSearch] = useState<boolean>(false)

    return (
        <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={"13px"}
            position="relative"
        >
            <InputGroup
                flex="1" startElement={<LuSearch />}
                display={{ base: openSearch ? "stiky" : "none", sm: "block" }}
                position={{ base: 'sticky', sm: 'relative' }}
                top={{ base: openSearch ? "0" : "-70px", sm: "auto" }}
                left="0"
                right="0"
                zIndex={50}
                opacity={{ base: openSearch ? 1 : 0, sm: 1 }}
                visibility={{ base: openSearch ? "visible" : "hidden", sm: "visible" }}
                pointerEvents={{ base: openSearch ? "auto" : "none", sm: "auto" }}
            >
                <Input placeholder="Поиск по номеру или теме заявки" />
            </InputGroup>

            <ButtonCustom
                padding={"8px 10px"}
                fontSize={"16px"}
                textAlign={"center"}
                fontWeight={"400"}
                color={"rgba(28, 28, 28, 1)"}
                order={{ base: 2, sm: 1 }}
                css={{
                    '& svg': {
                        width: '15px',
                        height: '15px'
                    }
                }}
                display={{ base: 'none', sm: 'flex' }}
            >
                <PDFSVG /> Экспорт
            </ButtonCustom>

            <Button flex="1"
                display={{ base: "flex", sm: "none" }}
                order={{ base: 1, sm: 0 }}
                w={"120px"} position={'fixed'}
                bottom={'80px'} right={'20px'}
                border={"2px solid #1C1C1C"}
                background={"transparent"} color={"black"}
                fontWeight={"20px"}
                borderRadius={"5px"}
                zIndex={10}
                css={{
                    '& svg': {
                        width: '24px',
                        height: '24px'
                    }
                }}
                onClick={() => setOpenSearch(!openSearch)}
            >
                <AiOutlineSearch /> Поиск
            </Button>

            <Button
                fontSize={"16px"}
                order={{ base: 3, sm: 2 }}
                position={{ base: 'fixed', sm: 'static' }}
                bottom={{ base: '20px', sm: 'auto' }}
                right={{ base: '20px', sm: 'auto' }}
                zIndex={{ base: 10, sm: 'auto' }}
                paddingLeft={"15px"} paddingRight={"15px"}
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
        </Box >
    )
}

export const ActionBar = () => {
    return (
        <Box padding={"20px"}>
            <SearchAndCreateBar />
            фыв
        </Box>
    )
}
import { Box, Button, For, Input, InputGroup, Span } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { ButtonCustom } from "@/components/ui/custon"
import { PDFSVG } from "@/svg"
import { AiOutlineSearch } from "react-icons/ai";
import { memo, useRef, useState } from "react";
import { useApplicationsContext } from "@/components/contexts";
import { CreateDialog } from "@/components/common/Dialog/CreateDialog";
import { MdOutlineFilterAlt } from "react-icons/md";

const SearchAndCreateBar = memo(() => {
    const { searchInput, setSearchInput } = useApplicationsContext();
    const [openSearch, setOpenSearch] = useState<boolean>(false)

    return (
        <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={"13px"} padding={"20px 20px 0px 20px"}
            position="relative"
        >
            <InputGroup
                flex="1" startElement={<LuSearch />}
                display={{ base: openSearch ? "stiky" : "none", sm: "block" }}
                position={{ base: 'sticky', sm: 'relative' }}
                marginBottom={{ base: "10px", sm: "0px" }}
                top={{ base: openSearch ? "0" : "-70px", sm: "auto" }}
                left="0"
                height={"40px"}
                right="0"
                zIndex={50}
                opacity={{ base: openSearch ? 1 : 0, sm: 1 }}
                visibility={{ base: openSearch ? "visible" : "hidden", sm: "visible" }}
                pointerEvents={{ base: openSearch ? "auto" : "none", sm: "auto" }}
            >
                <Input placeholder="Поиск по номеру или теме заявки" height={"40px"}
                    defaultValue={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </InputGroup>

            <ButtonCustom
                padding={"8px 10px"}
                fontSize={"16px"}
                textAlign={"center"}
                fontWeight={"400"}
                color={"rgba(28, 28, 28, 1)"}
                order={{ base: 2, sm: 1 }}
                height={"40px"}
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
                background={"white"} color={"black"}
                fontWeight={"20px"}
                borderRadius={"5px"}
                height={"40px"}
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

            <CreateDialog />
        </Box >
    )
})

const STATUS_OPTIONS = [
    { label: "Все статусы", value: "all" },
    { label: "Новые", value: "new" },
    { label: "Отклонены", value: "rejected" },
    { label: "В работе", value: "in_progress" },
    { label: "Готовы", value: "ready" },
    { label: "Закрыты", value: "closed" },
    { label: "На рассмотрении", value: "pending" },
    { label: "Ожидают запчасти", value: "waiting_parts" },
];

const FilterButton = memo(() => {
    const { selectFilter, setSelectFilter } = useApplicationsContext();
    const scrollRef = useRef<HTMLDivElement>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        scrollRef.current!.style.cursor = "grabbing";
        startX = e.pageX - scrollRef.current!.offsetLeft;
        scrollLeft = scrollRef.current!.scrollLeft;
    };

    const onMouseLeave = () => {
        isDown = false;
        scrollRef.current!.style.cursor = "grab";
    };

    const onMouseUp = () => {
        isDown = false;
        scrollRef.current!.style.cursor = "grab";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current!.offsetLeft;
        const walk = (x - startX) * 1;
        scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    return (
        <Box
            ref={scrollRef}
            display="flex"
            marginTop={{ base: "0px", sm: "21px" }}
            overflowX="auto"
            paddingLeft="20px"
            whiteSpace="nowrap"
            flexDirection="row"
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
            paddingRight={{ base: "20px", sm: "0px" }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <Box
                display="flex"
                gap="10px"
                flexShrink={0}
                order={{ base: 2, sm: 1 }}
            >
                <For each={STATUS_OPTIONS}>
                    {(item, index) =>
                        <ButtonCustom
                            key={index}
                            border="none"
                            padding="0px 17px"
                            fontSize={{ base: "14px", sm: "16px" }}
                            height={{ base: "32px", sm: "40px" }}
                            flexShrink={0}
                            onClick={() => setSelectFilter(item.value)}
                            bg={selectFilter === item.value ? "rgba(28, 28, 28, 1)" : "rgba(241, 241, 241, 1)"}
                            color={selectFilter === item.value ? "white" : "rgba(28, 28, 28, 1)"}
                        >
                            {item.label}
                        </ButtonCustom>
                    }
                </For>
            </Box>

            <Span
                w="3px"
                h="auto"
                background="rgba(217, 225, 236, 1)"
                margin="0px 25px"
                flexShrink={0}
                display={{ base: "none", sm: "block" }}
                order={{ base: 3, sm: 2 }}
            />

            <ButtonCustom
                border="none"
                padding={"0px 17px"}
                fontSize={{ base: "14px", sm: "16px" }}
                height={{ base: "32px", sm: "40px" }}
                marginRight={{ base: "10px", sm: "20px" }}
                flexShrink={0}
                css={{
                    '& svg': {
                        width: '20px',
                        height: '20px'
                    }
                }}
                bg={selectFilter === "my" ? "rgba(28, 28, 28, 1)" : "rgba(241, 241, 241, 1)"}
                color={selectFilter === "my" ? "white" : "rgba(28, 28, 28, 1)"}
                onClick={() => setSelectFilter("my")}
                order={{ base: 1, sm: 3 }}
            >
                <MdOutlineFilterAlt /> <Span display={{ base: "none", sm: "block" }}>Показать только мои</Span>
            </ButtonCustom>
        </Box>
    )
})

export const ActionBar = () => {
    return (
        <Box
            borderBottom={{ sm: "1px solid rgba(219, 229, 242, 1)" }}
            padding={{ base: "0px", md: "0px 20px 21px 20px" }}
        >
            <SearchAndCreateBar />
            <FilterButton />
        </Box>
    )
}
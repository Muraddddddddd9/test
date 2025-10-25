import { Box, Button, For, Input, InputGroup, Span } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { ButtonCustom } from "../ui/custon"
import { PDFSVG } from "@/svg"
import { HiPlus } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { memo, useRef, useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { useApplicationsContext } from "@/components/contexts";

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
                background={"transparent"} color={"black"}
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
        </Box >
    )
})

const STATUS_OPTIONS = [
    { label: "Новые", value: "new" },
    { label: "Отклонены", value: "rejected" },
    { label: "На рассмотрении", value: "pending" },
    { label: "В работе", value: "in_progress" },
    { label: "Ожидают запчасти", value: "waiting_parts" },
    { label: "Готовы", value: "ready" },
    { label: "Закрыты", value: "closed" },
    { label: "Все статусы", value: "all" },
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
            cursor="grab"
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <Box display="flex" gap="10px" flexShrink={0}>
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
            />
            <ButtonCustom
                border="none"
                padding="0px 17px"
                fontSize={{ base: "14px", sm: "16px" }}
                height={{ base: "32px", sm: "40px" }}
                marginRight={"20px"}
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
            >
                <MdOutlineFilterAlt /> Показать только мои
            </ButtonCustom>
        </Box>
    )
})

export const ActionBar = () => {
    return (
        <Box
            borderBottom={{ sm: "1px solid rgba(219, 229, 242, 1)" }}
            paddingBottom={"21px"}
        >
            <SearchAndCreateBar />
            <FilterButton />
        </Box>
    )
}
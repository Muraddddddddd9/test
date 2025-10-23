import {
    Avatar,
    Box,
    Span,
    Menu,
    MenuTrigger,
    MenuContent,
    useBreakpointValue,
    Flex,
    Portal
} from "@chakra-ui/react"
import { ButtonCustom } from "./ui/custon"
import { ArrowDownForRefBool, ArrowDownMobile, LogoutSVG } from "@/svg"
import { useState } from "react"

export const Navbar = () => {
    const [selectedMenu, setSelectedMenu] = useState("Заявки")

    const padding = useBreakpointValue({
        sm: "16px 0px"
    })

    const horizontalMargin = useBreakpointValue({
        base: "16px",
        sm: "24px",
        md: "60px",
        lg: "120px"
    })

    const fontSize = useBreakpointValue({
        base: "14px",
        md: "16px"
    })

    const gap = useBreakpointValue({
        base: "20px",
        md: "35px"
    })

    const showLogoutButton = useBreakpointValue({
        base: false,
        sm: true
    })

    const showFullNavigation = useBreakpointValue({
        base: false,
        sm: true
    })

    return (
        <Box
            display={'flex'}
            justifyContent={"space-between"}
            padding={padding}
            alignItems={showFullNavigation ? "" : "start"}
            border={"1px solid rgba(217, 225, 236, 1)"}
            width={"100%"}
            boxSizing={"border-box"}
            transition="all 0.3s ease-in-out"
        >
            <Flex
                fontSize={fontSize}
                gap={gap}
                marginLeft={horizontalMargin}
                fontWeight={"400"}
                alignItems={"center"}
                transition="all 0.3s ease-in-out"
            >
                {showFullNavigation ? (
                    <>
                        <Box display={'flex'} gap={"14px"}>
                            <Span
                                cursor="pointer"
                                _hover={{ color: "blue.500" }}
                                transition="color 0.2s ease-in-out"
                            >
                                Заявки
                            </Span>
                            <Span
                                cursor="pointer"
                                _hover={{ color: "blue.500" }}
                                transition="color 0.2s ease-in-out"
                            >
                                Отчёты
                            </Span>
                        </Box>
                        <Flex
                            cursor="pointer"
                            _hover={{ color: "blue.500" }}
                            alignItems={"center"}
                            gap={"4px"}
                            transition="color 0.2s ease-in-out"
                        >
                            Справочник <ArrowDownForRefBool />
                        </Flex>
                    </>
                ) : (
                    <Menu.Root>
                        <Menu.Trigger>
                            <Flex
                                cursor="pointer"
                                fontWeight="600"
                                alignItems={"center"}
                                paddingTop={"10px"}
                                gap={"10px"}
                                fontSize={"20px"}
                                _hover={{ bg: "gray.50" }}
                                transition="all 0.2s ease-in-out"
                            >
                                {selectedMenu} <ArrowDownMobile />
                            </Flex>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <MenuContent>
                                    <Menu.Item value="Заявки" onClick={() => setSelectedMenu("Заявки")}>
                                        Заявки
                                    </Menu.Item>
                                    <Menu.Item value="Отчёты" onClick={() => setSelectedMenu("Отчёты")}>
                                        Отчёты
                                    </Menu.Item>
                                    <Menu.Item value="Справочник" onClick={() => setSelectedMenu("Справочник")}>
                                        Справочник
                                    </Menu.Item>
                                </MenuContent>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                )}
            </Flex>

            <Flex
                marginRight={"20px"}
                gap={"30px"}
                padding={showLogoutButton ? "" : "16px 0px"}
                alignItems={"center"}
                transition="all 0.3s ease-in-out"
            >
                <Box position={'relative'}>
                    {showLogoutButton ? (
                        <Avatar.Root
                            w={"35px"}
                            height={"35px"}
                            cursor="pointer"
                            transition="all 0.2s ease-in-out"
                        >
                            <Avatar.Image src="https://bit.ly/sage-adebayo" />
                        </Avatar.Root>
                    ) : (
                        <Menu.Root>
                            <MenuTrigger>
                                <Avatar.Root
                                    w={"35px"}
                                    height={"35px"}
                                    cursor="pointer"
                                    transition="all 0.2s ease-in-out"
                                >
                                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                                </Avatar.Root>
                            </MenuTrigger>
                            <Portal>
                                <Menu.Positioner>
                                    <MenuContent>
                                        <Menu.Item value="">
                                            <Flex align="center" gap="8px" width="100%">
                                                <LogoutSVG /> Выйти
                                            </Flex>
                                        </Menu.Item>
                                    </MenuContent>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    )}
                    <Span
                        position={"absolute"}
                        w={"20px"}
                        h={"20px"}
                        background={"rgba(185, 60, 60, 1)"}
                        borderRadius={"50px"}
                        bottom={"-5px"}
                        right={"-10px"}
                        textAlign={"center"}
                        fontSize={"13px"}
                        fontWeight={"600"}
                        color={"rgba(241, 241, 241, 1)"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.3s ease-in-out"
                    >2</Span>
                </Box>

                {showLogoutButton && (
                    <ButtonCustom
                        w={"119px"}
                        height={"40px"}
                        gap={"4px"}
                    >
                        <LogoutSVG /> Выйти
                    </ButtonCustom>
                )}
            </Flex>
        </Box>
    )
}
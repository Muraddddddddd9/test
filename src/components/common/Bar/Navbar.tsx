import {
    Avatar,
    Box,
    Span,
    Menu,
    MenuTrigger,
    MenuContent,
    useBreakpointValue,
    Flex,
    Portal,
    For
} from "@chakra-ui/react"
import { ButtonCustom } from "@/components/ui/custon"
import { ArrowDownForRefBool, ArrowDownMobile, LogoutSVG } from "@/svg"
import { useNavigate, useLocation } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const getSelectedMenu = () => {
        switch (location.pathname) {
            case "/":
                return "Заявки"
            case "/reports":
                return "Отчёты"
            case "/guide":
                return "Справочник"
            default:
                return "Заявки"
        }
    }

    const selectedMenu = getSelectedMenu()

    const handleMenuClick = (menuItem: string) => {
        switch (menuItem) {
            case "Заявки":
                navigate("/")
                break
            case "Отчёты":
                navigate("/reports")
                break
            case "Справочник":
                navigate("/guide")
                break
            default:
                navigate("/")
        }
    }

    const padding = useBreakpointValue({
        sm: "16px 0px"
    })

    const horizontalMargin = useBreakpointValue({
        base: "16px",
        sm: "24px",
        md: "60px",
        lg: "130px"
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

    const getTextColor = (menuItem: string) => {
        return selectedMenu === menuItem ? "#1C1C1C" : "#B0B0B0"
    }

    return (
        <Box
            display={'flex'}
            justifyContent={"space-between"}
            padding={padding}
            alignItems={showFullNavigation ? "" : "start"}
            borderBottom={"1px solid rgba(217, 225, 236, 1)"}
            width={"100%"}
            height={{base: "72px", md: "86px"}}
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
                            <For each={["Заявки", "Отчёты"]}>
                                {(item, index) =>
                                    <Span
                                        key={index}
                                        cursor="pointer"
                                        color={getTextColor(item)}
                                        _hover={{ color: "#1C1C1C" }}
                                        transition="color 0.2s ease-in-out"
                                        onClick={() => handleMenuClick(item)}
                                        fontWeight="400"
                                        fontStyle="Regular"
                                        fontSize="16px"
                                        lineHeight="24px"
                                        letterSpacing="0px"

                                    >
                                        {item}
                                    </Span>
                                }
                            </For>
                        </Box>
                        <Flex
                            cursor="pointer"
                            color={getTextColor("Справочник")}
                            _hover={{ color: "#1C1C1C" }}
                            alignItems={"center"}
                            gap={"4px"}
                            transition="color 0.2s ease-in-out"
                            onClick={() => handleMenuClick("Справочник")}
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
                                    <Menu.Item
                                        value="Заявки"
                                        onClick={() => handleMenuClick("Заявки")}
                                        style={{
                                            color: selectedMenu === "Заявки" ? "black" : "rgba(176, 176, 176, 1)"
                                        }}
                                    >
                                        Заявки
                                    </Menu.Item>
                                    <Menu.Item
                                        value="Отчёты"
                                        onClick={() => handleMenuClick("Отчёты")}
                                        style={{
                                            color: selectedMenu === "Отчёты" ? "black" : "rgba(176, 176, 176, 1)"
                                        }}
                                    >
                                        Отчёты
                                    </Menu.Item>
                                    <Menu.Item
                                        value="Справочник"
                                        onClick={() => handleMenuClick("Справочник")}
                                        style={{
                                            color: selectedMenu === "Справочник" ? "black" : "rgba(176, 176, 176, 1)"
                                        }}
                                    >
                                        Справочник
                                    </Menu.Item>
                                </MenuContent>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                )}
            </Flex>

            <Flex
                marginRight={"34px"}
                gap={"27px"}
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
                        display="flex"
                        textAlign={"center"}
                        alignItems="center"
                        fontSize={"13px"}
                        fontWeight={"600"}
                        color={"rgba(241, 241, 241, 1)"}
                        justifyContent="center"
                        transition="all 0.3s ease-in-out"
                    >2</Span>
                </Box>

                {showLogoutButton && (
                    <ButtonCustom
                        w={"119px"}
                        height={"40px"}
                        gap={"4px"} fontWeight={"400"}
                        fontSize={"16px"}
                    >
                        <LogoutSVG /> Выйти
                    </ButtonCustom>
                )}
            </Flex>
        </Box>
    )
}
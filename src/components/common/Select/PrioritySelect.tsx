import { useCreateDialogContext } from "@/components/contexts"
import { PriorityList } from "@/mock"
import { Box, Select, Span, useSelectContext } from "@chakra-ui/react"
import type { JSX } from "react"

export const PriorityValue = () => {
    const select = useSelectContext()
    const items = select.selectedItems as Array<{ svg: JSX.Element; title: string; description: string }>

    if (items.length === 0) {
        return (
            <Select.ValueText placeholder="Влияние на работу" fontSize={"14px"} />
        )
    }

    const { svg, title, description } = items[0]

    return (
        <Select.ValueText placeholder="Влияние на работу" fontSize={"14px"}>
            <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                {svg()}
                <Box display={"flex"} flexDirection={{ base: "column", md: "row" }} lineHeight={"15px"}
                    fontSize={{ base: "12px", md: "14px" }} gap={'2px'} alignItems={{ base: "left", md: "center" }}
                >
                    <Span fontWeight={"500"}>{title}:</Span>
                    <Span fontWeight={"400"} color={"rgba(176, 176, 176, 1)"}>{description}</Span>
                </Box>
            </Box>
        </Select.ValueText>
    )
}

export const PrioritySelect = () => {
    const { setPriorityData } = useCreateDialogContext()

    return (
        <Select.Root collection={PriorityList} size="sm" onValueChange={(val) => {
            if (["high", "medium", "low", "critical"].includes(val.value[0])) {
                setPriorityData(val.value[0] as "high" | "medium" | "low" | "critical")
            }
        }}>
            <Select.HiddenSelect />
            <Select.Label fontSize={"14px"} fontWeight={"400"}>Приоритет</Select.Label>
            <Select.Control border={"1px solid rgba(176, 176, 176, 1)"} borderRadius={"8px"}>
                <Select.Trigger border={"none"} cursor={"pointer"}>
                    <PriorityValue />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    {PriorityList.items.map((priority, index) => {
                        var label = <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                            <priority.svg />
                            <Box display={"flex"} flexDirection={{ base: "column", md: "row" }} lineHeight={"15px"}
                                fontSize={{ base: "12px", md: "14px" }} gap={'2px'} alignItems={{ base: "left", md: "center" }}
                            >
                                <Span fontWeight={"500"}>{priority.title}:</Span>
                                <Span fontWeight={"400"} color={"rgba(176, 176, 176, 1)"}>{priority.description}</Span>
                            </Box>
                        </Box>
                        return (
                            <Select.Item item={priority} key={index} fontSize={"14px"}>
                                {label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        )
                    })}
                </Select.Content >
            </Select.Positioner>
        </Select.Root >
    )
}
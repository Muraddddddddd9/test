import { useCreateDialogContext } from "@/components/contexts"
import { PharmacyList } from "@/mock"
import { Box, Select, Span, useSelectContext } from "@chakra-ui/react"

export const PharmacyValue = () => {
    const select = useSelectContext()
    const items = select.selectedItems as Array<{ number: string; city: string; address: string }>

    if (items.length === 0) {
        return (
            <Select.ValueText placeholder="Выберите аптеку от которой исходит заявка" fontSize={"14px"} />
        )
    }

    const { number, city, address } = items[0]

    return (
        <Select.ValueText placeholder="Выберите аптеку от которой исходит заявка" fontSize={"14px"}>
            <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                <Span
                    fontWeight={"500"} lineHeight={"20px"} padding={"0px 2px"}
                    border={"1px solid rgba(235, 235, 235, 1)"} borderRadius={"4px"}
                >{String(number).padStart(3, '0')}</Span>
                <Span fontWeight={"500"} color={"rgba(28, 28, 28, 1)"}>{city}</Span>
                <Span fontWeight={"400"} color={"rgba(28, 28, 28, 0.6)"}>{address}</Span>
            </Box>
        </Select.ValueText>
    )
}

export const PharmacyIndicator = () => {
    return (
        <Box padding={"0px 4px"} lineHeight={"20px"}
            border={"1px solid rgba(28, 28, 28, 0.4)"} borderRadius={"4px"}
            fontSize={"12px"}
        >
            Изменить
        </Box>
    )
}

export const PharmacySelect = () => {
    const { setPharmacyData } = useCreateDialogContext()

    return (
        <Select.Root collection={PharmacyList} size="sm" w={"auto"}
            onValueChange={(val) => {
                var city = val.items[0].city
                var address = val.items[0].address
                var number = val.items[0].number
                setPharmacyData({ pharmacy_number: number, pharmacy_city: city, pharmacy_address: address })
            }}>
            <Select.HiddenSelect />
            <Select.Label fontSize={"14px"} fontWeight={"400"}>Аптека</Select.Label>
            <Select.Control border={"1px solid rgba(176, 176, 176, 1)"} borderRadius={"8px"}>
                <Select.Trigger border={"none"} cursor={"pointer"}>
                    <PharmacyValue />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <PharmacyIndicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    {PharmacyList.items.map((pharmacy, index) => {
                        var label = <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                            <Span
                                fontWeight={"500"} lineHeight={"20px"} padding={"0px 2px"}
                                border={"1px solid rgba(235, 235, 235, 1)"} borderRadius={"4px"}
                            >{String(pharmacy.number).padStart(3, '0')}</Span>
                            <Span fontWeight={"500"} color={"rgba(28, 28, 28, 1)"}>{pharmacy.city}</Span>
                            <Span fontWeight={"400"} color={"rgba(28, 28, 28, 0.6)"}>{pharmacy.address}</Span>
                        </Box>
                        return (
                            <Select.Item item={pharmacy} key={index} fontSize={"14px"}>
                                {label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        )
                    })}
                </Select.Content >
            </Select.Positioner>
        </Select.Root>
    )
}
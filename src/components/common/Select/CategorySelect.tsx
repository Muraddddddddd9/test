import { useCreateDialogContext } from "@/components/contexts"
import { CategoryList } from "@/mock"
import { Select } from "@chakra-ui/react"

export const CategorySelect = () => {
    const { categortData, setCategortData } = useCreateDialogContext()

    return (
        <Select.Root collection={CategoryList} size="sm" value={categortData ? [categortData] : []} 
            onValueChange={(val) => {
                setCategortData(val.value[0])
            }}>
            <Select.HiddenSelect />
            <Select.Label fontSize={"14px"} fontWeight={"400"}>Категория заявки</Select.Label>
            <Select.Control border={"1px solid rgba(176, 176, 176, 1)"} borderRadius={"8px"} >
                <Select.Trigger border={"none"} cursor={"pointer"}>
                    <Select.ValueText placeholder="Холодильники, кондиционеры или другое" fontSize={"14px"} />
                </Select.Trigger>
                <Select.IndicatorGroup >
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    {CategoryList.items.map((category) => (
                        <Select.Item item={category} key={category} fontSize={"14px"}>
                            {category}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    )
}
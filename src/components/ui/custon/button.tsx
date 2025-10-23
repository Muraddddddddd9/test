import { Button, type ButtonProps } from "@chakra-ui/react"
import type { PropsWithChildren } from "react"

export const ButtonCustom = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
    return (
        <Button
            margin={0} padding={0}
            border={"1px solid rgba(217, 225, 236, 1)"}
            background={"rgba(241, 241, 241, 1)"}
            textAlign={"center"} alignItems={"center"}
            color={'rgba(28, 28, 28, 1)'}
            {...props}
        >
            {children}
        </Button>
    )
}
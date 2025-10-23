import { Box, VStack, Text } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';

export const NotFound = () => {
    const codeSize = useBreakpointValue({ base: "8rem", md: "12rem" });
    const textSize = useBreakpointValue({ base: "xl", md: "2xl" });
    const containerPadding = useBreakpointValue({ base: 4, md: 8 });

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={containerPadding}
        >
            <VStack textAlign="center">
                <Text
                    fontSize={codeSize}
                    fontWeight="bold"
                    color="rgba(28, 28, 28, 1)"
                    transition="all 0.3s ease"
                >
                    404
                </Text>

                <Text
                    fontSize={textSize}
                    color="gray.600"
                    transition="all 0.3s ease"
                    fontWeight="medium"
                >
                    Страница в разработке
                </Text>

                <Text
                    color="gray.500"
                    fontSize="md"
                    transition="all 0.3s ease"
                    maxW="400px"
                    lineHeight="tall"
                >
                    Извините, запрашиваемая страница находится в разработке.
                    Пожалуйста, проверьте позже.
                </Text>
            </VStack>
        </Box>
    );
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Center,
} from "@chakra-ui/react";
import type { IApplications } from "@/mock";
import { getPriority, getStatus, getDecision, groupByDate } from "@/components/utils"
import { MdOutlineInbox } from "react-icons/md";

export const MobileAppList: React.FC<{ appFilterData: IApplications[] | null }> = ({ appFilterData }) => {
    const shadow = "0 1px 2px rgba(16, 24, 40, 0.05)";
    const containerRef = useRef<HTMLDivElement>(null);
    const [atBottom, setAtBottom] = useState(false);

    const handleScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const isAtBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
        setAtBottom(prev => (prev !== isAtBottom ? isAtBottom : prev));
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => el.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const grouped = useMemo(() => {
        if (!appFilterData) return { groups: {}, order: [] as string[] };
        return groupByDate(appFilterData);
    }, [appFilterData]);

    if (!appFilterData || appFilterData.length === 0) {
        return (
            <Center
                height="200px"
                flexDirection="column"
                color="gray.400"
                borderColor="gray.200"
                borderRadius="md"
                p={6}
            >
                <MdOutlineInbox size={48} />
                <Text mt={4} fontSize="lg" fontWeight="medium">
                    Нет данных
                </Text>
            </Center>
        );
    }

    return (
        <Box
            ref={containerRef}
            overflow="auto"
            height="calc(100vh - 150px)"
            mx="auto"
            px="20px"
            py="10px"
            paddingBottom={{ base: "120px", sm: "40px" }}
            css={{
                "--scroll-shadow-size": "4rem",
                WebkitMaskImage: `linear-gradient(
                  #000,
                  #000 calc(100% - var(--scroll-shadow-size)),
                  transparent 100%
                )`,
                maskImage: `linear-gradient(
                  #000,
                  #000 calc(100% - var(--scroll-shadow-size)),
                  transparent 100%
                )`,
            }}
            data-at-bottom={atBottom ? "true" : undefined}
        >
            <Box
                position="relative"
                w="100%"
                _before={{
                    content: '""',
                    position: 'sticky',
                    top: 0,
                    height: '4rem',
                    width: '100%',
                    bg: 'linear-gradient(to bottom, white, transparent)',
                    zIndex: 1,
                }}
                _after={{
                    content: '""',
                    position: 'sticky',
                    bottom: 0,
                    height: '4rem',
                    width: '100%',
                    bg: 'linear-gradient(to top, white, transparent)',
                    zIndex: 1,
                }}
            >
                <VStack align="stretch" >
                    {grouped.order.map((sectionTitle) => {
                        const items = grouped.groups[sectionTitle];
                        return (
                            <Box key={sectionTitle}>
                                <Text
                                    fontFamily="Inter, sans-serif"
                                    fontWeight={600}
                                    fontSize="14px"
                                    lineHeight="24px"
                                    letterSpacing="1px"
                                    textTransform="uppercase"
                                    mb="12px"
                                >
                                    {sectionTitle}
                                </Text>

                                <VStack align="stretch">
                                    {items.map((item) => {
                                        const statusData = getStatus(item.status);
                                        const priorityData = getPriority(item.priority);
                                        const decisionData = getDecision(item.decision, item.reaction);

                                        return (
                                            <Box
                                                key={item.id}
                                                w="100%"
                                                borderRadius="8px"
                                                border="1px solid rgba(217, 225, 236, 1)"
                                                boxShadow={shadow}
                                                px="14px"
                                                py="15px"
                                                overflow="hidden"
                                            >
                                                <HStack justifyContent="space-between" align="flex-start">
                                                    <Box borderRadius="20px" display="flex" alignItems="center" overflow="hidden">
                                                        <Text
                                                            fontSize="14px"
                                                            fontWeight={600}
                                                            lineHeight="24px"
                                                            whiteSpace="nowrap"
                                                            textOverflow="ellipsis"
                                                            overflow="hidden"
                                                        >
                                                            {item.topic}
                                                        </Text>
                                                    </Box>

                                                    <HStack gap="10px">
                                                        <priorityData.svg />
                                                        <Text
                                                            as="span"
                                                            bg={statusData.color}
                                                            px="6px"
                                                            py="2px"
                                                            borderRadius="4px"
                                                            fontWeight={500}
                                                            fontSize="13px"
                                                        >
                                                            {statusData.label}
                                                        </Text>
                                                    </HStack>
                                                </HStack>

                                                <HStack mt="10px" justifyContent="space-between" alignItems="center">
                                                    <HStack>
                                                        <Box
                                                            borderRadius="4px"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            px="5px"
                                                            py="3px"
                                                            bg="rgba(241, 241, 241, 1)"
                                                            fontFamily="'Golos Text', sans-serif"
                                                            fontWeight={550}
                                                            fontSize="14px"
                                                        >
                                                            {item.id}
                                                        </Box>
                                                        <Text
                                                            fontWeight={500}
                                                            fontSize="12px"
                                                            lineHeight="20px"
                                                            whiteSpace="nowrap"
                                                            overflow="hidden"
                                                            color={"rgba(164, 164, 164, 1)"}
                                                        >
                                                            {item.pharmacy_city}
                                                        </Text>
                                                        <Text
                                                            fontWeight={400}
                                                            fontSize="12px"
                                                            lineHeight="20px"
                                                            whiteSpace="nowrap"
                                                            overflow="hidden"
                                                            color={"rgba(164, 164, 164, 1)"}
                                                        >
                                                            {item.pharmacy_address}
                                                        </Text>
                                                    </HStack>

                                                    {item.technician ? (
                                                        <HStack gap="5px">
                                                            <Box color={decisionData.color} display="flex" alignItems="center">
                                                                <decisionData.svg />
                                                            </Box>
                                                            <Text
                                                                fontWeight={500}
                                                                fontSize="12px"
                                                                color={decisionData.color}
                                                            >
                                                                {decisionData.time}
                                                            </Text>
                                                        </HStack>
                                                    ) : (
                                                        <Text fontSize="12px" color="rgba(28, 28, 28, 0.4)">
                                                            —
                                                        </Text>
                                                    )}
                                                </HStack>
                                            </Box>
                                        );
                                    })}
                                </VStack>
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </Box >
    );
};
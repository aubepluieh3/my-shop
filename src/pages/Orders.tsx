import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Box, Text, Flex, Image, Spinner, Divider, Tag } from "@chakra-ui/react";
import { Order } from "./MyPage";

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get("/payments/my");
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Flex direction="column" align="center" mt={10} px={4}>
            <Box
                width="750px"
                p={8}
                bg="white"
            >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    mb={6}
                    textAlign="center"
                >
                    전체 주문 내역
                </Text>

                {loading ? (
                    <Flex justify="center" py={20}>
                        <Spinner size="xl" />
                    </Flex>
                ) : orders.length === 0 ? (
                    <Text
                        color="gray.400"
                        textAlign="center"
                        fontSize="lg"
                        py={10}
                    >
                        주문 내역이 없습니다.
                    </Text>
                ) : (
                    orders.map((order) => (
                        <Box
                            key={order.orderId}
                            mb={8}
                            p={6}
                            borderRadius="xl"
                            boxShadow="md"
                            bg="gray.50"
                        >

                            <Flex justify="space-between" align="center" mb={2}>
                                <Text fontSize="lg" fontWeight="bold">
                                    주문번호: {order.orderId}
                                </Text>
                                <Tag colorScheme="purple" variant="subtle">
                                    {order.createdAt.slice(0, 10)}
                                </Tag>
                            </Flex>

                            <Divider my={3} />

                            <Box>
                                {order.items.map((item, idx) => (
                                    <Flex
                                        key={idx}
                                        mb={4}
                                        p={3}
                                        borderRadius="lg"
                                        bg="white"
                                        align="center"
                                        boxShadow="sm"
                                    >
                                        <Image
                                            src={item.image || "/no-image.png"}
                                            alt={item.name}
                                            boxSize="80px"
                                            objectFit="cover"
                                            borderRadius="lg"
                                            mr={4}
                                        />

                                        <Flex direction="column" flex="1">
                                            <Text fontSize="md" fontWeight="bold">
                                                {item.name}
                                            </Text>
                                            <Text color="gray.600">
                                                수량: {item.quantity}개
                                            </Text>
                                            <Text color="gray.600">
                                                가격:{" "}
                                                {(item.price * item.quantity).toLocaleString()}원
                                            </Text>
                                            <Text color="gray.600">
                                                결제 수단:{" "}
                                                {order.method}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                ))}
                            </Box>

                            <Divider my={3} />

                            <Flex justify="flex-end">
                                <Text fontSize="lg" fontWeight="bold">
                                    총 결제 금액:{" "}
                                    {order.amount.toLocaleString()}원
                                </Text>
                            </Flex>
                        </Box>
                    ))
                )}
            </Box>
        </Flex>
    );
}
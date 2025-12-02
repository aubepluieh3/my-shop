import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "../utils/axiosInstance";
import { Flex, Box, Input, Text, Avatar, Button, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    _id: string;
    orderId: string;
    paymentKey: string;
    paymentMethod: string;
    amount: number;
    items: OrderItem[];
    status: string;
    createdAt: string;
    method: String;
}

export default function MyPage() {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState<File|null>(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(true);
    const [paymentList, setPaymentList] = useState<Order[]>([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axiosInstance.get("/payments/my");
                setPaymentList(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleSave = async () => {
        try {
        const formData = new FormData();
        formData.append("name", name);
        if (profileImage) formData.append("profileImage", profileImage);

        const res = await axiosInstance.put("/users/update", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setUser(res.data.user, token ?? "");
        setEditMode(false);
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <Flex direction="column" align="center" mt={10} px={4}>
            <Box width="600px" p={6} borderRadius="lg" boxShadow="md" bg="white" textAlign="center" mb={8}>
                <Avatar size="xl" src={
                            profileImage
                            ? URL.createObjectURL(profileImage)
                            : user?.profileImage || ""
                        }
                    mb={4}
                    mx="auto"
                />
                { !editMode ? (
                    <>
                        <Text fontSize="xl" fontWeight="bold"> {user?.name} </Text>
                        <Text color="gray.500">{user?.email}</Text>
                        <Text color="gray.500"> LEVEL {user?.level}</Text>
                        <Button mt={4} onClick={() => setEditMode(true)}>변경하기</Button>
                    </>
                ) : (<>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" mb={2} />
                        <Input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)} />
                        <Button mt={4} colorScheme="green" onClick={handleSave}>저장하기 </Button>
                    </>) 
                }
            </Box>
            <Box width="600px" p={6} borderRadius="lg" boxShadow="md" bg="white" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" mb={4}>결제 내역 </Text>

                {loading ? (
                    <Spinner />
                    ) : paymentList.length === 0 ? (
                    <Text color="gray.400">주문 내역이 없습니다.</Text>
                    ) : (
                        <>
                            {paymentList.slice(0, 2).map((item) => (
                                <Box
                                    key={item.orderId}
                                    p={4}
                                    mb={3}
                                    borderRadius="md"
                                    boxShadow="sm"
                                    textAlign="left"
                                    >
                                    <Text>🧾 주문 ID: {item.orderId}</Text>
                                    <Text>💰 금액: {item.amount.toLocaleString()}원</Text>
                                    <Text>📅 날짜: {item.createdAt.slice(0, 10)}</Text>
                                </Box>
                            ))}
                            <Button
                            mt={4}
                            variant="outline"
                            width="100%"
                            onClick={() => navigate("/orders")}
                            >
                                전체 결제 내역 보기 
                            </Button>
                    </>
                )}
            </Box>
        </Flex>
    )
}
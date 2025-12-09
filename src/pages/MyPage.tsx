import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "../utils/axiosInstance";
import { Flex, Box, Input, Text, Avatar, Button, Spinner, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FullScreenSpinner from "../components/FullScreenSpinner";

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
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState<File|null>(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(true);
    const [paymentList, setPaymentList] = useState<Order[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const toast = useToast();
    const handleConfirmDelete = async () => {
        if (!deletePassword.trim()) {
            toast({
                title: "비밀번호를 입력해주세요.",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            await axiosInstance.post("/users/delete", {
                password: deletePassword,
            });

            toast({
                title: "회원 탈퇴가 완료되었습니다.",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });

            setTimeout(() => {
                setUser(null);
                setToken(null);
                navigate("/");
            }, 1000);

        } catch (err: any) {
            console.log(err);

            if (err.response?.data?.message === "Incorrect password") {
                toast({
                    title: "비밀번호가 일치하지 않습니다.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                toast({
                    title: "탈퇴 중 오류가 발생했습니다.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };


    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate])

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
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

        setUser(res.data.user);
        setToken(token ?? "");
        setEditMode(false);
        } catch (err) {
        console.log(err);
        }
    };
    
    if (loading) return <FullScreenSpinner/>
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
            <Button mt={6} colorScheme="red" variant="outline" width="600px" onClick={() => setIsDeleteModalOpen(true)}>
                회원 탈퇴하기
            </Button>
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>회원 탈퇴</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={2}>정말로 탈퇴하시겠습니까?</Text>
                        <Text fontSize="sm" color="gray.500" mb={4}>계속하려면 비밀번호를 입력해주세요.</Text>
                        <Input type="password" placeholder="비밀번호 입력" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={() => { setDeletePassword(""); setIsDeleteModalOpen(false)}}> 취소 </Button>
                        <Button colorScheme="red" onClick={handleConfirmDelete}>탈퇴하기</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
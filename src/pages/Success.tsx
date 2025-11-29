import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axiosInstance from "../utils/axiosInstance";

export default function Success() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        const paymentKey = params.get("paymentKey");
        const orderId = params.get("orderId");
        const amount = params.get("amount");
        const itemsParam = params.get("items");
        const items = itemsParam ? JSON.parse(itemsParam) : [];    

        const confirmPayment = async () => {
            try {
                const res = await axiosInstance.post("/payments/confirm", {
                    paymentKey,
                    orderId,
                    amount,
                    items
                });
                console.log("💾 DB 저장 완료:", res.data);
                clearCart();
            } catch (err) {
                console.error(err);
            }
        };
        confirmPayment();
    }, [params, clearCart]);

    return (
        <Box p={8} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
            ✅ 결제 완료
        </Text>
        <Text mb={6}>주문이 성공적으로 처리되었습니다.</Text>
        <Button bg="blue.300" color="white" onClick={() => navigate("/")}>
            홈으로 돌아가기
        </Button>
        </Box>
    );
}
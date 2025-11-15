import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export default function Success() {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        clearCart();        // 결제 성공 시 장바구니 초기화
    }, [clearCart]);

    const navigate = useNavigate();

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

import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Fail() {
    const navigate = useNavigate();
    return (
        <Box p={8} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
            ❎ 결제 실패
        </Text>
        <Text mb={6}>다시 주문 부탁드립니다.</Text>
        <Button bg="blue.300" color="white" onClick={() => navigate("/")}>
            홈으로 돌아가기
        </Button>
        </Box>
    );
}
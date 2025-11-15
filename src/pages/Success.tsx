import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Success() {
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

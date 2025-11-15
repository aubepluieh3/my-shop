import { Box, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";

export default function Checkout() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        🧾 주문 확인
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">장바구니가 비어있어요 🥲</Text>
      ) : (
        <Box>
          {items.map((item) => (
            <Flex key={item.id} justify="space-between" mb={3}>
              <Text>{item.name} x {item.quantity}</Text>
              <Text>{(item.price * item.quantity).toLocaleString()}원</Text>
            </Flex>
          ))}

          <Divider my={4} />

          <Flex justify="space-between" fontWeight="bold">
            <Text>총 금액</Text>
            <Text>{total.toLocaleString()}원</Text>
          </Flex>

          <Button
            colorScheme="teal"
            size="lg"
            mt={6}
            w="100%"
            onClick={() => {
              alert(`총 결제 금액: ${total.toLocaleString()}원`);
              useCartStore.getState().items = []; // 장바구니 초기화
            }}
          >
            Toss 결제 테스트
          </Button>
        </Box>
      )}
    </Box>
  );
}
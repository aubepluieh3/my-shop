import { Box, Flex, Text, Button, Image, Divider } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        🛒 장바구니
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">장바구니가 비어있어요 🥲</Text>
      ) : (
        <Box>
          {items.map((item) => (
            <Box key={item.id} mb={4}>
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={4}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text color="gray.600">
                      {item.price.toLocaleString()}원
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap={3}>
                  <Button
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    colorScheme="red"
                    variant="outline"
                  >
                    삭제
                  </Button>
                  <Button size="sm" onClick={()=> decreaseItem(item.id)}>
                    -
                  </Button>
                  <Text>{item.quantity}개</Text>
                  <Button
                    size="sm"
                    onClick={() => addItem(item)}
                    colorScheme="teal"
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
              <Divider my={3} />
            </Box>
          ))}

          <Flex justify="flex-end" mt={6}>
            <Text fontSize="xl" fontWeight="bold">
              총 금액: {total.toLocaleString()}원
            </Text>
          </Flex>
          <Flex justify="flex-end" mt={4}>
            <Button colorScheme="teal" onClick={() => navigate("/checkout")}>
              결제하기
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

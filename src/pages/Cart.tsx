import { Box, Flex, Text, Button, Image, Divider, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useRef } from "react";


export default function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const handleCheckout = () => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    navigate("/checkout");
  }


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
                    bg="blue.300"
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
          <Button bg="blue.800" color="white" onClick={handleCheckout}>
            결제하기
          </Button>
          </Flex>
        </Box>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              로그인 필요 
            </AlertDialogHeader>

            <AlertDialogBody>
              로그인이 필요한 서비스입니다.  
              로그인 페이지로 이동할게요.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box>
  );
}

import { useParams } from "react-router-dom";
import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";
import { products } from "../data/products"; // 상품 목록 불러오는 곳

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return <Text>상품을 찾을 수 없습니다 😢</Text>;
  }

  return (
    <Box p={8}>
      <VStack spacing={6}>
        <Image
          src={product.image}
          alt={product.name}
          boxSize="300px"
          objectFit="cover"
          borderRadius="lg"
        />

        <Text fontSize="2xl" fontWeight="bold">
          {product.name}
        </Text>

        <Text fontSize="xl" color="gray.700">
          {product.price.toLocaleString()}원
        </Text>

        <Button
          bg="blue.800"
          color="white"
          onClick={() => addItem(product)}
        >
          장바구니 담기
        </Button>
      </VStack>
    </Box>
  );
}

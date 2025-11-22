import { useParams } from "react-router-dom";
import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { Product, useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/productApi";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      if (!id) return;
      const data = await fetchProductById(Number(id));
      setProduct({ ...data, id: data.id.toString() }); // id string 변환
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>상품을 찾을 수 없습니다 😢</Text>;

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

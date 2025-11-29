import { useNavigate, useParams } from "react-router-dom";
import { Box, Image, Text, Button, VStack, HStack, IconButton, Input } from "@chakra-ui/react";
import { Product, useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/productApi";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import FullScreenSpinner from "../components/FullScreenSpinner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

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

  if (loading) return <FullScreenSpinner/>
  if (!product) return <Text>상품을 찾을 수 없습니다 😢</Text>;

  const finalPrice = product.discountRate 
    ? Math.round(product.price * (1 - product.discountRate / 100))
    : product.price;

  const handleBuyNow = () => {
    navigate("/checkout", {state: { products: [{ ...product, price: finalPrice, quantity }] }, });
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
          {product.discountRate && (
            <Text as="span" color="red.500" mr={2}>
              {product.discountRate}%
            </Text>
          )}
          {finalPrice.toLocaleString()}원
        </Text>

        <HStack>
          <IconButton
            icon={<MinusIcon />}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            aria-label="decrease"
          />
          <Input
            value={quantity}
            readOnly
            width="50px"
            textAlign="center"
          />
          <IconButton
            icon={<AddIcon />}
            bg="blue.300"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="increase"
          />
        </HStack>

        <HStack spacing={4}>
          <Button
            bg="green.300"
            color="white"
            onClick={() => addItem({ ...product, price: finalPrice, quantity})}
          >
            장바구니 담기
          </Button>
          <Button bg="orange.300" color="white" onClick={handleBuyNow}>
              바로 결제하기
          </Button>
        </HStack>    
      </VStack>
    </Box>
  );
}

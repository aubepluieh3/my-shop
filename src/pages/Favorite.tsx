import { Box, SimpleGrid, Text, VStack, Image} from "@chakra-ui/react";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useEffect, useState } from "react";
import { Product } from "../store/useCartStore";
import { fetchProducts } from "../api/productApi";
import FullScreenSpinner from "../components/FullScreenSpinner";

export default function Favorite() {

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!loading && allProducts.length > 0) {
      setFavoriteProducts(
        allProducts.filter((p) => favorites.includes(p.id))
      );
    }
  }, [loading, allProducts, favorites]);

  if (loading) return <FullScreenSpinner/>

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        💗 좋아요
      </Text>
      {favoriteProducts.length === 0 ? (
        <Text color="gray.500">좋아요 목록이 비어있어요 🥲</Text>
      ): (
        <SimpleGrid columns={[2, 3, 4]} spacing={0}>
          {favoriteProducts.map((product) => {
              
            // 👈 [핵심] finalPrice 계산을 map 내부에서 수행
            const finalPrice = product.discountRate
              ? Math.round(product.price * (1 - product.discountRate / 100))
              : product.price;

            return (
              <Box
                key={product.id}
                h="280px"
                border="1px solid #e0e0e0"
                display="flex"
                flexDirection="column"
                position="relative"
              >
                <VStack spacing={2} p={3} align="center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="180px"
                    objectFit="cover"
                  />
                  <Text fontWeight="bold" noOfLines={1}>
                    {product.name}
                  </Text>
                  {product.discountRate ? (
                    <Text fontWeight="bold">
                      <Text as="span" color="red.500">{product.discountRate}%</Text> {finalPrice.toLocaleString()}원
                    </Text>
                  ) : (
                    <Text fontWeight="bold">{finalPrice.toLocaleString()}원</Text>
                  )}
                </VStack>
                <Box
                  position="absolute"
                  bottom="8px"
                  right="8px"
                  fontSize="1.5rem"
                  color="red.500"
                  onClick={ () => toggleFavorite(product.id)}
                >
                  ♥
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      )
    }
    </Box>
  );
}
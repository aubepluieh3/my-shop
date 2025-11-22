import { Box, SimpleGrid, Text, VStack, Image} from "@chakra-ui/react";
import { products } from "../data/products";
import { useFavoriteStore } from "../store/useFavoriteStore";

export default function Favorite() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  return (
      <Box p={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          💗 좋아요
        </Text>
        {favorites.length === 0 ? (
          <Text color="gray.500">좋아요 목록이 비어있어요 🥲</Text>
        ): (        <SimpleGrid columns={[2, 3, 4]} spacing={0}>
          {favoriteProducts.map((product) => (
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
                <Text color="gray.600">{product.price.toLocaleString()}원</Text>
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
          ))}
        </SimpleGrid>
        )
      }
      </Box>
    );
}
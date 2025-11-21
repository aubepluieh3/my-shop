import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFavoriteStore } from "../store/useFavoriteStore";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    discountRate?: number;
    image: string;
}


const ProductCard = ({id, name, price, discountRate, image} : ProductCardProps) => {
    const navigate = useNavigate();
    const favorites = useFavoriteStore((state) => state.favorites);
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
    const isFavorited = favorites.includes(id);

    const finalPrice = discountRate 
        ? Math.round(price * (1 - discountRate / 100))
        : price;

    return (
      <Box 
        height="100%" 
        flexDirection="column"
        display="flex"
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        w="200px"
        shadow="md"
        m="2px"
        onClick={() => navigate(`/product/${id}`)} 
        _hover={{ 
        m: "0px",
        shadow: "2xl",
        borderWidth: "3px",
        transform: 'translateY(-2px)',
        transition: '0.2s',
        }}
      >
        <VStack spacing={3}>
          <Image src={image} alt={name} boxSize="150px" objectFit="cover" />
          <Text fontWeight="bold" noOfLines={1}>{name}</Text>
          {discountRate ? (
            <Text fontWeight="bold">
              <Text as="span" color="red.500">{discountRate}%</Text> {finalPrice.toLocaleString()}원
            </Text>
          ) : (
            <Text fontWeight="bold">{price.toLocaleString()}원</Text>
          )}
        </VStack>
        <Box
          position="absolute"
          bottom="13px"
          right="10px"
          fontSize="2xl"
          color={isFavorited ? "red.500" : "gray.400"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        >
          {isFavorited ? "♥" : "♡"}
        </Box>
      </Box>
  );
};

export default ProductCard;


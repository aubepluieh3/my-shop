import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    discountRate?: number;
    image: string;
}


const ProductCard = ({id, name, price, discountRate, image} : ProductCardProps) => {
    const finalPrice = discountRate 
        ? Math.round(price * (1 - discountRate / 100))
        : price;

    return (
    <Box height="100%" flexDirection="column" display="flex" borderWidth="1px" borderRadius="md" p={4} w="200px" shadow="md" m="2px" _hover={{ 
      m: "0px",
      shadow: "2xl",
      borderWidth: "3px",
      transform: 'translateY(-2px)',
      transition: '0.2s',
      borderColor: 'blue.300',
    }}>
      <VStack spacing={3}>
        <Image src={image} alt={name} boxSize="150px" objectFit="cover" />
        <Text fontWeight="bold">{name}</Text>
        {discountRate ? (
          <Text fontWeight="bold">
            <Text as="span" color="red.500">{discountRate}%</Text> {finalPrice.toLocaleString()}원
          </Text>
        ) : (
          <Text fontWeight="bold">{price.toLocaleString()}원</Text>
        )}
      </VStack>
    </Box>
  );
};

export default ProductCard;


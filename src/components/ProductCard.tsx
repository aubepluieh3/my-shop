import { Box, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
}


const ProductCard = ({id, name, price, image} : ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);
    const handleAddToCart = () => {
        addItem (
            {
                id, name, price, image, quantity: 1,
            }
        );
    };
    return (
    <Box borderWidth="1px" borderRadius="md" p={4} w="200px" shadow="md" m="2px" _hover={{ 
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
        <Text color="gray.600">{price.toLocaleString()}원</Text>
        <Button bg="blue.800" color="white" size="sm" onClick={handleAddToCart}>
          장바구니 담기
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;


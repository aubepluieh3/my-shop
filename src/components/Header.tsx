import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export default function Header() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={8}
      py={4}
      bg="blue.200"
      color="white"
    >
      <Box>
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            🛍️ MyShop
          </Text>
        </Link>
      </Box>
      <Flex align="center" gap={4}>
        <Link to="/">
          <Button variant="ghost" color="white">
            홈
          </Button>
        </Link>
        <Link to="/cart">
          <Button bg="blue.800" variant="solid" color="white">
            장바구니 ({cartCount})
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
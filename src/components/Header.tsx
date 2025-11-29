import { Flex, Box, Button, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const currentLocation = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMyPage = currentLocation.pathname === '/mypage';
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/');
  };

  const renderUserAuthButton = () => {
    if (user) {
      if (isMyPage) {
        return (
          <Button colorScheme="red" variant="solid" color="white" onClick={onOpen}>
            로그아웃
          </Button>
        );
      } else {
        return (
          <Link to="/mypage">
            <Button colorScheme="blue" variant="solid" color="white">
              내 정보
            </Button>
          </Link>
        );
      }
    } else {
      return (
        <Link to="/login">
          <Button colorScheme="blue" variant="solid" color="white">
            로그인
          </Button>
        </Link>
      );
    }
  };

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={8}
      py={4}
      color="black"
    >
      <Box>
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            🛍️ oweol
          </Text>
        </Link>
      </Box>
      <Flex align="center" gap={4}>
        <Link to="/">
          <Button bg="purple.300" variant="ghost" color="white">
            홈
          </Button>
        </Link>
        <Link to="/favorite">
          <Button bg="pink.300" variant="ghost" color="white">
            좋아요
          </Button>
        </Link>
        <Link to="/cart">
          <Button bg="blue.800" variant="solid" color="white">
            장바구니 ({cartCount})
          </Button>
        </Link>
        {renderUserAuthButton()}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그아웃 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            로그아웃 하시겠습니까?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              아니요
            </Button>
            <Button colorScheme="red" onClick={handleLogout}>
              예
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
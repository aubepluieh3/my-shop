import { useRef, useState } from "react";
import { Box,Input, Button, Text,HStack, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Spinner,} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
  
    if (password.length < 6) {
      setError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }
  
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5001/api/auth/signup", { email, password });
      onOpen();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "회원가입 실패");
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        회원가입
      </Text>

      <Input
        placeholder="Email"
        mb={3}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        type="password"
        mb={3}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <Text color="red.500" mb={3}>{error}</Text>}

      <HStack spacing={3}>
        <Button
          colorScheme="blue"
          w="100%"
          onClick={handleSignUp}
          isDisabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "회원가입"}
        </Button>

        <Button
          variant="outline"
          w="100%"
          onClick={() => navigate("/login")}
          isDisabled={loading}
        >
          로그인
        </Button>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleDialogClose} 
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              🎉 회원가입 완료
            </AlertDialogHeader>

            <AlertDialogBody whiteSpace="pre-line">
              회원가입이 성공적으로 완료되었습니다. {'\n'}
              로그인 페이지로 이동합니다.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                ref={cancelRef}
                onClick={handleDialogClose}
                ml={3}
              >
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
import { useState } from "react";
import { Box, Input, Button, Text, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSignUp = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", { email, password });
      setUser(res.data.user, res.data.token);
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Text fontSize="2xl" mb={4}>회원가입</Text>
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
        <Button colorScheme="blue" w="100%" onClick={handleSignUp}>회원가입</Button>
        <Button variant="outline" w="100%" onClick={() => navigate("/login")}>로그인</Button>
      </HStack>
    </Box>
  );
}
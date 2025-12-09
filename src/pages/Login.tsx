import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import { Box, Input, Button, Text } from "@chakra-ui/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
            setUser(res.data.user);
            setToken(res.data.token);

            if (res.data.user.role === "admin") navigate("/admin");
            else navigate("/");
        } catch (error: any) {
            setError(error.response?.data?.message);
        }
    }

      return (
        <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
            <Text fontSize="2xl" mb={4}>로그인</Text>
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
            <Button colorScheme="blue" w="100%" onClick={handleLogin}>로그인</Button>
            <Button variant="outline" w="100%" onClick={() => navigate("/signup")}>회원가입</Button>
        </Box>
    );
}
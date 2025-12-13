import { Box, Button, Flex, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_API_URL } from "../constants";
const socket = io(BASE_API_URL);

interface ChatWindowProps {
    onClose: () => void;
}

interface ChatMessage {
    text: string;
    sender: "user" | "bot";
    time: string;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const addMessage = (text: string, sender: "user" | "bot") => {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setChatList(prev => [...prev, { text, sender, time }]);
    };

    useEffect(() => {
        socket.on("receive_message", (msg: ChatMessage) => {
          addMessage(msg.text, msg.sender);
        });
        return () => {socket.off("receive_message");};
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("send_message", message);
        setMessage("");
    };

    return ( 
        <Box position="fixed" bottom="80px" right="20px" w="300px" bg="white" boxShadow="lg" borderRadius="md" p={4} zIndex="1000" >
            <Flex justify="space-between" mb={3}>
                <Text fontWeight="bold">💬 채팅 상담</Text>
                <Button size="xs" colorScheme="red" onClick={onClose}> 닫기 </Button>
            </Flex> 
            <VStack align="stretch" spacing={2} mb={3} maxH="250px" overflowY="auto" >
                {chatList.map((msg, i) => (
                    <Flex key={i} justify={msg.sender === "user" ? "flex-end" : "flex-start"}>
                        <Box
                        bg={msg.sender === "user" ? "blue.100" : "gray.100"}
                        p={2}
                        borderRadius="md"
                        maxW="70%"
                        >
                        <Text fontSize="sm">{msg.text}</Text>
                        <Text fontSize="xs" textAlign="right" mt={1} color="gray.500">{msg.time}</Text>
                        </Box>
                    </Flex>
                ))}
            </VStack> 
            <Flex>
                <Input placeholder="메시지 입력" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                <Button colorScheme="blue" ml={2} onClick={sendMessage} > 전송 </Button>
            </Flex>
        </Box> 
    );
}
  
import { Box, Button, Flex, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

interface ChatWindowProps {
    onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState<String[]>([]);

    useEffect(() => {
        socket.on("receive_message", (msg) => {
        setChatList((prev) => [...prev, msg]);
        });

        return () => {
        socket.off("receive_message");
        };
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
                    <Box key={i} bg="gray.100" p={2} borderRadius="md" fontSize="sm" > {msg} </Box> 
                    ))
                } 
            </VStack> 
            <Flex>
                <Input placeholder="메시지 입력" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                <Button colorScheme="blue" ml={2} onClick={sendMessage} > 전송 </Button>
            </Flex>
        </Box> 
    );
}
  
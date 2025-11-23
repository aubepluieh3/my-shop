import { Box, IconButton } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatButton() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Box position="fixed" bottom="20px" right ="20px" zIndex="999">
                <IconButton
                    aria-label="open chat"
                    icon={<ChatIcon/>}
                    colorScheme="blue"
                    borderRadius="full"
                    size="lg"
                    onClick= {() => setOpen(!open)}
                />
            </Box>
            {open && <ChatWindow onClose={() => setOpen(false)}/>}
        </>
    );
}
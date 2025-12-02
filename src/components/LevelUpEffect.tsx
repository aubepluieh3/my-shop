import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useToast } from "@chakra-ui/react";

export default function LevelUpEffect({ level }: { level: number }) {
  const [isActive, setIsActive] = useState(true);
  const toast = useToast();

  useEffect(() => {
    toast({
      title: `레벨업! 🎉`,
      description: `LV.${level} 달성!!`,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top",
    });

    const timer = setTimeout(() => setIsActive(false), 2000);
    return () => clearTimeout(timer);
  }, [level, toast]);

  return isActive ? (
    <Confetti
    width={window.innerWidth}
    height={window.innerHeight}
    numberOfPieces={400}
    gravity={0.2}
    recycle={false}
    />
  ) : null;
}
import { Flex, Spinner } from "@chakra-ui/react";

const FullScreenSpinner = () => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      zIndex={1000}
    >
      <Spinner size="xl" thickness="4px" speed="0.75s" color="blue.500" />
    </Flex>
  );
};

export default FullScreenSpinner;

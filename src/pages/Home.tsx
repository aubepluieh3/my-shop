import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import keyringImg from "../assets/keyring.jpeg";

const sampleProducts = [
  { id: "1", name: "핑구 키링", price: 10000, image: keyringImg}
];

const Home = () => {
  return (
    <Container maxW="container.lg" py="8">
      <Heading mb="6">🛍️ welcome to sooh world</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
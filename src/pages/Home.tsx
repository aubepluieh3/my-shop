import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import keyringImg from "../assets/keyring.jpeg";
import basketballImg from "../assets/basketball.jpeg";
import keroroImg from "../assets/keroro.jpeg";
import abibImg from "../assets/abib.jpg";
const sampleProducts = [
  { id: "1", name: "핑구 키링", price: 7000, image: keyringImg},
  { id: "2", name: "아비브 어성초 패드", price: 26000, image: abibImg},
  { id: "3", name: "농구공", price: 10000, image: basketballImg},
  { id: "4", name: "케로로", price: 30000, image: keroroImg},
];
// TODO 할인 가격 표시해볼까!
const Home = () => {
  return (
    <Container maxW="container.lg" py="8">
      <Heading mb="6">🛍️ welcome to sooh world</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
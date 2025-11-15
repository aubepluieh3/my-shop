import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import keyringImg from "../assets/keyring.jpeg";
import basketballImg from "../assets/basketball.jpeg";
import keroroImg from "../assets/keroro.png";
import abibImg from "../assets/abib.jpg";
import eraImg from "../assets/era.png";
import adidasImg from "../assets/adidas.png";
import lpImg from "../assets/lp.png";
import beddingImg from "../assets/bedding.png";
const sampleProducts = [
  { id: "1", name: "핑구 키링", price: 7000, image: keyringImg},
  { id: "2", name: "슬리퍼", price: 23000, image: lpImg},
  { id: "3", name: "농구공", price: 10000, image: basketballImg},
  { id: "4", name: "케로로 티셔츠", price: 30000, discountRate: 15, image: keroroImg},
  { id: "5", name: "MLB 뉴욕 양키스 미드 크라운 볼캡 데님 블랙", price: 57000, image: eraImg},
  { id: "5", name: "이불", price: 28000, image: beddingImg},
  { id: "7", name: "아비브 어성초 패드", price: 26000, image: abibImg},
  { id: "8", name: "핸드볼 스페지알", price: 123000, image: adidasImg},
];

const Home = () => {
  return (
    <Container maxW="container.lg" py="8">
      <Heading mb="6">oweol</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
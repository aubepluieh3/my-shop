import { SimpleGrid, Container, Heading } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxW="container.lg" py="8">
      <Heading mb="6">oweol</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {products.map((product) => (
          <Link to={`/product/${product.id}`}>
            <ProductCard key={product.id} {...product} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
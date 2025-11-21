import { SimpleGrid, Container, Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import BannerSlider from "../components/BannerSlider";

const Home = () => {
  return (
    <Container maxW="container.lg" py="8">
      <Box mb={8}>
        <BannerSlider />
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
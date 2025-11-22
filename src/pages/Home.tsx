import { SimpleGrid, Container, Box } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import BannerSlider from "../components/BannerSlider";
import { Product } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      debugger;
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <Container maxW="container.lg" py="8">
      <Box mb={8}>
        <BannerSlider />
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard {...product} />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Home;
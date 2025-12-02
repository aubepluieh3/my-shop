import { SimpleGrid, Container, Box, Input,Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import BannerSlider from "../components/BannerSlider";
import { Product } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ChatButton from "../components/ChatButton";
import FullScreenSpinner from "../components/FullScreenSpinner";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState('');

  const loadProducts = async (query?: string) => {
    setLoading(true);
    try {
      const data = await fetchProducts(query);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  useEffect(() => {
    loadProducts(search || undefined);
  }, [search]);
  
  
  return (
    loading ? (
      <FullScreenSpinner/>
    ) : (
          <Container maxW="container.lg" py="8">
            <Input
              placeholder="검색어를 입력하세요"
              mb={6}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchTerm);
                }
              }}
            />
      <Box mb={8}>
        <BannerSlider />
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {products.length === 0 ? (
          <Text>검색 결과가 없습니다 😢</Text>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </SimpleGrid>
      <ChatButton />
    </Container>
      )
  );
};

export default Home;
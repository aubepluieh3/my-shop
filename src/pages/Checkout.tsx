import { Box, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "YK7Y2SpZ55rel0iCLXUH4";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const [amount, setAmount] = useState({ currency: "KRW", value: 0 });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any>(null);

  // 장바구니 총액 계산
  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setAmount({ currency: "KRW", value: total });
  }, [items]);

  // Toss 위젯 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

  // 위젯 렌더링
  useEffect(() => {
    if (!widgets) return;

    widgets.setAmount(amount);
    Promise.all([
      widgets.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
      widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
    ]).then(() => setReady(true));
  }, [widgets, amount]);


  // 결제 버튼
  const handlePayment = async () => {
    if (!widgets) return;
    try {
      await widgets.requestPayment({
        orderId: "order_" + Date.now(),
        orderName: "장바구니 상품",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "홍길동",
        customerMobilePhone: "01012341234",
      });

      clearCart(); // 결제 완료 후 장바구니 초기화
      navigate("/success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        🧾 주문 확인
      </Text>

      {items.length === 0 ? (
        <Text color="gray.500">장바구니가 비어있어요 🥲</Text>
      ) : (
        <Box>
          {items.map((item) => (
            <Flex key={item.id} justify="space-between" mb={3}>
              <Text>{item.name} x {item.quantity}</Text>
              <Text>{(item.price * item.quantity).toLocaleString()}원</Text>
            </Flex>
          ))}

          <Divider my={4} />

          <Flex align="center" justify="space-between" mb={4}>
            <Text fontWeight="bold">총 금액</Text>
            <Text fontWeight="bold">{amount.value.toLocaleString()}원</Text>
          </Flex>

          <div id="payment-method" style={{ marginBottom: "16px" }} />
          <div id="agreement" style={{ marginBottom: "16px" }} />

          <Button colorScheme="teal" w="100%" size="lg" onClick={handlePayment} isDisabled={!ready}>
            결제하기
          </Button>
        </Box>
      )}
    </Box>
  );
}

import "../styles/nav.css";
import "../styles/main.css";
import "../styles/footer.css";
import "../styles/dashboard.css";
import "../styles/menu.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

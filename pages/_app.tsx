import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import merge from "lodash.merge";
import "../styles/globals.css";

const queryClient = new QueryClient();
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      alchemyId: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Starter Kit",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const rainbowKitTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#000000",
    actionButtonBorder: "#000000",
    actionButtonBorderMobile: "#000000",
    actionButtonSecondaryBackground: "#000000",
    closeButton: "#000000",
    closeButtonBackground: "#000000",
    connectButtonBackground: "#000000",
    connectButtonBackgroundError: "#000000",
    connectButtonInnerBackground: "#000000",
  },
  radii: {
    actionButton: "5px",
    connectButton: "5px",
  },
} as Theme);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <ThemeContextProvider>
        <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </RainbowKitProvider>
      </ThemeContextProvider>
    </WagmiConfig>
  );
}

export default MyApp;

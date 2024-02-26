import { ReplicacheProvider } from "@/providers/ReplicacheProvider";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ReplicacheProvider>
        <Component {...pageProps} />
      </ReplicacheProvider>
    </MantineProvider>
  )
}

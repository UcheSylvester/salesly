import { ReplicacheProvider } from "@/providers/ReplicacheProvider";
import { themeOverride } from "@/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={themeOverride}>
      <Notifications />
      <ReplicacheProvider>
        <Component {...pageProps} />
      </ReplicacheProvider>
    </MantineProvider>
  )
}

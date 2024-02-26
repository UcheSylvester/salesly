
import { Inter } from "next/font/google";
import { Title } from "@mantine/core";
import { Counter } from "@/features/counter";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Counter />
    </>
  );
}

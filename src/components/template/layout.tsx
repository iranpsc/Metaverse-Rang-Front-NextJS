import Header from "../organsims/header";
import Footer from "../organsims/footer";
import { Video } from "@/types/api/index";

export interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header/>
        {children}
      <Footer />
    </>
  );
}

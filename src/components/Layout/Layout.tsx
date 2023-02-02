import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
    </>
  );
};

export default Layout;

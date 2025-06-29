import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-100px)] w-full transition-colors duration-300">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

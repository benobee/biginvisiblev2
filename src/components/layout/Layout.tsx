import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const Layout = ({ children, currentPath }: LayoutProps) => {
  return (
    <div className="overflow-x-hidden">
      <Header currentPath={currentPath} />
      <main className="min-h-[calc(100vh-100px)] w-full transition-colors duration-300">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

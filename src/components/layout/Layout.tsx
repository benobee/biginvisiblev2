import { useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ThemeModeContext } from '../ThemeModeContext';

const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color ${({ theme }) => theme.transitions.default};
`;

const Main = styled.main`
  min-height: calc(100vh - 100px);
  padding-top: ${({ theme }) => theme.spacing.section};
  width: 100%;
  transition: background-color ${({ theme }) => theme.transitions.default};
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLightMode } = useContext(ThemeModeContext);
  
  return (
    <LayoutWrapper className={isLightMode ? 'light-mode' : 'dark-mode'}>
      <Header />
      <Main>{children}</Main>
      <Footer isLightMode={isLightMode} />
    </LayoutWrapper>
  );
};

export default Layout;

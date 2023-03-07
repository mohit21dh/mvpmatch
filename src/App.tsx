import { type FC } from 'react';
import Header from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Footer } from './components/Layout/Footer';
import { Main } from './components/Content/Main';

const App: FC = () => {
  return (
    <div className='App min-h-screen flex flex-col'>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;

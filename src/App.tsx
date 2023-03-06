import './App.css';
import Header from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Footer } from './components/Layout/Footer';
import { Main } from './components/Content/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
      
      <Footer />
    </div>
  );
}

export default App;

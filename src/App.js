import Crud from './components/Crud/crud';
import Footer from './components/Footer';
import Header from './components/Header';
import "./index.css"

function App() {
  return (
    <body>
      <div>
        <Header />
        <Crud />
      </div>
      <Footer />
    </ body>
  );
}

export default App;

import logo from "./logo.svg";
import Product from "./components/Product";

function App() {
  return (
    <div className="container">
      <header className="row justify-content-center p-5">
        <hr />
        <h3>Product React JS</h3>
        <hr />
        <img src={logo} className="App-logo" alt="logo" height={100} />
        <Product />
        <hr />
      </header>
    </div>
  );
}

export default App;

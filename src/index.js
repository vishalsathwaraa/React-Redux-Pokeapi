import ReactDOM from "react-dom";
import "./index.css";
import PokeApp from "./PokeApi/PokeApp";
import "./PokeApi/poke.css";
import "semantic-ui-css/semantic.min.css";
import pokestore from "./PokeApi/pokestrore";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={pokestore}>
    <PokeApp />
  </Provider>,
  document.getElementById("root")
);

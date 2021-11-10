import PokeData from "./PokeData";
import PokeDetails from "./PokeDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const PokeApp = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0)

  useEffect(() => {
 
    const load = async () => {
      setLoading(true);
      const result = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      // console.log(result.data.results);
      dispatch({ type: "GET_DATA", result: result.data.results });
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/:name'>
            {" "}
            <PokeDetails loading={loading} setLoading={setLoading}/>
          </Route>
          <Route path='/'>
            {" "}
            <PokeData loading={loading} setLoading={setLoading} id={id} setId={setId}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default PokeApp;

import { useState, useEffect } from "react";
import { Button, Loader } from "semantic-ui-react";
import axios from "axios";
import MovesModal from "./MovesModal";
import { useHistory, useParams } from "react-router";
import gsap from "gsap";

const PokeDetails = (props) => {
  const history = useHistory();
  const [pokeInfo, setPokeInfo] = useState([]);
  const params = useParams();
  const { name } = params;
  const { loading, setLoading } = props;
  useEffect(() => {
    const loadInfo = async () => {
      setLoading(true);
      const pokeInfo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokeInfo(pokeInfo.data);
      setLoading(false);
      gsap.from("#cards", { y: -30, opacity: 0, duration: 0.7 });
      gsap.from(".btn", { x: -50, opacity: 0, duration: 0.7 });
      gsap.from(".moves_btn", { x: 100, opacity: 0, duration: 0.7 });
      gsap.from(".moves_container", { x: 100, opacity: 0, duration: 0.7 });
    };
    loadInfo();
    return () => {
      setLoading(false);
    };
  }, []);
  // eslint-disable-next-line eqeqeq

  return (
    <>
      {pokeInfo.length !== 0 && !loading ? (
        <div className="info-container">
          <div id="cards">
            <figure className="card card--normal">
              <div className="card__image-container">
                <img
                  className="card__image"
                  src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
                  alt="{name}"
                />
              </div>

              <figcaption className="card__caption">
                <h1 className="card__name">{name}</h1>

                <h3
                  className={`card__type card--${pokeInfo.types[0].type.name}`}
                >
                  {pokeInfo.types.map((val) => (
                    <li>{val.type.name}</li>
                  ))}
                </h3>

                <table className="card__stats">
                  <tbody>
                    <tr>
                      <th>Height</th>
                      <td>{pokeInfo.height}</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>{pokeInfo.weight}</td>
                    </tr>
                    <tr>
                      <th>Moves</th>
                      <td>{pokeInfo.moves.length}</td>
                    </tr>
                    <tr>
                      <th>Ability</th>
                      <td>
                        {" "}
                        {pokeInfo.abilities.map((val, index) => (
                          <li>{val.ability.name}</li>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="card__abilities">
                  <h4 className="card__ability">
                    <span className="card__label"></span>
                  </h4>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="btn">
            {" "}
            <Button
              content="Go Back"
              color="purple"
              onClick={() => history.goBack("/")}
            ></Button>
            <MovesModal pokeInfo={pokeInfo} name={name} />
          </div>
        </div>
      ) : (
        <Loader active >Loading</Loader>
      )}
    </>
  );
};

export default PokeDetails;

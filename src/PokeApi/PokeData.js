import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Icon, Image, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
let id = 0;
const PokeData = (props) => {
  const { loading } = props;
  const [input, setInput] = useState("");
  const [show, setShow] = useState(true);
  const pokemon = useSelector((state) => state.pokemon);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.onscroll = scroll;
    window.addEventListener("scroll", toggleVisibility);
    gsap.from("section", { y: -100, opacity: 0, duration: .8 });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const add = async (offset) => {
    const result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    dispatch({ type: "PUSH_DATA", result: result.data.results });
  };

  const scroll = () => {
    var scrollY = Math.floor(window.scrollY);
    let scrollHeight = document.documentElement.scrollHeight;
    var difference = document.documentElement.scrollHeight - window.innerHeight;
    // console.log(difference - scrollY, "difference");
    if (scrollHeight !== 763 && difference - scrollY <= 2) {
      id = id + 10;
      console.log(id, "id");
      add(id);
    }
    console.log(document.documentElement.scrollHeight, "scrollHeight");
    console.log(window.innerHeight, "windowinnerHeight");
    console.log(difference, "difference");
    console.log(scrollY, "scrollY");
  };
  //  loading && console.log(pokemon[0].name, "pokemon");

  return (
    <>
      <section>
        {!loading && (
          <div className="container" id="name">
            {pokemon
              .filter((val) => {
                if (input === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(input.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, index) => {
                return (
                  <Link to={`/${val.name}`}>
                    <Card>
                      <span style={{ display: "none" }}>
                        {(pokemon[index].id = index + 1)}
                      </span>
                      <Image
                        src={`https://img.pokemondb.net/artwork/large/${val.name}.jpg`}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header className="title">{val.name}</Card.Header>
                        <Card.Meta className="pokeindex">
                          <span>PokeIndex {val.id}</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Link>
                );
              })}
          </div>
        )}
      </section>
      <div className="search">
        {show ? (
          <Icon
            className="sicon"
            size="large"
            name="search"
            onClick={() => setShow(!show)}
          />
        ) : (
          <div>
            <Input
              size="small"
              value={input}
              className={show ? "active" : "input"}
              icon="search"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search..."
            />
            <Icon className="cancel" onClick={() => setShow(true)} />
          </div>
        )}
      </div>
      {isVisible && (
        <Icon
          name="caret square up"
          className="scroll-top"
          onClick={scrollToTop}
        ></Icon>
      )}
    </>
  );
};
export default PokeData;

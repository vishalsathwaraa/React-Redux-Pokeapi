/* eslint-disable eqeqeq */
import { Button, Image, Modal } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";

const MovesModal = (props) => {
  const { pokeInfo, name } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button className="moves_btn" color="primary">
            Show Moves
          </Button>
        }
      >
      
          <Modal.Header>Moves of {name}</Modal.Header>
          <Modal.Content image>
            <Image
              size="medium"
              src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
              wrapped
            />
            <Modal.Description className="moves-column">
              {pokeInfo.length !== 0 &&
                pokeInfo.moves.map((val) => (
                  <li style={{ listStyle: "decimal" }}>{val.move.name}</li>
                ))}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MovesModal;

import React from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const Character = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [characterData, setCharacterData] = useState([]);
  const [characterScenes, setCharacterScenes] = useState([]);
  const [showScenes, setShowScenes] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [actorName, setActorName] = useState("");
  const [actorUserData, setActorUserData] = useState([]);
  const [characterId, setCharacterId] = useState();
  const [actorUserDataFiltered, setActorUserDataFiltered] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchData();
    //fetchActorUser();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/getAllPersonageInDb", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setCharacterData(res.data.personages);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching characterdata: " + error);
    }
  };

  const fetchActorUser = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/getActorsConnectedToUsers", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setActorUserData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching characterdata: " + error);
    }
  };

  function handleShowScenes(id, name) {
    const data = characterData.filter((item) => item.personageId == id);
    setCharacterScenes(data[0]);
    //console.log("Nu har vi: " + data[0].personageId);
    setSelectedCharacter(name);
    setShowScenes(true);
  }

  function editCharacter(id, name, actorName) {
    setCharacterId(id);
    setSelectedCharacter(name);
    setActorName(actorName);
    fetchActorUser();
    setShowEditForm(true);
    console.log("data: " + actorUserData);
  }

  function deleteCharacter(id) {
    try {
      const response = axios
        .delete(
          `http://localhost:8080/api/v1/admin/deletePersonage?personageId=${id}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchData);
    } catch (error) {
      console.log("error deleting: " + error);
    }
  }

  function handleEdit(event) {
    event.preventDefault();
    const userData = {
      characterName: event.currentTarget.elements.formCharacterName.value,
      actorId: event.currentTarget.elements.level.value,
    };

    try {
      const response = axios
        .put(
          "http://localhost:8080/api/v1/admin/editPersonage",
          {
            personageId: characterId,
            personageName: userData.characterName,
            actorId: userData.actorId,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchData, setShowEditForm(false));
    } catch (error) {
      console.log("eror editing character: " + error);
    }
  }

  function handleCreate(event) {
    event.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/admin/createPersonage",
          {
            personageName: event.currentTarget.elements.formCharacter.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchData, setShowCreate(false));
    } catch (error) {
      console.log("Error logging in: " + error);
    }
  }

  return (
    <>
      <h1>Manage Characters</h1>
      <br />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Character Id</th>
            <th>Production Name</th>
            <th>Character Name</th>
            <th>Actor Name</th>
            <th>Scenes</th>
            <th>Actions</th>
          </tr>
        </thead>

        {characterData.map((item) => (
          <tbody key={item.personageId}>
            <tr>
              <td>{item.personageId}</td>
              <td>{item.playName}</td>
              <td>{item.personageName}</td>
              <td>{item.actorName}</td>
              <td>
                <Button
                  onClick={() =>
                    handleShowScenes(item.personageId, item.personageName)
                  }
                >
                  Scenes
                </Button>
              </td>
              <td>
                {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                  <Button
                    onClick={() =>
                      editCharacter(
                        item.personageId,
                        item.personageName,
                        item.actorName
                      )
                    }
                  >
                    Edit
                  </Button>
                ) : (
                  ""
                )}
                {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                  <Button onClick={() => deleteCharacter(item.personageId)}>
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {showScenes ? <h3>{selectedCharacter} Scene Information</h3> : ""}
      {showScenes ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Scene Id</th>
              <th>Act Number</th>
              <th>Scene Number</th>
              <th>Scene Name</th>
            </tr>
          </thead>

          {characterScenes.scenes &&
            characterScenes.scenes.map((item) => (
              <tbody key={item.sceneId}>
                <tr>
                  <td>{item.sceneId}</td>
                  <td>{item.actNumber}</td>
                  <td>{item.sceneNumber}</td>
                  <td>{item.sceneName}</td>
                </tr>
              </tbody>
            ))}
        </Table>
      ) : (
        ""
      )}
      {showScenes ? (
        <Button onClick={() => setShowScenes(false)}>Hide Scene Info</Button>
      ) : (
        ""
      )}
      {showEditForm ? (
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3" controlId="formCharacterName">
            <Form.Label>
              <b>Character Name</b>
            </Form.Label>
            <Form.Control type="text" placeholder={selectedCharacter} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formActor">
            <Form.Label>
              <b>Actor</b>
            </Form.Label>
            <select
              id="level"
              defaultValue={actorName}
              className={`form-select`}
            >
              {actorUserData.map((type) => (
                <option key={type.actorId} value={type.actorId}>
                  {type.userName}
                </option>
              ))}
            </select>
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Edit
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
      <Button onClick={() => setShowCreate(true)}>+ Create Character</Button>
      {showCreate ? (
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3" controlId="formCharacter">
            <Form.Label>
              <b>Username</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter Character name" />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Add Character
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowCreate(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
    </>
  );
};

export default Character;

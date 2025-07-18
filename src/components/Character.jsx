import React from "react";
import {
  Button,
  Table,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import { useGlobalContext } from "./context";
import { useNavigate } from "react-router-dom";

const Character = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [characterData, setCharacterData] = useState([]);
  const [characterScenes, setCharacterScenes] = useState([]);
  const [showScenes, setShowScenes] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [actorName, setActorName] = useState("");
  const [actorUserData, setActorUserData] = useState([]);
  const [characterId, setCharacterId] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { dark, setDark } = useGlobalContext();
  const navigate = useNavigate();

  const [actorId, setActorId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChoise = (selectedOption) => {
    setSelectedOption(selectedOption);
    setActorId(selectedOption.actorId);
  };

  //Translations
  const { manageCharatersTranslation, setManageCharatersTranslation } =
    useGlobalContext();
  const { editActorTranslation, setEditActorTranslation } = useGlobalContext();
  const { createCharacterTranslation, setCreateCharacterTranslation } =
    useGlobalContext();
  const { enterCharacterNameTranslation, setEnterCharacterNameTranslation } =
    useGlobalContext();
  const { sceneInformationTranslation, setSceneInformationTranslation } =
    useGlobalContext();
  const { scenesTranslation, setScenesTranslation } = useGlobalContext();
  const { actor, setActor } = useGlobalContext();
  const { character, setCharacter } = useGlobalContext();
  const { theaterProduction, setTheaterProduction } = useGlobalContext();
  const { actions, setActions } = useGlobalContext();
  const { deleteTranslation, setDeleteTranslation } = useGlobalContext();
  const { actNumberTranslation, setActNumberTranslation } = useGlobalContext();
  const { sceneNumberTranslation, setSceneNumberTranslation } =
    useGlobalContext();
  const { sceneNameTranslation, setSceneNameTranslation } = useGlobalContext();
  const {hideSceneInfoTranslation, setHideSceneInfoTranslation} = useGlobalContext();
  const { save, setSave } = useGlobalContext();
  const {cancelTranslation, setCancelTranslation} = useGlobalContext();
  const { userName, setUserName } = useGlobalContext();
  const {addCharacterTranslation, setAddCharacterTranslation} = useGlobalContext();

  const refCharacter = useRef(null);
  const refScene = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/getAllPersonageInDb", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setCharacterData(res.data.personages);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching data: " + error);
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
          //console.log("Actor user data: " + actorUserData[0]);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching data: " + error);
        });
    } catch (error) {
      console.log("Error fetching characterdata: " + error);
    }
  };

  function handleShowScenes(id, name) {
    const data = characterData.filter((item) => item.personageId == id);
    setCharacterScenes(data[0]);
    setSelectedCharacter(name);
    setShowScenes(true);
    refScene.current?.scrollIntoView({ behaviour: "smooth" });
  }

  function editCharacter(id, name, actorName) {
    setCharacterId(id);
    setSelectedCharacter(name);
    setActorName(actorName);
    fetchActorUser();
    setShowEditForm(!showEditForm);
    //if(!showEditForm){
    refCharacter.current?.scrollIntoView({ behaviour: "smooth" });
    //}
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
        .then(fetchData)
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error deleting: " + error);
        });
    } catch (error) {
      console.log("error deleting: " + error);
    }
  }

  function handleEdit(event) {
    event.preventDefault();
    console.log("ActorId: " + actorId);
    const userData = {
      characterName: event.currentTarget.elements.formCharacterName.value,
    };

    try {
      const response = axios
        .put(
          "http://localhost:8080/api/v1/admin/editPersonage",
          {
            personageId: characterId,
            personageName: userData.characterName,
            actorId: actorId,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchData, setShowEditForm(false))
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error editing character: " + error);
        });
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
        .then(fetchData, setShowCreate(false))
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error creating: " + error);
        });
    } catch (error) {
      console.log("Error creating: " + error);
    }
  }

  function test(username) {
    setSearchResults(username);
  }

  return (
    <>
      <h1>{manageCharatersTranslation}</h1>
      <br />
      <Table striped bordered hover variant={dark} size="sm">
        <thead>
          <tr>
            <th>{character}</th>
            <th>{theaterProduction}</th>
            <th>{actor}</th>
            <th>{scenesTranslation}</th>
            {cookies.userRole == "ROLE_ADMINISTRATOR" ? <th>{actions}</th> : ""}
          </tr>
        </thead>

        {characterData.map((item) => (
          <tbody key={item.personageId}>
            <tr>
              <td>{item.personageName}</td>
              <td>{item.playName}</td>
              <td>{item.actorName}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() =>
                    handleShowScenes(item.personageId, item.personageName)
                  }
                >
                  {scenesTranslation}
                </Button>
              </td>
              {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                <td>
                  <Button
                    size="sm"
                    style={{ width: "100px", marginRight: "10px" }}
                    onClick={() =>
                      editCharacter(
                        item.personageId,
                        item.personageName,
                        item.actorName
                      )
                    }
                  >
                    {editActorTranslation}
                  </Button>
                  <Button
                    size="sm"
                    style={{ width: "100px" }}
                    variant="danger"
                    onClick={() => deleteCharacter(item.personageId)}
                  >
                    {deleteTranslation}
                  </Button>
                </td>
              ) : (
                ""
              )}
            </tr>
          </tbody>
        ))}
      </Table>
      <div ref={refScene}></div>
      {showScenes ? (
        <h3>
          {selectedCharacter} {sceneInformationTranslation}
        </h3>
      ) : (
        ""
      )}
      {showScenes ? (
        <Table striped bordered hover variant={dark} size="sm">
          <thead>
            <tr>
              <th>{actNumberTranslation}</th>
              <th>{sceneNumberTranslation}</th>
              <th>{sceneNameTranslation}</th>
            </tr>
          </thead>

          {characterScenes.scenes &&
            characterScenes.scenes.map((item) => (
              <tbody key={item.sceneId}>
                <tr>
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
        <Button onClick={() => setShowScenes(false)}>{hideSceneInfoTranslation}</Button>
      ) : (
        ""
      )}
      <br />
      <div ref={refCharacter}></div>
      {showEditForm ? (
        <Form onSubmit={handleEdit} id="editCharacter">
          <Form.Group className="mb-3" controlId="formCharacterName">
            <Form.Label>
              <b>{character}</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={selectedCharacter} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>{actor}</b>
            </Form.Label>
            <Select
              id="search"
              isMulti={false}
              options={actorUserData}
              getOptionLabel={(options) => options["userName"]}
              getOptionValue={(options) => options["actorId"]}
              onChange={handleChoise}
            />
          </Form.Group>
          <Button
            style={{ width: "70px", marginRight: "10px" }}
            variant="primary"
            type="submit"
            className="extButton"
          >
            {save}
          </Button>
          <Button
            style={{ width: "70px" }}
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowEditForm(false)}
          >
            {cancelTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
      <br />
      {cookies.userRole == "ROLE_ADMINISTRATOR" && !showCreate ? (
        <Button onClick={() => setShowCreate(true)}>+ {createCharacterTranslation}</Button>
      ) : (
        ""
      )}
      {showCreate ? (
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3" controlId="formCharacter">
            <Form.Label>
              <b>{userName}</b>
            </Form.Label>
            <Form.Control type="text" placeholder="Enter Character name" />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            {addCharacterTranslation}
          </Button>
          <Button
            variant="danger"
            type="cancel"
            className="extButton"
            onClick={() => setShowCreate(false)}
          >
            {cancelTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Character;

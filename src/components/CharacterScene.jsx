import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "./context";

const CharacterScene = () => {
  const {dark, setDark} = useGlobalContext();
  const [productionData, setProductionData] = useState([]);
  const [sceneData, setSceneData] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [showScenes, setShowScenes] = useState(false);
  const [playName, setPlayName] = useState("");
  const [showCharacters, setShowCharacters] = useState(false);
  const [sceneId, setSceneId] = useState("");
  const [sceneName, setSceneName] = useState("");
  const [characterScenes, setCharacterScenes] = useState([]);
  const [counter, setCounter] = useState(1);
  const [addCharacter, setAddCharacter] = useState(false);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    fetchData();
    
    if (playName != "") {
      fetchScenes();
      fetchPersonages();
    }
  }, [playName]);

  useEffect(() => {
    if (playName != "") {
      fetchScenes();
      if (sceneId !== null || sceneId === ""){
      showCharacter(sceneId)
    }
    }
    
  }, [characterScenes])

  

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/listAllPlay", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setProductionData(res.data);
          console.log(res.data);
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
      console.log("Error fetching userdata: " + error);
    }
  };

  const fetchScenes = async () => {
    console.log("Data fetched");
    try {
      const response = await axios
        .get(
          `http://localhost:8080/api/v1/admin/getCustomSceneList?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          console.log("Data fetched");
          setSceneData(res.data);
          if(showCharacters){
            showCharacter(sceneId)
            ref.current?.scrollIntoView({behaviour: 'smooth'});
          }
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
      console.log("Error fetching scenedata: " + error);
    }
  };

  const fetchPersonages = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/getAllPersonageInDb", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setCharacters(res.data.personages);
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

  const showCharacter = async (id) => {
    const data = sceneData.filter((item) => item.sceneId == id);
    setCharacterScenes(data[0]);
    console.log("characters: " + characterScenes + ", data: " + data);
    setSceneId(id);
    
    console.log("mmm" + sceneName + "mmm" + name)
    setShowCharacters(true);
  }

  const removeCharacterFromScene = async (personageId, sceneId) => {
    setCounter(counter + 1)
    try {
      const response = await axios
        .put(
          "http://localhost:8080/api/v1/admin/removePersonageFromScene",
          {
            personageId: personageId,
            sceneId: sceneId,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchScenes)
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error removing character: " + error);
        });
    } catch (error) {
      console.log("eror removing character: " + error);
    }
  }

  const handleAddCharacter = async (event) => {
    setCounter(counter + 1)
    event.preventDefault();
    const personageData = {
      personageId: event.currentTarget.elements.level.value,
    };

    try {
      const response = await axios
        .put(
          "http://localhost:8080/api/v1/admin/addPersonageToScene",
          {
            personageId: personageData.personageId,
            sceneId: sceneId,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchScenes)
        .catch((error) => {
          if (error.status === 493) {
                alert("Character already in scene")
          }
          if (error.status === 494) {
                alert("Actor already in scene")
          }
          if (error.status === 496) {
                alert("Character used in other production already")
          }
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error adding character: " + error);
        });
    } catch (error) {
      console.log("eror adding character: " + error);
    }
  }

  return (
    <>
      <h1>Manage characters to scene</h1>
      <br />
      <h2>Select Production to work from</h2>
      <Table striped bordered hover variant={dark}>
        <thead>
          <tr>
            <th>Theater Production</th>
            <th>Premiere</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        {productionData.map((item) => (
          <tbody key={item.playName}>
            <tr>
              <td>{item.playName}</td>
              <td>{item.premiereDate}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  onClick={() => {
                    setShowCharacters(!showCharacter), setPlayName(item.playName), fetchScenes;
                  }}
                >
                  Select
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {playName != "" ? <h2>{playName}</h2> : ""}
      {playName != "" ? (
        <Table striped bordered hover variant={dark}>
          <thead>
            <tr>
              <th>Act Number</th>
              <th>Scene Number</th>
              <th>Scene Name</th>
              <th>Characters</th>
            </tr>
          </thead>

          {sceneData.map((item) => (
            <tbody key={item.sceneId}>
              <tr>
                <td>{item.actNumber}</td>
                <td>{item.sceneNumber}</td>
                <td>{item.sceneName}</td>
                <td>
                  <Button onClick={() => {showCharacter(item.sceneId), setSceneName(item.sceneName)}}>
                    Select
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        ""
      )}
      <div ref={ref}></div>
      {showCharacters != "" ? <h2>{sceneName} selected</h2> : ""}
      {showCharacters ? (
        <Table striped bordered hover variant={dark}>
          <thead>
            <tr>
              <th>Character Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {characterScenes.personages &&
            characterScenes.personages.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{item.personageName}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        removeCharacterFromScene(item.personageId, sceneId)
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      ) : (
        ""
      )}
      {showCharacters != "" && !addCharacter ? (
        <Button onClick={() => setAddCharacter(true)}>+ Add Character</Button>
      ) : (
        ""
      )}
      {addCharacter ? 
      <Form onSubmit={handleAddCharacter}>
                <Form.Group className="mb-3" controlId="formActor">
                  <Form.Label>
                    <b>Add character</b>
                  </Form.Label>
                  <select
                    id="level"
                    className={`form-select`}
                  >
                    {characters.map((type) => (
                      <option key={type.personageId} value={type.personageId}>
                        {type.personageName}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Button variant="primary" type="submit" className="extButton">
                  Add
                </Button>
                <Button
                  variant="danger"
                  type="cancel"
                  className="extButton"
                  onClick={() => setAddCharacter(false)}
                >
                  Cancel
                </Button>
              </Form>
      : ""}
    </>
  );
};

export default CharacterScene;

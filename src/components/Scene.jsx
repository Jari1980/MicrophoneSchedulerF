import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const Scene = () => {
  const [productionData, setProductionData] = useState([]);
  const [sceneData, setSceneData] = useState();
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [playName, setPlayName] = useState("");
  const [counter, setCounter] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [sceneId, setSceneId] = useState();
  const [actNumber, setActNumber] = useState();
  const [sceneNumber, setSceneNumber] = useState();
  const [sceneName, setSceneName] = useState();
  const [createScene, setCreateScene] = useState(false);

  useEffect(() => {
    fetchData();
    if (playName != "") {
      fetchScenes(playName);
      console.log("Getting here");
    }
  }, [counter]);

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/listAllPlay", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setProductionData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching userdata: " + error);
    }
  };

  function fetchScenes(name) {
    setPlayName(name);
    try {
      const response = axios
        .get(
          `http://localhost:8080/api/v1/admin/allScenesInPlay?playName=${name}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          setSceneData(res.data.scenes);
        });
    } catch (error) {
      console.log("Error fetching userdata: " + error);
    }
  }

  function deleteScene(sceneId) {
    try {
      const response = axios
        .delete(
          `http://localhost:8080/api/v1/admin/deleteScene?sceneId=${sceneId}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(fetchScenes(playName), setCounter(counter + 1));
    } catch (error) {
      console.log("error deleting: " + error);
    }
  }

  function editScene(id, actNumb, sceneNumb, name) {
    setSceneId(id);
    setActNumber(actNumb);
    setSceneNumber(sceneNumb);
    setSceneName(name);
    setShowEdit(true);
  }

  function handleEditSubmitScene(event) {
    event.preventDefault();
    try {
      axios
        .put(
          "http://localhost:8080/api/v1/admin/editScene",
          {
            sceneId: event.currentTarget.elements.formSceneId.value,
            actNumber: event.currentTarget.elements.formActNumber.value,
            sceneNumber: event.currentTarget.elements.formSceneNumber.value,
            sceneName: event.currentTarget.elements.formSceneName.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((response) => {
          console.log("scene edited");
          setCounter(counter + 1);
          setShowEdit(!showEdit);
        });
    } catch (error) {
      console.log("Error editing scene: " + error);
    }
  }

  function handleCreateScene(event) {
     event.preventDefault();
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/admin/createScene",
          {
            playName: playName,
            actNumber: event.currentTarget.elements.formCreateActNumber.value,
            sceneNumber: event.currentTarget.elements.formCreateSceneNumber.value,
            sceneName: event.currentTarget.elements.formCreateSceneName.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((response) => {
          console.log("Scene Created");
          setCounter(counter + 1);
          setCreateScene(!createScene);
        });
    } catch (error) {
      console.log("Error creating scene: " + error);
    }
  }

  return (
    <div>
      <h1>Manage Scenes</h1>
      <br />
      <h2>Select Production to work from</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Theater Production</th>
            <th>Date Created</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        {productionData.map((item) => (
          <tbody key={item.playName}>
            <tr>
              <td>{item.playName}</td>
              <td>{item.dateCreated}</td>
              <td>{item.description}</td>
              <td>
                <Button onClick={() => fetchScenes(item.playName)}>
                  Select
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <p>PlayName: {playName}</p>
      {sceneData != null && sceneData != "" ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Scene Id</th>
              <th>Act Number</th>
              <th>Scene Number</th>
              <th>Scene Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          {sceneData.map((item) => (
            <tbody key={item.sceneId}>
              <tr>
                <td>{item.sceneId}</td>
                <td>{item.actNumber}</td>
                <td>{item.sceneNumber}</td>
                <td>{item.sceneName}</td>
                <td>
                  {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                    <Button
                      onClick={() =>
                        editScene(
                          item.sceneId,
                          item.actNumber,
                          item.sceneNumber,
                          item.sceneName
                        )
                      }
                    >
                      Edit
                    </Button>
                  ) : (
                    ""
                  )}
                  {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                    <Button onClick={() => deleteScene(item.sceneId)}>
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
      ) : (
        ""
      )}
      {showEdit ? (
        <Form onSubmit={handleEditSubmitScene}>
          <Form.Group className="mb-3" controlId="formSceneId">
            <Form.Label>
              <b>Scene Id</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneId} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formActNumber">
            <Form.Label>
              <b>Act Number</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={actNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSceneNumber">
            <Form.Label>
              <b>Scene Number</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSceneName">
            <Form.Label>
              <b>Scene Name</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneName} />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Save Scene
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowEdit(false)}
            className="extButton"
          >
            Cancel edit
          </Button>
        </Form>
      ) : (
        ""
      )}
      {playName != "" ? (
        <Button onClick={() => setCreateScene(true)}>+ Create Scene</Button>
      ) : (
        ""
      )}
      {createScene ? (
        <Form onSubmit={handleCreateScene}>
          <Form.Group className="mb-3" controlId="formCreateActNumber">
            <Form.Label>
              <b>Act Number</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={actNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCreateSceneNumber">
            <Form.Label>
              <b>Scene Number</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCreateSceneName">
            <Form.Label>
              <b>Scene Name</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneName} />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            Create Scene
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowEdit(false)}
            className="extButton"
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Scene;

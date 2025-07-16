import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "./context";

const Scene = () => {
  const { dark, setDark } = useGlobalContext();
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
  const [addAct, setAddAct] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [active, setActive] = useState("");

  //Translations
  const { theaterProduction, setTheaterProduction } = useGlobalContext();
  const { premiereDate, setPremiereDate } = useGlobalContext();
  const { description, setDescription } = useGlobalContext();
  const { actions, setActions } = useGlobalContext();
  const { editTranslation, setEditTranslation } = useGlobalContext();
  const { deleteTranslation, setDeleteTranslation } = useGlobalContext();
  const { cancelEditTranslation, setCancelEditTranslation } =
    useGlobalContext();
  const { manageActSceneTranslation, setManageActSceneTranslation } =
    useGlobalContext();
  const { selectProductionTranslation, setSelectProductionTranslation } =
    useGlobalContext();
  const { productionTranslation, setProductionTranslation } =
    useGlobalContext();
  const { actNumberTranslation, setActNumberTranslation } = useGlobalContext();
  const { sceneNumberTranslation, setSceneNumberTranslation } =
    useGlobalContext();
  const { sceneNameTranslation, setSceneNameTranslation } = useGlobalContext();
  const { saveSceneTranslation, setSaveSceneTranslation } = useGlobalContext();
  const { addActTranslation, setAddActTranslation } = useGlobalContext();
  const { numberOfScenesTranslation, setNumberOfScenesTranslation } =
    useGlobalContext();
  const { numberOfScenesToAddTranslation, setNumberOfScenesToAddTranslation } =
    useGlobalContext();

  useEffect(() => {
    fetchData();
    if (playName != "") {
      fetchScenes(playName);
      console.log("Getting here");
    }
  }, [counter]);

  useEffect(() => {
    if (playName != "") {
      //fetchScenes();
      //fetchScenes(playName);
      if (sceneId !== null || sceneId === "") {
        //showCharacter(sceneId)
      }
    }
  }, [sceneData]);

  const setActiveRow = (id) => {
    setActive(id);
  };

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
          console.log("error fetching scenedata: " + error);
        });
    } catch (error) {
      console.log("Error fetching data: " + error);
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching scenes: " + error);
        });
    } catch (error) {
      console.log("Error fetching scenes: " + error);
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
        .then((res) => {
          setCounter(counter + 1);
        })
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

  function editScene(id, actNumb, sceneNumb, name) {
    setSceneId(id);
    setActNumber(actNumb);
    setSceneNumber(sceneNumb);
    setSceneName(name);
    setShowEdit(true);
    ref.current?.scrollIntoView({ behaviour: "smooth" });
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
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          if (error.response.status === 491) {
            alert("This scene already exist");
          }
          console.log("error editing: " + error);
        });
    } catch (error) {
      console.log("Error editing scene: " + error);
    }
  }

  function handleAddAct(event) {
    event.preventDefault();
    let max = 0;
    sceneData.forEach((element) => {
      if (element.actNumber > max) {
        max = element.actNumber;
      }
    });
    const actNumber = max + 1;
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/admin/addAct",
          {
            playName: playName,
            act: actNumber,
            scenes: event.currentTarget.elements.formScenes.value,
          },
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((response) => {
          console.log("Scene Created");
          setCounter(counter + 1);
          setAddAct(!addAct);
        });
    } catch (error) {
      if (error.response.status === 401) {
        setCookie("jwtToken", "", { path: "/" });
        setCookie("userName", "", { path: "/" });
        setCookie("userRole", "", { path: "/" });
        navigate("/");
      }
      console.log("Error creating scene: " + error);
    }
  }

  /* Removing add "custom" scene possibility, this way likehood off errors is far less
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

  */
  return (
    <div>
      <h1>{manageActSceneTranslation}</h1>
      <br />
      <h2>{selectProductionTranslation}</h2>
      <Table striped bordered hover variant={dark} size="sm">
        <thead>
          <tr>
            <th>{theaterProduction}</th>
            <th>{premiereDate}</th>
            <th>{description}</th>
          </tr>
        </thead>

        {productionData.map((item) => (
          <tbody key={item.playName}>
            <tr
            className={
                    active == item.playName ? "table-success" : { dark }
                  }
                  onClick={() => {
                    fetchScenes(item.playName), setActiveRow(item.playName);
                  }}
            >
              <td>{item.playName}</td>
              <td>{item.premiereDate}</td>
              <td>{item.description}</td>
            </tr>
          </tbody>
        ))}
      </Table>
      {playName != "" ? <b>{productionTranslation}: {playName}</b> : ""}

      {sceneData != null && sceneData != "" ? (
        <Table striped bordered hover variant={dark} size="sm">
          <thead>
            <tr>
              <th>{actNumberTranslation}</th>
              <th>{sceneNumberTranslation}</th>
              <th>{sceneNameTranslation}</th>
              <th>{actions}</th>
            </tr>
          </thead>

          {sceneData.map((item) => (
            <tbody key={item.sceneId}>
              <tr>
                <td>{item.actNumber}</td>
                <td>{item.sceneNumber}</td>
                <td>{item.sceneName}</td>
                <td>
                  {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                    <Button
                      size="sm"
                      style={{ width: "70px", marginRight: "10px" }}
                      onClick={() =>
                        editScene(
                          item.sceneId,
                          item.actNumber,
                          item.sceneNumber,
                          item.sceneName
                        )
                      }
                    >
                      {editTranslation}
                    </Button>
                  ) : (
                    ""
                  )}
                  {cookies.userRole == "ROLE_ADMINISTRATOR" ? (
                    <Button
                      size="sm"
                      style={{ width: "70px" }}
                      variant="danger"
                      onClick={() => deleteScene(item.sceneId)}
                    >
                      {deleteTranslation}
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
      {showEdit ? <b>{sceneName}</b> : ""}
      {showEdit ? (
        <Form onSubmit={handleEditSubmitScene}>
          <Form.Group className="mb-3" controlId="formSceneId">
            <Form.Label></Form.Label>
            <Form.Control type="text" defaultValue={sceneId} hidden />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formActNumber">
            <Form.Label>
              <b>{actNumberTranslation}</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={actNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSceneNumber">
            <Form.Label>
              <b>{sceneNumberTranslation}</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneNumber} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSceneName">
            <Form.Label>
              <b>{sceneNameTranslation}</b>
            </Form.Label>
            <Form.Control type="text" defaultValue={sceneName} />
          </Form.Group>
          <Button
            style={{ marginRight: "10px" }}
            variant="primary"
            type="submit"
            className="extButton"
          >
            {saveSceneTranslation}
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowEdit(false)}
            className="extButton"
          >
            {cancelEditTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
      <div ref={ref}></div>
      <br />
      {playName != "" && !addAct ? (
        <Button onClick={() => setAddAct(true)}>+ {addActTranslation}</Button>
      ) : (
        ""
      )}
      {addAct ? (
        <Form onSubmit={handleAddAct}>
          <Form.Group className="mb-3" controlId="formScenes">
            <Form.Label>
              <b>{numberOfScenesTranslation}</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={numberOfScenesToAddTranslation}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="extButton">
            {addActTranslation}
          </Button>
          <Button
            variant="danger"
            onClick={() => setAddAct(false)}
            className="extButton"
          >
            {cancelEditTranslation}
          </Button>
        </Form>
      ) : (
        ""
      )}
      {/*  Removing add "custom" scene possibility, this way likehood off errors is far less
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
            onClick={() => setCreateScene(false)}
            className="extButton"
          >
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
        */}
    </div>
  );
};

export default Scene;

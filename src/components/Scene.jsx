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
  

  useEffect(() => {
    fetchData();
    if(playName != ""){
        fetchScenes(playName)
        console.log("Getting here")
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
          //setLoadData(true);
        });
    } catch (error) {
      console.log("Error fetching userdata: " + error);
    }
  }

  function deleteScene(sceneId){
    try {
      const response = axios
        .delete(
          `http://localhost:8080/api/v1/admin/deleteScene?sceneId=${sceneId}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then(
            fetchScenes(playName),
            setCounter(counter + 1),
            console.log("mmmm"));
    } catch (error) {
      console.log("error deleting: " + error);
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
    </div>
  );
};

export default Scene;

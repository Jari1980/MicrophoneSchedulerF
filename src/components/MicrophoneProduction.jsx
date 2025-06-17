import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button, Table, Form, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const MicrophoneProduction = () => {
  const [productionData, setProductionData] = useState([]);
  const [microphoneData, setMicrophoneData] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [playName, setPlayName] = useState("");

  useEffect(() => {
    fetchData();
    //fetchPersonages();
    if (playName != "") {
      fetchMicrophoneData();
    }
  }, [playName]);

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
      console.log("Error fetching data: " + error);
    }
  };

  const fetchMicrophoneData = async () => {
    try {
      const response = await axios
        .get(
          `http://localhost:8080/api/v1/admin/getCustomMicrophoneList?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          console.log("Data fetched");
          setMicrophoneData(res.data);
        });
    } catch (error) {
      console.log("Error fetching scenedata: " + error);
    }
  };

  return (
    <>
      <h1>Manage Microphone in production</h1>
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
                <Button
                  onClick={() => {
                    setPlayName(item.playName), fetchMicrophoneData;
                  }}
                >
                  Select
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {playName != "" ? (
        <h2>{playName}, scenes with assigned characters</h2>
      ) : (
        ""
      )}
      {playName != "" ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Scene</th>
              <th>Character</th>
              <th>User</th>
              <th>Microphone</th>
              <th>Microphone Action</th>
            </tr>
          </thead>

          {microphoneData.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.sceneName}</td>
                <td>{item.personageName}</td>
                <td>{item.userName}</td>
                <td>{item.microphoneName}</td>
                <td>
                  <Button onClick={() => showCharacter(item.sceneId)}>
                    Add
                  </Button>
                  <Button onClick={() => showCharacter(item.sceneId)}>
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
    </>
  );
};

export default MicrophoneProduction;

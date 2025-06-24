import { Button, Table, Form, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";

const ActorScenes = () => {
  const { bgColor, setBgColor } = useGlobalContext();
  const { dark, setDark } = useGlobalContext();
  const [productionData, setProductionData] = useState([]);
  const [microphoneSchedule, setMicrophoneSchedule] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [showMicrophoneSchedule, setShowMicrophoneSchedule] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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
      console.log("Error fetching productiondata: " + error);
    }
  };

  function fetchActorData(playName) {
    try {
      axios
        .get(
          `http://localhost:8080/api/v1/actor/actorScenes?playName=${playName}`,
          {
            headers: { Authorization: `Bearer ${cookies.jwtToken}` },
          }
        )
        .then((res) => {
          setMicrophoneSchedule(res.data.actorScenes);
          setShowMicrophoneSchedule(!showMicrophoneSchedule);
        });
    } catch (error) {
      console.log("Error editing scene: " + error);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: bgColor,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <br />
          <h1>Microphone Schedule</h1>
          <br />
          <br />
          <h3>Productions</h3>
          <Table striped bordered hover variant={dark}>
            <thead>
              <tr>
                <th>Theater Production</th>
                <th>Premiere Date</th>
                <th>Description</th>
                <th></th>
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
                      style={{ width: "70px", marginRight: "10px" }}
                      onClick={() => fetchActorData(item.playName)}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          {showMicrophoneSchedule ?
          <Table striped bordered hover variant={dark}>
            <thead>
              <tr>
                <th>Scene</th>
                <th>Character</th>
                <th>Microphone</th>
                <th></th>
              </tr>
            </thead>

            {microphoneSchedule.map((item) => (
              <tbody key={item.sceneId}>
                <tr>
                  <td>{item.sceneName}</td>
                  <td>{item.personageName}</td>
                  <td>{item.microphoneName}</td>
                  <td>
                    <Button>Comment</Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        : ""}
        {showMicrophoneSchedule ?
        <Button onClick={() => setShowMicrophoneSchedule(!showMicrophoneSchedule)}>Hide MicrophoneSchedule</Button>
    : ""}
        </div>
      </div>
    </>
  );
};

export default ActorScenes;

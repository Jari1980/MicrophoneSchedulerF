import { Button, Table, Form, Alert, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ActorScenes = () => {
  const { bgColor, setBgColor } = useGlobalContext();
  const { dark, setDark } = useGlobalContext();
  const [productionData, setProductionData] = useState([]);
  const [microphoneSchedule, setMicrophoneSchedule] = useState([]);
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [showMicrophoneSchedule, setShowMicrophoneSchedule] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [users, setUsers] = useState([]);
  const [productionName, setProductionName] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOtherSchedule, setShowOtherSchedule] = useState(false);
  const [otherMicrophoneData, setOtherMicrophoneData] = useState([]);
  const navigate = useNavigate();

  const handleChoise = (selectedOption) => {
    setSelectedOption(selectedOption);
    setUserId(selectedOption.userId);
  };

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
      console.log("Error fetching productiondata: " + error);
    }
  };

  function fetchActorData(playName) {
    setProductionName(playName);
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
      console.log("Error fetching actor data: " + error);
    }
  }

  function fetchUsers() {
    try {
      axios
        .get(`http://localhost:8080/api/v1/actor/getUsers`, {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setUsers(res.data);
          setShowOther(!showOther);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setCookie("jwtToken", "", { path: "/" });
            setCookie("userName", "", { path: "/" });
            setCookie("userRole", "", { path: "/" });
            navigate("/");
          }
          console.log("error fetching actors: " + error);
        });
    } catch (error) {
      console.log("Error fetching actors: " + error);
    }
  }

  function handleShow(event) {
    event.preventDefault();
    console.log("userId: " + userId + ", production name: " + productionName);
    try {
      axios
        .post(
          "http://localhost:8080/api/v1/actor/otherActorScenes",
          {
            userId: userId,
            playName: productionName,
          },
          {
            headers: {
              //'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
              //headers: { Authorization: `Bearer ${cookies.jwtToken}` },
              Authorization: `Bearer ${cookies.jwtToken}`,
            },
          }
        )
        .then((res) => {
          setOtherMicrophoneData(res.data.actorScenes);
          setShowOtherSchedule(true);
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
      console.log("Error fetching actor data: " + error);
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
          {showMicrophoneSchedule ? (
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
          ) : (
            ""
          )}
          {showMicrophoneSchedule ? (
            <Button
              style={{ width: "220px" }}
              onClick={() => {
                setShowOther(false),
                  setShowMicrophoneSchedule(!showMicrophoneSchedule),
                  setShowOtherSchedule(false);
              }}
            >
              Hide MicrophoneSchedule
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          {showMicrophoneSchedule && !showOther ? (
            <Button style={{ width: "220px" }} onClick={() => fetchUsers()}>
              Other Actors Schedule
            </Button>
          ) : (
            ""
          )}
          <br />
          <br />
          <br />
          {showOther ? (
            <Form onSubmit={handleShow}>
              <Form.Group
                style={{ marginLeft: "25%" }}
                className="mb-3 w-50 align-items-center justify-content-center"
                as={Row}
              >
                <Form.Label column sm={2}>
                  <b>Actor</b>
                </Form.Label>
                <Col sm={10}>
                  <Select
                    id="search"
                    isMulti={false}
                    options={users}
                    getOptionLabel={(options) => options["userName"]}
                    getOptionValue={(options) => options["userId"]}
                    onChange={handleChoise}
                  />
                </Col>
              </Form.Group>
              <Button
                style={{ width: "140px", marginRight: "10px" }}
                variant="primary"
                type="submit"
                className="extButton"
              >
                Show Schedule
              </Button>
              <Button
                style={{ width: "140px" }}
                variant="danger"
                type="cancel"
                className="extButton"
                onClick={() => {
                  setShowOtherSchedule(false), setShowOther(false);
                }}
              >
                Hide
              </Button>
            </Form>
          ) : (
            ""
          )}
          <br />
          <br />
          {showOtherSchedule ? (
            <Table striped bordered hover variant={dark}>
              <thead>
                <tr>
                  <th>Scene</th>
                  <th>Character</th>
                  <th>Microphone</th>
                </tr>
              </thead>

              {otherMicrophoneData.map((item) => (
                <tbody key={item.sceneId}>
                  <tr>
                    <td>{item.sceneName}</td>
                    <td>{item.personageName}</td>
                    <td>{item.microphoneName}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ActorScenes;

import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const UserService = () => {
  const [cookies, setCookie] = useCookies(["jwtToken", "userName", "userRole"]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const roles = [
    {
      id: 0,
      role: "DIRECTOR",
    },
    {
      id: 1,
      role: "ADMINISTRATOR",
    },
    {
      id: 2,
      role: "ACTOR",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios
        .get("http://localhost:8080/api/v1/admin/getusersandroles", {
          headers: { Authorization: `Bearer ${cookies.jwtToken}` },
        })
        .then((res) => {
          setUserData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("Error fetching userdata: " + error);
    }
  };

  function deleteUser(userId){
    console.log(userId)
  }

  
  function editUser(userId, role){
    console.log(userRole)
  }



  return (
    <>
      <p>User service</p>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        {userData.map((item) => (
          <tbody key={item.userId}>
            <tr>
              <td>{item.userId}</td>
              <td>{item.userName}</td>
              <td>
                <select
                  id="roleSet"
                  defaultValue={item.role}
                  className={`form-select`}
                >
                  {roles.map((type) => (
                    <option key={type.id} value={type.role}>
                      {type.role}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <Button onClick={() => editUser(item.userId, item.userRole)}>
                  Edit Role
                </Button>
                <Button onClick={() => deleteUser(item.userId)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};

export default UserService;

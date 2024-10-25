import React from "react";
import Card from "./components/card/card";
import axios from "axios";
import Form from "./components/form/form";
import request from "./request";

function App() {
  const [data, setData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    request
      .get("/todos")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteItem = (id) => {
    request.delete(`todos/${id}`).then((res) => {
      setData(data.filter((item) => item.id !== id));
    });
  };

  const onAddUser = (newUser) => {
    setData((prevData) => [...prevData, newUser]);
  };

  const editUser = (id) => {
    const user = data.find((item) => item.id === id);
    setCurrentUser(user);
  };

  const updateUser = (updatedUser) => {
    request
      .put(`todos/${updatedUser.id}`, updatedUser)
      .then((res) => {
        setData(
          data.map((item) => (item.id === updatedUser.id ? res.data : item))
        );
        setCurrentUser(null);
      })
      .catch((err) => {
        console.error("Error updating item:", err);
      });
  };

  return (
    <div className="container pt-[20px]">
      <Form
        onAddUser={onAddUser}
        currentUser={currentUser}
        updateUser={updateUser}
      />
      <ul className="grid grid-cols-3 gap-[40px]">
        {data?.map((item) => (
          <li key={item.id}>
            <Card editItem={editUser} removeItem={deleteItem} user={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

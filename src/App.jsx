import React from "react";
import Card from "./components/card/card";
import axios from "axios";
import Form from "./components/form/form";

function App() {
  const [data, setData] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:3600/todos")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3600/todos/${id}`).then((res) => {
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
    axios.put(`http://localhost:3600/todos/${updatedUser.id}`, updatedUser).then((res) => {
      setData(data.map((item) => (item.id === updatedUser.id ? res.data : item)));
      setCurrentUser(null); 
    }).catch((err) => {
      console.error("Error updating item:", err);
    });
  };

  return (
    <div className="container pt-[20px]">
      <Form onAddUser={onAddUser} currentUser={currentUser} updateUser={updateUser} />
      <ul className="grid grid-cols-3 gap-[40px]">
        {data.map((item) => (
          <li key={item.id}>
            <Card editItem={editUser} removeItem={deleteItem} user={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

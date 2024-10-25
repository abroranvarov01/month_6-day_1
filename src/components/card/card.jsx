import React from "react";

const Card = ({ user, removeItem, editItem }) => {
  return (
    <div className="w-[400px] border-[2px] border-violet-700 rounded-[5px] p-[20px]">
      <h1 className="text-[30px] text-violet-950 mb-[8px]">{user.name}</h1>
      <p className="text-[20px] text-violet-950">{user.email}</p>
      <button
        onClick={() => removeItem(user.id)}
        className="w-[100px] mt-[10px] border-[2px]  border-violet-700 rounded-[10px] p-[10px] text-rose-950 block"
      >
        delete
      </button>

      <button
        onClick={() => editItem(user.id)}
        className="w-[100px] mt-[10px] border-[2px]  border-violet-700 rounded-[10px] p-[10px] text-blue-950 block"
      >
        edit
      </button>
    </div>
  );
};

export default Card;

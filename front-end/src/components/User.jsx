import { useState } from "react";

export const User = () => {
  const [user, setUser] = useState({});

  const handleUserSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      };
      console.log(user);

      const response = await fetch(`${BACKEND_ENDPOINT}/user`, options);
      const data = await response.json();
      console.log(data);
    } catch {
      console.log("error");
    }

    // setUser({
    //   name: "",
    //   email: "",
    //   address: "",
    // });
    document.getElementById("my_modal_3").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        User
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">User</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              placeholder="Name"
              className="w-full input input-bordered"
            />
            <input
              onChange={handleInputChange}
              name="email"
              type="text"
              placeholder="email"
              className="w-full input input-bordered"
            />
            <input
              onChange={handleInputChange}
              name="address"
              type="text"
              placeholder="address"
              className="w-full input input-bordered"
            />
          </div>

          <button className="mt-4 btn" onClick={handleUserSubmit}>
            Sign-up
          </button>
        </div>
      </dialog>
    </>
  );
};

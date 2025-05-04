import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Register() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const handleChange = (event) => {
        const name = event.target.name;

        if (name === "avatar") {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
      
              reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
      
                img.onload = () => {
                  const MAX_WIDTH = 800;
                  const MAX_HEIGHT = 800;
                  let width = img.width;
                  let height = img.height;
      
                  if (width > height) {
                    if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                    }
                  } else {
                    if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                    }
                  }
      
                  const canvas = document.createElement("canvas");
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0, width, height);
      
                  const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8);
                  setInputs(values => ({ ...values, avatar: resizedBase64 }));
                };
              };
            }
          } else {
            setInputs(values => ({ ...values, [name]: event.target.value }));
          }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "username": inputs.username,
            "password": inputs.password,
            "email": inputs.email,
            "avatar": inputs.avatar
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "ok") {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: "success"
                    }).then(() => {
                        navigate("/");
                    });
                } else {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: "error"
                    });
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto bg-gray-900 py-5 my-5 rounded-xl">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-semibold tracking-tight text-balance text-white sm:text-5xl">Register</h2>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-1 max-w-xl">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 py-3">
                    <label className="block text-sm font-semibold text-white"> First-name:
                        <input
                            type="text"
                            name="fname"
                            value={inputs.fname || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-white"> Last-name:
                        <input
                            type="text"
                            name="lname"
                            value={inputs.lname || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-y-6 py-4">
                    <label className="block text-sm font-semibold text-white"> Username:
                        <input
                            type="text"
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-y-6 py-4">
                    <label className="block text-sm font-semibold text-white"> Password:
                        <input
                            type="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 py-4">
                    <label className="block text-sm font-semibold text-white"> Email:
                        <input
                            type="email"
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                    <label className="block text-sm font-semibold text-white"> Avatar:
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900"
                        />
                    </label>
                </div>
                <div>
                    <button type="submit" className="block w-full rounded-md bg-yellow-600 px-3.5 py-2.5 my-4 text-center text-l font-semibold text-white shadow-xs">
                        Submit
                    </button>
                </div>
                <div className='py-2 flex justify-end'>
                <a href="/login" className=' text-white text-xl uppercase'>Login</a>
              </div>
            </form>
        </div>
    );
}

export default Register;

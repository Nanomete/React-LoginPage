import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.massage}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/')
          })
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
  }, []);

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoaded) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div class="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      {/* <!-- Card start --> */}
          <div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div class="px-4 py-6">
                  <div class="text-center my-4">
                      <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                          src={user.avatar} alt=""/>
                      <div class="py-2">
                          <h3 class="font-bold text-2xl text-gray-800 dark:text-white">{user.username}</h3>
                          <h6 class="text-gray-800 dark:text-white mb-1 my-2">{user.fname} {user.lname}</h6>
                          <h6 class="text-gray-600 dark:text-white mb-1 my-2">{user.email}</h6>
                      </div>
                  </div>
              </div>
          <div class="flex text-gray-700 dark:text-gray-300 justify-center py-4">
            <button onClick={logout} className=' bg-gray-600 text-white px-3 py-2 rounded-3xl text-xl'>Logout</button>
          </div>
          </div>
      {/* <!-- Card end --> */}
  </div>
    )
  }
}

export default Profile
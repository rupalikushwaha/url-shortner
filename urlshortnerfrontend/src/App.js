// importing style
import style from "./static/css/App.module.css"
// importing components
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Home from "./pages/Home.js";

// importing hooks
import { useEffect, useState } from "react"

// importing toastr
import toastr from "toastr";

// importing router
import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  // setting state
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [shortUrl, setShortUrl] = useState(undefined);

  useEffect(() => {
    //SETTING TOASTR FOR NOTIFICATIONS
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      "opacity": "1"
    };
    authenticate()
  }, []);



  // function to make signup api call
  async function singUp(data) {
    try {
      const response = await fetch('http://localhost:6400/api/v1/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (!response.ok) {
        toastr.error(responseData.message);
      } else {
        toastr.success("Signed up Successfully");
        navigate("/users/login")
      }
    } catch (error) {
      toastr.error("Internal server error");
    }
  }

  // function to make api call to login the user
  async function login(data) {
    try {
      const response = await fetch('http://localhost:6400/api/v1/users/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (!response.ok) {
        toastr.error(responseData.message);
        navigate("/users/login")
      } else {
        localStorage.setItem("token", responseData.token)
        localStorage.setItem("username", responseData.name)
        setUsername(responseData.name)
        setIsLogged(true)
        toastr.success("Logged in Successfully");
        navigate("/");
      }
    } catch (error) {
      toastr.error("Internal server error");
    }
  }

  function authenticate() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        setIsLogged(true);
        setUsername(localStorage.getItem("username"));
      }
    } catch (e) {
      navigate("/")
    }
  }

  // function to make API call to get the short URL for the original URl
  async function getShortUrl(data) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toastr.success("PLease login to continue!");
        navigate("/users/login")
        return;
      }
      const response = await fetch('http://localhost:6400/api/v1/urls/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      if (!response.ok) {
        toastr.error(responseData.message);
      } else {
        let url = responseData.shortUrl
        setShortUrl(url)
      }
    } catch (error) {
      toastr.error("Internal server error");
    }
  }
  // ----------------------EVENT HANDLERS-------------------------

  // to handle signup form submit
  function signupFormSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    singUp(data)
  }

  // to handle login form submit
  function loginFormSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    login(data)
  }

  // on logout btn click
  function logoutBtnClickHandler() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLogged(false)
      setUsername(undefined)
      toastr.success("Logged out successfully!")
    } catch (error) {
      toastr.error("Unable to log out!")
    }
  }

  //short url from submit handler
  function shortUrlFromSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    getShortUrl(data)
  }

  return (
    <div className={style.app}>

      <Routes>
        <Route path="/" element={<Home isLogged={isLogged} username={username} logoutBtnClickHandler={logoutBtnClickHandler}
          shortUrlFromSubmitHandler={shortUrlFromSubmitHandler} shortUrl={shortUrl}
        />} />
        <Route path="/users/sign-up" element={<Signup signupFormSubmitHandler={signupFormSubmitHandler} />} />
        <Route path="/users/login" element={<Login loginFormSubmitHandler={loginFormSubmitHandler} />} />
      </Routes>

    </div>
  );
}

export default function Root() {


  return (
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  )
}

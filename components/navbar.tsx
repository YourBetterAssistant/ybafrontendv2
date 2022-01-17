import { Button, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function NavBar(): JSX.Element {
  const history = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function signOut() {
    await axios
      .get(`https://api.yourbetterassistant.me/api/auth/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getUser() {
    await axios
      .get(`https://api.yourbetterassistant.me/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }
  useEffect(() => {
    getUser();
  });
  return (
    <nav className={isOpen ? "topnav responsive" : "topnav"}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Image
        className="logo"
        alt="logo"
        src="/favicon.ico"
        height="75px"
        width="77px"
        onClick={() => history.push("/")}
      ></Image>
      <a>
        <br></br>
      </a>
      <a href="/dashboard">Dashboard</a>
      <a href="/statistics">Stats</a>
      <a href="https://dsc.gg/ybasupportserver">Support Server</a>
      <Button
        className="login"
        onClick={() => {
          isLoggedIn
            ? signOut()
            : history.push(
                `https://api.yourbetterassistant.me/api/auth/discord`
              );
        }}
      >
        {isLoggedIn ? "Sign Out" : "Login"}
      </Button>
      <a
        href="javascript:void(0);"
        className="icon"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="fa fa-bars fa-lg"></i>
      </a>
    </nav>
  );
}

import { Button, Image } from "@chakra-ui/react";
import { useState } from "react";
export default function NavBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  function isLoggedIn() {
    return new TypeError("Not Implemented");
  }
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
      ></Image>
      <a>
        <br></br>
      </a>
      <a href="/dashboard">Dashboard</a>
      <a href="/statistics">Stats</a>
      <a href="/support">Support Server</a>
      <Button
        className="login"
        onClick={() => {
          console.log("IN WORKS");
        }}
      >
        Login
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

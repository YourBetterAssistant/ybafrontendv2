/* eslint-disable @next/next/no-img-element */
import styled, { ThemedStyledProps } from "styled-components";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from "next/router";
type navProps = {
  isOpen: boolean;
};
const Nav = styled.div<navProps>`
  @media (max-width: 600px) {
    position: fixed;
    background-color: black;
    width: 100%;
    padding-bottom: ${(props) => (props.isOpen ? "9em" : "7em")};
    .logo {
      position: fixed;
      top: 2em !important;
      left: 2em;
      -webkit-filter: invert(1) !important ;
      filter: invert(1) !important ;
    }
    .content,
    .mobile,
    .login {
      color: white;
      background-color: black;
      ${(props) => (!props.isOpen ? "display: none;" : "display: block;")}
      position: relative;
      width: 100%;
      top: 4rem;
      margin-top: 1rem;
      text-align: center;
    }
    .login:hover {
      background-color: white;
      color: black;
    }
    .login {
      position: fixed;
      width: 25%;
      left: 38%;
      top: 21.75%;
    }
    .dropdown {
      position: fixed;
      height: 30px;
      width: 30px;
      right: 1rem;
      top: 2em;
    }
    .dropdown:hover {
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
    .disabled {
      pointer-events: none;
      color: gray;
    }
  }

  @media (min-width: 600px) {
    position: fixed;
    padding: 2em;
    background-color: black;
    color: white;
    width: 100%;
    .logo {
      position: relative;
      -webkit-filter: invert(1);
      filter: invert(1);
      top: 0.5rem;
    }
    .login:hover {
      background-color: white;
      color: black;
    }
    .content {
      position: relative;
      bottom: 1rem;
      margin-left: 5rem;
      cursor: pointer;
    }
    .content .disabled {
      color: gray;
    }
    .disabled {
      pointer-events: none;
      color: gray;
    }
    .login {
      position: fixed;
      display: inline-block;
      right: 60px;
      top: 35px;
    }
    .dropdown {
      display: none;
    }
  }
`;
type Pages = { currentPage: "home" };
type currentPagesF = {
  currentPage: "home" | "about" | "dashboard";
  content: string;
  mobile: boolean;
};
function CurrentPage({ currentPage, content, mobile }: currentPagesF) {
  return (
    <span
      className={
        currentPage === content.toLowerCase()
          ? `content disabled ${mobile === true ? "mobile" : ""}`
          : `content ${mobile === true ? "mobile" : ""}`
      }
      onClick={() => {
        Router.push(`/${content.toLowerCase()}`);
      }}
    >
      {content}
    </span>
  );
}
function Dropdown({ onClick }: { onClick: () => void }) {
  return (
    <svg
      width="205"
      height="154"
      viewBox="0 0 205 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dropdown"
      onClick={() => onClick()}
    >
      <rect width="205" height="28" fill="white" />
      <rect y="63" width="205" height="28" fill="white" />
      <rect y="126" width="205" height="28" fill="white" />
    </svg>
  );
}
export default function NavBar({ currentPage }: Pages) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    window.innerWidth < 600 ? setMobile(true) : setMobile(false);
    window.addEventListener("resize", () => {
      window.innerWidth < 600 ? setMobile(true) : setMobile(false);
    });
  }, [mobile]);
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <Nav isOpen={isOpen}>
        <img
          className="logo"
          src="/favicon.ico"
          width="30px"
          height="30px"
          alt="logo"
        />
        <CurrentPage mobile={mobile} content="Home" currentPage={currentPage} />
        <CurrentPage
          mobile={mobile}
          content="Dashboard"
          currentPage={currentPage}
        />
        <CurrentPage
          mobile={mobile}
          content="About"
          currentPage={currentPage}
        />
        <Dropdown onClick={() => setIsOpen(!isOpen)} />
        <Button className="login" bgColor={"white"} color="black">
          Login
        </Button>
      </Nav>
    </>
  );
}

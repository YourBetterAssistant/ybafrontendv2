/* eslint-disable @next/next/no-img-element */
import styled, { ThemedStyledProps } from "styled-components";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
type navProps = {
  isOpen: boolean;
};
const Nav = styled.div<navProps>`
  @media (max-width: 500px) {
    position: fixed;
    background-color: black;
    width: 100%;
    padding-bottom: ${(props) => (props.isOpen ? "9em" : "5em")};
    .logo {
      position: fixed;
      top: 2em !important;
      left: 2em;
      -webkit-filter: invert(1) !important ;
      filter: invert(1) !important ;
    }
    .login {
      display: none;
    }
    .content {
      display: none;
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
  }

  @media (min-width: 501px) {
    position: fixed;
    padding: 2em;
    background-color: black;
    color: white;
    width: 100%;
    .logo {
      -webkit-filter: invert(1);
      filter: invert(1);
    }
    .content {
      position: relative;
      margin-left: 2rem;
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
};
function CurrentPage({ currentPage, content }: currentPagesF) {
  return (
    <span
      className={
        currentPage === content.toLowerCase() ? "content disabled" : "content"
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
        <CurrentPage content="Home" currentPage={currentPage} />
        <CurrentPage content="Dashboard" currentPage={currentPage} />
        <CurrentPage content="About" currentPage={currentPage} />
        <Dropdown onClick={() => setIsOpen(!isOpen)} />
        <Button className="login" bgColor={"white"} color="black">
          Login
        </Button>
      </Nav>
    </>
  );
}

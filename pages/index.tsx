import type { NextPage } from "next";
import { FC } from "react";
import { useEffect, useState } from "react";
import Ybahead from "../components/head";
import NavBar from "../components/navbar";
import { useRouter } from "next/router";
import axios from "axios";
const { get } = axios;
type effect = {
  window: Window;
};
async function getURL() {
  const url = await get("/api");
  return url.data;
}
const Home: FC<NextPage> = () => {
  const [url, setURL] = useState<string>();
  const { asPath } = useRouter();
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
  });
  return (
    <>
      <Ybahead
        documentPage="Home"
        pageDescription="Home Page Of YourBetterAssistant"
        window={url + asPath}
      />
      <NavBar currentPage="home" />
    </>
  );
};

export default Home;

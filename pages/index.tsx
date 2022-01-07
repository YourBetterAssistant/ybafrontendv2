import type { NextPage } from "next";
import { FC } from "react";
import { useEffect, useState } from "react";
import Ybahead from "../components/head";
import { useRouter } from "next/router";
import axios from "axios";
import NavBar from "../components/navbar";
const { get } = axios;
type effect = {
  window: Window;
};
async function getURL() {
  const url = await get("/api");
  return url.data;
}
type navprops = {
  stringLength: number;
};
const Home: FC<NextPage> = () => {
  const [url, setURL] = useState<string>();
  const { asPath } = useRouter();
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
    window.addEventListener("offline", () => {
      alert("you are offline");
    });
  });
  return (
    <>
      <Ybahead
        documentPage="Home"
        pageDescription="Home Page Of YourBetterAssistant"
        window={url + asPath}
      />
      <NavBar />
    </>
  );
};

export default Home;

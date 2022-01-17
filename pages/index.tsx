import type { NextPage } from "next";
import { FC } from "react";
import { useEffect, useState } from "react";
import Ybahead from "../components/head";
import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
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
  const [offline, setOffline] = useState<boolean>(false);
  const { asPath } = useRouter();
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
    window.addEventListener("offline", () => {
      setOffline(true);
    });
    window.addEventListener("online", () => {
      setOffline(false);
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
      <div className="page">
        <div className="page-content">
          <div className="main">
            <h1 className="title">YourBetterAssistant</h1>
            <br />
          </div>
          <p className="questions">
            Isn&apos;t This Like Every Other Discord Bot?
          </p>
          <p className="answers">
            No, unlike the others this bot is open-source, made by me and the
            community.
          </p>

          <div className="ftitle">
            <p>Features</p>
          </div>
          <div className="featureBox">
            <h1 className="title">Economy System</h1>
            <Image alt="Economy Image" src="/assets/economy.png"></Image>
          </div>
          <div className="featureBox">
            <h1 className="title">Levelling System</h1>
            <Image alt="Levelling Image" src="/assets/level.png"></Image>
          </div>
          <div className="featureBox">
            <h1 className="title">Administration System</h1>
            <Image alt="Admin Image" src="/assets/admin.png"></Image>
          </div>
          <div className="featureBox">
            <h1 className="title">AI Chatbot</h1>
            <Image alt="Chatbot Image" src="/assets/chatbot.png"></Image>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

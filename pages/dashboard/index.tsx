import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Ybahead from "../../components/head";
import NavBar from "../../components/navbar";
import { Button, Image } from "@chakra-ui/react";
import Footer from "../../components/footer";
export default function Menu() {
  const [url, setURL] = useState<string>();
  const [user, setUser] = useState<User | null>(null);
  const [guilds, setMGuilds] = useState<Guild[]>();
  async function getUser() {
    return await axios.get(`https://api.yourbetterassistant.me/api/user`, {
      withCredentials: true,
    });
  }
  async function getURL() {
    const url = await axios.get("/api");
    return url.data;
  }
  async function getGuilds(): Promise<AxiosResponse<Guild[]>> {
    const res = await axios.get(
      `https://api.yourbetterassistant.me/api/user/guilds`,
      {
        withCredentials: true,
      }
    );

    return res;
  }

  const history = useRouter();
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
    getUser()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch(() => {
        return history.push("/");
      });
    getGuilds()
      .then((res) => {
        setMGuilds(res.data);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, [history]);
  return (
    <>
      <Ybahead
        documentPage="Dashboard"
        pageDescription="Dashboard Page Of YourBetterAssistant"
        window={url + history.asPath}
      />
      <NavBar />
      <div className="page">
        <div className="main">
          <h1 className="title">
            Welcome Back, {user?.discordTag.split("#")[0]}
          </h1>
          <br />
        </div>
        <div className="guilds-edit">
          <span>
            Current Editable Servers: {guilds ? guilds?.length : "Loading"}
          </span>
          <br />
          <br />
          <span>Choose A Server:</span>
        </div>
        <div className="guilds-list">
          {guilds ? (
            guilds?.length !== 0 ? (
              guilds?.map((guild) => (
                <div
                  key={guild.id}
                  className="guild-item"
                  onClick={() => {
                    history.push(`/dashboard/${guild.id}`);
                  }}
                >
                  <Image
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                    alt="Guild Icon"
                    width="50px"
                    height="50px"
                    className="guild-icon"
                  ></Image>
                  <p className="guild-name">{guild.name}</p>
                </div>
              ))
            ) : (
              //center the div
              <div className="error-server">
                <p>You Have No Editable Servers</p>
                <Button
                  marginBottom={"5"}
                  onClick={() => history.push("https://dsc.gg/betterassistant")}
                >
                  Add The Bot Today
                </Button>
              </div>
            )
          ) : (
            <div className="error-server">
              <p>Loading Servers...</p>
              <br />
              <br />
              <br />
              <br />
            </div>
          )}
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps({ req, res }: any) {
  //no cache
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, max-age=0, must-revalidate"
  );

  return {
    props: {},
  };
}

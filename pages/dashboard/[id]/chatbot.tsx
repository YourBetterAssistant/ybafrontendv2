import { Button } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useEffect, useState } from "react";
import Ybahead from "../../../components/head";
import NavBar from "../../../components/navbar";

export default function Chatbot() {
  const router = useRouter();
  const [url, setURL] = useState<string>();
  const [guild, setGuild] = useState<Guild | null>(null);
  const [channels, setChannels] = useState<Channel[]>();
  const [channel, setChannel] = useState<string | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const Disabled: Channel = {
    id: "disable",
    name: "Disabled",
    type: 0,
    guild_id: router.query.id ? router.query.id.toString() : "",
  };
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
      getGuild(router.query.id)
        .then((res) => {
          setGuild(res.data);
          getChannels(router.query.id)
            .then((res: AxiosResponse<Channel[]>) => {
              setChannels([...res.data, Disabled]);
            })
            .catch((err) => {
              console.log(err);
              getChannels(router.query.id)
                .then((res) => {
                  setChannels([...res.data, Disabled]);
                })
                .catch((err) => {
                  router.push("/dashboard");
                });
            });
        })
        .catch((err) => {
          console.log(err.response.data);
          router.push("/dashboard");
        });
    });
  }, []);
  async function enable(guild: Guild | null, channel: string) {
    axios.defaults.withCredentials = true;
    setDisable(true);
    if (channel === "disable") {
      await axios
        .delete(
          "https://api.yourbetterassistant.me/api/user/guilds/features/chatbot",
          {
            withCredentials: true,
            data: {
              guildID: guild?.id,
            },
          }
        )
        .catch((err) => {
          if (err.toJSON().status === 403) {
            router.push("/");
          }
        });
    } else {
      await axios
        .post(
          "https://api.yourbetterassistant.me/api/user/guilds/features/chatbot",
          {
            guildID: guild?.id,
            channelID: channel,
          },
          {
            withCredentials: true,
          }
        )
        .catch(async (err) => {
          if (err.toJSON().status === 403) {
            router.push("/");
          } else if (err.toJSON().status === 400) {
            await axios.put(
              "https://api.yourbetterassistant.me/api/user/guilds/features/chatbot",
              {
                guildID: guild?.id,
                channelID: channel,
              },
              {
                withCredentials: true,
              }
            );
          }
        });
    }
    setDisable(false);
  }
  return (
    <>
      <Ybahead
        documentPage="Dashboard Menu"
        pageDescription="Dashboard Page Of YourBetterAssistant"
        window={url + router.asPath}
      />
      <NavBar />
      <div className="page">
        <div className="main">
          <h1 className="title">
            Chatbot For {guild ? guild?.name : "Loading..."}
          </h1>
          <div className="channels-page">
            {channels?.length !== 0 ? (
              channels?.map((c) => (
                <div
                  key={c.id}
                  className={`channels-box ${
                    channel === c.id ? "selected-channel" : ""
                  }`}
                >
                  <p
                    className={`channels-name`}
                    onClick={() => setChannel(c.id)}
                  >{`#${c.name}`}</p>
                </div>
              ))
            ) : (
              <p style={{ color: "white" }}>Loading Channels</p>
            )}
          </div>
          {channel
            ? [
                <Button
                  bgColor={"green.100"}
                  key="submit"
                  onClick={async () => {
                    await enable(guild, channel);
                  }}
                  disabled={disable}
                >
                  Submit
                </Button>,
              ]
            : null}
        </div>
      </div>
    </>
  );
}
async function getGuild(
  id: string | undefined | string[]
): Promise<AxiosResponse<Guild>> {
  return await axios.get(
    `https://api.yourbetterassistant.me/api/user/guilds/${id}`,
    {
      withCredentials: true,
    }
  );
}
async function getURL() {
  const url = await axios.get("/api");
  return url.data;
}
type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
};
type User = {
  _id: string;
  discordId: string;
  discordTag: string;
  avatar: string;
  email: string;
  guilds: Guild[];
};
type overWrite = {
  id: string;
  type: number;
  allow: string;
  deny: string;
};
type Channel = {
  id: string;
  type: number;
  guild_id: string;
  name: string;
};
async function getChannels(id: string | string[] | undefined) {
  return await axios({
    method: "GET",
    url: `https://api.yourbetterassistant.me/api/user/guilds/${id}/channels/text`,
    withCredentials: true,
  });
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

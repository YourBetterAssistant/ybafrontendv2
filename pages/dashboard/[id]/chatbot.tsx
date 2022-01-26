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
  const [disabled, setDisabled] = useState<boolean>(false);
  const [channel, setChannel] = useState<string | null>(null);

  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
      getGuild(router.query.id)
        .then((res) => {
          setGuild(res.data);
          getChannels(router.query.id)
            .then((res) => {
              setChannels(res.data);
            })
            .catch((err) => {
              console.log(err);
              getChannels(router.query.id)
                .then((res) => {
                  setChannels(res.data);
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
  async function Disable(guild: string) {
    axios.defaults.withCredentials = true;
    await axios
      .delete(
        "https://api.yourbetterassistant.me/api/user/guilds/features/chatbot",
        {
          withCredentials: true,
          data: {
            guildID: guild,
          },
        }
      )
      .catch((err) => {
        if (err.toJSON().status === 403) {
          router.push("/");
        }
      });
    return setDisabled(false);
  }
  async function enable(guild: Guild) {
    axios.defaults.withCredentials = true;
    await axios
      .post(
        "https://api.yourbetterassistant.me/api/user/guilds/features/chatbot",
        {
          guildID: guild.id,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        if (err.toJSON().status === 403) {
          router.push("/");
        }
      });
    return setDisabled(true);
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
          <h1 className="title">Chatbot For {guild?.name}</h1>
        </div>
        <div className="choices">
          <p>Do you want to enable or disable chatbot?</p>
          <Button
            bgColor={"green"}
            style={{ margin: "20px" }}
            disabled={disabled}
          >
            Enable
          </Button>
          <Button
            bgColor={"red"}
            onClick={() => {
              guild ? Disable(guild.id) : console.log("error");
              setDisabled(true);
            }}
            disabled={disabled}
          >
            Disable
          </Button>
          <br />
          <p>Channel ID</p>
          <div className="channels-page">
            <Suspense fallback={<p>Loading</p>}>
              {channels
                ? channels.map((channel) => (
                    <div key={channel.id} className="channels-box">
                      <p
                        className="channels-name"
                        onClick={() => setChannel(channel.id)}
                      >{`#${channel.name}`}</p>
                    </div>
                  ))
                : null}
            </Suspense>
          </div>

          {channel
            ? [
                <Button bgColor={"green.100"} key="submit">
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
  position: number;
  permissions_overwrites: overWrite[];
  name: string;
  topic: string;
  nsfw: boolean;
  last_message_id: string | null;
  bitrate: number;
  user_limit: number;
  rate_limit_per_user: number;
  recepitents: User[];
};
async function getChannels(id: string | string[] | undefined) {
  return await axios({
    method: "GET",
    url: `https://api.yourbetterassistant.me/api/user/guilds/${id}/channels/text`,
    withCredentials: true,
  });
}

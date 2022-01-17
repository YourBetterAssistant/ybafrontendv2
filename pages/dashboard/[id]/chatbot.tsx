import { Button } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Ybahead from "../../../components/head";
import NavBar from "../../../components/navbar";

export default function Chatbot() {
  const router = useRouter();
  const [url, setURL] = useState<string>();
  const [guild, setGuild] = useState<Guild | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
    getGuild(router.query.id)
      .then((res) => {
        setGuild(res.data);
        getUser()
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            router.push("/");
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        router.push("/");
      });
  }, [router]);
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
async function getUser() {
  return await axios.get(`https://api.yourbetterassistant.me/api/user`, {
    withCredentials: true,
  });
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

import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Ybahead from "../../../components/head";
import NavBar from "../../../components/navbar";
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
const editableSettings = ["Chatbot", "Prefix", "Levelling"];
export default function PageID() {
  const router = useRouter();
  const [guild, setGuild] = useState<Guild | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [url, setURL] = useState<string>();
  const id = router.query.id;
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
    getGuild(id)
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
        router.push("/dashboard");
      });
  }, [id, router]);

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
          <h1 className="title">Dashboard For {guild?.name}</h1>
        </div>
        <div>
          <div className="rules">
            {editableSettings.map((setting) => (
              <p
                key={setting}
                className={`item`}
                onClick={() => {
                  router.push(`/dashboard/${id}/${setting.toLowerCase()}`);
                }}
              >
                {setting}
              </p>
            ))}
          </div>
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

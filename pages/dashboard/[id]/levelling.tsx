import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Ybahead from "../../../components/head";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { Button, Input } from "@chakra-ui/react";
const defaultPrefix = "b!";
export default function Level() {
  const router = useRouter();
  const [url, setURL] = useState<string>();
  const [guild, setGuild] = useState<Guild>();
  const [prefix, setPrefix] = useState<string>();

  async function getURL() {
    const url = await axios.get("/api");
    return url.data;
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
  async function postPrefix(prefix: string) {
    const id = router.query.id;
    if (prefix === defaultPrefix) {
      await axios.delete(
        "https://api.yourbetterassistant.me/api/user/guilds/features/prefix",
        {
          withCredentials: true,
          data: {
            guildID: id,
          },
        }
      );
    } else {
      await axios
        .post(
          `https://api.yourbetterassistant.me/api/user/guilds/features/prefix`,
          {
            prefix,
            guildID: id,
          },
          {
            withCredentials: true,
          }
        )
        .catch((err) => {
          if (err.toJSON().status === 400) {
            axios.put(
              `https://api.yourbetterassistant.me/api/user/guilds/features/prefix`,
              {
                prefix,
                guildID: id,
              },
              {
                withCredentials: true,
              }
            );
          } else {
            router.push("/dashbaord");
          }
        });
    }
  }
  useEffect(() => {
    getURL().then((res: { pageURL: string }) => {
      setURL(res.pageURL);
      getGuild(router.query.id)
        .then((res) => {
          setGuild(res.data);
        })
        .catch(() => {
          router.push("/dashboard");
        });
    });
  }, [router.query.id]);
  return (
    <>
      <Ybahead
        documentPage="Levelling Dashboard"
        pageDescription="Levelling Dashboard Page Of YourBetterAssistant"
        window={url + router.asPath}
      ></Ybahead>
      <Navbar />
      <div className="page">
        <div className="main">
          <div className="title">
            <p>Levelling For {guild ? guild?.name : "Loading..."}</p>
          </div>
          <br />
          <br />
          <div className="level-content">
            <Button className="level-button" bgColor={"green.300"}>
              Enable
            </Button>
            <Button className="level-button" bgColor={"red.400"}>
              Disable
            </Button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

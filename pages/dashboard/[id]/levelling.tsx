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
  const [error, setError] = useState<string | null>();

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
  async function postLevel(levelling: boolean) {
    setError(null);
    const id = router.query.id;
    if (!levelling) {
      await axios.delete(
        "https://api.yourbetterassistant.me/api/user/guilds/features/levellingEnabled",
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
          `https://api.yourbetterassistant.me/api/user/guilds/features/levellingEnabled`,
          {
            enabled: levelling,
            guildID: id,
          },
          {
            withCredentials: true,
          }
        )
        .catch(async (err) => {
          if (err.toJSON().status === 400) {
            setError("Levelling Is Already Enabled");
          } else {
            router.push("/dashboard");
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
            <Button
              className="level-button"
              bgColor={"green.300"}
              onClick={() => postLevel(true)}
            >
              Enable
            </Button>
            <Button
              className="level-button"
              bgColor={"red.400"}
              onClick={() => postLevel(false)}
            >
              Disable
            </Button>
            <br />
            <br />
            <span className="error">{error}</span>
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

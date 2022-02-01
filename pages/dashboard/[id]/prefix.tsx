import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Ybahead from "../../../components/head";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { Button, Input } from "@chakra-ui/react";
const defaultPrefix = "b!";
export default function Prefix() {
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
        documentPage="Prefix Dashboard"
        pageDescription="Prefix Dashboard Page Of YourBetterAssistant"
        window={url + router.asPath}
      ></Ybahead>
      <Navbar />
      <div className="page">
        <div className="main">
          <div className="title">
            <p>Prefix For {guild ? guild?.name : "Loading..."}</p>
          </div>
          <br />
          <br />

          <div className="prefix-content">
            <Input
              placeholder={defaultPrefix}
              width="50"
              value={prefix}
              onChange={(change) => {
                setPrefix(change.target.value);
              }}
            />
            <br />
            <Button
              bgColor={"green"}
              className="button"
              onClick={() => {
                postPrefix(prefix!);
              }}
            >
              Submit
            </Button>
            <Button
              bgGradient={"initial"}
              bgColor="green"
              className="button"
              onClick={() => {
                setPrefix(defaultPrefix);
              }}
            >
              Default
            </Button>

            <br />
            <span style={{ fontSize: "10px" }}>
              It Can Take Upto An Hour For The Changes To Take Effect
            </span>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

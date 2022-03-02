import type { NextPage } from "next";
import { FC } from "react";
import { useEffect, useState } from "react";
import Ybahead from "../components/head";
import { useRouter } from "next/router";
import d3 from "d3";
import axios from "axios";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
const { get } = axios;
async function getURL() {
  const url = await get("/api");
  return url.data;
}
type CommmandStat = [string, command];
type command = {
  name: string;
  description: string;
  aliases: string[];
  category: string;
  cooldown: number;
  memberpermissions: string;
  usage: string;
};
type interaction = {
  name: string;
  guild: boolean;
  description: string;
  permissions: boolean;
  options: {
    type: number;
    name: string;
    description: string;
    required?: boolean;
  }[];
};
const interactionOption = {
  1: "SubCommand",
  2: "SubCommand",
  3: "String",
  4: "Integer",
  5: "True|False",
  6: "User",
  7: "Channel",
  8: "Role",
  9: "Mentionable",
  10: "Number",
  11: "Attachment",
};
type InteractionStat = [string, interaction];
const Stats: FC<{ stats: string }> = ({ stats: statsRaw }) => {
  const [url, setURL] = useState<string>();
  const [clicked, setClicked] = useState<string | boolean>(false);
  const stats: [
    {
      commands: CommmandStat[];
      interaction: InteractionStat[];
    }
  ] = JSON.parse(statsRaw);
  const { asPath } = useRouter();
  useEffect(() => {
    getURL().then((res: { pageURL: string; message?: string }) => {
      setURL(res.pageURL);
    });
  }, []);
  return (
    <>
      <Ybahead
        documentPage="Stats"
        pageDescription="Stats Page Of YourBetterAssistant"
        window={url + asPath}
      />
      <NavBar />
      <div className="page">
        <div className="page-content">
          <div className="main">
            <h1 className="title">Bot Stats</h1>
            <br />
          </div>
          <div className="stats">
            <h1 className="title command">Brief:</h1>
            <p className="general-stats">
              Command Size - {stats[0]?.commands?.length}
            </p>
            <p className="general-stats">
              Slash Command Size - {stats[0]?.interaction.length}
            </p>
            <p className="general-stats">Operating System - Ubuntu 20.04 LTS</p>
            <h1 className="title command">Commands</h1>
            <div className="stats-commands">
              {stats[0]?.commands.map(([name, command]) => (
                <div
                  className={`commands content${
                    clicked == name ? " clicked" : ""
                  }`}
                  key={name}
                  onClick={() => setClicked(name == clicked ? false : name)}
                >
                  <p>
                    <span className="bold">{name}</span> - {command.description}
                  </p>
                  <p className={clicked == name ? "show" : "hidden"}>
                    <span className="bold">Usage</span>- {command.usage}
                  </p>
                  <br className={clicked == name ? "show" : "hidden"} />

                  {command.aliases ? (
                    <p className={clicked == name ? "show" : "hidden"}>
                      <span className="bold">Aliases</span> -{" "}
                      {command.aliases.join(", ")}
                    </p>
                  ) : null}
                  {command.category ? (
                    <p className={clicked == name ? "show" : "hidden"}>
                      <span className="bold">Category</span> -{" "}
                      {command.category}
                    </p>
                  ) : null}
                  {command.cooldown ? (
                    <p className={clicked == name ? "show" : "hidden"}>
                      <span className="bold">Cooldown</span> -{" "}
                      {command.cooldown}s
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <h1 className="title command">Slash Commands</h1>
            <div className="stats-commands">
              {stats[0]?.interaction
                .filter((c) => c[1].guild !== true)
                .map(([name, interaction]) => (
                  <div
                    className={`interaction content ${
                      clicked == name ? "clicked" : ""
                    }`}
                    key={name}
                    onClick={() => setClicked(name == clicked ? false : name)}
                  >
                    <p>
                      <span className="bold">{interaction.name}</span> -{" "}
                      {interaction.description}
                    </p>
                    <p className={clicked == name ? "show" : "hidden"}>
                      Options:
                    </p>
                    {interaction.options ? (
                      interaction.options.map((i) => (
                        <p
                          className={clicked == name ? "show" : "hidden"}
                          key={i.name}
                        >
                          <span className="bold">{i.name}</span> -{" "}
                          {i.description}
                        </p>
                      ))
                    ) : (
                      <p className={clicked == name ? "show" : "hidden"}>
                        Nothing Here
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Stats;
export async function getStaticProps() {
  const res: { [key: string]: any } | string = await (
    await fetch("https://api.yourbetterassistant.me/api/bot/stats", {
      method: "GET",
    })
  ).text();
  console.log(res);
  return {
    props: {
      stats: res,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

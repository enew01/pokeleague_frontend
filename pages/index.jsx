import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TeamRoster from "./team-roster";

const inter = Inter({ subsets: ["latin"] });

const allTeams = [
  [
    ["Katy", "Handle", false, true, true],
    [
      "lilligant",
      "nickname",
      "own tempo",
      "female",
      "own-tempo",
      ["petal-blizzard", "light-screen", "quiver-dance", "hyper-beam"],
    ],
    [
      "breloom",
      "nickname",
      "focus sash",
      "male",
      "effect-spore",
      ["mach-punch", "seed-bomb", "counter", "thunder-punch"],
    ],
    [
      "tsareena",
      "nickname",
      "focus sash",
      "male",
      "queenly-majesty",
      ["trop-kick", "high-jump-kick", "play-rough", "zen-headbutt"],
    ],
    [
      "arboliva",
      "nickname",
      "focus sash",
      "male",
      "seed-sower",
      ["terrain-pulse", "energy-ball", "leech-seed", "grassy-terrain"],
    ],
    [
      "sudowoodo",
      "nickname",
      "focus sash",
      "male",
      "sturdy",
      ["trailblaze", "stone-edge", "fire-punch", "ice-punch"],
    ],
  ],
  [
    ["Iono", "Handle", false, true, false],
    [
      "kilowattrel",
      "nickname",
      "focus sash",
      "male",
      "wind-power",
      ["hurricane", "quick-attack", "discharge", "tailwind"],
    ],
    [
      "bellibolt",
      "nickname",
      "focus sash",
      "male",
      "electromorphosis",
      ["water-pulse", "thunder", "reflect", "sucker-punch"],
    ],
    [
      "electrode",
      "nickname",
      "focus sash",
      "male",
      "static",
      ["foul-play", "magnet-rise", "discharge", "electric-terrain"],
    ],
    [
      "luxray",
      "nickname",
      "focus sash",
      "male",
      "intimidate",
      ["crunch", "wild-charge", "psychic-fangs", "ice-fang"],
    ],
    [
      "mismagius",
      "nickname",
      "focus sash",
      "male",
      "levitate",
      ["charge-beam", "shadow-ball", "mystical-fire", "dazzling-gleam"],
    ],
  ],
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.grid}>
          {allTeams.map((team, teamIndex) => (
            <div key={teamIndex}>
              <div>
                {team[0].map((playerInfo, infoIndex) => (
                  <div key={infoIndex}>
                    {typeof playerInfo === "boolean" ? (
                      <div>
                        {playerInfo
                          ? `Badge ${infoIndex} Status: true`
                          : `Badge ${infoIndex} Status: false`}
                      </div>
                    ) : (
                      <div>{playerInfo}</div>
                    )}
                  </div>
                ))}
              </div>
              <h2>Team {teamIndex + 1}</h2>
              <TeamRoster pokemonTeam={team.slice(1)} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
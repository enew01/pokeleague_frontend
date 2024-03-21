import React, { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

export default function TeamRoster(props) {
  const { pokemonTeam } = props;
  const [pokemonDataList, setPokemonDataList] = useState([]);

  useEffect(() => {
    const fetchDataForPokemon = async () => {
      try {
        const dataPromises = pokemonTeam.map(
          async (teamDetails, pokemonIndex) => {
            var pokemonName = teamDetails[0];
            const isAvailable = await isPokemonAvailableInRegion(pokemonName);

            const pokemonData = isAvailable
              ? await P.getPokemonByName(pokemonName)
              : null;

            if (!isAvailable || !pokemonData) {
              return {
                name: "This Pokemon is not available",
                type: [],
                movesValidity: [],
                abilityValidity: null,
              };
            }

            const type = getPokemonType(pokemonData);
            const movesValidity = checkMovesValidity(
              pokemonData,
              teamDetails[5]
            );
            const abilityValidity = checkAbilityValidity(
              pokemonData,
              teamDetails[4]
            );

            return {
              name: pokemonName,
              type,
              movesValidity,
              abilityValidity,
            };
          }
        );

        const dataResults = await Promise.all(dataPromises);
        setPokemonDataList(dataResults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForPokemon();
  }, [pokemonTeam]);

  return (
    <div>
      {pokemonDataList.map((pokemonData, index) => (
        <div key={index}>
          <p>Name: {pokemonData.name}</p>
          <p>Type: {pokemonData.type.join(", ")}</p>
          <p>
            Moves:{" "}
            {getMovesValidityString(pokemonData.movesValidity).replaceAll(
              "-",
              " "
            )}
          </p>
          <p>
            Ability:{" "}
            {getAbilityValidityString(pokemonData.abilityValidity).replaceAll(
              "-",
              " "
            )}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

const isPokemonAvailableInRegion = async (pokemonName) => {
  try {
    const response = await P.getPokedexByName("paldea");
    const regionData = response.pokemon_entries.map(
      (entry) => entry.pokemon_species.name
    );
    return regionData.includes(pokemonName);
  } catch (error) {
    console.error("Error checking Pokemon availability:", error);
    return true; // Assume the Pokemon is available to handle the failure case
  }
};

const getPokemonType = (pokemonData) => {
  return pokemonData.types.map((type) => type.type.name);
};

const checkMovesValidity = (pokemonData, moves) => {
  const validMoves = moves.map((move) => {
    const moveData = pokemonData.moves.find((m) => m.move.name === move);
    return moveData &&
      moveData.version_group_details.some((detail) =>
        detail.version_group.name.includes("scarlet-violet")
      )
      ? move
      : null;
  });
  return validMoves;
};

const checkAbilityValidity = (pokemonData, ability) => {
  return pokemonData.abilities.some((a) => a.ability.name === ability)
    ? ability
    : null;
};

const getMovesValidityString = (movesValidity) => {
  return movesValidity
    .map((move) => (move !== null ? move : "This Move is Invalid"))
    .join(", ");
};

const getAbilityValidityString = (abilityValidity) => {
  return abilityValidity !== null ? abilityValidity : "Invalid ability";
};

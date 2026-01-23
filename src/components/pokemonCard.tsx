import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import {
  pokemonCardPropType,
  pokemonDetailedInfoType,
  pokemonLimitedInfoType,
} from "../utils/types";
import { generateCustomStyle, styles } from "../utils/styles";

export default function PokemonCard({
  pokemon,
  cardHeight,
  cardWidth,
}: pokemonCardPropType) {
  const blankPokemonDetailObject = {
    name: "",
    url: "",
    image: "",
    types: [{ slot: 0, type: { name: "", url: "" } }],
  };
  const [detailedPokemonInfo, setDetailedPokemonInfo] =
    useState<pokemonDetailedInfoType>(blankPokemonDetailObject);

  async function fetchDetails(pokemonToFetch: pokemonLimitedInfoType) {
    try {
      const response = await fetch(pokemonToFetch.url);
      const data = await response.json();
      const image = data.sprites.front_default;
      const types = data.types;

      const pokemonWithDetails = { ...pokemonToFetch, image, types };

      setDetailedPokemonInfo(pokemonWithDetails);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDetails(pokemon);
  }, []);

  if (detailedPokemonInfo) {
    const customStyle = generateCustomStyle(
      detailedPokemonInfo,
      cardHeight,
      cardWidth
    );

    return (
      <Link
        href={{
          pathname: "/details",
          params: {
            name: detailedPokemonInfo.name,
            url: detailedPokemonInfo.url,
          },
        }}
      >
        <View style={customStyle.mainCard}>
          <Text style={styles.nameText}>{pokemon.name}</Text>
          {detailedPokemonInfo.types && (
            <Text style={styles.typeText}>
              {detailedPokemonInfo.types[0].type.name}
            </Text>
          )}
          {detailedPokemonInfo.image && (
            <Image
              source={{ uri: detailedPokemonInfo.image }}
              style={customStyle.mainCardImage}
            />
          )}
        </View>
      </Link>
    );
  }
  return null;
}

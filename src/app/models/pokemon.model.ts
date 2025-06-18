export interface PokemonSprite {
  front_default: string;
  other?: {
    'official-artwork'?: { front_default: string };
    [key: string]: any;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  url?: string;
  id?: number;
  sprites?: PokemonSprite;
  height?: number;
  weight?: number;
  types?: PokemonType[];
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

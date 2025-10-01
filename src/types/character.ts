import { Data, Image } from './shared';

export type CharacterAttributes = {
  id: number;
  name: string;
  description?: string;
  gender?: number;
  image?: string;
};

export type CharacterApiAttributes = {
  id: number;
  name: string;
  real_name: string;
  aliases: string;
  birth?: string;
  deck: string;
  description: string;
  gender: number;
  publisher: Data,
  image: Image,
};

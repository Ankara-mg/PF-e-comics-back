import { Image } from "./shared";

export type PublisherAttributes = {
  name: string;
  image: string;
  city?: string;
};

export type PublisherApiAttributes = {
  id: number;
  aliases?: string,
  api_detail_url: string;
  date_added: string;
  date_last_updated: string;
  deck: string;
  description: string;
  image: Image;
  location_address: string;
  location_city: string;
  location_state: string;
  name: string;
  site_detail_url: string;
};
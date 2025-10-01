import { Data, Image } from './shared';

export type ConceptAttributes = {
  name: string;
  description: string;
};

export type ConceptApiAttributes = {
  aliases: string;
  api_detail_url: string;
  count_of_isssue_appearances: number;
  date_added: string;
  date_last_updated: string;
  deck: string;
  description: string;
  first_appeared_in_issue: Data,
  id: number;
  image: Image,
  name: string;
  site_detail_url: string;
  start_year: string;
};
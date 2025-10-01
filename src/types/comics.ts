import { Data, Image } from './shared';

export type ComicAttributes = {
  id: number;
  name: string;
  image?: string;
  description?: string;
  deck?: string;
  release: string;
  episodes: number;
  created_in_db: boolean;
  start_year: string;
}

export type ComicApiAttributes = {
  id: number,
  aliases?: string,
  api_detail_url: string,
  characters: Data[],
  concepts: Data[],
  count_of_issues: number,
  date_added: string,
  date_last_updated: string,
  deck: string,
  description: string,
  first_issue: Data,
  image: Image,
  issues: Data[],
  last_issue: Data,
  locations: Location[],
  name: string,
  objects: Data[],
  people: Data[],
  publisher: Data,
  site_detail_url: string,
  start_year: string
}

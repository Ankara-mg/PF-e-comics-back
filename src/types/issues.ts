import { Data, Image } from "./shared";

export type IssueAttributes = {
  id: number;
  issue_number: number;
  volume_id: number;
  name: string;
  price: number;
  image: string;
  release: string;
  description: string;
  created_in_db: boolean;
};

export type IssueApiAttributes = {
  id: number;
  name: string;
  deck: string;
  description: string;
  aliases?: string;
  api_detail_url: string;
  cover_date: string;
  date_added: string;
  date_last_updated: string;
  has_staff_review: boolean;
  image: Image;
  associated_images: [];
  issue_number: string;
  site_detail_url: string;
  store_date: string;
  volume: Data;
};
export type Image = {
  icon_url: string,
  medium_url: string,
  screen_url: string,
  screen_large_url: string,
  small_url: string,
  super_url: string,
  thumb_url: string,
  tiny_url: string,
  original_url: string,
  image_tags: string
};

export type Data = {
  api_detail_url: string,
  id: number,
  name: string,
  site_detail_url?: string,
  count?: string
  issue_number?: string;
};
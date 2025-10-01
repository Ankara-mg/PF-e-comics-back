import axios from 'axios';
import db from '../../models';
import { IssueApiAttributes, IssueAttributes } from '@custom-types/issues';
import { addComicToDb } from '../controller/comicsController';

const { API_KEY, API_URL } = process.env;

const fetchIssuesApi = async (comic_id: number) => {
  const apiURL = `${API_URL}/issues/?api_key=${API_KEY}&filter=volume:${comic_id}&sort=issue_number:asc&format=json&limit=100`;

  try {
    const res = await axios.get(apiURL);

    const issues: IssueAttributes[] = res?.data?.results?.map((issue: IssueApiAttributes) => ({
      id: issue.id,
      issue_number: issue.issue_number,
        volume_id: issue.volume.id,
        release: issue.cover_date,
        name: issue.name,
        price: randomPrice,
        image: issue.image.original_url,
        created_in_db: true
    }));

    await addComicToDb(comic_id);
    await db.Issue.bulkCreate(issues, { ignoreDuplicates: true });
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not save characters.');
  };
};

const randomPrice = (max: number, min: number): number => {
  return Math.random() * (max - min) + min;
};

export { fetchIssuesApi };
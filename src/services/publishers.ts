import axios from 'axios';
import db from '../../models';
import { PublisherApiAttributes, PublisherAttributes } from '@custom-types/publisher';

const { API_KEY, API_URL } = process.env;

const fetchPublishersApi = async () => {
  const apiURL = `${API_URL}/publishers/?api_key=${API_KEY}&format=json&limit=100`;
  try {
    const res = await axios.get(apiURL);

    const publishers: PublisherAttributes[] = res.data.results.map((pub: PublisherApiAttributes) => ({
      name: pub.name,
      image: pub.image.original_url,
      city: pub.location_city,
    }));

    await db.Publisher.bulkCreate(publishers, { ignoreDuplicates: true });
  } catch (error: any) {
    console.error(error.message || 'Could not fetch publishers.');
    throw new Error(error.message || 'Could not fetch publishers.');
  };
};

export { fetchPublishersApi };
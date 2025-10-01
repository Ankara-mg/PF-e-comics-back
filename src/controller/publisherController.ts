import { PublisherAttributes } from '@custom-types/publisher';
import db from '../../models';

export const getPublishers = async () => {
  try {
    const publishers: PublisherAttributes[] = await db.Publisher.findAll();
    return publishers;
  } catch (error: any) {
    console.error(error.message || 'Database error.');
    throw new Error(error.message || 'Database error.');
  };
};

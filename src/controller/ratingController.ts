import { Sequelize } from 'sequelize'
import { RatingAttributes } from '@custom-types/rating';
import db from '../../models';

export const getAllRatings = async () => {
  try {
    const ratings: RatingAttributes[] = await db.Rating.findAll({
      include: {
        model: db.User,
        attributes: ['username', 'email'],
      }
    });
    return ratings;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Error getting the ratings.');
  };
};

export const addRating = async (rating: number, description: string, user_id: string, comic_id: number, issue_id: number) => {
  try {
    const newRating = await db.Rating.create({ rating, description, user_id, comic_id, issue_id });
    return newRating;
  } catch (error: any) {
    throw new Error(error.message || 'Error adding the rating.');
  };
};

export const removeRating = async (review_id: string) => {
  try {
    await db.Rating.destroy({ where: { id: review_id } });
    return 'Rating removed successfully.';
  } catch (error: any) {
    throw new Error(error.message || 'Error removing the rating.');
  };
};

export const getIssueRatings = async (comic_id: number, issue_id: number) => {
  try {
    const issueRatings: RatingAttributes[] = await db.Rating.findAll({
      where: { comic_id, issue_id },
      include: {
        model: db.User,
        attributes: ['username', 'email'],
      }
    });

    return issueRatings;
  } catch (error: any) {
    throw new Error(error.message || 'Error getting the ratings.');
  };
};

export const getRatingAvg = async (volume_id: number) => {
  try {
    const avgRatings = await db.Rating.findAll({
      group: ['issueId'],
      include: {
        model: db.Issue,
        where: { volume_id },
        attributes: [],
      },
      attributes: [
        'issue_id',
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating'],
      ],
    })
    return avgRatings;
  } catch (error: any) {
    throw new Error(error.message || 'Error getting the ratings.');
  };
};

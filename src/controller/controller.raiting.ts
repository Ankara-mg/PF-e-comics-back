import db from "../../models";
import { Sequelize } from 'sequelize'



export const getAllRatings = async () => {
  const ratings = await db.Ratings.findAll({
    include: {
      model: db.Users,
      attributes: ['username', 'email'],
    }
  })
  return ratings
}

export const addRating = async (body: any) => {
  const { rating, description, userId, IssueId, comicId } = body

  const newRating = await db.Ratings.create({
    rating: Number(rating),
    description,
    comicId,
    userId,
    IssueId: IssueId
  })


  if (newRating) {
    return newRating
  } else {
    throw new Error("Error al agregar el rating")
  }
}

export const getRatingsIssue = async (volumeId: number, IssueId: number) => {
  const ratings_issue = await db.Ratings.findAll({
    where: {
      comicId: volumeId,
      IssueId: IssueId,
    },
    include: {
      model: db.Users,
      attributes: ['username', 'email'],
    }
  })

  return ratings_issue;
}



export const getRatingAvg = async (volumeId: number, IssueId: number) => {
  const issues = await db.Issues.findOne({
    where: {
      volume_id: volumeId,
      id: IssueId,
    },
    group: ['Issues.id'],
    attributes: [
      "issue_number", "id", "volume_id", "name", "price", "image", "createInDb",
      [Sequelize.fn('AVG', Sequelize.col('Ratings.rating')), 'avgRating']
    ],
    include: {
      model: db.Ratings,
      attributes: [],
    },
  })

  return issues
}




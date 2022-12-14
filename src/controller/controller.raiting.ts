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
  const { rating, description, UserId, ComicId, IssueId } = body

  const newRating = await db.Ratings.create({
    rating,
    description,
    UserId,
    ComicId,
    IssueId
  })

  if (newRating) {
    return newRating
  } else {
    throw new Error("Error al agregar el rating")
  }
}

export const removeRating = async (id_review: string) => {

  const newRating = await db.Ratings.destroy({
    where: {
      id: id_review
    }
  })

  if (newRating) {
    return { msg: "Rating Eliminado" }
  } else {
    throw new Error("Error al eliminar el rating")
  }
}

export const getRatingsIssue = async (volumeId: number, IssueId: number) => {
  const ratings_issue = await db.Ratings.findAll({
    where: {
      ComicId: volumeId,
      IssueId: IssueId,
    },
    include: {
      model: db.Users,
      attributes: ['username', 'email'],
    }
  })

  return ratings_issue;
}



export const getRatingAvg = async (volumeId: number) => {
  const issues = await db.Issues.findAll({
    where: {
      volume_id: volumeId,
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




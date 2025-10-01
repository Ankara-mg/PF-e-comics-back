import db from '../../models';

export const getFavoriteList = async (user_id: string) => {
  try {
    const user = await db.User.findOne({
      where: { id: user_id },
      include: {
        model: db.Issue,
        as: 'issues',
        through: { attributes: [] },
      }
    });

    return user?.issues || [];
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message || 'Database error when getting favorites.');
  };
};

export const addNewFavorite = async (user_id: string, issue_id: string) => {
  try {
    const user = await db.User.findOne({ where: { id: user_id } });
    const issue = await db.Issue.findOne({ where: { id: issue_id } });

    if (user && issue) {
      await issue?.addUser(user);
    };

    return issue;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message || 'Database error when saving favorites.');
  };
};

export const removeFavorite = async (user_id: string, issue_id: string) => {
  try {
    await db.FavoriteList.destroy({
      where: {
        userId: user_id,
        issuesId: issue_id,
      }
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || 'Database error when removing favorites.');
  };
};

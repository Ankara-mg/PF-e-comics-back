import db from "../../models";

export const createRoles = async () => {
    try {

      const countRoles = await db.Roles.count();

      if (countRoles > 0) return;

      const values = await Promise.all([
         db.Roles.create({ name: "user" }),
         db.Roles.create({ name: "admin" }),
      ]);
  
    } catch (error) {
      console.error(error);
    }
  };
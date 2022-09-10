import db from "../../models";

export const createRoles = async () => {
    try {

      const countRoles = await db.Roles.count();
      console.log(countRoles)
      if (countRoles > 0) return;

      const values = await Promise.all([
         db.Roles.create({ name: "user" }),
         db.Roles.create({ name: "admin" }),
      ]);
  
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };
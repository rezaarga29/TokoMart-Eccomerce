import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password);
};

export const comparePassword = (password: string, passwordDB: string) => {
  return bcrypt.compareSync(password, passwordDB);
};

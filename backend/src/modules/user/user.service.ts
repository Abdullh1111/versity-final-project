import config from "../../config";
import { AppError } from "../../hooks/AppError";
import { TUser } from "./user.interface";
import { user } from "./user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function createUser(data: TUser) {
  const email = data.email
  const userExist = await user.findOne({ email });

  if (userExist) {
    throw new AppError(400, "User already exists");
  } else {
    data.password = await bcrypt.hash(data.password, 10);
    data.avatar = "dsf"
    const result = await user.create(data);
    return result;
  }
}

async function signInUser(data: TUser) {
  const email = data.email;
  const userExist = await user.findOne({ email });

  if (!userExist) {
    throw new AppError(400, "User does not exist");
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      userExist.password
    );
    if (isPasswordCorrect) {
      const jwtToken = jwt.sign(
        { email: userExist.email, fullName: userExist.fullName, role: userExist.role },
        config.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return {
        token: jwtToken,
        userExist,
      };
    } else {
      throw new AppError(400, "Password is incorrect");
    }
  }
}

async function userData(email: string) {
  const userExist = await user.findOne({ email });
  if (!userExist) {
    throw new AppError(400, "User does not exist");
  }
  return userExist;
}

export const userService = {
  createUser,
  signInUser,
  userData
};

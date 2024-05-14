import { getUserByEmail, register } from "@/db/models/user";
import { comparePassword } from "@/utils/bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const user = await getUserByEmail(body.email);

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Email or Password",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = comparePassword(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid email or Password",
        },
        { status: 401 }
      );
    }
    const JWT_SECRET: string = process.env.JWT_SECRET || "";

    const access_token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET
    );
    return Response.json(
      { message: "LOGIN SUCCESFULLY", access_token },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
  }
};

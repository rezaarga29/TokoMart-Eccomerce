import { register } from "@/db/models/user";
import { userSchema } from "@/validators/user.validator";
import { z } from "zod";

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const data = userSchema.parse(body);
    const newUser = await register(data);
    return Response.json(
      { message: "CREATED SUCCESFULLY", newUser },
      { status: 201 }
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

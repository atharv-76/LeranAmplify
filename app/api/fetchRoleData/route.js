import { connectMongoDB } from "@/lib/mongodb";
import AddRole from "@/models/addRole";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all entries from the AddRole collection
    const roles = await AddRole.find();

    // Return the retrieved data
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the roles." },
      { status: 500 }
    );
  }
}


import { connectMongoDB } from "@/lib/mongodb";
import AddRole from "@/models/addRole"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { name, email, role } = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json(
        { message: "All fields are required: name, email, role." },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingForm = await AddRole.findOne({ email });
    if (existingForm) {
      return NextResponse.json(
        { message: "A submission with this email already exists." },
        { status: 409 }
      );
    }

    // Create a new form entry
    await AddRole.create({ name, email, role });

    return NextResponse.json({ message: "Form submitted successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "An error occurred while submitting the form." },
      { status: 500 }
    );
  }
}


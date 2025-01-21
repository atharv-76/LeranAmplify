import { connectMongoDB } from "@/lib/mongodb"; // Import your DB connection function
import AddRole from "@/models/addRole"; // Import your AddRole model

export async function DELETE(req, { params }) {
  const { id } = params; // Get user ID from the URL params

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Find and delete the user by their ID
    const deletedUser = await AddRole.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting user" }),
      { status: 500 }
    );
  }
}

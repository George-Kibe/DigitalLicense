import User from "@/models/User"; 
import connect from '@/lib/connect';

// GET: Fetch all users
export const GET = async (req) => {
  try {
    await connect();
    const users = await User.find().sort({ createdAt: -1 }); // Sort users by creation date
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};

// POST: Create a new user
export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json(); // Parse request body
    const newUser = new User(body);
    const savedUser = await newUser.save(); // Save new user
    return new Response(JSON.stringify(savedUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create user", { status: 500 });
  }
};

// PUT: Update an existing user
export const PUT = async (req) => {
  try {
    await connect();
    const { id, ...updateData } = await req.json(); // Extract `id` and other data from request body
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }); // Update user by ID
    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};

// DELETE: Remove a user
export const DELETE = async (req) => {
  try {
    await connect();
    const { id } = await req.json(); // Extract `id` from request body
    const deletedUser = await User.findByIdAndDelete(id); // Delete user by ID
    if (!deletedUser) {
      return new Response("User not found", { status: 404 });
    }
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
};

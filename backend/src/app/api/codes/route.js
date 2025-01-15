import Code from "@/models/Code"; 
import connect from '@/lib/connect';

export const GET = async (req) => {
  try {
    await connect();
    const codes = await Code.find(); // Retrieve all documents
    return new Response(JSON.stringify(codes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch codes", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json(); // Parse request body
    const newCode = new Code(body);
    const savedCode = await newCode.save(); // Save new document
    return new Response(JSON.stringify(savedCode), { status: 201 });
  } catch (error) {
    return new Response("Failed to create code", { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    await connect();
    const { id, ...updateData } = await req.json(); // Assume `id` is passed in the request body
    const updatedCode = await Code.findByIdAndUpdate(id, updateData, { new: true }); // Update document by ID
    if (!updatedCode) {
      return new Response("Code not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedCode), { status: 200 });
  } catch (error) {
    return new Response("Failed to update code", { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await connect();
    const { id } = await req.json(); 
    console.log("ID: ", id)
    const deletedCode = await Code.findByIdAndDelete(id); 
    if (!deletedCode) {
      return new Response("Code not found", { status: 404 });
    }
    return new Response("Code deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete code", { status: 500 });
  }
};

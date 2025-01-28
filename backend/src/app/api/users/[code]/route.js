import connect from '@/lib/connect';
import User from "@/models/User";

export const GET = async (req, {params}) => {
  const { code } = await params;
  try {
    await connect();
    const userDocument = await User.findOne({ uniqueCode: code});
    if (!userDocument) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(userDocument), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};



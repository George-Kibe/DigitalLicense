import Code from "@/models/Code"; 
import connect from '@/lib/connect';

export const GET = async (req, {params}) => {
  const { code } = await params;
  try {
    await connect();
    const codeDocument = await Code.findOne({ codeText: code});
    if (!codeDocument) {
      return new Response("Code not found", { status: 404 });
    }
    return new Response(JSON.stringify(codeDocument), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch codes", { status: 500 });
  }
};

export const DELETE = async (req, {params}) => {
  const { code: codeId } = await params;
  try {
    await connect();
    const deletedCode = await Code.findByIdAndDelete(codeId); 
    if (!deletedCode) {
      return new Response("Code not found", { status: 404 });
    }
    return new Response("Code deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete code", { status: 500 });
  }
};

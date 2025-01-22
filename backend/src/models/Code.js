import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema(
	{
		codeText: { type: String, required: true },
		isUser: { type: Boolean, default: false },
		isAdmin: { type: Boolean, default: false },
    isExpired: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Code = mongoose.models.Code || mongoose.model('Code', CodeSchema);

export default Code
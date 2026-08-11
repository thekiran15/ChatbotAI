
// Text-based AI chat message controller

import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";

// ============================
// TEXT MESSAGE
// ============================

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check credits
        if (req.user.credits < 1) {
            return res.json({
                success: false,
                message: "You don't have enough credits to use this feature"
            });
        }

        const { chatId, prompt } = req.body;

        // Find chat
        const chat = await Chat.findOne({
            userId,
            _id: chatId
        });

        if (!chat) {
            return res.json({
                success: false,
                message: "Chat not found"
            });
        }

        // Save user message
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        // ============================
        // GENERATE TEXT USING GROQ
        // ============================

        const { choices } = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const reply = {
            ...choices[0].message,
            timestamp: Date.now(),
            isImage: false
        };

        // Save assistant reply
        chat.messages.push(reply);

        await chat.save();

        // Deduct 1 credit
        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -1 } }
        );

        return res.json({
            success: true,
            reply
        });

    } catch (error) {
        console.error("TEXT MESSAGE ERROR:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};


// ============================
// IMAGE GENERATION
// ============================

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check credits
        if (req.user.credits < 2) {
            return res.json({
                success: false,
                message: "You don't have enough credits to use this feature"
            });
        }

        const { prompt, chatId, isPublished } = req.body;

        // Find chat
        const chat = await Chat.findOne({
            userId,
            _id: chatId
        });

        if (!chat) {
            return res.json({
                success: false,
                message: "Chat not found"
            });
        }

        // ============================
        // SAVE USER MESSAGE
        // ============================

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        // ============================
        // GENERATE IMAGE USING
        // POLLINATIONS AI
        // ============================

        const encodedPrompt = encodeURIComponent(prompt);

        const generatedImageUrl =
            `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        console.log("GENERATED IMAGE URL:", generatedImageUrl);

        // ============================
        // CREATE ASSISTANT REPLY
        // ============================

        const reply = {
            role: "assistant",
            content: generatedImageUrl,
            timestamp: Date.now(),
            isImage: true,
            isPublished: isPublished || false
        };

        // ============================
        // SAVE ASSISTANT MESSAGE
        // ============================

        chat.messages.push(reply);

        await chat.save();

        // ============================
        // DEDUCT CREDITS
        // ============================

        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -2 } }
        );

        // ============================
        // SEND RESPONSE
        // ============================

        return res.json({
            success: true,
            reply
        });

    } catch (error) {
        console.error("IMAGE GENERATION ERROR:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

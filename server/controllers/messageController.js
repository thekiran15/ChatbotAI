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

        const response = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1024
        });

        const content =
            response.choices?.[0]?.message?.content || "No response";

        // Assistant reply
        const reply = {
            role: "assistant",
            content: content,
            timestamp: Date.now(),
            isImage: false
        };

        // Save assistant message
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
        // GENERATE IMAGE
        // USING POLLINATIONS
        // ============================

        const encodedPrompt = encodeURIComponent(prompt);

        const generatedImageUrl =
            `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        console.log(
            "GENERATED IMAGE URL:",
            generatedImageUrl
        );

        // ============================
        // ASSISTANT IMAGE REPLY
        // ============================

        const reply = {
            role: "assistant",
            content: generatedImageUrl,
            timestamp: Date.now(),
            isImage: true,
            isPublished: isPublished || false
        };

        // Save assistant message
        chat.messages.push(reply);

        await chat.save();

        // Deduct 2 credits
        await User.updateOne(
            { _id: userId },
            { $inc: { credits: -2 } }
        );

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
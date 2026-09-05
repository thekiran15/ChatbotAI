import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

    useEffect(() => {
        Prism.highlightAll()
    }, [message.content])

    // ==========================================
    // CLEAN AI RESPONSE
    // ==========================================
    const cleanContent = (content) => {

        if (!content) return ""

        let text = content

        // ------------------------------------------
        // 1. Remove unwanted HTML tags
        // ------------------------------------------
        text = text
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/?p>/gi, '\n')
            .replace(/&nbsp;/gi, ' ')

        // ------------------------------------------
        // 2. Remove horizontal markdown separators
        // ------------------------------------------
        text = text.replace(/^\s*[-*_]{3,}\s*$/gm, '')

        // ------------------------------------------
        // 3. Fix malformed pipe-based tables
        //
        // Example:
        // | Domain | Typical Use |
        // | Java   | Backend     |
        //
        // becomes:
        //
        // **Domain**
        //
        // Typical Use
        //
        // **Java**
        //
        // Backend
        // ------------------------------------------

        const lines = text.split('\n')
        const cleanedLines = []

        for (let line of lines) {

            const trimmed = line.trim()

            // Detect lines containing pipe separators
            const pipeCount = (trimmed.match(/\|/g) || []).length

            if (pipeCount >= 2) {

                // Remove beginning and ending pipes
                let parts = trimmed
                    .replace(/^\|/, '')
                    .replace(/\|$/, '')
                    .split('|')
                    .map(item => item.trim())
                    .filter(item => item.length > 0)

                // Detect markdown table separator
                const isSeparatorRow = parts.length > 0 &&
                    parts.every(part =>
                        /^:?-{2,}:?$/.test(part)
                    )

                // Ignore table separator rows
                if (isSeparatorRow) {
                    continue
                }

                // Convert each pipe section into a separate line
                if (parts.length > 0) {

                    parts.forEach((part) => {
                        cleanedLines.push(part)
                    })

                    // Add spacing after converted row
                    cleanedLines.push('')
                    continue
                }
            }

            cleanedLines.push(line)
        }

        text = cleanedLines.join('\n')

        // ------------------------------------------
        // 4. Fix multiple empty lines
        // ------------------------------------------
        text = text.replace(/\n{3,}/g, '\n\n')

        // ------------------------------------------
        // 5. Remove spaces before punctuation
        // ------------------------------------------
        text = text.replace(/\s+([,.;:!?])/g, '$1')

        // ------------------------------------------
        // 6. Clean leading/trailing spaces
        // ------------------------------------------
        return text.trim()
    }


    // ==========================================
    // MARKDOWN COMPONENTS
    // ==========================================

    const markdownComponents = {

        // Normal paragraph
        p: ({ children }) => (
            <p className="text-sm leading-6 mb-4 last:mb-0">
                {children}
            </p>
        ),

        // H1
        h1: ({ children }) => (
            <h1 className="text-xl font-bold leading-7 mb-4 mt-2">
                {children}
            </h1>
        ),

        // H2
        h2: ({ children }) => (
            <h2 className="text-lg font-bold leading-7 mb-3 mt-4">
                {children}
            </h2>
        ),

        // H3
        h3: ({ children }) => (
            <h3 className="text-base font-bold leading-6 mb-2 mt-4">
                {children}
            </h3>
        ),

        // Ordered list
        ol: ({ children }) => (
            <ol className="list-decimal ml-5 mb-4 space-y-2">
                {children}
            </ol>
        ),

        // Unordered list
        ul: ({ children }) => (
            <ul className="list-disc ml-5 mb-4 space-y-2">
                {children}
            </ul>
        ),

        // List item
        li: ({ children }) => (
            <li className="text-sm leading-6 pl-1">
                {children}
            </li>
        ),

        // Bold text
        strong: ({ children }) => (
            <strong className="font-bold">
                {children}
            </strong>
        ),

        // Code
        code: ({ inline, children, ...props }) => {

            if (inline) {
                return (
                    <code
                        className="px-1.5 py-0.5 rounded bg-black/20 text-sm"
                        {...props}
                    >
                        {children}
                    </code>
                )
            }

            return (
                <code {...props}>
                    {children}
                </code>
            )
        },

        // Code block
        pre: ({ children }) => (
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
                {children}
            </pre>
        ),

        // Horizontal line
        hr: () => (
            <hr className="my-5 border-[#80609F]/30" />
        ),

        // Links
        a: ({ children, href }) => (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
            >
                {children}
            </a>
        ),

        // Tables
        table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                    {children}
                </table>
            </div>
        ),

        thead: ({ children }) => (
            <thead>
                {children}
            </thead>
        ),

        tbody: ({ children }) => (
            <tbody>
                {children}
            </tbody>
        ),

        tr: ({ children }) => (
            <tr className="border-b border-[#80609F]/20">
                {children}
            </tr>
        ),

        th: ({ children }) => (
            <th className="text-left font-bold p-2">
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td className="p-2 align-top">
                {children}
            </td>
        )
    }


    return (

        <div>

            {/* ==========================================
                USER MESSAGE
            ========================================== */}

            {message.role === "user" ? (

                <div className="flex justify-end items-start gap-3 my-4">

                    <div className="flex flex-col items-end gap-1 max-w-2xl">

                        <div className="bg-primary/10 dark:bg-[#57317C]/30 border border-primary/20 dark:border-[#80609F]/30 rounded-md p-3">

                            <p className="text-sm dark:text-primary">
                                {message.content}
                            </p>

                        </div>

                        <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
                            {moment(message.timestamp).fromNow()}
                        </span>

                    </div>

                    <img
                        src={assets.user_icon}
                        alt=""
                        className="w-8 h-8 rounded-full"
                    />

                </div>

            ) : (

                /* ==========================================
                   ASSISTANT MESSAGE
                ========================================== */

                <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">

                    {message.isImage === true ? (

                        <img
                            src={message.content}
                            alt="Generated image"
                            className="w-full max-w-md mt-2 rounded-md"
                        />

                    ) : (

                        <div className="text-sm dark:text-primary reset-tw">

                            <Markdown components={markdownComponents}>
                                {cleanContent(message.content)}
                            </Markdown>

                        </div>

                    )}

                    <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
                        {moment(message.timestamp).fromNow()}
                    </span>

                </div>

            )}

        </div>
    )
}

export default Message
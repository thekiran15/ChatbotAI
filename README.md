## ChatbotAI Platform

AI-Powered Full-Stack Application built with MERN Stack

A modern AI Chatbot Platform that allows users to generate AI-powered text and images, manage AI usage through a credit-based system, and purchase additional credits using Stripe.

 **Live Demo:**  
https://chatbotai-99.vercel.app

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React.js-2026-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-2026-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### AI

![Groq](https://img.shields.io/badge/Groq-API-F55036?style=for-the-badge&logo=groq&logoColor=white)

### Image Generation

![ImageKit](https://img.shields.io/badge/ImageKit-Image_Generation-1E88E5?style=for-the-badge&logo=imagekit&logoColor=white)

### Authentication

![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Payment

![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Project Preview

Login & Authentication

Secure user login and registration system.

<p align="center">
<img src="./screenshots/login.png" width="800">
</p>AI Chatbot

Generate AI-powered text responses using the Groq API.

<p align="center">
<img src="./screenshots/chatbot.png" width="800">
</p>AI Image Generation

Generate images from natural-language prompts.

<p align="center">
<img src="./screenshots/image-generation.png" width="800">
</p>Community Images

 View AI-generated images shared with the community.

<p align="center">
<img src="./screenshots/community-images.png" width="800">
</p>Credit Plans

Purchase additional credits through Stripe.

<p align="center">
<img src="./screenshots/credit-plans.png" width="800">
</p>

## Key Features

- AI Text Generation using Groq API
- AI Image Generation
- Interactive AI Chatbot
- User Authentication & Authorization
- Credit-Based Usage System
- Stripe Payment Integration
- Community Image Sharing
- Generated Content Management
- Responsive User Interface
- REST API Communication
- Full-Stack Deployment on Vercel


## Application Architecture

                         👤 USER
                            │
                            ▼
                   ┌─────────────────┐
                   │  React Frontend │
                   └────────┬────────┘
                            │
                         REST API
                            │
                            ▼
                   ┌─────────────────┐
                   │ Node.js +       │
                   │ Express.js      │
                   └───────┬─────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
          MongoDB       Groq API     ImageKit
           Atlas       AI Text       AI Images
              │
              │
              ▼
          User Credits
              │
              ▼
          Stripe Payment 
          


## 👨‍💻 Author

Kiran S B

Computer Science Engineering Student | Full-Stack Developer


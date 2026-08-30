## ChatbotAI Platform

AI-Powered Full-Stack Application built with MERN Stack

A modern AI Chatbot Platform that allows users to generate AI-powered text and images, manage AI usage through a credit-based system, and purchase additional credits using Stripe.

<p align="left">🔗 <a href="https://chatbotai-99.vercel.app">Live Demo</a>
 

</p>

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


## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### AI
- Groq API

### Image Generation
- ImageKit

### Authentication
- JWT

### Payment
- Stripe

### Deployment
- Vercel


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


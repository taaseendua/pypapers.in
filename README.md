# Lovely Tools

A premium collection of professional, free online tools designed to simplify daily digital tasks.

## Features
- **QR Code Generator**: Create high-resolution QR codes.
- **Age Calculator**: Precise breakdown of age in years, months, and days.
- **EMI Calculator**: Financial planning for loans.
- **Latest Trends**: Real-time global news via GNews API.
- **AI Content Recommender**: Intelligent book and audiobook suggestions.
- **And more...**

## 🚀 Connecting to GitHub
If you are seeing errors when pushing, follow these exact steps to connect to your repository:

1. **Ensure the Repository Exists**: You have created [pypapers.in](https://github.com/taaseendua/pypapers.in) on GitHub.
2. **Run in your Terminal**:
   ```bash
   # Remove any old connection
   git remote remove origin
   
   # Add the correct link to your new repository
   git remote add origin https://github.com/taaseendua/pypapers.in.git
   
   # Rename branch to main if it isn't already
   git branch -M main
   
   # Push your code
   git add .
   git commit -m "Initial commit to pypapers.in"
   git push -u origin main
   ```

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI**: Genkit with Gemini 2.5 Flash
- **Icons**: Lucide React

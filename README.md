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
You are seeing "Repository not found" because your local Git is still trying to talk to the old URL. Run these exact commands in your terminal to fix it:

1. **Ensure the Repository Exists**: You have created [pypapers.in](https://github.com/taaseendua/pypapers.in) on GitHub.
2. **Run in your Terminal**:
   ```bash
   # 1. Remove the old connection that is failing
   git remote remove origin
   
   # 2. Add the correct link to your new repository
   git remote add origin https://github.com/taaseendua/pypapers.in.git
   
   # 3. Rename branch to main if it isn't already
   git branch -M main
   
   # 4. Push your code
   git add .
   git commit -m "Initial commit to pypapers.in"
   git push -u origin main
   ```

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI**: Genkit with Gemini 2.5 Flash
- **Icons**: Lucide React

# Lovely Tools

A premium collection of professional, free online tools designed to simplify daily digital tasks.

## Features
- **QR Code Generator**: Create high-resolution QR codes.
- **Age Calculator**: Precise breakdown of age in years, months, and days.
- **EMI Calculator**: Financial planning for loans.
- **Latest Trends**: Real-time global news via GNews API.
- **AI Content Recommender**: Intelligent book and audiobook suggestions.
- **And more...**

## 🚀 Connecting to GitHub (Fixing "Repository not found")
If you are seeing errors when pushing, follow these exact steps:

1. **Create the Repository**: Go to [GitHub New Repository](https://github.com/new).
2. **Name it**: `studio` (must match exactly).
3. **Leave it empty**: Do NOT check "Initialize with README".
4. **Run in your Terminal**:
   ```bash
   # Remove any existing connection
   git remote remove origin
   
   # Add the correct link
   git remote add origin https://github.com/bilalgull192211/studio.git
   
   # Push your code
   git add .
   git commit -m "Connecting to GitHub"
   git push -u origin main
   ```

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI**: Genkit with Gemini 2.5 Flash
- **Icons**: Lucide React

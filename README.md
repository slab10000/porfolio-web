<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10VGyfb3sw8veRASbv0Hwbk0N9lJryL4J

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. (Optional) For dynamic social media follower counts, set these environment variables:
   - `VITE_YOUTUBE_API_KEY`: YouTube Data API v3 key (get from [Google Cloud Console](https://console.cloud.google.com/))
   - `VITE_CORS_PROXY`: CORS proxy URL (default: `https://api.allorigins.win/raw?url=`)
4. Run the app:
   `npm run dev`

## Social Media Follower Counts

The app fetches follower counts dynamically from each platform. The implementation uses:
- **Public page scraping** via CORS proxy for most platforms
- **YouTube Data API** (optional, requires API key for better reliability)

**Note:** Some platforms may have rate limits or require authentication. For production use, consider setting up a backend proxy to handle API keys securely and avoid CORS issues.

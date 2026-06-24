# 🦸 Community Hero - Hyperlocal Problem Solver

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

An AI-powered civic platform built for the **"Community Hero - Hyperlocal Problem Solver"** hackathon. This platform empowers everyday citizens to seamlessly report, track, and solve local infrastructure issues while helping municipal governments prioritize repairs using predictive AI insights.

## ✨ Features

*   **📸 AI Image Analysis:** Citizens can upload a photo of a local issue (like a pothole or broken streetlight). Using the `gemini-2.5-flash` vision model, the app automatically categorizes the issue, generates a title, estimates severity, and writes a detailed description.
*   **💡 Instant Civic Advice:** Before submitting, citizens can ask the AI for actionable suggestions on temporary fixes they can safely perform, what the municipality should do, and preventive measures.
*   **📊 Predictive Dashboard:** The municipal dashboard aggregates local issue data and uses Gemini to generate predictive insights and recommendations for city planning and budget allocation.
*   **🎮 Gamified Leaderboard:** To encourage civic engagement, citizens earn XP for reporting and verifying issues, competing on a city-wide leaderboard.
*   **🔒 Secure Local Storage:** Your Google API key is stored securely in your browser's local storage and never touches a backend server.

## 🛠️ Tech Stack & Architecture

This project is completely serverless and runs entirely in the browser:
*   **Frontend:** Vanilla HTML5, CSS3, and JavaScript (ES6).
*   **AI Integration:** **Google AI Studio (Gemini API)** is the core intelligence engine powering the entire application. We utilize the `gemini-2.5-flash` model via native HTTP REST requests.

## 🚀 How to Run Locally

Because this project uses vanilla web technologies without a heavy framework, setting it up is incredibly simple!

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/community-hero.git
    cd community-hero
    ```
2.  **Open the Application:**
    Simply double-click the `index.html` file to open it in any modern web browser.
3.  **Configure Google AI Studio:**
    *   Click the **⚙️ Gear Icon** in the top right corner of the navigation bar.
    *   Paste your **Google Gemini API Key** (obtained from [Google AI Studio](https://aistudio.google.com/)).
    *   Click "Save".
4.  **Test the Features:**
    *   Go to the **Report Issue** tab and upload a picture of a pothole to see the AI auto-fill the form!
    *   Click **Get AI Suggestions**.
    *   Visit the **Dashboard** and click **Generate AI Predictive Insights**.

## 🏆 Hackathon Alignment

This project strictly adheres to the hackathon guidelines by utilizing **Google AI Studio** as the core tool to build and deploy the functional solution. No third-party AI models or backend wrappers were used; all intelligence is routed natively to Google's generative models.

---
*Built with ❤️ for the community.*

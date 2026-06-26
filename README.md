# 🦸 CivicGuard - Hyperlocal Problem Solver

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

> **Vibe2Ship Hackathon — Problem Statement 2: Community Hero – Hyperlocal Problem Solver**
> Built with Google AI Studio & Gemini 2.5 Flash

An AI-powered civic platform that empowers everyday citizens to **report, verify, track, and resolve** local infrastructure issues — while helping municipal governments prioritize repairs using predictive AI insights.

---

## 🌟 Live Demo

🔗 **[Deployed on Google AI Studio →](YOUR_DEPLOYED_LINK_HERE)**

---

## ✨ Key Features

### 📸 AI Image Analysis (Gemini Vision)
Upload a photo of any civic issue. Gemini 2.5 Flash automatically:
- Detects and categorizes the issue (road, water, lighting, waste)
- Generates a descriptive title and detailed description
- Estimates severity (low / medium / high)
- Suggests actionable next steps as clickable chips

### 💡 Instant AI Civic Advice
Before submitting, citizens can ask Gemini for:
1. Immediate temporary fixes they can safely do
2. What the municipal authority should do
3. Long-term preventive measures

### 📊 Predictive Impact Dashboard
- Live stats: total reports, resolved count, resolution rate
- Weekly bar chart of issue frequency
- Category breakdown (Road, Water, Lighting, Waste)
- Hotspot map visualization showing clustered issues
- **AI Predictive Insights** — Gemini analyzes weekly data and outputs data-driven recommendations for the municipal corporation

### 🔍 Issue Feed with Filtering
- Browse all community reports, filtered by category
- Upvote issues to signal urgency
- Click any card to see full details + AI analysis
- Community verification system (+XP rewards)

### 🎮 Gamified Leaderboard
- Citizens earn XP for reporting (+25 XP) and verifying (+10 XP)
- City-wide ranking system encourages sustained participation
- Badges: First Report, Verifier, Resolver

### 🔒 Secure API Key Management
- Gemini API key stored in browser localStorage only
- Never transmitted to any backend server
- Settings gear icon (⚙️) for easy configuration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| AI Engine | **Google AI Studio — Gemini 2.5 Flash** |
| Vision AI | Gemini multimodal (image + text) |
| Deployment | Google AI Studio |
| Fonts | Google Fonts (Space Grotesk + Inter) |
| Storage | Browser localStorage (API key only) |

> **100% serverless** — runs entirely in the browser with no backend required.

---

## 🚀 How to Run Locally

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- A free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/civicguard.git
cd civicguard

# 2. Open in browser (no build step needed!)
# Simply open index.html in your browser
# On Mac:
open index.html
# On Windows:
start index.html
# On Linux:
xdg-open index.html
```

### Configure Your API Key

1. Click the **⚙️ gear icon** in the top-right corner of the nav bar
2. Paste your **Gemini API Key** (from [aistudio.google.com](https://aistudio.google.com/))
3. Click **Save Key**
4. The key is stored securely in your browser only

### Test All AI Features

| Feature | How to Test |
|---|---|
| AI Image Analysis | Go to Report Issue → Upload a photo of a pothole or broken light |
| AI Advice | Fill in title/description → Click "Ask AI for solution suggestions" |
| AI Predictive Insights | Go to Dashboard → Click "Generate AI insights" |
| Community Verification | Click any issue card → Click "Verify Issue" |

---

## 📁 Project Structure

```
civicguard/
├── index.html        # Main HTML structure & all pages
├── styles.css        # Complete styling & responsive design
├── app.js            # All JavaScript logic & Gemini API calls
└── README.md         # This file
```

---

## 🤖 Google AI Studio Integration Details

All AI features use the **Gemini 2.5 Flash** model via the Gemini REST API:

### 1. Image Analysis (Multimodal)
```javascript
// Endpoint
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent

// Sends: base64 image + prompt asking for structured JSON analysis
// Returns: category, title, description, severity, suggestions
```

### 2. Civic Advice Generation
```javascript
// Sends: issue title, category, description
// Returns: 3 actionable suggestions (citizen fix, municipal action, prevention)
```

### 3. Predictive Dashboard Insights
```javascript
// Sends: aggregated weekly issue stats
// Returns: 3 data-driven insights for municipal planning
```

### Reliability Features
- **Retry logic** with exponential backoff (handles 503/429 errors)
- **Graceful degradation** — app works fully without API key, AI features show clear messaging
- **JSON response parsing** with error handling

---

## 🏆 Hackathon Evaluation Alignment

| Criteria | How CivicGuard addresses it |
|---|---|
| **Problem Solving & Impact (20%)** | Directly tackles fragmented, untracked civic reporting — a real problem for millions of Indians |
| **Agentic Depth (20%)** | Gemini autonomously analyzes images, categorizes issues, generates descriptions, and predicts municipal trends |
| **Innovation & Creativity (20%)** | Combines vision AI + gamification + predictive analytics in a civic context — rarely done together |
| **Usage of Google Technologies (15%)** | Gemini 2.5 Flash for vision + text + analysis; Google Fonts; Google AI Studio deployment |
| **Product Experience & Design (10%)** | Polished dark UI, responsive design, smooth micro-interactions, toast notifications, loading states |
| **Technical Implementation (10%)** | Retry logic, async/await, structured JSON prompting, base64 image handling, localStorage |
| **Completeness & Usability (5%)** | All 4 pages fully functional; works on mobile; clear onboarding with settings modal |

---

## 📸 Screenshots

> *(Add screenshots of each page after deployment)*

- Feed Page — issue cards with category filters
- Report Page — AI image upload and auto-fill
- Dashboard — charts, map, AI insights
- Leaderboard — XP rankings and badges

---

## 🔮 Future Roadmap

- [ ] Google Maps API integration for real geo-location pinning
- [ ] Firebase backend for persistent data across users
- [ ] Push notifications for status updates
- [ ] WhatsApp integration for low-connectivity users
- [ ] Municipal authority admin portal
- [ ] Multi-city support beyond Jaipur

---

## 👤 Author

Built with ❤️ for the **Vibe2Ship Hackathon** by Coding Ninjas × Google for Developers.

---

*This project strictly adheres to hackathon guidelines — Google AI Studio (Gemini API) is the core intelligence engine. No third-party AI models were used.*
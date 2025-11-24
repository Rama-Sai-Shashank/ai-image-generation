# NovaVision – AI Image Generator (FastAPI + React)

A mini AI image generator built with **FastAPI** and **React**, using a Hugging Face text-to-image model.  
Designed as a clean, deployable full-stack project for portfolio, freelancing demos and learning.

---

## ✨ Features

- 🧠 **AI Image Generation**
  - Text prompt → AI generated image (FLUX / Stable Diffusion via Hugging Face)
- ⚡ **FastAPI Backend**
  - Simple `/generate` endpoint
  - Uses `huggingface_hub.InferenceClient`
  - Clean CORS & env-based config
- 💻 **React Frontend**
  - Modern, light UI with futuristic aesthetic
  - Prompt box + Generate button + loader state
  - Inline error messages when API/credits fail
- ⬇️ **Download Support**
  - One-click download as `.png`
- ☁️ **Fully Deployed**
  - Backend: **Render**
  - Frontend: **Vercel**

Live demo: **https://rama-sai-ai-img-gen.vercel.app/**  
Backend: **https://ai-image-generation-0dtk.onrender.com**

---

## 🏗 Tech Stack

### **Frontend**
- React (CRA)
- Vanilla CSS

### **Backend**
- Python 3 + FastAPI
- Uvicorn
- huggingface_hub

### **Infra**
- Render (Backend)
- Vercel (Frontend)
- GitHub

---

## 🚀 Getting Started (Local)

### 1. Clone the repository

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Backend setup

```
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Create a `.env` inside backend:

```
HF_API_KEY=YOUR_HF_TOKEN
HF_MODEL_ID=black-forest-labs/FLUX.1-schnell
```

Run:

```
uvicorn main:app --reload
```

Docs → `http://127.0.0.1:8000/docs`

### 3. Frontend setup

```
cd ../frontend
npm install
npm start
```

---

## 🧪 API Overview

### `POST /generate`

**Request**

```
{
  "prompt": "a cat wearing sunglasses"
}
```

**Response**

```
{
  "image_base64": "<base64-string>"
}
```

---

## 🧾 Notes on Free Credits

If HuggingFace free inference credits finish:

- Backend returns  error  
- Frontend shows a friendly banner:  
“Your monthly free credits may be finished. Try again next month.”

---

## 🎯 Future Improvements

- Prompt history  
- Multi-model selection  
- Auth + Saved images  
- Advanced settings  

---

## 👤 Author

**Rama Sai Shashank Natukula**  
B.Tech CSE (IoT & Cybersecurity with Blockchain)  
FastAPI + React | AI Tools Developer


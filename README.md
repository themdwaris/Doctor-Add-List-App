# 🏥 Doctor Add List App

A full-stack doctor directory web application built using **Next.js 14+**, **MongoDB**, and **Tailwind CSS** that allows users to search and filter doctors based on multiple criteria like fees, experience, and languages. Cloudinary is integrated for profile image uploads.

---

## 🚀 Features

- ✅ **Add Doctor** form with Cloudinary image upload.
- ✅ **Doctor Listing with Pagination** (6 per page).
- ✅ **Multi-Filter Options:**
  - Filter by **Languages** (checkbox based)
  - Filter by **Experience range** (e.g., 0-2, 3-5 years)
  - Filter by **Fees range** (e.g., 0-500, 500-1000 Rs)
  - Sort by **Price Low to High** or **High to Low**
  - Search by **Name or Profession**
- ✅ Responsive UI using **Tailwind CSS**
- ✅ Backend APIs using **Next.js App Router**
- ✅ Upload and store profile images with **Cloudinary**

---

## 🧰 Tech Stack

### Frontend
- React (Next.js 14+ App Router)
- Tailwind CSS
- Axios
- React Icons

### Backend
- MongoDB (Mongoose)
- Cloudinary (Image Uploads)
- REST API (Next.js App Router)

### Other Tools
- Dotenv for environment variables
- Vercel (for future deployment)

---

## 📦 Project Structure

```
my-app/
├── components/
│   └── AddDoctorForm.jsx
├── pages/
├── app/
│   └── api/
│       ├── add/route.js         # POST Doctor
│       ├── list/route.js        # GET Doctors with filters
│       └── upload/route.js      # Cloudinary upload
├── model/
│   └── doctorModel.js
├── lib/
│   └── db.js                    # MongoDB Connection
├── public/
├── .env.local
├── tailwind.config.js
└── next.config.js
```

---

## ⚙️ How to Run Locally

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/doctor-listing-app.git
cd doctor-listing-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local` file**
```env
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
```

4. **Run the development server**
```bash
npm run dev
```

App will be live at: `http://localhost:3000`

---

## 📤 API Endpoints

### ➕ POST /api/add
- Adds a new doctor (expects `multipart/form-data`)

### 📥 GET /api/list
- Returns filtered doctor list based on query:
  ```js
  /api/list?page=1&language=Hindi&experience=0-2&fees=0-500&search=cardio&sort=lowToHigh
  ```

### 📷 POST /api/upload
- Uploads image to Cloudinary and returns URL

---

## 🙌 Acknowledgements
- Cloudinary for media hosting
- MongoDB for flexible document storage
- Next.js App Router for powerful API handling

---

## 📮 Contact
Made with ❤️ by Mohammad Waris — Feel free to reach out!


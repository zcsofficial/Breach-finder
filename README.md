# Breach Finder - Hackers Edition

## 📌 Project Description
Breach Finder is a cybersecurity tool designed to check whether an email address has been compromised in a data breach. It features a hacker-style **Kali Linux purple & black theme**, real-time breach checking, and black market data insights.

## 🚀 Features
- **Fast API-based backend** to check breached emails.
- **Hacker-style UI** with animations, glitch effects, and futuristic loading bars.
- **Live breach statistics** including breach count and black market insights.
- **Security Quotes** to help users stay protected.
- **Optimized JSON parsing** for fast response time.

---

## ⚡ Installation

### Prerequisites
- Python 3.8+
- FastAPI
- Uvicorn

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/zcsofficial/breach-finder.git
cd breach-finder
```

### 2️⃣ Install Dependencies
```sh
pip install -r requirements.txt
```

### 3️⃣ Start the Server
```sh
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

---

## 🛠️ API Endpoints

### Check for a Breach
- **Endpoint:** `/check_breach`
- **Method:** `GET`
- **Query Parameter:** `email=<your-email>`
- **Example:** `http://localhost:8000/check_breach?email=test@example.com`

#### Response Format:
```json
{
    "status": "breached",
    "name": "John Doe",
    "phone": "1234567890",
    "breach_date": "2024-01-01"
}
```
or
```json
{
    "status": "safe"
}
```

---

## 🔥 Technologies Used
- **Backend:** FastAPI (Python)
- **Frontend:** HTML, CSS, JavaScript (Hackers-style UI)
- **Database:** JSON file-based breach storage

---

## ✅ Advantages
- **Fast breach detection** with optimized JSON lookup.
- **Highly responsive** UI with animations.
- **Security-focused** with insights & quotes.
- **Cross-platform compatibility** (works on Linux, Windows, Mac).

## ❌ Limitations
- Requires **manual updates** of breach database (`users.txt`).
- No **live breach monitoring** (only checks stored breaches).
- Doesn't include **hashed passwords verification**.

---

## 💡 Future Enhancements
- **Live breach updates** from external APIs.
- **User alerts** for newly breached data.
- **Dark web scanning** integration.

---

## 🤖 Author & Contribution
- Developed by **Adnan KS**  
- Contributions are welcome! Feel free to submit pull requests.


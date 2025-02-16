document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search-button").addEventListener("click", startSearch);
});

async function startSearch() {
    const email = document.getElementById("email").value.trim();
    const resultDiv = document.getElementById("result");
    const breachCountDiv = document.getElementById("breach-count");
    const loadingDiv = document.getElementById("loading");
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");

    if (!email) {
        resultDiv.innerHTML = "<p class='error'>❌ Please enter a valid email.</p>";
        return;
    }

    resultDiv.innerHTML = "";
    breachCountDiv.innerHTML = "";
    loadingDiv.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "Checking... 0%";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + "%";
        progressText.innerText = `Checking... ${progress}%`;
        if (progress >= 100) clearInterval(interval);
    }, 200);

    try {
        const response = await fetch(`http://127.0.0.1:8000/check_breach?email=${email}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();

        clearInterval(interval);
        loadingDiv.style.display = "none";

        if (data.status === "breached") {
            breachCountDiv.innerHTML = `<h2>🚨 Breach Found!</h2>`;
            resultDiv.innerHTML = `
                <p class='error'>⚠️ Your email was found in a breach.</p>
                <ul>
                    <li>🔹 <strong>Name:</strong> ${data.name || "N/A"}</li>
                    <li>🔹 <strong>Phone:</strong> ${data.phone || "N/A"}</li>
                    <li>🔹 <strong>Breach Date:</strong> ${data.breach_date || "Unknown"}</li>
                </ul>`;
        } else {
            resultDiv.innerHTML = "<p class='success'>✅ No breaches found!</p>";
        }
    } catch (error) {
        clearInterval(interval);
        loadingDiv.style.display = "none";
        resultDiv.innerHTML = `<p class='error'>❌ Error: ${error.message}</p>`;
    }
}

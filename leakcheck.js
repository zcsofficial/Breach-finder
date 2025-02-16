// Typing Animation for the Hacker Effect
const typingText = "Enter your email to check for breaches...";
let i = 0;
function typeEffect() {
    if (i < typingText.length) {
        document.getElementById("typing-text").textContent += typingText.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}
typeEffect();

// Function to Check for Breaches
async function checkBreach() {
    const email = document.getElementById("email").value;
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    if (!email) {
        resultDiv.innerHTML = "<p class='error'>⚠️ Please enter a valid email!</p>";
        return;
    }

    resultDiv.innerHTML = "";
    loadingDiv.style.display = "block";

    try {
        const response = await fetch(`https://leakcheck.io/api?key=YOUR_API_KEY&check=${email}&type=email`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        loadingDiv.style.display = "none";

        const data = await response.json();

        if (data.success && data.found) {
            let breaches = "<p class='error'>⚠️ Your email was found in the following breaches:</p><ul>";
            data.sources.forEach(breach => {
                breaches += `<li>🔹 ${breach} - Found in leaked databases</li>`;
            });
            breaches += "</ul>";
            resultDiv.innerHTML = breaches;
        } else if (data.success && !data.found) {
            resultDiv.innerHTML = "<p class='success'>✅ No breaches found!</p>";
        } else {
            resultDiv.innerHTML = "<p class='error'>❌ Error fetching data. Try again later.</p>";
        }
    } catch (error) {
        loadingDiv.style.display = "none";
        resultDiv.innerHTML = "<p class='error'>❌ Unable to connect to the breach database.</p>";
    }
}

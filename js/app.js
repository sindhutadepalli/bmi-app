// --- BMI CALCULATOR LOGIC ---
const calcBtn = document.getElementById("calc-btn");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");
const healthyRange = document.getElementById("healthy-range");
const ageNote = document.getElementById("age-note");

calcBtn.addEventListener("click", () => {
  const height = parseFloat(document.getElementById("height").value) / 100; // cm to m
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);

  if (!height || !weight || !age) {
    bmiValue.textContent = "—";
    bmiCategory.textContent = "Please enter valid values";
    healthyRange.textContent = "";
    ageNote.textContent = "";
    return;
  }

  const bmi = weight / (height * height);
  bmiValue.textContent = bmi.toFixed(1);

  let classification = {};
  if (bmi < 18.5) {
    classification = { cat: "Underweight", color: "#0ea5e9" };
  } else if (bmi < 25) {
    classification = { cat: "Healthy", color: "#16a34a" };
  } else if (bmi < 30) {
    classification = { cat: "Overweight", color: "#f59e0b" };
  } else {
    classification = { cat: "Obesity", color: "#dc2626" };
  }

  bmiCategory.textContent = classification.cat;
  bmiCategory.style.color = classification.color;

  healthyRange.textContent = "A healthy BMI is between 18.5 and 24.9.";

  ageNote.textContent =
    age < 18
      ? "Note: BMI interpretation differs for children and teens."
      : "";
});

// --- NETLIFY IDENTITY AUTH ---
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const userEmailSpan = document.getElementById("user-email");
const calculator = document.getElementById("calculator");
const welcome = document.getElementById("welcome");

if (window.netlifyIdentity) {
  netlifyIdentity.on("init", user => updateAuthUI(user));
  netlifyIdentity.on("login", user => {
    updateAuthUI(user);
    netlifyIdentity.close();
  });
  netlifyIdentity.on("logout", () => updateAuthUI(null));
}

loginBtn.addEventListener("click", () => netlifyIdentity.open("login"));
signupBtn.addEventListener("click", () => netlifyIdentity.open("signup"));
logoutBtn.addEventListener("click", () => netlifyIdentity.logout());

function updateAuthUI(user) {
  if (user) {
    calculator.classList.remove("hidden");
    welcome.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    userEmailSpan.textContent = user.email;
  } else {
    calculator.classList.add("hidden");
    welcome.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    userEmailSpan.textContent = "";
  }
}

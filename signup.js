import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyDqY_n0HuKyIsRhj99flbORVn3CGuMg2DQ",
  authDomain: "microgrid-32d40.firebaseapp.com",
  projectId: "microgrid-32d40",
  storageBucket: "microgrid-32d40.firebasestorage.app",
  messagingSenderId: "253327439205",
  appId: "1:253327439205:web:e3e54b3f8bd872384d1d8c",
  measurementId: "G-2541NH4CGE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signup = function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert("Signup error: " + error.message));
};

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "dashboard.html";
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
 apiKey: "AIzaSyD1KGJBmLmQmoCvk0hofCkGmcl5AbLCquA",
  authDomain: "microgrid-project-a6bc8.firebaseapp.com",
  projectId: "microgrid-project-a6bc8",
  storageBucket: "microgrid-project-a6bc8.firebasestorage.app",
  messagingSenderId: "816164204779",
  appId: "1:816164204779:web:872ed1baa38a41688b8eae",
  measurementId: "G-NKHX22ETP2"
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
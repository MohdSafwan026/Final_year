import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert("Login error: " + error.message));
};

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "dashboard.html";
});

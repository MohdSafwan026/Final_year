// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, updateDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
const db = getFirestore(app);

let currentUserEmail = "";

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("user-name").textContent = `Welcome, ${user.email}`;
    currentUserEmail = user.email;
    listenForRequests();
  } else {
    window.location.href = "login.html";
  }
});

document.querySelector("#logout").onclick = () => {
  signOut(auth).then(() => window.location.href = "login.html");
};

window.sendPowerRequest = async function () {
  const friendEmail = prompt("Enter friend's email to request power:");
  if (!friendEmail || friendEmail === currentUserEmail) return alert("Invalid email");

  await addDoc(collection(db, "power_requests"), {
    from: currentUserEmail,
    to: friendEmail,
    status: "pending"
  });

  showNotification("Request sent to " + friendEmail);
};

function listenForRequests() {
  const q = query(collection(db, "power_requests"), where("to", "==", currentUserEmail), where("status", "==", "pending"));
  onSnapshot(q, snapshot => {
    const requestDiv = document.getElementById("incoming-request");
    if (snapshot.empty) {
      requestDiv.style.display = "none";
      return;
    }
    snapshot.forEach(docSnap => {
      requestDiv.style.display = "block";
      document.getElementById("request-msg").textContent = `Power request from: ${docSnap.data().from}`;
      requestDiv.dataset.requestId = docSnap.id;
    });
  });
}

window.acceptPowerRequest = async function () {
  const requestId = document.getElementById("incoming-request").dataset.requestId;
  if (!requestId) return;

  const requestDoc = doc(db, "power_requests", requestId);
  await updateDoc(requestDoc, {
    status: "accepted"
  });

  showNotification("Request accepted. Power sharing initiated.");
  document.getElementById("incoming-request").style.display = "none";
};

function showNotification(msg) {
  const div = document.getElementById("notification");
  div.textContent = msg;
  setTimeout(() => div.textContent = "", 5000);
}

window.payBill = function () {
  alert("Bill paid via dummy method!");
};

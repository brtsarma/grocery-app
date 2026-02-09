// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-Ii0hMgfY11g7DkTada1-lbvtOGVNSXU",
  authDomain: "groceryapp-f3d45.firebaseapp.com",
  databaseURL: "https://groceryapp-f3d45-default-rtdb.firebaseio.com",
  projectId: "groceryapp-f3d45",
  storageBucket: "groceryapp-f3d45.firebasestorage.app",
  messagingSenderId: "366437105357",
  appId: "1:366437105357:web:f4d50390f998bbe8927384"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const groceryRef = ref(db, 'grocery');

export { groceryRef, set, onValue };

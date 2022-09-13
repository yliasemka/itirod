import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBR8sXptU7s2jSU-dSSb5IPvk-646OM-1A",
  authDomain: "fintrak-b4635.firebaseapp.com",
  projectId: "fintrak-b4635",
  storageBucket: "fintrak-b4635.appspot.com",
  messagingSenderId: "792600049626",
  appId: "1:792600049626:web:f63f15026c1470be90b2e3",
  measurementId: "G-DZ9EWE5MMK"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

let submit = document.getElementById("submit__login");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let creds = document.getElementsByClassName("box__input");
  let username = creds[2].value;
  let password = creds[3].value;
  let validation = document.getElementsByClassName("validation")[0];
  if (username == "" || password == "") {
    validation.textContent = "empty fields";
    return;
  }
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      let email = document.getElementsByClassName("right-section__name")[0];
      email.textContent = user.email;
      creds[2].textContent = "";
      creds[3].textContent = "";
      validation.textContent = "";
      location.href = "#nav-header";
    })
    .catch((error) => {
      validation.textContent = error.code;
    });
});

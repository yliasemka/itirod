import AbstractView from "./AbstractView.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js";
let isButtonPush = false;
const firebaseConfig = {
  apiKey: "AIzaSyBND3ipRWjDS77DRoiljGIJE9A8WWibqxk",

  authDomain: "fintrack-stomello4ek.firebaseapp.com",

  projectId: "fintrack-stomello4ek",

  storageBucket: "fintrack-stomello4ek.appspot.com",

  messagingSenderId: "904770796483",

  appId: "1:904770796483:web:b9bdaefc1f31fa3b555b76",
};
let deleteRow = async (event) => {
  const db = getFirestore();
  console.log(
    event.target.parentNode.parentNode.parentNode.firstChild.textContent
  );
  await deleteDoc(
    doc(
      db,
      "transactions",
      event.target.parentNode.parentNode.parentNode.firstChild.textContent
    )
  ).then(() => {
    const taskList = document.getElementsByClassName("main-table")[0];
    taskList.innerHTML =
      "<tr>" +
      "<th></th>" +
      '<th class="td-type">Type</th>' +
      '<th class="td-date">Date</th>' +
      '<th class="td-amount">Amount($)</th>' +
      "<th></th>" +
      "</tr>";
    render();
  });
};
async function render() {
  let transactions = [];
  const db = getFirestore();
  const auth = getAuth();
  const querySnapshot = await getDocs(collection(db, "transactions"));
  querySnapshot.forEach((doc) => {
    if (auth.currentUser.uid != doc.data().userId) return;
    const obj = {
      id: doc.id,
      data: doc.data(),
    };
    transactions.push(obj);
  });
  let email = document.getElementsByClassName("right-section__name")[0];
  email.textContent = auth.currentUser.email;
  const taskList = document.getElementsByClassName("main-table")[0];
  taskList.innerHTML =
    "<tr>" +
    "<th></th>" +
    '<th class="td-type">Type</th>' +
    '<th class="td-date">Date</th>' +
    '<th class="td-amount">Amount($)</th>' +
    "<th></th>" +
    "</tr>";
  transactions.forEach((transaction) => {
    const taskHtml =
      '<tr class="main-table__str">' +
      '<td style="display:none">' +
      transaction.id +
      "</td>" +
      '<td><img class="str__shop-img" src="/static/images/shopping.svg"></td>' +
      '<td class="str__first-cl">' +
      transaction.data.category +
      "</td>" +
      '<td class="str__second-cl">' +
      transaction.data.date +
      "</td>" +
      '<td class="str__therd-cl">' +
      transaction.data.amount +
      "</td>" +
      '<td class="str__del">' +
      '<button class="str__delete-img-button">' +
      '<img class="delete-img" src="/static/images/delete.svg">' +
      "</button>" +
      "</td>" +
      "</tr>";
    try {
      if (isButtonPush) {
        if (transaction.data.amount[0] == "+") {
          taskList.innerHTML += taskHtml;
        }
      } else {
        if (transaction.data.amount[0] == "-") {
          taskList.innerHTML += taskHtml;
        }
      }
    } catch {
      console.log("wrong page");
    }
    let deletions = document.getElementsByClassName("delete-img");

    for (let i = 0; i < deletions.length; i++) {
      deletions[i].addEventListener("click", deleteRow);
    }
  });
}

export default class extends AbstractView {
  constructor() {
    super();
  }
  async getButtons() {
    let inc = document.getElementsByClassName("incomes-button")[0];
    let exp = document.getElementsByClassName("expenses-button")[0];

    inc.addEventListener("click", async function (event) {
      event.preventDefault();
      isButtonPush = true;
      console.log(isButtonPush);
      render();
    });

    exp.addEventListener("click", async function (event) {
      event.preventDefault();
      isButtonPush = false;
      console.log(isButtonPush);
      render();
    });
  }

  async getHtml() {
    return `
            <div>
                <a href="#addform" class="add-button">
                    <div>
                        <img class="add-button__img" src="/static/images/plus.svg"> 
                        <p>Add transaction</p>
                    </div> 
                </a>
            </div>

            <h2>History</h2>
            <button class="incomes-button"> 
                <p>Income</p>
            </button>
            <button class="expenses-button"> 
                <p>Expenses</p>
            </button>
            <table class="main-table">
            <tr>
            <td></td>" 
            <td class="str__second-cl">Loading files from database...</td>' 
            </tr>
            </table>
        `;
  }
}

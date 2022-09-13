import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
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

const firebaseConfig = {
  apiKey: "AIzaSyBR8sXptU7s2jSU-dSSb5IPvk-646OM-1A",
  authDomain: "fintrak-b4635.firebaseapp.com",
  projectId: "fintrak-b4635",
  storageBucket: "fintrak-b4635.appspot.com",
  messagingSenderId: "792600049626",
  appId: "1:792600049626:web:f63f15026c1470be90b2e3",
  measurementId: "G-DZ9EWE5MMK"
};

//addTransaction
const db = getFirestore();
const auth = getAuth();
let curAmount = 0;

let submit = document.getElementById("submit__addTrans");

submit.addEventListener("click", async function (event) {
  event.preventDefault();

  let creds = document.getElementsByClassName("box__input");
  let amount = Number(creds[4].value);
  let date = creds[5].value;
  let category = creds[6].value;
  creds[4].value = "";
  creds[5].value = "";
  let validation = document.getElementsByClassName("validationT")[0];
  if (amount == "" || date == "") {
    validation.textContent = "empty fields";
    return;
  }
  validation.textContent = "";
  let radio = document.querySelectorAll('input[name="select"]');
  let categories = [];
  const querySnapsho = await getDocs(collection(db, "categories"));
  querySnapsho.forEach((doc) => {
    const obj = {
      id: doc.id,
      data: doc.data(),
    };
    categories.push(obj);
  });
  categories.forEach(async (categ) => {
    if (categ.data.type == category) {
      if (radio[0].checked) {
        categ.data.amount += amount;
      } else {
        categ.data.amount -= amount;
      }
      await updateDoc(doc(db, "categories", categ.id), {
        amount: categ.data.amount,
      });
    }
  });
  let isIncomes = false;
  if (radio[0].checked) {
    amount = "+" + amount;
    isIncomes = true;
  } else {
    amount = "-" + amount;
  }

  async function getString() {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        amount: amount,
        date: date,
        category: category,
        userId: auth.currentUser.uid,
        incomes: isIncomes,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  getString().then(() => {
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
    location.href = "#nav-header";
  });
});

//read dATA

async function render() {
  let transactions = [];

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
  let date = new Date();
  let nowdate = document.getElementsByClassName("current-amount__date")[0];
  nowdate.textContent =
    date.toDateString() + ", " + date.getHours() + ":" + date.getMinutes();
  curAmount = 0;
  const taskList = document.getElementsByClassName("main-table")[0];
  try {
    taskList.innerHTML =
      "<tr>" +
      "<th></th>" +
      '<th class="td-type">Type</th>' +
      '<th class="td-date">Date</th>' +
      '<th class="td-amount">Amount($)</th>' +
      "<th></th>" +
      "</tr>";
  } catch {
    console.log("wrong");
  }
  transactions.forEach((transaction) => {
    curAmount += Number(transaction.data.amount);
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
      taskList.innerHTML += taskHtml;
    } catch {
      console.log("wrong");
    }

    let deletions = document.getElementsByClassName("delete-img");

    for (let i = 0; i < deletions.length; i++) {
      console.log(
        deletions[i].parentNode.parentNode.parentNode.childNodes[2].textContent
      );
      deletions[i].addEventListener("click", async () => {
        let categories = [];
        const querySnapsho = await getDocs(collection(db, "categories"));
        querySnapsho.forEach((doc) => {
          const obj = {
            id: doc.id,
            data: doc.data(),
          };
          categories.push(obj);
        });
        categories.forEach(async (categ) => {
          console.log(
            Number(
              deletions[i].parentNode.parentNode.parentNode.childNodes[4]
                .textContent
            )
          );
          if (
            categ.data.type ==
            deletions[i].parentNode.parentNode.parentNode.childNodes[2]
              .textContent
          ) {
            categ.data.amount -= Number(
              deletions[i].parentNode.parentNode.parentNode.childNodes[4]
                .textContent
            );
            await updateDoc(doc(db, "categories", categ.id), {
              amount: categ.data.amount,
            });
          }
        });
      });
      deletions[i].addEventListener("click", deleteRow);
    }
  });
  let currentAmount = document.getElementsByClassName(
    "current-amount__count"
  )[0];
  currentAmount.textContent = curAmount + "$";
}
render();
render1();

// //delete
let deleteRow = async (event) => {
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
let deleteRowCat = async (event) => {
  console.log(
    event.target.parentNode.parentNode.parentNode.firstChild.textContent
  );

  await deleteDoc(
    doc(
      db,
      "categories",
      event.target.parentNode.parentNode.parentNode.firstChild.textContent
    )
  ).then(() => {
    const taskList = document.getElementsByClassName("categories-table")[0];
    taskList.innerHTML =
      "<tr>" +
      "<th></th>" +
      '<th class="td-type">Type</th>' +
      '<th class="td-amount">Amount($)</th>' +
      "<th></th>" +
      "</tr>";
    render1();
  });
};

// categories

async function render1() {
  let categories = [];

  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      data: doc.data(),
    };
    categories.push(obj);
  });
  const taskList = document.getElementsByClassName("categories-table")[0];
  try {
    taskList.innerHTML =
      "<tr>" +
      "<th></th>" +
      '<th class="td-type-categories">Type</th>' +
      '<th class="td-amount">Amount($)</th>' +
      "<th></th>" +
      "</tr>";
  } catch {}
  categories.forEach((category) => {
    const taskHtml =
      '<tr class="main-table__str">' +
      '<td style="display:none">' +
      category.id +
      "</td>" +
      '<td><img class="str__shop-img" src="/static/images/shopping.svg"></td>' +
      '<td class="str__first-cl-categories">' +
      category.data.type +
      "</td>" +
      '<td class="str__therd-cl">' +
      category.data.amount +
      "</td>" +
      '<td class="str__del">' +
      '<button class="str__delete-img-button">' +
      '<img class="delete-img" src="/static/images/delete.svg">' +
      "</button>" +
      "</td>" +
      "</tr>";
    const taskHtml1 = "<option>" + category.data.type + "</option>";
    const taskListType = document.getElementById("box__input__select");
    try {
      taskListType.innerHTML += taskHtml1;
    } catch {}
    try {
      taskList.innerHTML += taskHtml;
    } catch {
      console.log("wrong page");
    }

    let deletions = document.getElementsByClassName("delete-img");

    for (let i = 0; i < deletions.length; i++) {
      deletions[i].addEventListener("click", deleteRowCat);
    }
  });
}
let submit1 = document.getElementById("submit__addCateg");

submit1.addEventListener("click", function (event) {
  event.preventDefault();

  let creds = document.getElementsByClassName("box__input");
  let name = creds[7].value;
  creds[7].value = "";
  let validation = document.getElementsByClassName("validationC")[0];
  if (name == "") {
    validation.textContent = "empty field";
    return;
  }
  validation.textContent = "";
  async function getString() {
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        type: name,
        amount: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  getString().then(() => {
    const taskList = document.getElementsByClassName("categories-table")[0];
    taskList.innerHTML =
      "<tr>" +
      "<th></th>" +
      '<th class="td-type-categories">Type</th>' +
      '<th class="td-amount">Amount($)</th>' +
      "<th></th>" +
      "</tr>";
    render1();
    location.href = "#nav-header";
  });
});

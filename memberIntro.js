// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyCUJgTfcVLl2GaCpkRz8QKQi7ckahg5-vk",
  authDomain: "teamintroduction-5a201.firebaseapp.com",
  projectId: "teamintroduction-5a201",
  storageBucket: "teamintroduction-5a201.firebasestorage.app",
  messagingSenderId: "454018328605",
  appId: "1:454018328605:web:b7e98d12da1bd75a35bef4",
  measurementId: "G-YHLPYZ4FHW",
};
// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$(document).ready(async function () {
  $("#commenting").click(async function () {
    let title = $("#title").val();
    let content = $("#content").val();
    let link = $("#link").val();
  });
});

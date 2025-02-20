// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정 
const firebaseConfig = {
    apiKey: "AIzaSyCUJgTfcVLl2GaCpkRz8QKQi7ckahg5-vk",
    authDomain: "teamintroduction-5a201.firebaseapp.com",
    projectId: "teamintroduction-5a201",
    storageBucket: "teamintroduction-5a201.firebasestorage.app",
    messagingSenderId: "454018328605",
    appId: "1:454018328605:web:b7e98d12da1bd75a35bef4",
    measurementId: "G-YHLPYZ4FHW"
};

/* 가희님 정보
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADW84rdCe7pXddsQzeN3LTWdkg2iYONGg",
    authDomain: "sparta-3a81e.firebaseapp.com",
    projectId: "sparta-3a81e",
    storageBucket: "sparta-3a81e.firebasestorage.app",
    messagingSenderId: "662040666858",
    appId: "1:662040666858:web:3a3a269a7fb73d3b1fed93",
    measurementId: "G-5ZMKYMR2ER"
}; */

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$(document).ready(async function () {
    // 모달 열기
    $("#openModel").click(function () {
        $("#myModal").css("display", "flex");
    });

    // 닫기 버튼 클릭 시 모달 닫기
    $(".close").click(function () {
        $("#myModal").css("display", "none");
    });

    $("#postingbtn").click(async function () {
        let isValid = true;

        let title = $("#title").val();
        let content = $("#content").val();
        let link = $("#link").val();
        let file = $("#file")[0].files[0];  // 파일 선택된 파일을 가져옴

        if (!title || !content || !link || !file === 0) {
            alert("모든 항목을 입력해주세요.");
            isValid = false;
        }

        if (isValid) {
            alert("게시글이 작성되었습니다.");
            $("#myModal").css("display", "none");

            // 파일 URL 생성
            let fileURL = "";
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    fileURL = e.target.result;  // data URL 형태로 파일의 URL을 가져옴
                    console.log("파일 URL:", fileURL);

                    // Firestore에 데이터 저장
                    let doc = {
                        'title': title,
                        'content': content,
                        'link': link,
                        'fileURL': fileURL // 파일 URL을 Firestore에 저장
                    };

                    addDoc(collection(db, "postings"), doc)
                        .then(() => {
                            alert('저장 완료!');
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error("에러 발생: ", error);
                            alert("저장 중 오류 발생");
                        });
                };
                reader.readAsDataURL(file);  // 파일을 읽어서 data URL로 변환
            }
        }

    });
    //getDocs 추가한 부분
    let docs = await getDocs(collection(db, "postings"));
    docs.forEach((doc) => {
        let row = doc.data();
        console.log(row);
        let link = row['link'];
        let title = row['title'];
        let content = row['content'];
        let fileURL = row['fileURL'];

        let temp_html =
            `<div class="col">
                    <div class="card h-100">
                        <a href="${link}">
                            <img src="${fileURL}" style="width: 377.33px; height: 377.33px;"
                                class="card-img-top" alt="...">
                        </a>
                        <div class="overlay">
                            <h4>${title}</h4>
                            <span>${content}</span>
                        </div>
                    </div>
                </div>`

        $("#card").append(temp_html);
    });
});
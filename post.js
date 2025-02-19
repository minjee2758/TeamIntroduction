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
        let file = $("#file")[0].files.length;

        if (!title) {
            alert("제목을 입력해주세요.");
            isValid = false;
        }

        if (!content) {
            alert("내용을 입력해주세요.");
            isValid = false;
        }

        if (!link) {
            alert("링크를 입력해주세요.");
            isValid = false;
        }

        if (file === 0) {
            alert("파일을 업로드해주세요.");
            isValid = false;
        }

        if (isValid) {
            alert("게시글이 작성되었습니다.");
            $("#myModal").css("display", "none");
        }
        //Firestore 저장하기
        let doc = {
            'title': title,
            'content': content,
            'link': link,
            'file': file
        };
        
        await addDoc(collection(db, "postings"), doc);
        alert('저장 완료!');
        window.location.reload();
        $("#myModal").css("display", "none");

    });

        //getDocs 추가한 부분
    let docs = await getDocs(collection(db, "postings"));
    docs.forEach((doc) => {
      let row = doc.data();
      console.log(row);
      let link = row['link'];
      let title = row['title'];
      let content = row['content'];
      let file = row['file'];

      let temp_html =
        `<div class="col">
              <div class="card h-100">
                <img src="${file}">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${content}</p>
                </div>
                <div class="card-footer">
                  <small class="text-body-secondary">${link}</small>
                </div>
              </div>
            </div>
            `
      $("#card").append(temp_html);
    });
});
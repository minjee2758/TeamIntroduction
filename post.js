$(document).ready(function () {
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
});
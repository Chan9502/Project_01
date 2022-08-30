'use strict'
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

// hàm hiển thị nội dung trên trang theo userActive
function displayHome(){
    //nếu người dùng đăng nhập thì thực hiện điều kiện bên dưới 
    if(userActive){
        //ẩn "loginModal"
        loginModal.style.display = "none";
        mainContent.style.display = "block";

        //thêm thông báo về Welcome - Message
        //chạy vòng lập for..lấy phần tử firstname
        
        welcomeMessage.textContent = `Welcome ${userActive.firstName}`
        
        //nếu không tìm thấy thông tin đăng nhập (null) thì thực hiện các điều kiện else
    }else {
        //hiện loginModal
        loginModal.style.display = "block";
        //ẩn "main-contant"
        mainContent.style.display = "none";
    }
}

// sự kiện nhấn vào nút logout
btnLogout.addEventListener("click", function(){
    const isLogout = confirm('Bạn chắc chắn muốn đăng xuất?');
    if(isLogout){
        //gán giá trị userActive về null để thể hiện ai đó k đăng nhâp, và hiển thị lại loginModal phía trên
        userActive = null;
        // lưu trữ (cập nhật dũ liệu) xuống local storage
        saveToStorage("userActive", userActive);
        //hiển thị trang home ở dạng chưa có đăng nhập
        displayHome();
    }
})
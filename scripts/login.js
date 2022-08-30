'use strict'
//lấy element
const inputUserName = document.getElementById("input-username");
const inputUserPass = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

//hàm bắt sự kiện click vào nút submit
btnSubmit.addEventListener("click", function(){
    //sau khi kiểm tra thông tin người nhập như bên dưới, tiến hành kiểm tra user có trùng lập hay không?
    const isValidate = validate(); //hàm kiểm tra dữ liệu không để value
    if(isValidate){
        //tìm kiếm trong userArr có username hay không?
        //so sánh dữ liệu với input value, khi thoãi mãi của 2 điều kiện input name và input password ==> có thể login, nếu false thì chạy về hàm else => hiện thông báo "không tìm thấy tài khoản"
        const user = userArr.find(
            (item) => 
            item.username === inputUserName.value &&
            item.password === inputUserPass.value
        );
        //nếu true ==> thông báo đăng nhập thành công, cũng là để ktra luồng code
        if(user){
            alert('Bạn đã đăng nhập thành công!')
            //lưu thông tin user đang hoạt động trên trang vào localStorage
            saveToStorage("userActive", user);
            //chuyển hướng về trang chủ (2 cách)
            window.location.href = '../index.html';
            // window.location.assign("../index.html");
        } else{
            //không thoãi mãn các điều kiện trên thì hiện thông báo 
            alert("Không tìm thấy thông tin tài khoản !!")
        }
    }
});

// Hàm validate nhập dữ liệu của người dùng
function validate(){
    //khai báo biến flag
    let isValidate = true;
    //kiểm tra người dùng đã nhập username và password hay chưa?
    if(inputUserName.value === ""){
        alert('Vui lòng nhập User Name!!')
        isValidate = false;
    }
    if(inputUserPass.value === ""){
        alert("Vui lòng nhập Password !!")
        isValidate = false;
    }
    // if(inputUserPass.value != users.password){
    //     alert('Mật khẩu không đúng!');
    //     isValidate = false;
    // }
    // else if(inputUserName.value != users.username){
    //     alert('Tên đăng nhập không đúng!')
    // }

    return isValidate;
}



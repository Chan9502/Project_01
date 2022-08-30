'use strict'
//lấy Element
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const inputPassWordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

//thử với tính năng ẩn hiện mật khẩu người dùng
const inputPassEle = document.querySelector('#input-password');

// sự kiện click vào nút Submit
btnSubmit.addEventListener("click", function(){
    //lấy dữ liệu từ form khi người dùng nhập vào 
    const user = new User(
        inputFirstName.value,
        inputLastName.value,
        inputUserName.value,
        inputPassWord.value,
    );

    //check validate, sau khi thông tin người dùng nhập vào thõa mãn các điều kiện bên dưới.
    const isValidate = validate(user);
    //nếu dữ liệu của user hợp lệ  - isValidate  = true
        if(isValidate){
            //thêm user vào mảng UserArr
            userArr.push(user);

            //lưu trữ dữ liệu, xuống localStorage
            saveToStorage("userArr", userArr);

            //thông báo đăng kí thành công, xác nhận lại luồng code đang được thực thi
            alert("Bạn đã đăng kí thành công :)")

            //điều hướng sang trang login
            window.location.href = '../pages/login.html'; //cách 1
            // window.location.assign("../pages/login.html"); // cách 2
        }
});

// hàm validate: thông tin đăng kí người dùng nhập qua form
//User : từ form nhập
// return về true or false
function validate(user){
    // khai báo biến flag, mặc định dữ liệu ban đầu hợp lệ
    let isValidate = true;

    //TH1: Không có trường nào bị bỏ trống
    if(user.firstName.trim().length === 0){
        alert("Vui lòng nhập First Name_Tên !")
        isValidate = false;
    }

    if(user.lastName.trim().length === 0){
        alert("Vui lòng nhập Last Name_Họ !")
        isValidate = false;
    }

    if(user.username.trim().length === 0){
        alert("Vui lòng nhập User Name_Tên đăng nhập !")
        isValidate = false;
    }

    /*  không dùng phương thức trim().length === 0 trên các trường passwword
        vì để bài yêu cầu password phải có độ dài hơn 8 kí tự
        nếu dấu cách cũng là kí tụ thõa mãn đề bài
    */
    if(user.password === ""){
        alert("Vui lòng nhập Password_Mật Khẩu !")
        isValidate = false;
    }

    if(inputPassWordConfirm.value === ""){
        alert("Vui lòng xác nhận lại Password !")
        isValidate = false;
    }

    //TH2 Username không được trùng với user của người dùng trước đấy
    if(
        //nếu username trùng với username mà người dùng đã đăng nhập trước
        !userArr.every((item) => (item.username !== user.username ? true : false))
        ){
        //có thể dùng vòng lập for
        // for (let i = 0; i < userArr.length; i++){
        //     //duyệt qua từng phần tử trong mảng
        //     if(userArr[i].username === user.username) {
        //         alert("Tài khoản đã tồn tại !");
        //         isValidate = false;
        //          break;
        //     }
        // }
        alert("Tài khoản đã tồn tại !");
        isValidate = false;    
    }

    //TH3 Password và confirm password phải giống nhau
    if(user.password !== inputPassWordConfirm.value){
        alert("Password và confirm password phải giống nhau !");
        isValidate = false;
    }

    //TH4 Password phải có nhiều hơn 8 kí tự ()>8)
    //có thể thêm các điều kiện cho password như, có 1 kí tự in hoa, chữ thường, số, kí tự đặc biệt
    // .length đê so sánh độ dài của passwork
    if(user.password.length <= 8){
        alert("Mật khẩu phải nhiều hơn 8 kí tự !!");
        isValidate = false;
    }
    //tính năng ẩn hiện passaword
    
    return isValidate;
}







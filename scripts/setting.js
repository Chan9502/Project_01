'use strict'
if(userActive){
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnsubmit = document.getElementById("btn-submit");

//bắt sự kiện click vào nút submit
btnsubmit.addEventListener("click", function(){
    //nếu dữ liệu nhập hợp lệ
    if(validate()){
        //cập nhật lại userActive
        userActive.pageSize = Number.parseInt(inputPageSize.value);
        userActive.category = inputCategory.value;
        saveToStorage("userActive", userActive);

        //cập nhật lại mảng userArr
        const index = userArr.findIndex(
            (userItem) => userItem.username === userActive.username);
            userArr[index] = userActive;
            saveToStorage("userArr", userArr);

            //thông báo đăng nhâp thành công
            alert("Cập nhật thành công :)")
            //reset lại form đăng nhập
            inputPageSize.value = "";
            inputCategory.value = "General";
    }
});

//hàm validate, kiểm tra dữ liệu nhập vào của người dùng
function validate(){
    //khai báo biến flag
    let isValidate = true;

    //kiểm tra inputPageSize
    if(Number.isNaN(Number.parseInt(inputPageSize.value))){
        alert("New per không hợp lệ!")
        isValidate = false;
    };
    //kiểm tra category
    if(inputCategory.value === ""){
        alert("Vui lòng nhập News Category!");
        isValidate = false;
    }

    return isValidate;
//nếu người dùng chưa nhập thì đăng nhập/đăng kí để sử dụng chức năng
}
}else {
    alert("Vui lòng đăng nhập/ đăng kí để sử dụng ứng dụng!!")
    //điều hướng sang login
    window.location.href = '../pages/login.html';
}
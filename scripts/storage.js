'use strict'
//////////////////////////////////////
//thêm animation cho sidebar

// const navEle = document.getElementById('sidebar');
// navEle.addEventListener("click", function(){
//     this.classList.toggle("active");
// });

///==> không thêm được do click vào thanh bar sẽ ẩn hoàn toàn, không sử dụng animation
// nếu cần sẽ tự tìm hiểu sau.

//--------------------------------------------------------------------------------//

//Hàm lấy dữ liệu theo Key tương ứng từ localStrorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

//hàm lưu dữ liệu xuống localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
//------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------//
//thực hiện UserActive
//Biến Users, lấy dữ liệu userArr từ LocalStorage
//mảng users lấy dữ liệu từ localStorage - nếu có trả về data - không trả về mảng trỗng
const users = getFromStorage("userArr") 
? getFromStorage("userArr") 
: [];
console.log(users);

//biến userArr, chuyển đổi về dạng class instance
//từng phần tử user sẽ gọi đến hàm pareUser thông qua map - sau đó trả về 1 chứa các instance của class user
const userArr = users.map((user) => parseUser(user));
//return về array chứa các instance của class user
console.log(userArr);

//biến userActive, đọc data từ localStorage, rồi gán vào biến userActive, 
//chỉ hiển thị 1 đối tượng ở 1 thời điểm đăng nhập và userActive sẽ tự động đổi lại data
let userActive = getFromStorage("userActive") 
? parseUser(getFromStorage("userActive")) 
: null;
console.log(userActive);
//------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------//
// thực hiện trên todo list
//Biến todo, lấy dữ liệu userArr từ LocalStorage sau đó gán lại vào biến todos
const todos = getFromStorage("todoArr") 
? getFromStorage("todoArr") 
: [];
console.log(todos);

//biến todoArr, chuyển đổi về dạng class instance gán vào biến todoArr
const todoArr = todos.map((todo) => parseTask(todo));
console.log(todoArr);
//----------------------------------------------------------------------------//
//hàm chuyển đổi parse đối với userData
// hàm chuyển đổi từ object sang class Instance
//đầu vào là 1 obj - userData - sau đó sẽ return ra 1 thể  hiện của Obj là user
function parseUser(userData){
    const user = new User(
        userData.firstName,
        userData.lastName,
        userData.username,
        userData.password,

        // thêm 2 thuộc tính để làm tính năng số 09
        userData.pageSize,
        userData.category,  
    );
    return user;
}
//----------------------------------------------------------------------------//
//hàm parse cho TodoList
//hàm chuyển đổi từ JS object sang class Instance của task class
function parseTask(taskData){
    const task = new Task(
        taskData.task, 
        taskData.ower, 
        taskData.isDone
        );
    return task;

}





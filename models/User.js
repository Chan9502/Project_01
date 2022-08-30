'use strict'
//class đại diện thông tin của người dùng
class User {
    constructor(
        firstName,
        lastName,
        username,
        password,
        // mặc định nếu k khai báo giá trị của 2 biến thì..
        //định dạng mặc định số News list hiển thị trên trang là 10 news
        pageSize = 10, // nếu k truyền thì mặc định cũng bằng 10
        category = "business",
    ){
        this.firstName = firstName;
        this.lastName = lastName; 
        this.username = username;
        this.password = password;

        // 2 thuộc tính thêm vào để làm yêu cầu số 9, cá nhân hóa luôn phần cài đặt thông tin cho tùng user 
        this.pageSize = pageSize;
        this.category = category;
    }
}

// yêu cầu số 7 or 8
// Class để chứa các thông tin trong TodoList 
class Task {
    constructor(task, ower, isDone){
        this.task = task; //ten công việc
        this.ower = ower; // username theo người dùng tạo ra
        this.isDone = isDone; // task này đã hoàn thành hay chưa?   
    }
}
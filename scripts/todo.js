
'use strict'
//nếu người dùng đã đăng nhập
if(userActive){
    const todoList = document.getElementById("todo-list");
    const btnAdd = document.getElementById("btn-add");
    const inputTask = document.getElementById("input-task");

    displayTodoList();

    //hàm hiển thị thông tin todolist
    function displayTodoList(){
        //gán cho phần từ về chuỗi rỗng
        let html = "";

        //sau đó từ mảng todoArr lọc ra các todo(task) là user đang đăng nhập
        //todoArr là mảng chứa tất cả các nhiệm vụ cho all users
        //vì vậy cần filter ra nhiệm vụ cho userActive đang hđ
        todoArr
            .filter((todo) => todo.ower === userActive.username)
            .forEach(function (todo){
                html += `
                <li class=${todo.isDone ? "checked" : ""} >${todo.task}
                <span class = "close">x</span>
                </li>
                `; 
            });
            //gán phần từ vào html
            todoList.innerHTML = html;

            //gọi lại các sự kiện
            eventToggleTasks();
            eventDeleteTasks();
    }

    //sự kiện click nút Add đẻ thêm tasks
    btnAdd.addEventListener("click", function(){
         //kiểm tra xem người dùng đã thực sự nhập têm nhiệm vụ cần add hay chưa?
         if(inputTask.value.trim().length === 0){
            alert("Vui lòng nhập nhiệm vụ!!");
         }else{
            //gọi tới class task và tạo ra biến mới todo dựa trên class task
            const todo = new Task(inputTask.value, userActive.username, false);

            //thêm nhiệm vụ mới vào todoArr
            todoArr.push(todo);
            // console.log(todo);
            //lưu trữ dũ liệu localstorage
            saveToStorage("todoArr", todoArr);
            // console.log(todoArr); 
            //hiển thị lại các nhiệm vụ
            displayTodoList();
            //reset form nhập dữ liệu
            inputTask.value = "";
         }
    });

    //hàm sự kiện toggle task - thêm vào khi click vào công việc
    function eventToggleTasks(){
        //lấy tất cả phần tử li chứa thông tin của tasks chứa nhiệm vụ
        document.querySelectorAll("#todo-list li").forEach(function(liEl){
            //bắt sự kiện click trên từng phần tử li
            liEl.addEventListener("click", function(e){
                //tách biệt với nút delete => tránh chồng sự kiện khi ấn nút delete
                //children[0] chính là thẻ span nút x
                if(e.target != liEl.children[0]){
                    //thêm class checked
                    liEl.classList.toggle("checked");   
                    //tìm task vừa click vào (toggle)
                    const todo = todoArr.find(
                        (todoItem) =>
                        todoItem.ower === userActive.username &&  //tài khoản trùng với userActive
                        todoItem.task === 
                        liEl.textContent.trim().split("\n").slice(0, -1).toString() //lấy nội dung text chứa task, loại ỏ dấu x
                    );
                    console.log(todo);
                    //sau đó thay đổi thuộc tính isDone của nó
                    todo.isDone = liEl.classList.contains("checked") ? true : false;
                    // todo.isDone = liEl.classList.contains('checked') ? true : false;
                    //lưu trữ dữ liệu xuống locoStorage
                    saveToStorage("todoArr", todoArr);
                }
            });
        });
    }

    //hàm bắt sự kiện xóa các tasks
    function eventDeleteTasks(){
        //lấy tất cả các phần tử delete, 
        document.querySelectorAll("#todo-list .close").forEach(function(closeEle){
            //bắt sự kiên click trên từng phần tử 
            closeEle.addEventListener("click", function(){
                //Xác nhận trước khi xóa
                const isDelete = confirm("Bạn muốn xóa?");
                if(isDelete){
                    //tìm vị trí của Task được ẩn trong mảng todoArr
                    const index = todoArr.findIndex(
                        (item) => 
                            item.ower === userActive.username && //xác định tên theo username
                            item.task === closeEle.parentElement.textContent.trim().split("\n").slice(0, -1).toString()
                    );
                    console.log(closeEle.textContent);
                    //xóa task đó ra khỏi mảng todoArr
                    todoArr.splice(index,1)
                    //lưu cập nhật lại dữ liệu xuống localStorage
                    saveToStorage("todoArr", todoArr);
                    //hiển thị lại list todo
                    displayTodoList();
                }
            });
        });
    }
    //nếu chưa đăng nhập thì thông báo người dùng đăng nhập để truy cập vào 
}else{
    alert("Vui lòng đăng nhập/ đăng kí để truy cập vào ứng dụng!!")
    //điều hướng sang login
    window.location.href = '../pages/login.html';
}
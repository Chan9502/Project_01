'use strict';
if(userActive){
    const navPagenum = document.getElementById("nav-page-num");
    const inputQuery = document.getElementById("input-query");
    const btnsubmit = document.getElementById("btn-submit");
        
    const newContainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num")
    const btnNext = document.getElementById("btn-next");

    let totalResults = 0;
    let keywords = "";
    navPagenum.style.display = "none"; 

    btnsubmit.addEventListener("click", function(){
        pageNum.textContent = "1";
        newContainer.innerHTML = "";
        //kiểm tra xem người dùng đã nhâp keyword hay chưa?
        if(inputQuery.value.trim().length === 0){
            //ấn các nút chuyển trang nếu chưa nhâp keyword
            navPagenum.style.display = "none";
            alert("Vui lòng nhập keyword để tìm kiếm")
        }else{
            keywords = inputQuery.value;
            //gọi hàm hiển thị new list lên ứng dụng
            getDataNewsByKeyWords(keywords,1);
        }
    });

    //hàm bất đồng bô để lấy dữ liêu được tìm kiếm dựa vào từ khóa được nhập vào
    async function getDataNewsByKeyWords(keywords, page){
        try{
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=${keywords}&pageSize=${userActive.pageSize}&page=${page}&apiKey=29853b0bf23d4709b313be99d20b1b24`  
            );
            const data = await res.json();

            //check lỗi quá 100 lần request/day
            if(data.status === "error" && data.code ==="rateLimited"){
                //ẩn nút chuyển trang nếu có lỗi
                navPagenum.style.display ="none";
                throw new Error(data.message);
            }

            //nếu không có bài viết nào thì hiển thị thông báo
            if(data.totalResults == 0){
                //ẩn nút chuyển trang nếu có lỗi
                navPagenum.style.display ="none";
                throw new Erro(
                    "không có bài viết phù hợp!!, vui lòng điền từ khóa mới!!"
                )
            };
            //bắt lỗi nếu tệp tin k chạy thông qua sever
            if(data.code === "corsNotAllowed"){
                throw new Error(data.message);
            }
            //hiển thị chuyển trang nếu dữ liệu trả về thành công và k có lỗi nào phát sinh
            navPagenum.style.display ="block";

            //hiển thị news list
            displayNewList(data);

        //bắt lỗi và thông báo cho người dùng   
        }catch (err){
            alert(err.message);

        }
    }

    //hàm kiểm tra và ẩn điều kiện Previous --> lấy từ news.js
    function checkBtnPrev(){
        //nếu page Number là 1 -> ẩn đi
        //không cần === 
        if(pageNum.textContent == 1){
            btnPrev.style.display = "none";
        }else{
            btnPrev.style.display = "block";
        }
    }

    //hàm kiểm tra điều kiện ẩn và ẩn nút đi --> lấy từ news.js
    function checkBtnNext (){
        //nếu page Num bằng với --> làm tròn kết quả(tổng số tin tức tối đa API trả về/số tin tức hiển thị trên 1 trang của ứng dụng)
        if(pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)){
            btnNext.style.display = "none";
        }else{
            btnNext.style.display = "block";
        }
    }

    //bắt sự kiện nhấn vào nút Prev
    btnPrev.addEventListener("click", function(){
        //gọi hàm lấy dữ liệu và hiển thị các news tiếp theo
        getDataNewsByKeyWords(keywords, --pageNum.textContent);
    });
    //bắt sự kiện nhấn vào nút Next
    btnNext.addEventListener("click", function(){
        //gọi hàm để lấy lại dư liệu và hiển thị danh sách Data New tiếp theo
        //số lượng trang sẽ được tăng lên
        getDataNewsByKeyWords(keywords, ++pageNum.textContent);
    
    });
    //hàm hiển thị list lên trang --> copy từ news.js qua
    function displayNewList(data){
        //lấy giá trị cho biến totalResults
        totalResults = data.totalResults;
        //kiểm tra xem các nút next, prev đã ẩn hay chưa, ẩn chúng đi
        checkBtnPrev();
        checkBtnNext();

        //gán phần tử HTML về trỗng để push dữ liệu
        let html = "";
        //tạo code HTML các new để hiển thị
        //tạo no_image_avaible.jpg để thay thế cho 1 số hình ảnh không hiển thị
        data.articles.forEach(function(article){
            html +=`
            <div class="new-content" style="display: flex; overflaot: hidden; margin-top: 5%; border: solid">
                <div class="img-banner" >
                    <img style ="width:40vw; height:50vh;
                    "src =${
                        article.urlToImage
                        ? article.urlToImage 
                        : "img.png"
                    } alt ="img"/>
                </div>

                <div
                style ="float : right; width:33vw; height:50vh; margin-left: 2%; text-align: justify"
                class="content">
                    <h4 style ="font-size: 20px">${article.title}<//h4>
                    <p>${article.description}</p>
                    <button><a href=${article.url} target="_blank">View</a></button>
                </div>
            </div>
            `;
        });

        newContainer.innerHTML = html;
    };
    //nếu chưa đăng nhập thì thông báo với người dùng, đăng nhập để truy cập vào trang tin tức
} else {
    alert("Vui lòng đăng nhập / đăng kí để truy cập vào ứng dụng");
    //điều hướng sang login
    window.location.href = '../pages/login.html';
};


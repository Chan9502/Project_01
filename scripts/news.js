'use strict'
// tạo điều kiện If ràng buộc nếu người dùng k dăng nhập không đọc được tin túc
if(userActive){
    const newContainer = document.getElementById("news-container");
    const btnPre = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");

    //Biến tính số News tối đa trả về từ Api
    let totalResults = 0;
    

    getDataNew("us", 1);

    //hàm lấy dũ liệu data News từ API và hiển thị list New ra ứng dụng
    //hàm bất đồng bộ async chạy dưới web api, sử dụng câu lệnh await để chờ thực thi
    //userActive.category : danh mục
    //userActive.pageSize: số lượng tin tức trên 1 trang
    async function getDataNew(country, page){
        try {
            //kết nối với API để lấy dữ liệu
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=29853b0bf23d4709b313be99d20b1b24`
                // `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=29853b0bf23d4709b313be99d20b1b2`
                
            );
            //truy xuất kết quả từ phản hồi api fetch và phân tích cú pháp thành Json
            const data = await res.json();
            console.log(data);
            //data.statuc trả lại kết quả của json... bắt lỗi nếu error và trả ra lỗi nếu lấy hơn 100 lần trên api 1 ngày
            if(data.status === "error" && data.code === "rateLimited"){
                throw new Error(data.message);
            }

            //bắt lỗi khi chạy tệp tin không thông qua sever
            //corsNotAllowed lỗi chạy không kết nối bằng livesever
            if(data.status === "error" && data.code === "corsNotAllowed"){
                throw new Error(data.message);
            }

            //gọi hàm hiển thị List News
            displayNewList(data);
            
            //bắt lỗi
        }catch(error){
            //hiển thị thông báo lỗi
            alert("Error: " + error.message);
        } 
    }

    //Hàm kiểm tra điều kiện ấn và ẩn nút Previous
    function checkBtnPrev(){
        //nếu page Number là 1 -> ẩn đi
        if(pageNum.textContent == 1){
            btnPre.style.display = "none";
            //còn nếu pageNum mà lớn hơn 1 thì hiển thị nút prev
        }else{
            btnPre.style.display = "block";
        }
    }

    //hàm kiểm tra điều kiện ấn và ẩn nút Next
    function checkBtnNext (){
        //nếu page Num bằng với --> làm tròn kết quả(tổng số tin tức tối đa API trả về/số tin tức hiển thị trên 1 trang của ứng dụng)
        if(pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)){
            btnNext.style.display = "none";
        }else{
            btnNext.style.display = "block";
        }
    }

    //bắt sự kiện nhấn vào nút Previous
    btnPre.addEventListener("click", function(){
        //gọi hàm để lấy lại dư liệu và hiển thị danh sách Data New trước đấy
        //giảm số lượng trang xuống
        getDataNew("us",--pageNum.textContent);
    });

    //bắt sự kiện nhấn vào nút Next
    btnNext.addEventListener("click", function(){
        //gọi hàm để lấy lại dư liệu và hiển thị danh sách Data New tiếp theo
        //số lượng trang sẽ được tăng lên
        getDataNew("us", ++pageNum.textContent)
    })

    //hàm hiển thị list news lên trang
    function displayNewList(data){
        //lấy giá trị cho biến totalResults của data (tổng là 70 pages)
        totalResults = data.totalResults;
        //gọi hàm kiểm tra các nút
        checkBtnPrev();
        checkBtnNext();

        let html = "";
        //tạo code HTML các new để hiển thị
        //tạo no_image_avaible.jpg để thay thế cho 1 số hình ảnh không hiển thị
        //do articles là thuộc tính trong mảng data --> dùng vòng lặp forEach để lấy thông tin
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

        //đổ code vào file hmtl
        newContainer.innerHTML= html;
    }
    //nếu chưa đăng nhập thì thông báo với người dùng, đăng nhập để truy cập vào trang tin tức
} else {
    alert("Vui lòng đăng nhập / đăng kí để truy cập vào ứng dụng");
    //điều hướng sang login
    window.location.href = '../pages/login.html';
};
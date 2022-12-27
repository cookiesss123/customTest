// nav登入狀態 改變
const navMenu = document.querySelector('#navMenu');
let nickName = localStorage.getItem('nickName');
let userId = localStorage.getItem('userId');
let admin = localStorage.getItem('admin');

if(nickName !== null){
     // 渲染nav
    
    // 如果是管理者
    if(admin){
        navMenu.innerHTML = `
        <li class="nav-item mx-3">
            <a class="nav-link" href="admin.html">前往後台</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="bookmarkList.html?id=${userId}">收藏列表</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="#">歡迎 "${nickName}"</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="#" id="logOut">登出</a>
        </li>
        `
    }else{ // 不是管理者
        navMenu.innerHTML = `
        <li class="nav-item mx-3">
            <a class="nav-link" href="bookmarkList.html?id=${userId}">收藏列表</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="#">歡迎 "${nickName}"</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="#" id="logOut">登出</a>
        </li>
        `
    }
    // logOut 要在這裡才拿得到
    const logOut = document.querySelector('#logOut');
    logOut.addEventListener('click',e=>{
        e.preventDefault();
        console.log(e.target);
        localStorage.clear();
        // 跳轉回首頁
        window.location.assign('home.html');
    });
}

let bookmarkData = [];
function init(){
    axios.get(`${api_url}/bookmarks?userId=${userId}&_expand=view`)
    .then(res=>{
        console.log(res.data);
        bookmarkData = res.data;
        render();
    }).catch(err=>{
        console.log(err.response.data);

    });
}
init();

const list = document.querySelector('#list');
function render(){
    let str = '';
    bookmarkData.forEach(item=>{
        str += `
            <li class="col">
                <div class="card">
                    <div class="card-body mb-5">
                        <div class="d-flex justify-content-end">
                            <button type="button" data-id=${item.id} class="btn btn-primary btnCollect">
                                已收藏
                                <i class="bi bi-bookmark-check-fill"></i>
                            </button>
                        </div>
                        <h2 class=".card-title fw-bold">${item.view.title}
                        </h2>
                        <p class=".card-text  text-truncate">${item.view.body}</p>
                    </div>
                </div>
            </li>
        `
    });
    list.innerHTML = str;
}

list.addEventListener('click',e=>{
    // console.log(e.target.classList.contains('btnCollect'))
    if(e.target.classList.contains('btnCollect')){
        // console.log(e.target)
        const id = e.target.dataset.id;
        console.log(id);

        axios.delete(`${api_url}/bookmarks/${id}`)
        .then(res=>{
            console.log(res.data);
            // 重新渲染
            init();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
})
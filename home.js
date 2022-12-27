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
        window.location.replace(window.location.href);
    });
}


let data = [];

axios.get(`${api_url}/views`)
    .then(res=>{
        console.log(res.data);
        data = res.data;
        renderData(data);
    }).catch(err=>{
        console.log(err.response.data);
    });

const list = document.querySelector('#list');
function renderData(putData){
    let str = '';
    putData.forEach(item=>{
        str += `
        <li class="col">
            <div class="card">
                <div class="card-body mb-5">
                    <a href="viewDetail.html?id=${item.id}" class="text-end d-block">延伸閱讀</a>
                    <h2 class=".card-title fw-bold">${item.title}</h2>
                    <p class=".card-text  text-truncate">${item.body}</p>
                </div>
            </div>
        </li>
        `
    });

    list.innerHTML = str;
}


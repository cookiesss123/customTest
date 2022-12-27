let index = location.href.split('=')[1];

axios.get(`${api_url}/views?id=${index}`)
    .then(res=>{
        console.log(res.data);
        viewContent.textContent =  JSON.stringify(res.data);
    }).catch(err=>{
        console.log(err.response.data);
    })


// nav登入狀態 改變
const navMenu = document.querySelector('#navMenu');
let nickName = localStorage.getItem('nickName');
let userId = localStorage.getItem('userId');
let admin = localStorage.getItem('admin');
const bookmark = document.querySelector('#bookmark');

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

    // 收藏狀態
    // 增加收藏
    function renderAddCollect(){
        bookmark.innerHTML = `
                <p class="mb-0" id="notCollect">未收藏</p>
                <button type="button" class="btn btn-secondary mb-3" id="addBookmarks">加入收藏</button>
                `
                const addBookmarks = document.querySelector('#addBookmarks');
            
                addBookmarks.addEventListener('click',e=>{
                    // console.log(e.target);
                    let obj = {
                        userId, 
                        viewId: index,
                        id:userId + index
                    }
                    console.log(obj);

                    // 新增
                    axios.post(`${api_url}/bookmarks`,obj)
                    .then(res=>{
                        console.log(res.data);
                        // 重新渲染
                        renderDeleteCollect();
                    }).catch(err=>{
                        console.log(err.response.data);
                    });

                });
    }
    // 刪除收藏
    function renderDeleteCollect(){
        bookmark.innerHTML = `
                <p class="mb-0" id="alreadyCollect">已收藏</p>
                <button type="button" class="btn btn-secondary mb-3" id="deleteBookmark">取消收藏</button>
                `
                const deleteBookmark = document.querySelector('#deleteBookmark');
                deleteBookmark.addEventListener('click',e=>{
                    axios.delete(`${api_url}/bookmarks/${userId + index}`)
                        .then(res=>{
                            console.log(res.data);
                            // 重新渲染
                            renderAddCollect();
                        }).catch(err=>{
                            console.log(err.response.data);
                        });
                });
    }

    axios.get(`${api_url}/bookmarks?_expand=view`)
        .then(res=>{
            console.log(res.data);
            let bookmarksData = res.data;
            // 判斷用戶有沒有收藏
            let bookOrNot = bookmarksData.filter(item=>{
                return item.userId === userId && item.viewId === index
            });
            console.log(bookOrNot);

            if(bookOrNot.length === 0){
                renderAddCollect();
            }
            else if(bookOrNot.length !== 0){
                renderDeleteCollect();
            }

        }).catch(err=>{
            console.log(err.response.data);
        })

}




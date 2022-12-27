// 登入
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const logInBtn = document.querySelector('#logInBtn');

logInBtn.addEventListener('click',e=>{
    e.preventDefault();

    if(email.value === '' || password.value === ''){
        alert("信箱和密碼不得為空");
        return;
    }

    axios.post(`${api_url}/login`,
    {
        "email": email.value,
        "password": password.value
    }).then(res=>{
        // console.log(res.data);
        localStorage.setItem('nickName', res.data.user.nickName);
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('key', res.data.accessToken);
        
        // 如果沒有會是undefined
        const admin = res.data.user.admin;
        console.log(admin)
        if(admin){
            localStorage.setItem('admin', true);
            alert('登入成功，1秒後跳轉到首頁');
            setTimeout("window.location.assign('admin.html')", 1000);
            return;
        }

        alert('登入成功，1秒後跳轉到首頁');
        setTimeout("window.location.assign('home.html')", 1000);

    }).catch(err=>{
        // console.log(err.response.data);
    });
});



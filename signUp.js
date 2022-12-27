// 註冊
const nickName = document.querySelector('#nickName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signUpBtn = document.querySelector('#signUpBtn');

signUpBtn.addEventListener('click',e=>{
    e.preventDefault();

    if(nickName.value === '' || email.value === '' || password.value === ''){
        alert("暱稱、信箱和密碼不得為空");
        return;
    }else if(password.value.length < 4){
        alert('密碼需大於4個字元');
        return;
    }

    axios.post(`${api_url}/signup`,
    {
        "nickName":nickName.value,
        "email": email.value,
        "password": password.value
    }).then(res=>{
        console.log(res.data);
        alert('註冊成功，1秒後跳轉到登入頁面');
        setTimeout("window.location.assign('logIn.html')", 1000);
        
    }).catch(err=>{
        alert(err.response.data);
    });
});


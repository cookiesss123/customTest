const title = document.querySelector('#title');
const description = document.querySelector('#description');
const imgUrl = document.querySelector('#imgUrl');
const btnAdd = document.querySelector('#btnAdd');
const formAdd = document.querySelector('#formAdd');

btnAdd.addEventListener('click',e=>{
    e.preventDefault();
    if(title.value ==='' || description.value ==='' || imgUrl.value ===''){
        alert('請輸入完整資訊');
        return;
    }
    
    axios.post(`${api_url}/views`,{
        title:title.value,
        body:description.value,
        imgUrl:imgUrl.value
    })
    .then(res=>{
        // console.log(res.data);
        formAdd.reset();
        alert('資料新增成功');        
    }).catch(err=>{
        console.log(err.response.data);

    });
});
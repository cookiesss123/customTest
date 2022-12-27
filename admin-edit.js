const title = document.querySelector('#title');
const description = document.querySelector('#description');
const imgUrl = document.querySelector('#imgUrl');
const btnEdit = document.querySelector('#btnEdit');
const formEdit = document.querySelector('#formEdit');

const id = location.href.split('=')[1];

// 取得資料
axios.get(`${api_url}/views/${id}`)
.then(res=>{
    console.log(res.data);
    title.value = res.data.title;
    description.value = res.data.body;
    imgUrl.value = res.data.imgUrl;
}).catch(err=>{
    console.log(err.response.data);
});

btnEdit.addEventListener('click',e=>{
    e.preventDefault();
    // 修改
    axios.patch(`${api_url}/views/${id}`,{
        title:title.value,
        body:description.value,
        imgUrl:imgUrl.value
    })
    .then(res=>{
        console.log(res.data);
        alert('資料修改成功');        
    }).catch(err=>{
        console.log(err.response.data);
    });
});
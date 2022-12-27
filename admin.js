let data = [];
function init(){
    axios.get(`${api_url}/views`)
    .then(res=>{
        console.log(res.data);
        data = res.data;
        render();
    }).catch(err=>{
        console.log(err.response.data);
    });
}

init();

const list = document.querySelector('#list');
function render(){
    let str = '';
    data.forEach((item,index)=>{
        str += `
        <tr>
            <td>
                <span class="text-danger">${index+1}</span>
                <span>${item.title}</span>
            </td>
            <td>
                ${item.body}
            </td>
            <td>
                <div class="btn-group">
                    <a href="#" class="btn btn-outline-danger btnDelete" data-id=${item.id}>刪除</a>
                    <a href="admin-edit.html?id=${item.id}" class="btn btn-warning"}>編輯</a>
                </div>
            </td>
        </tr>
        `
    });
    list.innerHTML = str;
}

// 刪除
list.addEventListener('click',e=>{
    const id = e.target.dataset.id;
    if(e.target.classList.contains('btnDelete')){
        axios.delete(`${api_url}/views/${id}`)
        .then(res=>{
            console.log(res.data);
            // 重新渲染
            init();
        }).catch(err=>{
            console.log(err.response.data);
        });
    }
})

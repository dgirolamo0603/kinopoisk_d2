const searchForm=document.querySelector('#search-form');
const movie=document.querySelector('#movies');
console.log(searchForm);
function apiSearch(event){
    event.preventDefault();
    const searchText=document.querySelector('.form-control').value, server='https://api.themoviedb.org/3/search/multi?api_key=dd4c3a8a8e6b554e83d34d9872fb91cc&language=ru&query='+searchText;
 requestApi(server)
 .then ((result)=>{
    const output=JSON.parse(result);
    let inner='';
    
            output.results.forEach((item) => {
                let nameItem=item.name || item.title;
               inner+=`<div class="col-12">${nameItem}</div>`;
            });
    
            movie.innerHTML=inner;
           
        })
 .catch()
 ;
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url){
    return new Promise ((resolve, reject)=>{
        const request=new XMLHttpRequest();
        request.open('GET',url);
        request.addEventListener('load', ()=>{
            if(request.status !==200){
                reject({status: request.status});
                return;
            }
            resolve(request.response);
        });
        request.addEventListener('error',()=>{
            reject({status: request.status});
        });
        request.send();
    });

//       request.addEventListener('readystatechange', ()=>{
//         if(request.readyState !==4){
//             movie.innerHTML='Загрузка';
//              return;
//         }
//         if(request.status !==200){
//             movie.innerHTML='Упс, что то пошло не так';
//             console.log('error: ' + request.status);
//             return;
//         }

//         const output=JSON.parse(request.responseText);
// let inner='';

//         output.results.forEach((item) => {
//             let nameItem=item.name || item.title;
//            inner+=`<div class="col-12">${nameItem}</div>`;
//         });

//         movie.innerHTML=inner;
//         console.log(output);
//     });



} 

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let categry = document.getElementById('categry');
let submit = document.getElementById('submit');

let mood ="create";
let tmp;

// get Total
function getTotal(){
    if(price.value != ''){
    var resulet = (+price.value + +taxes.value + +ads.value) - discount.value ;

    total.innerHTML = resulet;
    total.style.background = "green";
}
else{
    total.innerHTML = "";
    total.style.background = "brown";
}
}

// get porducte
let datapro ;
if(localStorage.pro != null){
    datapro = JSON.parse(localStorage.pro)
}else{
    datapro = [];
}
submit.onclick = function(){
    let porducte = {
        title:title.value.toLowerCase() ,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value, 
        discount:discount.value,
        total:total.innerHTML,
        count:count.value, 
        categry:categry.value.toLowerCase()
    }

    // count
    if(title.value != "" 
    && price.value != "" 
    && categry.value != "" 
    && porducte.count < 101){
            if(mood === 'create'){
        if(porducte.count > 1){
        for(let i = 0; i < porducte.count ;i++ ){
        datapro.push(porducte)
        }}else{
        datapro.push(porducte);
        }


        }else{
        datapro[     tmp      ] = porducte;
        mood = 'create';
        submit.innerHTML= 'Create';
        count.style.display='block';
        }
        clearData()
    }
    // save localStorage
   localStorage.setItem('pro' , JSON.stringify(datapro) )
   showData()
}
// Clear data

function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    categry.value = ''
}

// showData
function showData(){
    getTotal()
    let tabel= ``

    for(let i = 0; i < datapro.length; i++){
        tabel += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].categry}</td>
           <td><button id='update' onclick="update(${i})">update</button></td>
           <td><button id="delete" onclick=deletes(${i}) >delete</button></td>
        </tr> 
            `
    }

   document.getElementById("tbody").innerHTML = tabel;
   let btndelete = document.getElementById("deletall");
   if(datapro.length > 0 ){
    btndelete.innerHTML= `
    <button onclick="deletall()">Delete All(${datapro.length})</button>
    `
   }else{
    btndelete.innerHTML= ``
   }
}
showData()

// delete index
function deletes(i){
    datapro.splice(i,1); 
    localStorage.pro = JSON.stringify(datapro);
    showData()
}

// deletall
function deletall(){
    localStorage.clear()
    datapro.splice(0);
    showData()
}

// update
 function update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = "none" ; 
    categry.value = datapro[i].categry;
    submit.innerHTML = "Update";
    mood = "ubdate";
    tmp = i;
    scroll({
    top:0,
    behavior:'smooth',
  }) }

//  search 
let searchmood ='titel'

function moodSearch(id){
    let Search = document.getElementById('Search');
    if(id  == 'searchtitel' ){
        searchmood ='titel';
    }else{
        searchmood ='catgory';
    }
    Search.placeholder='Search By '+ searchmood;

    Search.focus();
    Search.value= ''
    showData()
}

// search data 
function SerachData(value){
    let tabel= ``
    for(let i = 0; i < datapro.length; i++){
            if(searchmood == 'titel'){
            if(datapro[i].title.includes(value.toLowerCase())){
                tabel += `
                <tr>
                    <th>${i}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].categry}</th>
                   <th><button id='update' onclick="update(${i})">update</button></th>
                   <th><button id="delete" onclick=deletes(${i}) >delete</button></th>
                </tr> 
                    ` 
            }
        
    }else{
            if(datapro[i].categry.includes(value.toLowerCase())){
                tabel += `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].categry}</td>
               <td><button id='update' onclick="update(${i})">update</button></td>
               <td><button id="delete" onclick=deletes(${i}) >delete</button></td>
            </tr> 
                `
            }
        
    }
    document.getElementById("tbody").innerHTML = tabel;
} }

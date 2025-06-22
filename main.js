// applied project-5 (GRUDS web site)

let name = document.getElementById("name");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchT = document.getElementById("search-T");
let searchC = document.getElementById("search-C");
let deleteI = document.getElementById("delete");
let update = document.getElementById("update");
let mood = "Create";
let globalI ;

// get total :
function getTotal(){
    if (price.value != ""){
        let resolt = (+price.value + +ads.value + +taxes.value)- +discount.value;
        total.innerHTML = resolt;
        
    }else{
        total.innerHTML = "";
        

    }
    
}   


//  create product:
let datapro ;
if (localStorage.product){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

create.onclick = function(){
    let NewProduct = {
        Name:name.value.toLowerCase(),
        Price:price.value,
        Taxes:taxes.value,
        Ads:ads.value,
        Discount:discount.value,
        Count:count.value,
        Total:total.innerHTML,
        Category:category.value.toLowerCase(),
        }

    if (name.value != "" && price.value != "" && category.value != "" && count.value < 101){
        if (mood === "Create"){
            if (NewProduct.Count > 1 ){
                for(let i =0; i < NewProduct.Count ;i++){
                    datapro.push(NewProduct);
                
                
            }
            }else{
                datapro.push(NewProduct);
            }
            
        }else{
            datapro[globalI] = NewProduct;
            mood = "Create";
            create.innerHTML = "Create";
            count.style.display = "block";
        }
        // save in localStorge:
        localStorage.setItem('product', JSON.stringify(datapro));
        cleardata();
        showData();

    }
        
}


// clear input :

function cleardata(){
    name.value = "";
    price.value= "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "Total:";
    count.value = "";
    category.value = "";
}

// read :

function showData(){
    let table = "";

    for(let i = 0 ; i < datapro.length ; i++ ) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].Name}</td>
            <td>${datapro[i].Price}</td>
            <td>${datapro[i].Taxes}</td>
            <td>${datapro[i].Ads}</td>
            <td>${datapro[i].Discount}</td>
            <td>${datapro[i].Total}</td>
            <td>${datapro[i].Category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>

        </tr>
        ` ; 
        name.focus();
    }
    document.getElementById("tbody").innerHTML = table;
    if (datapro.length>0){
        let deleteAll = document.getElementById("deleteAll");
        deleteAll.innerHTML = `<button onclick="deleteall()" >Delete All (${datapro.length})</button>`
    }else{
        deleteAll.innerHTML = ""
    }
}
showData();

// delete :

function deleteData(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showData()
}


function deleteall (){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

// updateData

function updateData(i){
    mood = "update";
    name.value = datapro[i].Name;
    price.value = datapro[i].Price;
    taxes.value = datapro[i].Taxes;
    ads.value = datapro[i].Ads;
    discount.value = datapro[i].Discount;
    category.value = datapro[i].Category;
    count.style.display = "none";
    create.innerHTML = "Update";
    globalI = i;
    getTotal();
}


// search :

let searchMood = "NAME";


function getSearchMood(id){
    if (id == "search-T"){
        searchMood = "NAME";
    }else{
        searchMood = "CATEGORY";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value){
    let table = "";
    if(searchMood =="NAME"){
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].Name.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].Name}</td>
                        <td>${datapro[i].Price}</td>
                        <td>${datapro[i].Taxes}</td>
                        <td>${datapro[i].Ads}</td>
                        <td>${datapro[i].Discount}</td>
                        <td>${datapro[i].Total}</td>
                        <td>${datapro[i].Category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>

                    </tr>
                    ` ; 
            }
            
        }


    }else{
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].Category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].Name}</td>
                        <td>${datapro[i].Price}</td>
                        <td>${datapro[i].Taxes}</td>
                        <td>${datapro[i].Ads}</td>
                        <td>${datapro[i].Discount}</td>
                        <td>${datapro[i].Total}</td>
                        <td>${datapro[i].Category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>

                    </tr>
                    ` ; 
            }
            
        }
    }
document.getElementById("tbody").innerHTML = table;
}
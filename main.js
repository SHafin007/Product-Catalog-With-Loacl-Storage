// selector
const productListUL = document.querySelector('.collection');
const filterInput = document.querySelector('#filter');
const nameInput = document.querySelector('.product-name');
const msg = document.querySelector('.msg');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');


// data state

let productData = getDataFromLoaclStorage();

function getDataFromLoaclStorage(){
    let items ='';
    if(localStorage.getItem('productItems')=== null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function saveDataToLocalStorage(item){
    let items ='';
    if(localStorage.getItem('productItems')=== null){
        items=[];
        items.push(item);
        localStorage.setItem('productItems',JSON.stringify( items));
    }else{
        items=JSON.parse(localStorage.getItem('productItems'));
        items.push(item);
        localStorage.setItem('productItems',JSON.stringify( items));
    }
}

function deleteItemFromLocalStorage(id){

  const items=JSON.parse( localStorage.getItem('productItems'));

let result=productData.filter(product=>{
            return product.id !== id;
        });
     localStorage.setItem('productItems',JSON.stringify(result));
     if(result.length ===0 ){
         location.reload();
     }
}
// Load all event Listner
function loadEventListener(){
    addBtn.addEventListener('click',addItem);
    productListUL.addEventListener('click',deleteProduct);
    filterInput.addEventListener('keyup',filterProduct);
    window.addEventListener('DOMContentLoaded',getData.bind(null,productData));
}


//Getting data from store and populate ui
function getData( productList){
    if(productData.length > 0){
        msg.innerHTML='';
        let li ='';
        productList.forEach( ({id, name,price}) =>{
            //const {id, name, price} = product;
            li= document.createElement('li');
            li.className ='list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML =`<strong>${name}</strong> -
            <span class="price">$${price}</span>
            <i class="far fa-trash-alt float-right delete-product"></i>`;
            productListUL.appendChild(li);
        });
    }else{
       showMessage('Please add item to your catalog');
    }
    
};


// Handeling Message

function showMessage(messge=''){
    msg.innerHTML=messge;
}
const addItem = e=>{
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    let id;
    if(productData.length == 0){
        id = 0;
    }else{
        id=productData[productData.length -1 ].id +1;
    }
    if(name=== '' || price ==='' || 
   !(!isNaN(parseFloat(price))&& isFinite(price))){
        alert('Please fill up necessary information');
    }else{
        const data={
            id,
           name,
           price
            
        };
        productData.push(data);
        saveDataToLocalStorage(data);
        productListUL.innerHTML='';
        getData(productData);
        nameInput.value='';
        priceInput.value='';
    }
    
};



// Delete Item
const deleteProduct=e=>{
    if(e.target.classList.contains('delete-product')){
        //e.target.parentElement.remove();

        //removing target from the UI
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);

        //removing target from the store
        //getting id
        const id =parseInt( target.id.split('-')[1]);
        let result=productData.filter(product=>{
            return product.id !== id;
        });
        productData=result;
        deleteItemFromLocalStorage(id);
      
        //return result array

    //     const result=productData.filter(product=>{
    //         return product.id !== id;
    //     });
    //   productData = result;
    }
    
};





//filter product
const filterProduct = e=>{
    const text = e.target.value.toLowerCase();
    let message ; 
    let itemLenth =0;
     document.querySelectorAll('.collection .collection-item').forEach(item=>{
      const productName=    item.firstElementChild.textContent.toLowerCase();
      if(productName.indexOf(text) == -1){
         //showMessage(null, true);
         
         item.style.display='none';
      }else{
        
          item.style.display='block';
          ++itemLenth;
      }
     });
    (itemLenth >0)? showMessage(): showMessage("no item found");
 };

// function showMessage(fetchMessage, searchMessage){
//     if(fetchMessage){
//         msg.innerHTML='please add item to your cataloag';
//     }else if(searchMessage){
//         msg.innerHTML='No item meet your criteria';
//     }
// }

loadEventListener();
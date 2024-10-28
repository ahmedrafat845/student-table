let tableBody=document.getElementById('table-body')
let searchInput=document.getElementById('search')
let offcanvasBody=document.getElementById('offcanvas-body')
let users=[]
let locationSet=new Set()
let modelBody=document.getElementById('modelBody')
let imageInput = document.getElementById('img');
let imageData = "";


imageInput.addEventListener('change', (event) => {
  let file=event.target.files[0]
  let reader=new FileReader()
  reader.onloadend=()=>{
    imageData=reader.result;
   }
   if(file){
    reader.readAsDataURL(file)
   }

});


let getAllProduct = async () => {
  try {
    let response = await fetch('../data.json');
    let data = await response.json();
    users=data.users
    displayUsers(users)
    addLocationToOffcanvasBody()

  } catch (error) {
    console.log('Error fetching data:');
  }
}


let search = () => {
  let filter = [];
  let inputValue = searchInput.value.toLowerCase();

  for (let i = 0; i < users.length; i++) {
    if (users[i].name.toLowerCase().includes(inputValue)||
    users[i].location.toLowerCase().includes(inputValue)||
    users[i].gender.toLowerCase().includes(inputValue)) {
      filter.push(users[i]);
    }
  }

  displayUsers(filter);
}


let displayUsers=(users)=>{
  tableBody.innerHTML=""
  for(let i=0;i<users.length;i++){
   if(users[i]){
    const userInfo = `${users[i].name},${users[i].age},${users[i].location},${users[i].telephone}`;
    tableBody.innerHTML+=
    `
     <tr class="tableRaw">
          <td >${users[i].id}</td>
          <td><a href="#">${users[i].name}</a></td>
          <td>${users[i].address}</td>
          <td>${users[i].telephone}</td>
          <td>${users[i].age}</td>
          <td>${users[i].location}</td>
          <td>${users[i].gender}</td>
          <td class="pt-1"><img src=${users[i].image} class="tableImg "></td>
          <td><button onclick='getModelData(${JSON.stringify(users[i])})' class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></td>
    </tr>
    `
   
   }
  }

}

let getModelData=(user)=>{
  modelBody.innerHTML=""
  // let [name,age,location,telephone]=user.split(',')
   modelBody.innerHTML+=`
      <h2>Hello 😄</h2>
      <p>My name is  <span>${user.name}</span>, I am <span>${user.age}</span> years old, and I live in <span>${user.location}</span>. 
      If you would like to get in touch with me, please call me at <span>${user.telephone}</span>.</p>

      `
    
}

let getFormValue=()=>{
  let id=document.getElementById('id').value
  let name=document.getElementById('name').value
  let age=document.getElementById('age').value
  let gender=document.getElementById('gender').value
  let location=document.getElementById('location').value
  let telephone=document.getElementById('telephone').value
  let address=document.getElementById('address').value


  return { id, name, age, gender, location, telephone, address ,  image: imageData };
};

let addUser = () => {
  let newUser = getFormValue();
  users.push(newUser);
  displayUsers(users);
  addLocationToOffcanvasBody(); // Update the offcanvas body with new locations if any
};







getAllProduct()

let addLocationToOffcanvasBody=()=>{
  let mySet=new Set(users.map(user => user.location))
  offcanvasBody.innerHTML= ""
  mySet.forEach(location => {
    let chexkBoxId=`${location}`
    offcanvasBody.innerHTML+=`
                 <form action="/action_page.php">
                    <input type="checkbox" id=${chexkBoxId}>
                    <label for=${chexkBoxId}> ${location}</label><br>
                  </form>
    `
    
  });
  mySet.forEach(location =>{
    let chexkBoxId=`${location}`
    let checkbox=document.getElementById(chexkBoxId)
    checkbox.addEventListener('change',(e)=>{
      if(e.target.checked){
        locationSet.add(location)
      }else{
        locationSet.delete(location)
      }
      filterUsersByLocations()
    })
  })
}
let filterUsersByLocations=()=>{
  if(locationSet.size===0){
    displayUsers(users)
    return;
  }

  let filter2=users.filter(user=>locationSet.has(user.location))
  displayUsers(filter2)
}
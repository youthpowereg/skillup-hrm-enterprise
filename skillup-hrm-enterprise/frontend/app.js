const API = "https://script.google.com/macros/s/AKfycbwXzRqQ22hkFbW75GHOKOMdUSdEY1r40_X-aLuR0mdWaat3FDFPzQRNd07xjMUjbDwV/exec";
let auth = null;

function api(payload){
  payload._u = auth?.user;
  payload._t = auth?.token;

  return fetch(API,{
    method:"POST",
    body:JSON.stringify(payload)
  }).then(r=>r.json());
}

function login(){
  api({
    action:"login",
    username:user.value,
    password:pass.value
  }).then(res=>{
    if(!res.success) return alert("Login failed");
    auth = res.payload;
    who.textContent = auth.user;
    loginBox.classList.add("hidden");
    dash.classList.remove("hidden");
  });
}

function search(){
  api({
    action:"search",
    id:searchId.value
  }).then(res=>{
    if(!res.success) return alert("Not found");
    result.innerHTML = JSON.stringify(res.payload,null,2);
  });
}

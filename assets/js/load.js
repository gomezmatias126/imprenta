const memo = (fn) =>{
  let cache = {};
  return(arg)=>{
    if (!cache[arg]) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  }
}
const scripting = memo(async scripting=>{
  const script = document.createElement("script");
  document.head.appendChild(script);
  script.src = "assets/js/script.js";
  script.setAttribute("defer", "defer");
});
const load_assets = memo(async id=>{
  if (id !== 'inicio') {
    var css = document.createElement('link');
    document.head.appendChild(css);
    css.rel = 'stylesheet';
    css.type = 'text/css'
    css.href = `assets/css/${id}.css`;
    css.media = 'all'; 
  }
});
  

const includeHTML = memo(async id =>{
  var elemento = document.getElementById(id);
  var url;
  if (elemento.getAttribute('data-include')) {
    url = elemento.getAttribute('data-include');
  }
  else{
    url = elemento.getAttribute('href');
  }
  console.log(url);
  let res = await fetch(url);
  let html = await res.text();
  return html;
});
const data_include = document.querySelectorAll('[data-include]');
data_include.forEach((el)=>{
  includeHTML(el.id)
  .then(html=>{
    if(el.parentNode == main){
      main.innerHTML = html;
    }
    else{
      el.outerHTML = html;
    }
  })
  .then(()=>{
    scripting();
  })
  .catch(err =>{
    console.log(err);
  })
})



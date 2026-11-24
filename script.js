const products=[
{id:1,name:'The Everyday Linen Shirt',category:'women',price:28500,old:35000,tag:'New',img:'photo-1598554747436-c9293d6a588f'},
{id:2,name:'Sculpted Evening Dress',category:'women',price:52000,old:null,tag:'Bestseller',img:'photo-1566174053879-31528523f8ae'},
{id:3,name:'Classic Tailored Trousers',category:'men',price:39000,old:null,tag:'New',img:'photo-1473966968600-fa801b869a1a'},
{id:4,name:'Minimal Leather Slides',category:'accessories',price:24000,old:30000,tag:'Sale',img:'photo-1543163521-1bf539c55dd'},
{id:5,name:'The Weekend Co-ord',category:'women',price:46500,old:null,tag:'New',img:'photo-1515886657613-9f3515b0c78f'},
{id:6,name:'Everyday Crossbody Bag',category:'accessories',price:31500,old:null,tag:'Just in',img:'photo-1584917865442-de89df76afd3'},
{id:7,name:'Relaxed Fit Tee',category:'men',price:18000,old:22000,tag:'Sale',img:'photo-1521572163474-6864f9cf17ab'},
{id:8,name:'Little Explorer Set',category:'kids',price:22000,old:null,tag:'New',img:'photo-1503919005314-30d93d07d823'},
{id:9,name:'Gold Tone Statement Earrings',category:'accessories',price:14500,old:null,tag:'New',img:'photo-1611652022419-a9419f74343d'},
{id:10,name:'Soft Knit Lounge Set',category:'women',price:42000,old:null,tag:'Bestseller',img:'photo-1551163943-3f6a855d1153'},
{id:11,name:'Structured Weekend Jacket',category:'men',price:58000,old:69000,tag:'Sale',img:'photo-1591047139829-d91aecb6caea'},
{id:12,name:'Mini Daypack',category:'kids',price:16500,old:null,tag:'New',img:'photo-1553062407-98eeb64c6a62'}
];
let bag=JSON.parse(localStorage.getItem('royalBag')||'[]'),wish=JSON.parse(localStorage.getItem('royalWish')||'[]');
const money=n=>'₦'+n.toLocaleString('en-NG');
function productCard(p){return `<article class="product-card"><div class="product-image"><img loading="lazy" src="https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=700&q=80" alt="${p.name}"><span class="tag">${p.tag}</span><button class="heart ${wish.includes(p.id)?'saved':''}" aria-label="Save ${p.name}" onclick="toggleWish(${p.id})">${wish.includes(p.id)?'♥':'♡'}</button><button class="quick-add" onclick="addBag(${p.id})">Add to bag</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.category==='accessories'?'Accessories':p.category[0].toUpperCase()+p.category.slice(1)}</p><p class="price">${money(p.price)} ${p.old?`<span style="color:#999;text-decoration:line-through;font-weight:400">${money(p.old)}</span>`:''}</p></div></article>`}
function render(id,list=products){const el=document.getElementById(id);if(el)el.innerHTML=list.map(productCard).join('')}
function filterCatalogue(category){const list=category==='all'?products:products.filter(p=>p.category===category);render('catalogue-products',list);const count=document.getElementById('catalogue-count');if(count)count.textContent=`${list.length} ${list.length===1?'piece':'pieces'} shown`}
function save(){localStorage.setItem('royalBag',JSON.stringify(bag));localStorage.setItem('royalWish',JSON.stringify(wish));document.getElementById('bag-count').textContent=bag.reduce((a,b)=>a+b.qty,0);document.getElementById('wish-count').textContent=wish.length}
function addBag(id){let found=bag.find(x=>x.id===id);found?found.qty++:bag.push({id,qty:1});save();alert('Added to your bag.')}
function toggleWish(id){wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];save();render('home-products',products.slice(0,4));render('catalogue-products',products);render('new-products',products);render('women-products',products.filter(p=>p.category==='women'));render('men-products',products.filter(p=>p.category==='men'));render('kids-products',products.filter(p=>p.category==='kids'));render('accessory-products',products.filter(p=>p.category==='accessories'));render('sale-products',products.filter(p=>p.old));render('wishlist-products',products.filter(p=>wish.includes(p.id)));document.getElementById('wishlist-empty').style.display=wish.length?'none':'block'}
function renderBag(){const el=document.getElementById('bag-items');if(!el)return;let lines=bag.map(item=>{let p=products.find(x=>x.id===item.id);return `<div class="bag-line"><img src="https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=200&q=70" alt="${p.name}"><div><h3>${p.name}</h3><p>${money(p.price)} · Qty ${item.qty}</p><button onclick="changeQty(${p.id},-1)">−</button> &nbsp; <button onclick="changeQty(${p.id},1)">+</button> &nbsp; <button onclick="removeBag(${p.id})">Remove</button></div><strong>${money(p.price*item.qty)}</strong></div>`}).join('');el.innerHTML=lines||'<div class="empty-state"><h2>Your bag is waiting for something royal.</h2><p>Explore the latest pieces and add a favourite.</p><a class="btn" href="#new-arrivals">Start shopping</a></div>';let total=bag.reduce((sum,x)=>sum+products.find(p=>p.id===x.id).price*x.qty,0);document.getElementById('bag-total').innerHTML=bag.length?`<div><span>Subtotal</span><strong>${money(total)}</strong></div><p style="font-size:11px;color:#716b64">Shipping and taxes calculated at checkout.</p><button class="btn" style="width:100%" onclick="alert('Checkout is a frontend demo. Connect a payment and order system before launch.')">Proceed to checkout →</button>`:''}
function changeQty(id,d){let x=bag.find(p=>p.id===id);if(x)x.qty+=d;if(x&&x.qty<1)bag=bag.filter(p=>p.id!==id);save();renderBag()}
function removeBag(id){bag=bag.filter(p=>p.id!==id);save();renderBag()}
function toggleSearch(){document.getElementById('search-panel').classList.toggle('open');if(document.getElementById('search-panel').classList.contains('open'))document.getElementById('search-input').focus()}
function searchProducts(){let q=document.getElementById('search-input').value.trim().toLowerCase();location.hash='search-results';let matches=products.filter(p=>(p.name+' '+p.category).toLowerCase().includes(q));document.getElementById('search-label').textContent=q?`Showing matches for “${q}”`:'Explore all products';render('search-products',q?matches:products)}
function toggleDrawer(){document.getElementById('mobile-drawer').classList.toggle('open')}
function demoNotice(){alert('This is a frontend prototype. Connect the store backend to enable this feature.')}
function route(){let id=location.hash.slice(1)||'home';if(!document.getElementById(id)||!document.getElementById(id).classList.contains('page'))id='home';document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');if(id==='bag')renderBag();if(id==='wishlist'){render('wishlist-products',products.filter(p=>wish.includes(p.id)));document.getElementById('wishlist-empty').style.display=wish.length?'none':'block'}document.getElementById('search-panel').classList.remove('open');window.scrollTo(0,0)}
function sortProducts(mode,target){let list=[...products];if(mode==='low')list.sort((a,b)=>a.price-b.price);if(mode==='high')list.sort((a,b)=>b.price-a.price);render(target,list)}
document.getElementById('year').textContent=new Date().getFullYear();
render('home-products',products.slice(0,4));render('catalogue-products',products);render('new-products',products);render('women-products',products.filter(p=>p.category==='women'));render('men-products',products.filter(p=>p.category==='men'));render('kids-products',products.filter(p=>p.category==='kids'));render('accessory-products',products.filter(p=>p.category==='accessories'));render('sale-products',products.filter(p=>p.old));save();
const contactForm=document.getElementById('contact-form');
if(contactForm){
 const fields=['name','email','phone','message'];
 const errorIds={name:'name-error',email:'email-error',phone:'phone-error',message:'message-error'};
 const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 function setFieldError(name,message){const input=contactForm.elements[name];const error=document.getElementById(errorIds[name]);input.setAttribute('aria-invalid',message?'true':'false');error.textContent=message;}
 contactForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=document.getElementById('contact-status');status.textContent='';status.className='form-status';
  let valid=true;
  fields.forEach(name=>{const value=String(contactForm.elements[name].value||'').trim();let message='';if(!value)message='This field is required.';else if(name==='email'&&!emailPattern.test(value))message='Enter a valid email address.';if(message)valid=false;setFieldError(name,message);});
  if(!valid){status.textContent='Please correct the highlighted fields and try again.';status.classList.add('error');const first=contactForm.querySelector('[aria-invalid="true"]');if(first)first.focus();return;}
  const button=document.getElementById('contact-submit'),label=button.querySelector('.button-label');button.disabled=true;button.setAttribute('aria-busy','true');label.textContent='Checking…';
  try{
   await new Promise(resolve=>setTimeout(resolve,850));
   status.textContent='Your details passed validation. This demo does not send or store your message; connect a backend to enable delivery.';status.classList.add('success');contactForm.reset();fields.forEach(name=>setFieldError(name,''));
  }catch(error){status.textContent='Something went wrong while validating the form. Please try again.';status.classList.add('error');}
  finally{button.disabled=false;button.removeAttribute('aria-busy');label.textContent='Send message';}
 });
 fields.forEach(name=>contactForm.elements[name].addEventListener('input',()=>{if(contactForm.elements[name].getAttribute('aria-invalid')==='true')setFieldError(name,'');}));
}
window.addEventListener('hashchange',route);route();

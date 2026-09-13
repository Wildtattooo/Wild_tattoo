(function(){
  "use strict";
  const config=window.WILD_CONFIG||{},form=document.querySelector("#admin-form"),result=document.querySelector("#admin-result"),message=document.querySelector("#admin-message");
  let selectedCode="";
  function renderCoupon(coupon){document.querySelector("#admin-result-code").textContent=coupon.code;document.querySelector("#admin-result-client").textContent=coupon.client_name||coupon.clientName;document.querySelector("#admin-result-friend").textContent=coupon.friend_name||coupon.friendName;document.querySelector("#admin-result-status").textContent=({pending:"Pendente",active:"Oferta ativa",redeemed:"Utilizado"})[coupon.status]||coupon.status;result.hidden=false}
  async function request(action){
    const code=document.querySelector("#admin-code").value.trim().toUpperCase(),pin=document.querySelector("#admin-pin").value.trim();
    if(!/^WILD-[A-Z0-9]{6}$/.test(code))throw new Error("Código inválido.");selectedCode=code;
    if(!config.supabaseUrl||!config.supabaseAnonKey){const coupons=JSON.parse(localStorage.getItem("wild_referral_coupons_v1")||"[]"),coupon=coupons.find(item=>item.code===code);if(!coupon)throw new Error("Cupão não encontrado neste dispositivo. Liga o Supabase para a versão online.");if(action==="activate")coupon.status="active";if(action==="redeem")coupon.status="redeemed";localStorage.setItem("wild_referral_coupons_v1",JSON.stringify(coupons));return coupon}
    const response=await fetch(`${config.supabaseUrl}/functions/v1/gerir-cupao`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${config.supabaseAnonKey}`,apikey:config.supabaseAnonKey},body:JSON.stringify({code,pin,action})}),payload=await response.json().catch(()=>({}));if(!response.ok)throw new Error(payload.error||"Não foi possível validar o cupão.");return payload;
  }
  form.addEventListener("submit",async event=>{event.preventDefault();message.textContent="";result.hidden=true;try{renderCoupon(await request("lookup"))}catch(error){message.textContent=error.message}});
  document.querySelectorAll("[data-action]").forEach(button=>button.addEventListener("click",async()=>{message.textContent="";document.querySelector("#admin-code").value=selectedCode;try{renderCoupon(await request(button.dataset.action));message.textContent="Cupão atualizado com sucesso."}catch(error){message.textContent=error.message}}));
}());

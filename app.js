const KEY="familyFundDemo";const ADMIN="1234";
let db=JSON.parse(localStorage.getItem(KEY)||'{"monthly":500,"balance":0,"members":[],"loans":[]}');
const save=()=>localStorage.setItem(KEY,JSON.stringify(db));
const money=n=>Number(n||0).toLocaleString("ar-SA")+" ر.س";
function render(){balance.textContent=money(db.balance);monthly.textContent=money(db.monthly);membersCount.textContent=db.members.length;monthlyInput.value=db.monthly;balanceInput.value=db.balance;members.innerHTML=db.members.length?db.members.map((m,i)=>`<div class="row"><b>${m.name}</b><br><span class="muted">${m.phone||"بدون جوال"} — ${m.paid?"مسدد":"غير مسدد"}</span><br><button onclick="togglePaid(${i})">${m.paid?"إلغاء السداد":"تسجيل السداد"}</button></div>`).join(""):"لا يوجد أعضاء";loans.innerHTML=db.loans.length?db.loans.map((l,i)=>`<div class="row"><b>${l.name}</b> — ${money(l.amount)}<br><span class="muted">${l.paid?"تم السداد":"لم يسدد"}</span> <button onclick="toggleLoan(${i})">${l.paid?"إلغاء":"تسجيل السداد"}</button></div>`).join(""):"لا توجد سلف مسجلة";}
function join(){let n=name.value.trim(),p=phone.value.trim();if(!n)return joinMsg.textContent="اكتب الاسم أولًا";db.members.push({name:n,phone:p,paid:false});save();name.value=phone.value="";joinMsg.textContent="تم تسجيل العضو.";render();}
function saveSettings(){db.monthly=+monthlyInput.value||0;db.balance=+balanceInput.value||0;save();render();}
function togglePaid(i){db.members[i].paid=!db.members[i].paid;save();render();}
function addLoan(){let n=prompt("اسم العضو؟");if(!n)return;let a=prompt("قيمة السلفة؟");if(!a)return;db.loans.push({name:n,amount:+a,paid:false});save();render();}
function toggleLoan(i){db.loans[i].paid=!db.loans[i].paid;save();render();}
adminBtn.onclick=()=>{let p=prompt("رمز المشرف");if(p===ADMIN){adminArea.classList.remove("hidden");memberArea.classList.add("hidden");render()}else alert("رمز غير صحيح")};
render();

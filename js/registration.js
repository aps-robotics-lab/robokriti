(() => {
  const form=document.querySelector('#registrationForm'); if(!form)return;
  const {db}=window.RoboFirebase||{};
  const deadline=window.RoboUI?.deadline || new Date('2026-09-03T23:59:59+05:30');
  const membersWrap=document.querySelector('#members'); const memberCount=document.querySelector('#memberCount');
  const result=document.querySelector('#registrationResult');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function memberTemplate(i,leader=false){return `<div class="member" data-member="${i}"><div class="member-head"><strong>Member ${i}${leader?' — Team Leader':''}</strong>${leader?'':'<button type="button" class="remove-member" data-remove="'+i+'">REMOVE</button>'}</div><div class="member-grid"><div class="field"><label>Full Name</label><input required name="member${i}_name" autocomplete="name"></div><div class="field"><label>Class</label><select required name="member${i}_class"><option value="">Select</option>${[6,7,8,9,10,11,12].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="field"><label>Section</label><select required name="member${i}_section"><option value="">Select</option>${'ABCDEFGHI'.split('').map(x=>`<option>${x}</option>`).join('')}</select></div></div></div>`}
  function renderMembers(){const n=Math.min(5,Math.max(1,Number(memberCount.value||1)));membersWrap.innerHTML=Array.from({length:n},(_,i)=>memberTemplate(i+1,i===0)).join('');membersWrap.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{memberCount.value=String(Math.max(1,Number(memberCount.value)-1));renderMembers()})}
  memberCount?.addEventListener('change',renderMembers);renderMembers();
  form.addEventListener('submit',async e=>{e.preventDefault();if(Date.now()>deadline.getTime()){result.innerHTML='<div class="notice error">Registration is closed. The deadline has passed.</div>';return}if(!db){result.innerHTML='<div class="notice error">Firebase is not configured on this deployment.</div>';return}
    const fd=new FormData(form); const members=[]; const n=Number(fd.get('memberCount')||1); for(let i=1;i<=n;i++)members.push({name:fd.get(`member${i}_name`),class:fd.get(`member${i}_class`),section:fd.get(`member${i}_section`)});
    const payload={teamName:fd.get('teamName').trim(),leaderEmail:fd.get('leaderEmail').trim(),leaderPhone:fd.get('leaderPhone').trim(),event:fd.get('event'),members,notes:fd.get('notes')||'',createdAt:firebase.database.ServerValue.TIMESTAMP,status:'received'};
    const ref=db.ref('registrations').push(); try{await ref.set(payload);form.reset();memberCount.value='1';renderMembers();result.innerHTML=`<div class="notice success"><strong>Registration received.</strong><br>Team reference: <b>${esc(ref.key)}</b>. Save this ID for your records.</div>`;window.RoboUI.toast('Registration submitted successfully','success')}catch(err){console.error(err);result.innerHTML='<div class="notice error">Unable to submit right now. Please try again.</div>'}
  });
})();

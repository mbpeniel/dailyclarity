const counters=document.querySelectorAll(".counter");
const boxes=document.querySelectorAll(".box4,.box5,.box6");

let started=false;


function easeOutCubic(t){
return 1-Math.pow(1-t,3);
}


function animateCounter(counter,duration){

const target=+counter.dataset.target;

let startTime=null;

function step(timestamp){

if(!startTime){
startTime=timestamp;
}

let progress=(timestamp-startTime)/duration;

if(progress>1){
progress=1;
}

let eased=easeOutCubic(progress);

let value=Math.floor(target*eased);

counter.textContent=
value.toLocaleString()+"+";

if(progress<1){
requestAnimationFrame(step);
}

}

requestAnimationFrame(step);

}



/* Scroll detection */
function startCounters(){

if(started) return;

started=true;

animateCounter(counters[0],1800);

setTimeout(()=>{
animateCounter(counters[1],1600);
},250);

setTimeout(()=>{
animateCounter(counters[2],1500);
},500);

}



window.addEventListener("scroll",()=>{

const section=
document.querySelector(".boxwrapper");

const top=
section.getBoundingClientRect().top;

const trigger=
window.innerHeight*0.8;


if(top<trigger){
startCounters();
}

});



// hover
boxes.forEach(box=>{

box.addEventListener("mouseenter",()=>{

box.style.transform=
"translateY(-8px) scale(1.02)";

box.style.boxShadow=
"0 10px 30px rgba(47,62,70,.18)";

const number=
box.querySelector(".counter");

number.animate(
[
{transform:"scale(1)"},
{transform:"scale(1.12)"},
{transform:"scale(1)"}
],
{
duration:500,
easing:"ease-out"
}
);

});

box.addEventListener("mouseleave",()=>{

box.style.transform="";
box.style.boxShadow="none";

});

});









document.addEventListener('DOMContentLoaded', () => {

  //  TICK / UNTICK 
  document.querySelectorAll('.task-item').forEach(item => enableToggle(item));


  //  DOTS MENU 
  document.querySelectorAll('.task-item').forEach(item => enableDotsMenu(item));


  //  TAB FILTER
  const tabs = document.querySelectorAll('.task-time h4');

  tabs.forEach(tab => {
    tab.style.cursor = 'pointer';

    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.cssText = 'cursor:pointer;');
      tab.style.cssText = 'color:#2d6a2d; border-bottom:2px solid #2d6a2d; padding-bottom:2px; cursor:pointer;';
      filterTasks(tab.textContent.trim());
    });
  });

  /* Default active tab on load */
  if (tabs.length) {
    tabs[0].style.cssText = 'color:#2d6a2d; border-bottom:2px solid #2d6a2d; padding-bottom:2px; cursor:pointer;';
  }

  function filterTasks(filter) {
    document.querySelectorAll('.task-item').forEach(item => {
      const date = item.querySelector('.task-date')?.textContent.trim() ?? '';
      item.style.display = (filter === 'All' || date === filter) ? '' : 'none';
    });
  }


//  TASK BUTTON
  const addBtn = document.querySelector('.add-task-btn');
  if (addBtn) addBtn.addEventListener('click', openModal);


//  MODAL — Add Task
  function openModal() {
    removeModal();

    const style = document.createElement('style');
    style.id = 'tasks-modal-style';
    style.textContent = `
      .tm-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.35);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
        animation: tm-fade .18s ease;
      }
      @keyframes tm-fade { from{opacity:0} to{opacity:1} }

      .tm-box {
        background: #f5f2ea;
        border-radius: 16px;
        padding: 1.5rem;
        width: 360px;
        max-width: 90vw;
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        animation: tm-up .2s ease;
      }
      @keyframes tm-up {
        from { transform: translateY(14px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }

      .tm-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 1.2rem;
      }
      .tm-header h3 {
        font-size: 16px; font-weight: 700; color: #1a2e1a;
        font-family: Georgia, serif; margin: 0;
      }
      .tm-close {
        background: none; border: none; font-size: 16px;
        color: #888; cursor: pointer;
      }
      .tm-close:hover { color: #1a2e1a; }

      .tm-label {
        display: block; font-size: 11px; font-weight: 600; color: #777;
        font-family: sans-serif; text-transform: uppercase;
        letter-spacing: .5px; margin: 14px 0 6px;
      }

      .tm-input {
        width: 100%; padding: 10px 12px; border-radius: 10px;
        border: 1px solid rgba(0,0,0,0.12); background: #fff;
        font-size: 13px; font-family: sans-serif; color: #1a2e1a;
        outline: none; box-sizing: border-box; transition: border-color .15s;
      }
      .tm-input:focus { border-color: #3a7a3a; }
      .tm-input.error { border-color: #e24b4a; }

      .tm-group { display: flex; gap: 7px; flex-wrap: wrap; }

      .tm-chip {
        padding: 5px 13px; border-radius: 999px;
        border: 1px solid #c0bbb0; background: #fff;
        font-size: 12px; font-family: sans-serif;
        color: #555; cursor: pointer; transition: all .15s;
      }
      .tm-chip:hover  { border-color: #3a7a3a; color: #3a7a3a; }
      .tm-chip.active { background: #2d6a2d; color: #fff; border-color: #2d6a2d; }

      .tm-footer {
        display: flex; justify-content: flex-end; gap: 10px;
        margin-top: 1.4rem;
      }
      .tm-btn-cancel {
        padding: 8px 18px; border-radius: 9px;
        border: 1px solid #c0bbb0; background: transparent;
        font-size: 13px; color: #666; cursor: pointer; font-family: sans-serif;
      }
      .tm-btn-cancel:hover { border-color: #888; }

      .tm-btn-confirm {
        padding: 8px 18px; border-radius: 9px;
        background: #2d6a2d; border: none; color: #fff;
        font-size: 13px; font-weight: 600; cursor: pointer;
        font-family: sans-serif; transition: background .15s;
      }
      .tm-btn-confirm:hover { background: #245424; }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.id = 'tasks-modal';
    wrap.innerHTML = `
      <div class="tm-overlay" id="tm-overlay">
        <div class="tm-box">
          <div class="tm-header">
            <h3>Add a new task</h3>
            <button class="tm-close" id="tm-close">✕</button>
          </div>

          <span class="tm-label">Task name</span>
          <input class="tm-input" id="tm-name" type="text" placeholder="e.g. Read for 20 minutes" />

          <span class="tm-label">Priority</span>
          <div class="tm-group" id="tm-prio">
            <button class="tm-chip active" data-val="High">🚩 High</button>
            <button class="tm-chip"        data-val="Medium">● Medium</button>
            <button class="tm-chip"        data-val="Low">● Low</button>
          </div>

          <span class="tm-label">Due</span>
          <div class="tm-group" id="tm-due">
            <button class="tm-chip active" data-val="Today">Today</button>
            <button class="tm-chip"        data-val="This Week">This Week</button>
            <button class="tm-chip"        data-val="Later">Later</button>
          </div>

          <div class="tm-footer">
            <button class="tm-btn-cancel"  id="tm-cancel">Cancel</button>
            <button class="tm-btn-confirm" id="tm-confirm">Add Task</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    let prio = 'High';
    let due  = 'Today';

    wrap.querySelectorAll('#tm-prio .tm-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('#tm-prio .tm-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        prio = btn.dataset.val;
      });
    });

    wrap.querySelectorAll('#tm-due .tm-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('#tm-due .tm-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        due = btn.dataset.val;
      });
    });

    document.getElementById('tm-close').addEventListener('click', removeModal);
    document.getElementById('tm-cancel').addEventListener('click', removeModal);
    document.getElementById('tm-overlay').addEventListener('click', e => {
      if (e.target.id === 'tm-overlay') removeModal();
    });

    document.getElementById('tm-confirm').addEventListener('click', () => {
      const input = document.getElementById('tm-name');
      const name  = input.value.trim();
      if (!name) { input.classList.add('error'); input.focus(); return; }
      addTask(name, prio, due);
      removeModal();
    });

    document.getElementById('tm-name').addEventListener('input', function () {
      this.classList.remove('error');
    });

    setTimeout(() => document.getElementById('tm-name').focus(), 80);
  }

  function removeModal() {
    document.getElementById('tasks-modal')?.remove();
    document.getElementById('tasks-modal-style')?.remove();
  }


  // ADD TASK to the list
  function addTask(name, priority, due) {
    const list = document.querySelector('.task-list');
    if (!list) return;

    const badgeMap = {
      High:   { label: '🚩 High',   cls: 'high' },
      Medium: { label: '● Medium', cls: 'medium' },
      Low:    { label: '● Low',    cls: 'low' },
    };
    const badge = badgeMap[priority] ?? badgeMap.Medium;

    const item = document.createElement('div');
    item.className = 'task-item';
    item.innerHTML = `
      <div class="task-left">
        <div class="checkbox"></div>
        <span class="task-name">${safe(name)}</span>
      </div>
      <div class="task-right">
        <span class="badge ${badge.cls}">${badge.label}</span>
        <span class="task-date">${due}</span>
        <span class="dots">⋮</span>
      </div>
    `;

    list.appendChild(item);
    enableToggle(item);
    enableDotsMenu(item);
    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    /* Respect the active tab filter */
    const activeTab = [...tabs].find(t => t.style.color === 'rgb(45, 106, 45)');
    if (activeTab && activeTab.textContent.trim() !== 'All') {
      item.style.display = (due === activeTab.textContent.trim()) ? '' : 'none';
    }
  }


// delete option
  function enableDotsMenu(item) {
    const dots = item.querySelector('.dots');
    if (!dots) return;

    dots.style.cursor = 'pointer';
    dots.style.userSelect = 'none';
    dots.style.position = 'relative';

    dots.addEventListener('click', e => {
      e.stopPropagation();

      /* If a menu already open on THIS item, close it and return */
      const existing = dots.querySelector('.dots-menu');
      closeAllDropdowns();
      if (existing) return;

      /* Build dropdown */
      const menu = document.createElement('div');
      menu.className = 'dots-menu';
      menu.style.cssText = `
        position: absolute;
        right: 0; top: calc(100% + 4px);
        background: #fff;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        z-index: 999;
        min-width: 150px;
        overflow: hidden;
        animation: tm-fade .15s ease;
      `;

      menu.innerHTML = `
        <button class="dots-delete-btn" style="
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 10px 14px;
          background: none; border: none;
          font-size: 13px; font-family: sans-serif;
          color: #e24b4a; cursor: pointer; text-align: left;
        ">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#e24b4a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14H6L5 6"></path>
            <path d="M10 11v6M14 11v6"></path>
            <path d="M9 6V4h6v2"></path>
          </svg>
          Delete task
        </button>
      `;

      const deleteBtn = menu.querySelector('.dots-delete-btn');
      deleteBtn.addEventListener('mouseenter', () => deleteBtn.style.background = '#fff5f5');
      deleteBtn.addEventListener('mouseleave', () => deleteBtn.style.background = 'none');

      dots.appendChild(menu);

      deleteBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeAllDropdowns();
        deleteTask(item);
      });

      setTimeout(() => {
        document.addEventListener('click', closeAllDropdowns, { once: true });
      }, 0);
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dots-menu').forEach(m => m.remove());
  }

  function deleteTask(item) {
    item.style.transition = 'opacity .2s ease, transform .2s ease';
    item.style.opacity    = '0';
    item.style.transform  = 'translateX(10px)';
    setTimeout(() => {
      item.remove();
      syncHighlight();
    }, 200);
  }


//  TOGGLE TICK
  function enableToggle(item) {
    const box = item.querySelector('.checkbox');
    if (!box) return;

    box.addEventListener('click', () => {
      const done = item.classList.toggle('completed');

      if (done) {
        box.classList.add('checked');
        box.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>`;
      } else {
        box.classList.remove('checked');
        box.innerHTML = '';
      }

      syncHighlight();
    });
  }


//  SYNC highlighted task at top
  function syncHighlight() {
    const hl = document.querySelector('.hl-text');
    if (!hl) return;

    const first = [...document.querySelectorAll('.task-item')]
      .find(t => !t.classList.contains('completed'));

    hl.textContent = first
      ? first.querySelector('.task-name').textContent
      : 'All tasks done! 🎉';
  }


 
  function safe(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;');
  }

});








// =============================================
// ⚠️ METS TA CLÉ API ICI
// Récupère-la sur : https://console.anthropic.com/
// =============================================
const API_KEY = 'sk-ant-XXXXXXXXXXXXXXXXXXXXXXXX'; // ← remplace ici


// =============================================
// CHIPS → INPUT
// =============================================
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const input = document.querySelector('.idea-input');
    if (input) {
      input.value = chip.textContent.trim();
      input.focus();
    }
  });
});





// COUNTER ANIMATION (impact section)
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const step = target / (2000 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  });
}

const counterSection = document.querySelector('.boxwrapper');
if (counterSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
    });
  }, { threshold: 0.4 });
  observer.observe(counterSection);
}


// make the header shrink when you scroll

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
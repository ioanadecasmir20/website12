/* =======================
   Fleetville Training SPA
   ======================= */

const courses = [
  { id:"efaw", name:"Emergency First Aid at Work (EFAW)", short:"One-day essential first aid for low-risk workplaces.", category:["Health & Safety"], delivery:["Classroom","Blended"], duration:"1 day (7 hours)", locations:["Dartford","Heathrow"], price:99, priceNote:"+ VAT", entry:["Age 16+","Good command of English","Photographic ID on arrival"], assessment:"Practical assessments and short knowledge checks.", certificate:"Valid for 3 years (annual refreshers recommended).", image:"images/efaw.jpg" },
  { id:"faw", name:"First Aid at Work (FAW)", short:"Comprehensive workplace first aid for higher-risk settings.", category:["Health & Safety"], delivery:["Classroom","Blended"], duration:"3 days (or 2 days + online pre-study)", locations:["Dartford","Heathrow"], price:275, priceNote:"+ VAT", entry:["Age 16+","Good command of English","Photographic ID"], assessment:"Practical scenarios and written assessment.", certificate:"Valid for 3 years.", image:"images/faw.jpg" },
  { id:"act-security", name:"ACT Security (ProtectUK)", short:"Counter terrorism eLearning designed for security operatives.", category:["Security"], delivery:["Online"], duration:"Approx. 1 hour", locations:["Online"], price:0, priceNote:"FREE", entry:["Suitable for anyone working in or with security teams"], assessment:"Online modules with knowledge checks.", certificate:"Digital certificate on completion.", externalLink:"https://protectuk.police.uk", image:"images/act-security.jpg" },
  { id:"act-awareness", name:"ACT Awareness (ProtectUK)", short:"Public counter terrorism awareness course.", category:["Security"], delivery:["Online"], duration:"45–60 minutes", locations:["Online"], price:0, priceNote:"FREE", entry:["Open to all staff and volunteers"], assessment:"Online knowledge checks.", certificate:"Digital certificate on completion.", externalLink:"https://protectuk.police.uk", image:"images/act-awareness.jpg" },
  { id:"lone-working", name:"Lone Working for Security Operatives", short:"Practical strategies for safe, compliant lone working.", category:["Security","Compliance"], delivery:["Online","Classroom"], duration:"2–3 hours", locations:["Online","Dartford","Heathrow"], price:60, priceNote:"+ VAT", entry:["Suitable for security officers, supervisors and managers"], assessment:"Online quiz / workbook", certificate:"Digital certificate, 1 year recommended renewal.", image:"images/lone-working.jpg" },
  { id:"asbestos", name:"Asbestos Awareness", short:"Recognise asbestos risks and stay compliant on site.", category:["Health & Safety","Compliance"], delivery:["Online"], duration:"2 hours", locations:["Online"], price:40, priceNote:"+ VAT", entry:["Suitable for trades, facilities and maintenance staff"], assessment:"Online knowledge check", certificate:"Digital certificate (annual refresher advised).", image:"images/asbestos.jpg" },
  { id:"care-cert", name:"Care Certificate (15 Standards)", short:"Induction for new care workers covering core standards.", category:["Care"], delivery:["Blended","Online"], duration:"Self-paced + observations", locations:["Online + workplace"], price:199, priceNote:"+ VAT", entry:["Employed/volunteer in a care setting","Workplace mentor for observations"], assessment:"Knowledge checks + practical observations", certificate:"Certificate of completion for 15 standards.", image:"images/care-certificate.jpg" },
  { id:"calorie", name:"Calorie Labelling for Food Businesses", short:"Understand requirements and implement compliant menus.", category:["Compliance","Food & Nutrition"], delivery:["Online"], duration:"1–2 hours", locations:["Online"], price:49, priceNote:"+ VAT", entry:["Suitable for hospitality and catering teams"], assessment:"Online quiz", certificate:"Digital certificate of completion.", image:"images/calorie-labelling.jpg" },
  { id:"equality", name:"Equality & Diversity", short:"Build inclusive teams and meet Equality Act duties.", category:["Compliance"], delivery:["Online"], duration:"1.5 hours", locations:["Online"], price:35, priceNote:"+ VAT", entry:["Suitable for all staff and managers"], assessment:"Online quiz", certificate:"Digital certificate of completion.", image:"images/equality-diversity.jpg" },
  { id:"gdpr", name:"General Data Protection Regulation (GDPR) Essentials", short:"Handle personal data lawfully, fairly and securely.", category:["Compliance"], delivery:["Online"], duration:"2–3 hours", locations:["Online"], price:45, priceNote:"+ VAT", entry:["Suitable for anyone processing personal data"], assessment:"Online knowledge check", certificate:"Digital certificate of completion.", image:"images/gdpr.jpg" }
];

const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];
const money = n => (n === 0 ? "FREE" : `£${n.toFixed(0)}`);

function renderCourses(list, targetId){
  const wrap = document.getElementById(targetId);
  if(!wrap) return;

  wrap.innerHTML = list.map(c => {
    const priceText = c.price === 0 ? "FREE" : `${money(c.price)} <span class="muted">${c.priceNote || ""}</span>`;
    const delivery = c.delivery.map(d => `<span class="badge">${d}</span>`).join(" ");
    const cats = c.category.map(cat => `<span class="badge" title="Category">${cat}</span>`).join(" ");

    return `
      <article class="course fade-in" data-id="${c.id}">
        <div class="course-thumb"><img src="${c.image}" alt="${c.name}"></div>
        <div class="course-body">
          <div class="course-meta">
            ${cats}
            <span class="price">${priceText}</span>
          </div>
          <h3>${c.name}</h3>
          <p class="muted">${c.short}</p>
        </div>
        <button class="course-toggle" aria-expanded="false" aria-controls="d-${c.id}">
          <span>View details</span><span>▾</span>
        </button>
        <div id="d-${c.id}" class="course-details">
          <p><strong>Delivery:</strong> ${delivery}</p>
          <p><strong>Duration:</strong> ${c.duration}</p>
          <p><strong>Locations:</strong> ${c.locations.join(", ")}</p>
          <p><strong>Entry requirements:</strong></p>
          <ul>${c.entry.map(e => `<li>${e}</li>`).join("")}</ul>
          <p><strong>Assessment:</strong> ${c.assessment}</p>
          <p><strong>Certification:</strong> ${c.certificate}</p>
        </div>
        <div class="course-actions">
          ${c.externalLink ? `<a class="btn btn-outline" target="_blank" rel="noopener" href="${c.externalLink}">Go to ProtectUK</a>` : ""}
          <a class="btn btn-primary" href="mailto:info@fleetvilletraining.co.uk?subject=Course%20Enquiry:%20${encodeURIComponent(c.name)}">Book / Enquire</a>
        </div>
      </article>
    `;
  }).join("");

  observeFadeIns();
}

renderCourses(courses.slice(0,6), "home-courses-grid");
renderCourses(courses, "courses-grid");

const allCategories = [...new Set(courses.flatMap(c => c.category))].sort();
const catSelect = $("#category");
allCategories.forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat; opt.textContent = cat; catSelect.appendChild(opt);
});

const form = $("#filters");
const resultsCount = $(".results-count");

function applyFilters(){
  const q = ($("#q").value || "").toLowerCase();
  const cat = $("#category").value;
  const deliveryChecked = $$('fieldset.checks input:checked').map(i => i.value);

  const filtered = courses.filter(c => {
    const matchQ = [c.name, c.short, c.category.join(" "), c.delivery.join(" "), c.entry.join(" ")].join(" ").toLowerCase().includes(q);
    const matchCat = cat ? c.category.includes(cat) : true;
    const matchDel = deliveryChecked.length ? deliveryChecked.some(d => c.delivery.includes(d)) : true;
    return matchQ && matchCat && matchDel;
  });

  renderCourses(filtered, "courses-grid");
  resultsCount.textContent = `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found`;
}

["input","change"].forEach(evt => form.addEventListener(evt, applyFilters));
form.addEventListener("reset", () => {
  setTimeout(() => { $$('fieldset.checks input').forEach(i => i.checked = false); applyFilters(); }, 0);
});
applyFilters();

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".course-toggle");
  if(!btn) return;
  const article = btn.closest(".course");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!expanded));
  article.toggleAttribute("open");
  btn.querySelector("span:first-child").textContent = article.hasAttribute("open") ? "Hide details" : "View details";
});

const toggle = $(".nav-toggle");
const nav = $("#site-nav");
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  nav.dataset.collapsed = expanded ? "true" : "false";
});
$$(".site-nav a").forEach(a => a.addEventListener("click", () => {
  nav.dataset.collapsed = "true";
  toggle.setAttribute("aria-expanded", "false");
}));

function observeFadeIns(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, {threshold:.14});
  $$(".fade-in").forEach(el => io.observe(el));
}
observeFadeIns();

const toTop = $("#toTop");
window.addEventListener("scroll", () => { toTop.classList.toggle("show", window.scrollY > 400); });
toTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

$("#year").textContent = new Date().getFullYear();

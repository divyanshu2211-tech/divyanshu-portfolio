const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

const menuToggle = $(".menu-toggle");
const nav = $("#nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
$$(".nav-link").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

$(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#f2ece4" : "#111210";
});

const sections = ["home", "about", "skills", "projects", "contact"].map(id => document.getElementById(id));
const navLinks = $$(".nav-link");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => section && observer.observe(section));

const projectDetails = {
  rupeeflow: {
    meta: "01 / FINTECH · ERP", title: "ERP Financial System — RupeeFlow",
    description: "A financial tracking application focused on making income, expenses, and transaction history easier to manage. The project is being developed with a React frontend and an API-backed data model.",
    features: ["Manage income and expense transactions, including edit and delete flows.", "Connect dashboard components to live API data.", "Use Express endpoints and Prisma to work with PostgreSQL.", "Build toward clearer reporting and bank-statement transaction categorization."],
    tech: ["React", "TypeScript", "Express.js", "Prisma", "PostgreSQL"]
  },
  powerbi: {
    meta: "02 / DATA ANALYTICS", title: "Motor's Audit Analysis Dashboard",
    description: "A Power BI reporting solution for automotive spare-parts inventory audits. It is designed to help auditors and managers prioritize the most material discrepancies and understand stock health.",
    features: ["Compare system/book quantities with physical quantities.", "Calculate shortage, excess, net variance, and variance value KPIs.", "Analyze category, location, and high-value discrepancy patterns.", "Support evidence-led audit follow-up and management decisions."],
    tech: ["Power BI", "Power Query", "DAX", "Excel", "Data Modeling"]
  },
  htmlaudit: {
    meta: "03 / WEB DEVELOPMENT", title: "HTML Inventory Audit Dashboard",
    description: "A lightweight browser dashboard concept for investigating DMS Location versus Actual Location mismatches and generating clear action recommendations.",
    features: ["Summarize audit rows and exception counts.", "Flag blank DMS locations as potential system logging errors.", "Flag differing locations as misplaced assets for physical verification.", "Present recommended next actions alongside the variance sheet."],
    tech: ["HTML", "CSS", "Vanilla JavaScript", "Responsive UI"]
  },
  reminder: {
    meta: "04 / DESKTOP PRODUCTIVITY", title: "Task Reminder Desktop App",
    description: "A desktop-oriented task and reminder experience designed to help people organize their day through a calm, personalized interface.",
    features: ["Create, organize, and mark tasks complete.", "Design a reminder setup flow and task schedule view.", "Personalize the experience with an avatar.", "Keep the interface readable and practical on desktop screens."],
    tech: ["JavaScript", "HTML", "CSS", "Desktop UI"]
  },
  freshclub: {
    meta: "05 / QUICK COMMERCE", title: "FreshClub — Quick Commerce App",
    description: "A grocery shopping experience for everyday essentials, designed around product discovery, cart management, and a low-friction order flow.",
    features: ["Browse grocery products and manage a shopping cart.", "Support customer sign-in and order placement.", "Plan WhatsApp-based order communication.", "Use Supabase for backend services, with inventory and delivery integrations as next steps."],
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Supabase"]
  },
  inventory: {
    meta: "06 / INVENTORY MANAGEMENT", title: "Inventory Audit System",
    description: "An inventory workflow for automotive dealerships, workshops, and spare-parts businesses where stock movement, physical verification, and audit evidence need to be traceable.",
    features: ["Organize parts in a centralized master, including OEM, aftermarket, and local sourcing.", "Track purchases, sales, stock adjustments, and returns.", "Reconcile physical counts against system stock.", "Prepare exception reports and preserve evidence for audit follow-up."],
    tech: ["Inventory Workflows", "Excel", "Power BI", "Database Design"]
  }
};
const dialog = $("#caseDialog");
$$(".case-link").forEach(button => button.addEventListener("click", () => {
  const project = projectDetails[button.dataset.project];
  if (!project) return;
  $("#dialogMeta").textContent = project.meta;
  $("#dialogTitle").textContent = project.title;
  $("#dialogDescription").textContent = project.description;
  $("#dialogFeatures").replaceChildren(...project.features.map(feature => {
    const li = document.createElement("li"); li.textContent = feature; return li;
  }));
  $("#dialogTech").replaceChildren(...project.tech.map(tech => {
    const span = document.createElement("span"); span.textContent = tech; return span;
  }));
  dialog.showModal();
}));
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const message = data.get("message").trim();
  const recipient = "divyanshusagar27@gmail.com";
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
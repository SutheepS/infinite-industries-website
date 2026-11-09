(() => {
  const cfg = window.INFINITE_CONFIG || {};
  const current = location.pathname.split("/").pop() || "index.html";
  const navItems = [["index.html","Home"],["about.html","About"],["products.html","Products"],["services.html","Services"],["projects.html","Projects"],["contact.html","Contact"]];
  const logo = '<img class="brand-logo" src="assets/images/infinite-industries-logo.png" alt="Infinite Industries">';
  const header = document.getElementById("site-header");
  if (header) header.innerHTML = `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html">${logo}</a><button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button><nav class="nav-links">${navItems.map(([url,label])=>`<a href="${url}" class="${current===url?'active':''}">${label}</a>`).join("")}<a class="nav-cta" href="quote.html">GET A QUOTE ↗</a></nav></div></header>`;
  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="index.html">${logo}</a><p>Strong roofs for a brighter tomorrow. Roofing products, guidance and installation solutions from Nagercoil, Tamil Nadu.</p></div><div class="footer-col"><h4>EXPLORE</h4><a href="about.html">About us</a><a href="products.html">Roofing products</a><a href="services.html">Our services</a><a href="projects.html">Our projects</a></div><div class="footer-col"><h4>GET IN TOUCH</h4><a href="tel:+${cfg.whatsappNumber||'918825856417'}">+91 88258 56417</a><a href="https://wa.me/${cfg.whatsappNumber||'918825856417'}" target="_blank" rel="noopener">WhatsApp us ↗</a><p>Nagercoil, Tamil Nadu, India</p><a href="quote.html">Request a free quote ↗</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Infinite Industries. All rights reserved.</span><span>ROOFING · SOLUTIONS · ALWAYS</span></div></div></footer><a class="float-wa" href="https://wa.me/${cfg.whatsappNumber||'918825856417'}?text=Hello%20Infinite%20Industries%2C%20I%20need%20roofing%20information." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">✆</a>`;
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});

  const form = document.getElementById("enquiryForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const submitButton = form.querySelector('button[type="submit"]');
  const params = new URLSearchParams(location.search);
  if (params.get("product")) form.elements.product.value = params.get("product");
  if (params.get("service")) form.elements.service.value = params.get("service");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (!cfg.googleSheetsEndpoint) {
      status.className = "form-status error";
      status.textContent = "The enquiry system is not connected yet. Please contact us directly on +91 88258 56417.";
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.company = cfg.companyName || "Infinite Industries";
    data.submittedAt = new Date().toISOString();

    submitButton.disabled = true;
    submitButton.textContent = "Submitting…";
    status.className = "form-status";
    status.textContent = "Sending your enquiry securely. Please wait.";

    try {
      // Apps Script accepts a simple text/plain POST, avoiding a browser preflight request.
      await fetch(cfg.googleSheetsEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "text/plain;charset=utf-8"},
        body: JSON.stringify(data)
      });
      status.textContent = "Thank you! Your enquiry has been submitted. Infinite Industries will contact you soon.";
      form.reset();
      if (params.get("product")) form.elements.product.value = params.get("product");
      if (params.get("service")) form.elements.service.value = params.get("service");
    } catch (err) {
      status.className = "form-status error";
      status.textContent = "We could not submit your enquiry. Please WhatsApp us at +91 88258 56417.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit enquiry <span>↗</span>';
    }
  });
})();
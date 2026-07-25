// Newark Tree Care - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initMobileNav();
  initScrollHeader();
  setMinModalDate();
});

/* ==========================================
   Instant Quote Estimator Logic
   ========================================== */
function initCalculator() {
  const serviceSelect = document.getElementById('calcService');
  const sizeSelect = document.getElementById('calcSize');
  const riskSelect = document.getElementById('calcRisk');
  const priceDisplay = document.getElementById('calcPriceDisplay');

  if (!serviceSelect || !sizeSelect || !riskSelect || !priceDisplay) return;

  function calculatePrice() {
    const service = serviceSelect.value;
    const size = sizeSelect.value;
    const risk = riskSelect.value;

    let baseMin = 250;
    let baseMax = 450;

    // Service Multiplier
    if (service === 'pruning') {
      baseMin = 250; baseMax = 550;
    } else if (service === 'removal') {
      baseMin = 600; baseMax = 1800;
    } else if (service === 'stump') {
      baseMin = 180; baseMax = 400;
    } else if (service === 'assessment') {
      baseMin = 100; baseMax = 250;
    } else if (service === 'emergency') {
      baseMin = 750; baseMax = 2200;
    }

    // Size Multiplier
    let sizeMult = 1.0;
    if (size === 'medium') sizeMult = 1.35;
    if (size === 'large') sizeMult = 1.8;
    if (size === 'xlarge') sizeMult = 2.4;

    // Risk Multiplier
    let riskMult = 1.0;
    if (risk === 'med') riskMult = 1.25;
    if (risk === 'high') riskMult = 1.6;

    const finalMin = Math.round((baseMin * sizeMult * riskMult) / 10) * 10;
    const finalMax = Math.round((baseMax * sizeMult * riskMult) / 10) * 10;

    priceDisplay.textContent = `$${finalMin} - $${finalMax}`;
  }

  serviceSelect.addEventListener('change', calculatePrice);
  sizeSelect.addEventListener('change', calculatePrice);
  riskSelect.addEventListener('change', calculatePrice);

  calculatePrice();
}

/* ==========================================
   Zip Code Coverage Checker
   ========================================== */
function checkZipCode(event) {
  event.preventDefault();
  const input = document.getElementById('zipInput');
  const result = document.getElementById('zipResult');
  const zip = input.value.trim();

  // Newark & Surrounding NJ Zip Codes (07101 to 07114, 07017, 07302, 07030, 07042, etc.)
  const validZips = ['07101', '07102', '07103', '07104', '07105', '07106', '07107', '07108', '07112', '07114', '07017', '07018', '07030', '07302', '07042', '07079'];

  if (validZips.includes(zip) || (zip.startsWith('071') && zip.length === 5) || (zip.startsWith('070') && zip.length === 5)) {
    result.className = 'zip-result success';
    result.innerHTML = `✓ Great News! <strong>${zip}</strong> is in our primary service area. Instant arborist dispatch is available.`;
  } else {
    result.className = 'zip-result error';
    result.innerHTML = `📍 Zip code ${zip} is just outside our standard radius, but we frequently serve surrounding NJ areas! Call (973) 555-0199 for scheduling.`;
  }
}

/* ==========================================
   Booking & Consultation Modal
   ========================================== */
function openModal(serviceName = '') {
  const modal = document.getElementById('bookingModal');
  const title = document.getElementById('modalTitle');
  
  if (serviceName) {
    title.textContent = `Schedule ${serviceName}`;
  } else {
    title.textContent = 'Schedule Tree Consultation';
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openModalWithEstimate() {
  const priceDisplay = document.getElementById('calcPriceDisplay').textContent;
  openModal(`Tree Service (Estimate Range: ${priceDisplay})`);
}

function closeModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function setMinModalDate() {
  const dateInput = document.getElementById('modalDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value;
  const phone = document.getElementById('modalPhone').value;
  
  closeModal();
  showToast(`Thank you, ${name}! Your consultation request has been submitted. Our arborist team will call ${phone} within 15 minutes to confirm.`);
  document.getElementById('modalBookingForm').reset();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  showToast(`Thank you, ${name}! Your message was sent successfully. We will get back to you shortly!`);
  document.getElementById('contactForm').reset();
}

/* ==========================================
   Toast Notification Helper
   ========================================== */
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #0f291e;
    color: #ffffff;
    border: 2px solid #52b788;
    padding: 1.25rem 1.75rem;
    border-radius: 14px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 9999;
    max-width: 420px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.95rem;
    line-height: 1.5;
    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = `<strong>🌳 Newark Tree Care:</strong><br>${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/* ==========================================
   Mobile Menu & Scroll Enhancements
   ========================================== */
function initMobileNav() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('navMenu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

function initScrollHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

(function() {
  // ==================== DARK MODE ====================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  const setDarkMode = (isDark) => {
    if (isDark) {
      body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      body.classList.remove('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  };
  
  // Initialiser
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'true') {
    setDarkMode(true);
  } else if (savedMode === 'false') {
    setDarkMode(false);
  } else {
    // Par défaut, mode clair
    setDarkMode(false);
  }
  
  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    setDarkMode(isDark);
    localStorage.setItem('darkMode', isDark);
  });

  // ==================== MENU MOBILE ====================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==================== COMPTEUR STATISTIQUES ====================
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  };
  
  // Lancer après un court délai
  setTimeout(animateCounters, 300);

  // ==================== NEWSLETTER ====================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      const btn = newsletterForm.querySelector('button');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        newsletterForm.reset();
      }, 2000);
      console.log('Email inscrit :', email);
    });
  }

  // ==================== CHATBOT ====================
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotContainer = document.getElementById('chatbotContainer');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  
  if (chatbotToggle && chatbotContainer) {
    chatbotToggle.addEventListener('click', () => {
      chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('active');
    });
    
    const responses = {
      'sahara': 'Le Sahara algérien est le plus beau désert du monde ! Découvrez Tamanrasset et les dunes infinies.',
      'unesco': 'L\'Algérie compte 8 sites UNESCO : Timgad, Tassili, la Casbah d\'Alger, Djémila, le M\'zab, Tipasa, la Kalaa des Béni Hammad.',
      'circuit': 'Consultez notre page Circuits Historiques pour découvrir l\'Antiquité romaine, les vestiges islamiques et le patrimoine équestre.',
      'couscous': 'Le couscous algérien est classé au patrimoine immatériel de l\'UNESCO. Un délice à déguster absolument !',
      'default': 'Je peux vous renseigner sur le Sahara, les sites UNESCO, nos circuits ou la gastronomie. Que voulez-vous savoir ?'
    };
    
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = chatbotInput.value.trim();
      if (!msg) return;
      
      // Message utilisateur
      chatbotMessages.innerHTML += `<div style="text-align:right;margin:6px;"><span style="background:var(--primary);color:#fff;padding:6px 14px;border-radius:16px;display:inline-block;">${msg}</span></div>`;
      chatbotInput.value = '';
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      
      // Réponse
      setTimeout(() => {
        const lower = msg.toLowerCase();
        let reply = responses.default;
        for (const [key, val] of Object.entries(responses)) {
          if (lower.includes(key)) { reply = val; break; }
        }
        chatbotMessages.innerHTML += `<div style="text-align:left;margin:6px;"><span style="background:var(--surface);padding:6px 14px;border-radius:16px;display:inline-block;border:1px solid var(--border);">${reply}</span></div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 600);
    });
  }

  // ==================== SCROLL ANIMATIONS ====================
  const fadeElements = document.querySelectorAll('.fade-section');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  fadeElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    fadeObserver.observe(el);
  });

  console.log('✅ DZTOUR - Tous les scripts chargés avec succès');
})();

// ====================================================================
// DZTOUR MODAL & FORMSPREE LOGIC (Complete & Bug-Free)
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ALL DOM ELEMENTS SAFELY
    const contactModal = document.getElementById('contactModal');
    const openModalBtns = [
        document.getElementById('openContactModal'),
        document.getElementById('footerContactBtn')
    ];
    const closeModalBtn = document.getElementById('closeContactModal');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const newsletterForm = document.getElementById('newsletterForm');

    // 2. MODAL OPEN / CLOSE FUNCTIONS
    const openContactModal = (e) => {
        if(e) e.preventDefault();
        if(contactModal) {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scroll
        }
    };

    const closeContactModal = () => {
        if(contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
            if(formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
        }
    };

    // Attach Open Events
    openModalBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openContactModal);
    });

    // Attach Close Events
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeContactModal);
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeContactModal();
        });
    }

    // ====================================================================
    // FORMSPREE SUBMISSION LOGIC
    // ====================================================================
    const FORMSREE_CONTACT_URL = 'https://formspree.io/f/xojooynv';
    const FORMSREE_NEWSLETTER_URL = 'https://formspree.io/f/xzdllyal';

    // 3. CONTACT MODAL FORM SUBMIT
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get buttons and loaders safely from inside the form
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = contactForm.querySelector('.btn-text');
            const btnLoader = contactForm.querySelector('.btn-loader');

            // UI Loading state
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            if (submitBtn) submitBtn.disabled = true; // Prevent double click
            if (formStatus) formStatus.textContent = '';

            const data = new FormData(contactForm);
            const payload = {};
            data.forEach((value, key) => { payload[key] = value; });

            try {
                const response = await fetch(FORMSREE_CONTACT_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', // <-- THIS WAS MISSING!
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = 'Message envoyé avec succès !';
                        formStatus.className = 'form-status success';
                    }
                    contactForm.reset();
                    setTimeout(closeContactModal, 2500); // Close after 2.5s
                } else {
                    throw new Error('Erreur serveur');
                }
            } catch (error) {
                console.error('Erreur Formspree:', error);
                if (formStatus) {
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
                    formStatus.className = 'form-status error';
                }
            } finally {
                // Restore button state
                if (btnText) btnText.style.display = 'inline';
                if (btnLoader) btnLoader.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // 4. NEWSLETTER FORM SUBMIT
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (!emailInput || !emailInput.value.trim()) return;
            const email = emailInput.value.trim();

            const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
            }

            try {
                const response = await fetch(FORMSREE_NEWSLETTER_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', // <-- THIS WAS MISSING HERE TOO!
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify({ email: email, subject: 'Nouvel abonnement newsletter DZTOUR' })
                });

                if (response.ok) {
                    emailInput.value = '';
                    alert('Merci de vous être abonné à notre newsletter ! 🇩🇿');
                } else {
                    throw new Error('Erreur');
                }
            } catch (error) {
                alert('Oups, une erreur est survenue lors de l\'inscription.');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
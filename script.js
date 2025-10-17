// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_keylgf4';  // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_kt7q3v8'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'egXDZL3h1x6akWyZ7';   // Replace with your Public Key

// Initialize EmailJS
(function() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Close mobile menu if open
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

// Smooth scroll for hero buttons
document.querySelectorAll('.hero-buttons a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        setTimeout(() => {
          item.style.display = 'block';
        }, 10);
      } else {
        item.classList.add('hidden');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  if (name && email && message) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> SENDING...';
    submitBtn.disabled = true;
    
    // Prepare email parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject || 'New Contact Form Submission',
      message: message,
      to_email: 'editsathollow@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      })
      .catch((error) => {
        console.error('FAILED...', error);
        showToast('Failed to send message. Please try emailing directly at editsathollow@gmail.com', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  } else {
    showToast('Please fill in all required fields.', 'error');
  }
});

// Update current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animate skill bars on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Fade-in animation for sections
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(section);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    const heroHeight = heroSection.offsetHeight;
    if (scrolled < heroHeight) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }
});

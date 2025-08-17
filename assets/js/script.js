// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navToggleIcon = navToggle.querySelector('i');

navToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
        navToggleIcon.classList.remove('fa-bars');
        navToggleIcon.classList.add('fa-times');
    } else {
        navToggleIcon.classList.remove('fa-times');
        navToggleIcon.classList.add('fa-bars');
    }
});

// Initialize Swiper for hero carousel
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
});

// Product quantity management
let quantities = {};

function toggleQuantity(productId) {
    const quantityControls = document.getElementById(`quantity-${productId}`);
    const quantityBtn = quantityControls.previousElementSibling;
    const btnIcon = quantityBtn.querySelector('i');
    
    // Close all other quantity controls
    document.querySelectorAll('.quantity-controls').forEach(control => {
        if (control.id !== `quantity-${productId}`) {
            control.classList.remove('active');
            const otherBtn = control.previousElementSibling;
            const otherIcon = otherBtn.querySelector('i');
            otherIcon.classList.remove('fa-check');
            otherIcon.classList.add('fa-plus');
        }
    });
    
    // Toggle current quantity controls
    if (quantityControls.classList.contains('active')) {
        quantityControls.classList.remove('active');
        btnIcon.classList.remove('fa-check');
        btnIcon.classList.add('fa-plus');
    } else {
        quantityControls.classList.add('active');
        btnIcon.classList.remove('fa-plus');
        btnIcon.classList.add('fa-check');
        
        // Initialize quantity if not set
        if (!quantities[productId]) {
            quantities[productId] = 1;
            updateQuantityDisplay(productId);
        }
    }
}

function increaseQuantity(productId) {
    quantities[productId] = (quantities[productId] || 1) + 1;
    updateQuantityDisplay(productId);
}

function decreaseQuantity(productId) {
    quantities[productId] = Math.max(1, (quantities[productId] || 1) - 1);
    updateQuantityDisplay(productId);
}

function updateQuantityDisplay(productId) {
    const quantityDisplay = document.querySelector(`#quantity-${productId} .quantity-display`);
    if (quantityDisplay) {
        quantityDisplay.textContent = quantities[productId] || 1;
    }
}

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryTitle = this.querySelector('h4').textContent.toLowerCase().replace(/\s+/g, '-');
        // Add smooth scroll or navigation logic here
        console.log(`Navigate to category: ${categoryTitle}`);
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h5').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Add cart animation
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Added!';
        this.style.background = 'var(--deep-rose)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 1000);
        
        console.log(`Added to cart: ${productName} - ${productPrice}`);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-section a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navToggleIcon.classList.remove('fa-times');
        navToggleIcon.classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navToggleIcon.classList.remove('fa-times');
        navToggleIcon.classList.add('fa-bars');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize all quantity displays
    for (let i = 1; i <= 8; i++) {
        quantities[i] = 1;
        updateQuantityDisplay(i);
    }
});

// Add scroll progress indicator
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    
    // You can use this to show a progress bar if needed
    console.log(`Scroll progress: ${progress}%`);
}

window.addEventListener('scroll', updateScrollProgress);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .product-card').forEach(el => {
    observer.observe(el);
});

// Add custom cursor effect for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});













// Intersection Observer for scroll animation
const observerOptionss = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const observers = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Add staggered animation to child elements
      const textElements = entry.target.querySelectorAll('.section-title, .product-title, .product-description, .cta-button');
      textElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 150);
      });
    }
  });
}, observerOptionss);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const offersContent = document.getElementById('offersContent');
  
  if (offersContent) {
    // Set initial state for text elements
    const textElements = offersContent.querySelectorAll('.section-title, .product-title, .product-description, .cta-button');
    textElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Start observing
    observers.observe(offersContent);
  }
  
  // Add sparkle effect on button hover
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', createSparkles);
  }
});

// Sparkle effect function
function createSparkles() {
  const button = document.querySelector('.cta-button');
  const sparkleCount = 6;
  
  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnimation 0.8s ease-out forwards;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      
      // Add sparkle animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes sparkleAnimation {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
          }
        }
      `;
      
      if (!document.querySelector('style[data-sparkle]')) {
        style.setAttribute('data-sparkle', 'true');
        document.head.appendChild(style);
      }
      
      button.appendChild(sparkle);
      
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 800);
    }, i * 100);
  }
}

// Smooth scroll enhancement
function addSmoothScrolling() {
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Add your navigation logic here
      console.log('Navigate to shop collection');
    });
  }
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', addSmoothScrolling);  


 // Add interactive hover effects
        document.addEventListener('DOMContentLoaded', function () {
            const makeupItems = document.querySelectorAll('.makeup-item');
            const sparkles = document.querySelectorAll('.sparkle');

            // Add hover effects to makeup items
            makeupItems.forEach(item => {
                item.addEventListener('mouseenter', function () {
                    this.style.transform = 'scale(1.2) rotate(10deg)';
                    this.style.transition = 'transform 0.3s ease';
                });

                item.addEventListener('mouseleave', function () {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Random sparkle burst effect
            function createSparkleEffect() {
                sparkles.forEach((sparkle, index) => {
                    setTimeout(() => {
                        sparkle.style.animation = 'sparkle 1s ease-in-out';
                        sparkle.style.opacity = '1';

                        setTimeout(() => {
                            sparkle.style.opacity = '0';
                        }, 1000);
                    }, index * 200);
                });
            }

            // Trigger sparkle effect every 8 seconds
            setInterval(createSparkleEffect, 8000);

            // Initial sparkle effect
            setTimeout(createSparkleEffect, 2000);
        });



 // Animated search functionality
        const searchToggle = document.querySelector(".search-toggle")
        const searchContainer = document.querySelector(".search-input-container")
        const searchInput = document.querySelector(".search-input")
        const searchClose = document.querySelector(".search-close")

        searchToggle.addEventListener("click", () => {
            searchContainer.classList.add("active")
            setTimeout(() => {
                searchInput.focus()
            }, 200)
        })

        searchClose.addEventListener("click", () => {
            searchContainer.classList.remove("active")
            searchInput.value = ""
        })

        // Close search when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".search-container")) {
                searchContainer.classList.remove("active")
            }
        })

        // Close search on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                searchContainer.classList.remove("active")
            }
        }) 




// Mobile collapsible categories
        const mobileCategoryToggles = document.querySelectorAll(".mobile-category-toggle")

        mobileCategoryToggles.forEach((toggle) => {
            toggle.addEventListener("click", function () {
                const subcategories = this.nextElementSibling
                const isActive = subcategories.classList.contains("active")

                // Close all other subcategories
                document.querySelectorAll(".mobile-subcategories").forEach((sub) => {
                    sub.classList.remove("active")
                })
                document.querySelectorAll(".mobile-category-toggle").forEach((tog) => {
                    tog.classList.remove("active")
                })

                // Toggle current subcategory
                if (!isActive) {
                    subcategories.classList.add("active")
                    this.classList.add("active")
                }
            })
        })

        // Close mobile menu when clicking links
        const mobileLinks = document.querySelectorAll(".mobile-menu a")
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active")
                navToggleIcon.classList.remove("fa-times")
                navToggleIcon.classList.add("fa-bars")
            })
        })

        // Search functionality
        searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase()
            if (query.length > 2) {
                console.log("[v0] Searching for:", query)
            }
        })

        // Mobile search functionality
        const mobileSearchInput = document.querySelector(".mobile-search-input")
        if (mobileSearchInput) {
            mobileSearchInput.addEventListener("input", function () {
                const query = this.value.toLowerCase()
                if (query.length > 2) {
                    console.log("[v0] Mobile searching for:", query)
                }
            })
        }



        
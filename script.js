// Initialize Google Maps
function initMap() {
    const location = { lat: -6.2088, lng: 106.8456 }; // Jakarta coordinates as an example
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'TegarUtomo Café',
    });
}

// Smooth Scrolling
const menuButton = document.querySelector('.hero-buttons a[href="#menu"]');
const reservationButton = document.querySelector('.hero-buttons a[href="#reservation"]');

// Add smooth scrolling for menu button
menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#menu');
    
    // Add animation class
    menuButton.classList.add('scrolling');
    
    // Smooth scroll to menu section
    target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Remove animation class after scroll
    setTimeout(() => {
        menuButton.classList.remove('scrolling');
    }, 1000);
});

// Add smooth scrolling for reservation button
reservationButton.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#reservation');
    
    // Add animation class
    reservationButton.classList.add('scrolling');
    
    // Smooth scroll to reservation section
    target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Remove animation class after scroll
    setTimeout(() => {
        reservationButton.classList.remove('scrolling');
    }, 1000);
});

// Menu Filtering
const menuItems = [
    {
        category: 'kopi',
        name: 'Espresso',
        price: 'Rp 25.000',
        description: 'Kopi hitam murni dengan aroma khas',
        image: 'https://awsimages.detik.net.id/community/media/visual/2021/12/19/3-trik-bikin-kopi-espresso-tanpa-mesin-hasilnya-tetap-nikmat_169.jpeg?w=1200'
    },
    {
        category: 'kopi',
        name: 'Latte',
        price: 'Rp 35.000',
        description: 'Kopi susu dengan tekstur creamy',
        image: 'https://nibble-images.b-cdn.net/nibble/original_images/diffcoffee1.jpg'
    },
    {
        category: 'non-kopi',
        name: 'Teh Tarik',
        price: 'Rp 20.000',
        description: 'Teh susu tradisional',
        image: 'https://asset.kompas.com/crops/hsrnlGnJjSvQmAEyoV_dmwBbUi4=/120x80:1000x667/1200x800/data/photo/2023/10/18/652fcf5eb1b28.jpg'
    },
    {
        category: 'makanan',
        name: 'Croissant',
        price: 'Rp 25.000',
        description: 'Roti croissant dengan butter asli',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/2018_01_Croissant_IMG_0685.JPG/960px-2018_01_Croissant_IMG_0685.JPG'
    }
];

const menuItemsContainer = document.querySelector('.menu-items');
const categoryButtons = document.querySelectorAll('.category-btn');

function displayMenuItems(items) {
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            </div>
            <div class="menu-content">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
                <p class="description">${item.description}</p>
            </div>
        </div>
    `).join('');
}

displayMenuItems(menuItems);

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            const filteredItems = menuItems.filter(item => item.category === category);
            displayMenuItems(filteredItems);
        }
    });
});

// Reservation Form Validation
const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.date || !data.time || !data.guests || !data.phone) {
        alert('Harap isi semua field yang diperlukan!');
        return;
    }
    
    // Here you would typically send the data to a backend server
    // For now, we'll just show a success message
    alert('Reservasi Anda berhasil! Kami akan menghubungi Anda segera.');
    reservationForm.reset();
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu with smooth animation
    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            // Close animation
            navLinks.style.maxHeight = '0';
            hamburger.classList.remove('active');
            
            // Reset max-height after animation
            setTimeout(() => {
                navLinks.classList.remove('active');
            }, 300);
        } else {
            // Open animation
            navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
            hamburger.classList.add('active');
            navLinks.classList.add('active');
        }

        // Add animation class to hamburger icon
        hamburger.classList.toggle('animating');
        
        // Remove animation class after animation
        setTimeout(() => {
            hamburger.classList.remove('animating');
        }, 300);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.style.maxHeight = '0';
                hamburger.classList.remove('active');
                
                // Reset max-height after animation
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 300);
            }
        }
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            if (navLinks.classList.contains('active')) {
                navLinks.style.maxHeight = '0';
                hamburger.classList.remove('active');
                
                // Reset max-height after animation
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 300);
            }
        }
    });

    // Smooth Scrolling for all navigation links
    const allNavLinks = document.querySelectorAll('.nav-links a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add animation class to link
                link.classList.add('scrolling');
                
                // Calculate target position with offset
                const offset = 80; // Height of navbar
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Smooth scroll with custom animation
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                    duration: 1000
                });
                
                // Remove animation class after scroll
                setTimeout(() => {
                    link.classList.remove('scrolling');
                }, 1000);
            }
        });
    });

    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80; // Height of navbar
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Custom smooth scroll animation
                const start = window.pageYOffset;
                const distance = targetPosition - start;
                const duration = 1000;
                
                let startTimestamp = null;
                
                function animation(currentTimestamp) {
                    if (startTimestamp === null) startTimestamp = currentTimestamp;
                    const timeElapsed = currentTimestamp - startTimestamp;
                    const run = ease(timeElapsed, start, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });

    // Add scroll animation for navigation links
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    allNavLinks.forEach(link => {
        observer.observe(link);
    });
});

// Add scroll animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPos = window.scrollY;
        
        if (scrollPos > sectionTop - sectionHeight / 2) {
            section.classList.add('active');
        }
    });
});

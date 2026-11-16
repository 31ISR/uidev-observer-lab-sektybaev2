console.log("Скрипт подключен");

const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -80px 0px"
};

const recipeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            obs.unobserve(entry.target);
        }
    });
}, options);




animatedElements.forEach((el) => {
    recipeObserver.observe(el);
});


const staggeredCont = document.querySelectorAll(".services-grid, .stats-grid, .testimonials");


const staggerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parentElement = entry.target;
            const items = parentElement.querySelectorAll(".stagger-item");

            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("animate");
                }, index * 200);
            });

            obs.unobserve(entry.target);
        }
    });
}, options);

staggeredCont.forEach((el) => {
    staggerObserver.observe(el);
});



const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = (scrollTop / docHeight) * 100;
        progressBar.style.width = percent + "%";
    }

    const header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = "rgba(0, 0, 0, 0.9)";
        } else {
            header.style.background = "rgba(0, 0, 0, 0.5)";
        }
    }
});



const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href");
        const targetSection = document.querySelector(id);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    });
});



const container = document.querySelector(".particles");

if (container) {
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement("div");
        flake.classList.add("particle");
        flake.style.left = Math.random() * 100 + "%";
        flake.style.animationDelay = Math.random() * 5 + "s";
        flake.style.animationDuration = Math.random() * 3 + 2 + "s";
        container.appendChild(flake);
    }
}


function countUp(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    requestAnimationFrame(updateCounter);
}

const statsSection = document.querySelector(".stats");


if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numbers = statsSection.querySelectorAll(".stat-number");
                
                numbers.forEach((num) => {
                    const text = num.textContent;
                    const targetValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                    
                    if (!isNaN(targetValue)) {
                        countUp(num, targetValue);
                    }
                });

                obs.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}
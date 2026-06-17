document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Entrance Animation
    const tl = gsap.timeline();
    
    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    })
    .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7")
    .to(".hero-ctas", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7");

    // Hero Parallax effect
    gsap.to(".hero-video", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Trust Counters Animation
    const counters = document.querySelectorAll('.counter');
    
    ScrollTrigger.create({
        trigger: ".trust",
        start: "top 80%",
        onEnter: () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        },
        once: true
    });

    // 4. Signature Experiences Fade Up
    gsap.utils.toArray('.exp-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            }
        });
    });

    // 5. Featured Stories Horizontal Scroll
    const track = document.querySelector('.story-track');
    
    if(window.innerWidth > 768 && track) {
        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
            ease: "none",
            scrollTrigger: {
                trigger: ".featured",
                pin: true,
                scrub: 1,
                start: "center center",
                end: () => "+=" + track.scrollWidth
            }
        });
    }

    // 6. Timeline Animation
    gsap.to('.timeline-progress', {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".timeline-container",
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    });

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        ScrollTrigger.create({
            trigger: item,
            start: "top center+=100",
            onEnter: () => {
                gsap.to(item, { opacity: 1, y: 0, duration: 0.8 });
                item.classList.add('active');
            },
            onLeaveBack: () => {
                item.classList.remove('active');
            }
        });
    });

    // 7. Testimonials Carousel
    const slides = [
        {
            quote: "Orra Events didn't just plan our wedding; they orchestrated a masterpiece. The attention to detail, the effortless elegance, and the way they captured our essence was truly breathtaking. It was the most magical weekend of our lives.",
            author: "Isabella & Thomas",
            location: "Amalfi Coast"
        },
        {
            quote: "From the initial mood board to the final dance, every moment was curated with an exceptional level of taste and professionalism. They transformed our vision into an immersive reality that our guests are still talking about.",
            author: "Priya & Rahul",
            location: "Udaipur"
        },
        {
            quote: "The pinnacle of luxury event planning. Their global connections, eye for design, and calm execution made what could have been a stressful destination wedding feel like a serene, beautiful holiday.",
            author: "Eleanor & James",
            location: "Paris"
        }
    ];

    let currentSlide = 0;
    const carouselContainer = document.querySelector('.testimonial-carousel');
    
    function renderSlide(index) {
        const slide = slides[index];
        carouselContainer.innerHTML = `
            <div class="testimonial-slide active">
                <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                <blockquote>"${slide.quote}"</blockquote>
                <cite>— ${slide.author}, <span>${slide.location}</span></cite>
            </div>
        `;
    }

    // Initial render
    if(carouselContainer) {
        renderSlide(currentSlide);
        // Auto rotate
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            renderSlide(currentSlide);
        }, 6000);
    }
});

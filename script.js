let snowballInterval;
let isScrolling = false;

// Create snowball function
function createSnowball() {
    const snowball = document.createElement('div');
    snowball.classList.add('snowball');

    // Randomize position
    const leftPosition = Math.random() * 100;
    snowball.style.left = `${leftPosition}vw`;

    // Append to body
    document.body.appendChild(snowball);

    // Animate snowball
    snowball.style.animation = `snowball-fall ${Math.random() * 2 + 2}s linear`; // Fall time: 2-4 seconds

    // Remove snowball after animation ends
    snowball.addEventListener('animationend', () => {
        snowball.remove();
    });
}

// Start snowfall with increased intensity
function startSnowfall() {
    // Prevent multiple intervals
    if (!snowballInterval) {
        snowballInterval = setInterval(() => {
            // Generate five snowballs per interval
            for (let i = 0; i < 5; i++) {
                createSnowball();
            }
        }, 1000); // Snowballs generated every 1 second
    }
}

// Stop snowfall
function stopSnowfall() {
    clearInterval(snowballInterval);
    snowballInterval = null;

    // Remove all existing snowballs
    document.querySelectorAll('.snowball').forEach((snowball) => {
        snowball.remove();
    });
}

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSnowfall(); // Stop snowfall when the tab is not visible
    } else if (!isScrolling) {
        startSnowfall(); // Restart snowfall only if not scrolling to the purple-black background
    }
});

// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize position for the stars
        const leftPosition = Math.random() * 100;
        const topPosition = Math.random() * 100;

        // Random size for stars
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Apply the randomized positions
        star.style.left = `${leftPosition}vw`;
        star.style.top = `${topPosition}vh`;

        starsContainer.appendChild(star);
    }
}

// Scroll event to manage background and snowball behavior
const body = document.body;
const backgroundImage = document.getElementById('background-image');
const contentContainer = document.querySelector('.content');
const heading = document.getElementById('scroll-heading');
const gradientSections = document.getElementById('gradient-sections');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 200) {
        // Entering purple-black background
        isScrolling = true;
        stopSnowfall(); // Stop snowfall when scrolling into the purple-black background
        gradientSections.classList.remove('hidden'); // Show divided sections
        contentContainer.classList.add('hidden');
        heading.classList.add('hidden');
        backgroundImage.classList.add('image-hidden');
        document.querySelector('.stars').classList.add('hidden');
    } else {
        // Returning to snowy forest background
        isScrolling = false;
        startSnowfall(); // Restart snowfall when scrolling back up
        gradientSections.classList.add('hidden'); // Hide divided sections
        contentContainer.classList.remove('hidden');
        heading.classList.remove('hidden');
        backgroundImage.classList.remove('image-hidden');
        document.querySelector('.stars').classList.remove('hidden');
    }
});

// Heading scroll animation
heading.style.willChange = 'transform, opacity';
const easeFactor = 0.7;
let lastScrollY = 0;
let ticking = false;

const updateHeading = () => {
    const scrollY = window.scrollY;
    const targetTransform = `translate(-50%, calc(-50% + ${scrollY * 0.5}px))`;
    const targetOpacity = Math.max(1 - scrollY * 0.09, 0);

    heading.style.transform = targetTransform;
    heading.style.opacity = targetOpacity;
};

const handleScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeading();
            ticking = false;
        });
        ticking = true;
    }
};

heading.style.transition = `transform ${easeFactor}s ease-out, opacity ${easeFactor}s ease-out`;

window.addEventListener('scroll', handleScroll);

// Create stars and start snowfall on page load
window.addEventListener('load', () => {
    createStars();
    startSnowfall(); // Ensure snowfall starts as soon as the page is loaded
});


/*LANDING JS ENDS */



//CountDown JS

class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.intervalId = null;
        this.elements = {
            days: document.querySelector('#days'),
            hours: document.querySelector('#hours'),
            minutes: document.querySelector('#minutes'),
            seconds: document.querySelector('#seconds')
        };
        this.createSnowflakes();
    }

    createSnowflakes() {
        const snowfall = document.querySelector('.snowfall');
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDelay = `${Math.random() * 10}s`;
            snowflake.style.opacity = Math.random();
            snowflake.style.animation = `snowfall ${5 + Math.random() * 10}s linear infinite`;
            snowfall.appendChild(snowflake);
        }
    }

    start() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        const now = new Date();
        const diff = Math.max(0, Math.floor((this.targetDate - now) / 1000));

        const days = Math.floor(diff / (24 * 60 * 60));
        const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((diff % (60 * 60)) / 60);
        const seconds = diff % 60;

        this.elements.days.textContent = this.padNumber(days);
        this.elements.hours.textContent = this.padNumber(hours);
        this.elements.minutes.textContent = this.padNumber(minutes);
        this.elements.seconds.textContent = this.padNumber(seconds);

        if (diff === 0) {
            this.stop();
        }
    }

    padNumber(number) {
        return number.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const countdown = new CountdownTimer('2025/02/01 00:00:00');
    countdown.start();
});

/*COUNTDOWN JS ENDS*/


//HEADER

const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".mobile-navbar");
    const overlay = document.querySelector(".overlay");

    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navigation.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navigation.classList.remove("active");
      overlay.classList.remove("active");
    });

/*HEADER JS ENDS*/


// /TIMELINE JS STARTS/

const events = [
    {
      title: "Registrations",
      date: "Pre-Event",
      time: "Until Feb 1st",
      description: "Register your team for the hackathon"
    },
    {
      title: "Hacking Period Starts",
      date: "1st February, 2025",
      time: "12:00 PM onwards",
      description: "Begin your innovative journey!"
    },
    {
      title: "Mid Evaluation",
      date: "1st February, 2025",
      time: "9:00 PM onwards",
      description: "Present your progress to the judges"
    },
    {
      title: "Hacking Period Ends",
      date: "2nd February, 2025",
      time: "12:00 PM",
      description: "Time to wrap up your projects"
    },
    {
      title: "Project Submission",
      date: "2nd February, 2025",
      time: "12:00 PM - 1:00 PM",
      description: "Submit your final project"
    },
    {
      title: "Final Evaluation",
      date: "2nd February, 2025",
      time: "1:00 PM onwards",
      description: "Present your complete project to the judges"
    }
  ];

  function createSnowflakes() {
    let snowflakes = '';
    for (let i = 0; i < 12; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 12 + 8;
      const rotation = Math.random() * 360;
      snowflakes += `
        <div class="snowflake" style="top: ${top}%; left: ${left}%; width: ${size}px; height: ${size}px; transform: rotate(${rotation}deg);">❄</div>
      `;
    }
    return snowflakes;
  }

  function createIceLayers() {
    let layers = '';
    for (let i = 0; i < 4; i++) {
      const rotation = i * 45;
      const scale = 0.8 - i * 0.1;
      layers += `
        <div class="ice-layer" style="transform: rotate(${rotation}deg) scale(${scale});"></div>
      `;
    }
    return layers;
  }

  function createTimelineEvent(event, index) {
    const eventElement = document.createElement('div');
    eventElement.className = 'timeline-event';
    
    eventElement.innerHTML = `
      <div class="event-container">
        <div class="event-glow"></div>
        <div class="event-card">
          <div class="snowflakes">${createSnowflakes()}</div>
          <div class="event-meta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>${event.date}</span>
          </div>
          <h3 class="event-title">${event.title}</h3>
          <div class="event-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${event.time}</span>
          </div>
          <p class="event-description">${event.description}</p>
        </div>
      </div>
      <div class="timeline-connector">
        <div class="ice-sculpture">
          <div class="ice-glow"></div>
          <div class="ice-layers">${createIceLayers()}</div>
        </div>
        <div class="connector-line">
          ${Array(3).fill().map(() => '<div class="sparkle"></div>').join('')}
        </div>
      </div>
    `;

    setTimeout(() => {
      eventElement.classList.add('visible');
    }, index * 300);

    return eventElement;
  }

  function initializeTimeline() {
    const timeline = document.getElementById('timeline');
    events.forEach((event, index) => {
      const eventElement = createTimelineEvent(event, index);
      timeline.appendChild(eventElement);
    });
  }

  document.addEventListener('DOMContentLoaded', initializeTimeline);



  /*TIMELINE JS ENDS*/

  /* PRICEPOOL JS*/

  function createStars() {
    const container = document.getElementById('container_prize');
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.floor(Math.random() * 100)}%`;
      star.style.left = `${Math.floor(Math.random() * 100)}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(star);
    }
     // Create animated stars backgrounda  
    
    }

    // Initialize stars on page load
    document.addEventListener('DOMContentLoaded', createStars);

/*PRICEPOOL JS ENDS*/


/*FAQS JS STARTS*/

function toggleAnswer(element) {
  const answer = element.querySelector('.answer');
  const svg = element.querySelector('svg');
  const question=element.querySelector('.question');

  if (answer.style.display === 'block') {
    question.style.display='block';
    answer.style.display = 'none';
    svg.style.transform = 'rotate(0deg)';
  } else {
    question.style.display='none';
    answer.style.display = 'block';
    svg.style.transform = 'rotate(45deg)';
  }
}

/*FAQS JS ENDS*/


// preloader js

// Wait for the content to load
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");
  
  // Prevent scrolling while preloader is active
  document.body.classList.add('preloader-active');

  // Keep preloader visible for 2.5 seconds, then fade out
  setTimeout(() => {
      preloader.classList.add("hidden");
      


      // Show content after the preloader fades out
      setTimeout(() => {
          content.style.display = "block";
          // Re-enable scrolling
          document.body.classList.remove('preloader-active');
      }, 500); // Match the fade-out transition time
  }, 2500); // Preloader duration (2.5 seconds)
});


// preloader js ends

// landing button js

document.querySelectorAll('.landing-buttons button').forEach(button => {
  button.addEventListener('mouseover', () => {
    button.style.boxShadow = '0 0 20px 5px rgba(102, 204, 255, 0.7)';
  });

  button.addEventListener('mouseout', () => {
    button.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.3)';
  });

  button.addEventListener('click', () => {
    alert(`${button.textContent} button clicked!`);
  });
});
// landing button js ends
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

const skillsContent = document.getElementsByClassName("skills__content"),
    skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;
    const offset = 100;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }

    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";

        const elementPosition = this.parentNode.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
});

const tabs = document.querySelectorAll("[data-target]"),
    tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");
        tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        });
    });
});

const swiperPortfolio = new Swiper('.portfolio__container', {
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerView: 1,
    spaceBetween: 3500,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
    on: {
        reachBeginning: function() {
            this.loopDestroy();
            this.loopCreate();
        },
        reachEnd: function() {
            this.loopDestroy();
            this.loopCreate();
        }
    }
});

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        }
        else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
    const nav = document.getElementById("header");
    if (this.scrollY >= 80) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    if (this.scrollY >= 80) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

function scrollUp1() {
    const scrollUp = document.getElementById("scroll-up1");
    if (this.scrollY >= 80) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp1);


const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

function elizaResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
        return "Hello! How can I assist you in exploring Son Nguyen Hoang's professional background and projects today?";
    }
    else if (lowerMessage.includes("how are you")) {
        return "I'm a digital assistant designed to provide insights into Son's skills and achievements. How can I assist you?";
    }
    else if (lowerMessage.includes("search")) {
        return "You can explore Son's projects and skills on this website, or ask me specific questions for more details.";
    }
    else if (lowerMessage.includes("son") || lowerMessage.includes("nguyen") || lowerMessage.includes("hoang") || lowerMessage.includes("son nguyen hoang") || lowerMessage.includes("son hoang") || lowerMessage.includes("nguyen hoang") || lowerMessage.includes("son nguyen")) {
        return "Son Nguyen Hoang is a full-stack developer with extensive experience in AI and web development. He's currently pursuing dual degrees in Computer Science and Economics from UNC Chapel Hill.";
    }
    else if (lowerMessage.includes("thank")) {
        return "You're welcome! If you have any more questions or need further information, feel free to ask.";
    }
    else if (lowerMessage.includes("who are you")) {
        return "I'm a digital assistant designed to guide you through Son Nguyen Hoang's professional portfolio.";
    }
    else if (lowerMessage.includes("skills") || lowerMessage.includes("experience")) {
        return "Son has extensive experience as a full-stack developer, skilled in AWS, Django, RESTful APIs, and more. He has worked on AI, web development and has leadership experience with the Google Student Developer Clubs.";
    }
    else if (lowerMessage.includes("projects")) {
        return "Son has contributed to projects like RecipeGenie, MovieVerse, and is developing CommunitySphere. He also enhanced facial and user habit recognition at VNG Corporation.";
    }
    else if (lowerMessage.includes("internship") || lowerMessage.includes("job")) {
        return "Son has experience as a software engineering intern at VNG Corporation and is always open to new opportunities to apply his skills and contribute to innovative projects.";
    }
    else if (lowerMessage.includes("education")) {
        return "Son is pursuing a Bachelor of Science in Computer Science and a Bachelor of Arts in Economics from The University of North Carolina at Chapel Hill.";
    }
    else if (lowerMessage.includes("vng corporation") || lowerMessage.includes("vng corp") || lowerMessage.includes("vng")) {
        return "At VNG Corporation, Son played a significant role in web development. He enhanced vCloudcam's security camera streaming using Web Assembly and WebRTC by optimizing the video streaming process, resulting in a 20% reduction in latency.";
    }
    else if (lowerMessage.includes("leadership")) {
        return "Son exhibited leadership as the Software Engineering Team Leader for the Google Student Developer Clubs. He organized weekly meetings, trained members, and reviewed codes.";
    }
    else if (lowerMessage.includes("microsoft student ambassador")) {
        return "Son is an active Microsoft Learn Student Ambassador where he has created a platform for knowledge exchange and collaboration among peers.";
    }
    else if (lowerMessage.includes("programming languages") || lowerMessage.includes("tech stack")) {
        return "Son is proficient in various programming languages and tools. He's particularly experienced with AWS, Django, RESTful APIs, and has a strong grasp of data structures and algorithms.";
    }
    else if (lowerMessage.includes("data tools") || lowerMessage.includes("databases")) {
        return "Son is skilled in data-related tools like MySQL, MongoDB, Apache Cassandra, GraphQL, Tableau, and PowerBI. He's adept at managing databases and understanding their intricacies.";
    }
    else if (lowerMessage.includes("version control") || lowerMessage.includes("git")) {
        return "Version control is essential for collaborative projects. Son is experienced with version-control systems like Git, ensuring efficient and organized code management.";
    }
    else if (lowerMessage.includes("university of north carolina") || lowerMessage.includes("unc")) {
        return "Son is currently pursuing dual degrees from The University of North Carolina at Chapel Hill: a Bachelor of Science in Computer Science and a Bachelor of Arts in Economics.";
    }
    else if (lowerMessage.includes("recipegenie")) {
        return "RecipeGenie is one of Son's web-based projects. It integrates a machine-learning model to recommend relevant recipes for users based on their inputs.";
    }
    else if (lowerMessage.includes("movieverse")) {
        return "MovieVerse is another web-based database created by Son. If you're a movie enthusiast, you might find it particularly interesting!";
    }
    else if (lowerMessage.includes("communitysphere")) {
        return "CommunitySphere is a project Son is currently developing. It's a social media website designed to help users connect and engage with one another.";
    }
    else if (lowerMessage.includes("economics")) {
        return "Apart from Computer Science, Son is also pursuing a Bachelor of Arts in Economics from UNC Chapel Hill, showcasing his versatility and breadth of knowledge.";
    }
    else if (lowerMessage.includes("zaloai") || lowerMessage.includes("zalo ai")) {
        return "ZaloAI is one of the projects that Son contributed to during his internship at VNG Corporation. It focuses on harnessing the power of AI for facial and user habit recognition.";
    }
    else if (lowerMessage.includes("trueid")) {
        return "TrueID is another significant project from VNG Corporation. Son played a crucial role in its development, particularly in enhancing user habit recognition using state-of-the-art technologies.";
    }
    else if (lowerMessage.includes("team leader") || lowerMessage.includes("google student developer")) {
        return "Son's leadership experience is evident from his role as the Software Engineering Team Leader for the Google Student Developer Clubs. He took initiatives in solving real-world problems and mentoring less experienced programmers.";
    }
    else if (lowerMessage.includes("north carolina") || lowerMessage.includes("chapel hill")) {
        return "The University of North Carolina at Chapel Hill has been instrumental in Son's academic journey. There, he has been mastering Computer Science and Economics.";
    }
    else if (lowerMessage.includes("angular") || lowerMessage.includes("react") || lowerMessage.includes("redux-saga")) {
        return "Son possesses hands-on experience with modern web development frameworks and libraries such as Angular, React, and Redux-Saga. He employed these technologies during his time at VNG Corporation.";
    }
    else if (lowerMessage.includes("full-stack developer")) {
        return "Son has amassed significant experience as a full-stack developer. He has a comprehensive understanding of both front-end and back-end development, ensuring cohesive and seamless web applications.";
    }
    else if (lowerMessage.includes("pytorch") || lowerMessage.includes("tensorflow") || lowerMessage.includes("transformers")) {
        return "In his projects, Son has utilized advanced AI and machine learning technologies like PyTorch, TensorFlow, and Transformers. These tools enabled him to enhance functionalities like facial and user habit recognition.";
    }
    else if (lowerMessage.includes("web development")) {
        return "Web development is one of Son's fortes. He has worked on various web-based projects using technologies like Angular, React, and Django.";
    }
    else if (lowerMessage.includes("micro-frontend architecture")) {
        return "Micro-Frontend architecture is a design approach Son is familiar with. It breaks up the front-end monolith into smaller, more manageable pieces, enhancing development efficiency.";
    }
    else if (lowerMessage.includes("microsoft learn")) {
        return "As a Microsoft Learn Student Ambassador, Son has fostered a community that encourages knowledge exchange and collaboration. He's passionate about sharing and expanding his technological understanding.";
    }
    else if (lowerMessage.includes("ambitions") || lowerMessage.includes("goals")) {
        return "Son is driven by a passion for creating innovative solutions and is always looking for opportunities to apply his skills to challenging projects. He's eager to contribute his creativity and hard work to teams that share his vision.";
    }
    else if (lowerMessage.includes("recommendation")) {
        return "If you're looking for insights into a specific technology or seeking recommendations on web development tools, Son has extensive knowledge to share!";
    }
    else if (lowerMessage.includes("contact") || lowerMessage.includes("connect")) {
        return "You can connect with Son through the contact form on this website or explore his LinkedIn profile linked here: linkedin.com/in/hoangsonw.";
    }
    else if (lowerMessage.includes("linkedin")) {
        return "You can connect with Son through the contact form on this website or explore his LinkedIn profile linked here: github.com/hoangsonww.";
    }
    else if (lowerMessage.includes("resume")) {
        return "You can find Son's resume on his LinkedIn profile linked here: linkedin.com/in/hoangsonw";
    }
    else if (lowerMessage.includes("github")) {
        return "You can find Son's GitHub profile linked here: github.com/hoangsonww";
    }
    else if (lowerMessage.includes("email")) {
        return "You can find Son's email address here: hoangson091104@gmail.com";
    }
    else if (lowerMessage.includes("phone")) {
        return "You can find Son's phone number here: +1 (413) 437-6759";
    }
    else if (lowerMessage.includes("eventhorizon") || lowerMessage.includes("event horizon") || lowerMessage.includes("event-horizon") || lowerMessage.includes("event horizon project") || lowerMessage.includes("event-horizon project")) {
        return "EventHorizon is a project Son is currently developing. It's a platform that enables users to create and manage events.";
    }
    else if (lowerMessage.includes("weathermate") || lowerMessage.includes("weather mate") || lowerMessage.includes("weather-mate") || lowerMessage.includes("weather mate project") || lowerMessage.includes("weather-mate project")) {
        return "WeatherMate is a project Son is currently developing. It's a web-based application that provides users with weather forecasts.";
    }
    else if (lowerMessage.includes("stickynotes") || lowerMessage.includes("sticky notes") || lowerMessage.includes("sticky-notes") || lowerMessage.includes("sticky notes project") || lowerMessage.includes("sticky-notes project")) {
        return "StickyNotes is a project Son is currently developing. It's a web-based application that allows users to create and manage notes.";
    }
    else if (lowerMessage.includes("todo") || lowerMessage.includes("todo app") || lowerMessage.includes("to-do") || lowerMessage.includes("to-do app") || lowerMessage.includes("to do") || lowerMessage.includes("to do app") || lowerMessage.includes("to-do app")) {
        return "ToDo is a project Son is currently developing. It's a web-based application that allows users to create and manage to-do lists.";
    }
    else if (lowerMessage.includes("gitpeek") || lowerMessage.includes("git peek") || lowerMessage.includes("git-peek") || lowerMessage.includes("git peek project") || lowerMessage.includes("git-peek project")) {
        return "GitPeek is a project Son is currently developing. It's a web-based application that allows users to search for GitHub repositories.";
    }
    else if (lowerMessage.includes("intern")) {
        return "Son has experience as a software engineering intern at VNG Corporation and is always open to new opportunities to apply his skills and contribute to innovative projects.";
    }
    else if (lowerMessage.includes("tell me about yourself") || lowerMessage.includes("tell me about son") || lowerMessage.includes("tell me about son nguyen hoang") || lowerMessage.includes("tell me about son hoang") || lowerMessage.includes("tell me about nguyen hoang") || lowerMessage.includes("tell me about son nguyen") || lowerMessage.includes("tell me about son nguyen hoang")) {
        return "Son Nguyen Hoang is a full-stack developer with extensive experience in AI and web development. He's currently pursuing dual degrees in Computer Science and Economics from UNC Chapel Hill.";
    }
    else if (lowerMessage.includes("tell me about your skills") || lowerMessage.includes("tell me about your experience") || lowerMessage.includes("tell me about your projects") || lowerMessage.includes("tell me about son's skills") || lowerMessage.includes("tell me about son's experience") || lowerMessage.includes("tell me about son's projects")) {
        return "Son has extensive experience as a full-stack developer, skilled in AWS, Django, RESTful APIs, and more. He has worked on AI, web development and has leadership experience with the Google Student Developer Clubs.";
    }
    else if (lowerMessage.includes("tell me about your education") || lowerMessage.includes("tell me about your university") || lowerMessage.includes("tell me about your school") || lowerMessage.includes("tell me about your college") || lowerMessage.includes("tell me about your major") || lowerMessage.includes("tell me about your degree") || lowerMessage.includes("tell me about son's education") || lowerMessage.includes("tell me about son's university") || lowerMessage.includes("tell me about son's school") || lowerMessage.includes("tell me about son's college") || lowerMessage.includes("tell me about son's major") || lowerMessage.includes("tell me about son's degree")) {
        return "Son is pursuing a Bachelor of Science in Computer Science and a Bachelor of Arts in Economics from The University of North Carolina at Chapel Hill.";
    }
    else if (lowerMessage.includes("tell me about your internship") || lowerMessage.includes("tell me about your job") || lowerMessage.includes("tell me about your work") || lowerMessage.includes("tell me about son's internship") || lowerMessage.includes("tell me about son's job") || lowerMessage.includes("tell me about son's work")) {
        return "Son has experience as a software engineering intern at VNG Corporation and is always open to new opportunities to apply his skills and contribute to innovative projects.";
    }
    else if (lowerMessage.includes("tell me about your leadership") || lowerMessage.includes("tell me about your team leader") || lowerMessage.includes("tell me about your google student developer") || lowerMessage.includes(("tell me about son's leadership")) || lowerMessage.includes("tell me about son's team leader") || lowerMessage.includes("tell me about son's google student developer")) {
        return "Son exhibited leadership as the Software Engineering Team Leader for the Google Student Developer Clubs. He organized weekly meetings, trained members, and reviewed codes.";
    }
    else if (lowerMessage.includes("tell me about your microsoft student ambassador") || lowerMessage.includes("tell me about your microsoft learn")) {
        return "Son is an active Microsoft Learn Student Ambassador where he has created a platform for knowledge exchange and collaboration among peers.";
    }
    else if (lowerMessage.includes("tell me about your ambitions") || lowerMessage.includes("tell me about your goals")) {
        return "Son is driven by a passion for creating innovative solutions and is always looking for opportunities to apply his skills to challenging projects. He's eager to contribute his creativity and hard work to teams that share his vision.";
    }
    else if (lowerMessage.includes("tell me")) {
        return "I'm here to provide information on Son's skills, experience, and projects. Could you please specify your query?";
    }
    else if (lowerMessage.includes("what do you know about son") || lowerMessage.includes("what do you know about son nguyen hoang") || lowerMessage.includes("what do you know about son hoang") || lowerMessage.includes("what do you know about nguyen hoang") || lowerMessage.includes("what do you know about son nguyen") || lowerMessage.includes("what do you know about son nguyen hoang")) {
        return "Son Nguyen Hoang is a full-stack developer with extensive experience in AI and web development. He's currently pursuing dual degrees in Computer Science and Economics from UNC Chapel Hill.";
    }
    else if (lowerMessage.includes("introduce yourself") || lowerMessage.includes("introduce son") || lowerMessage.includes("introduce son nguyen hoang") || lowerMessage.includes("introduce son hoang") || lowerMessage.includes("introduce nguyen hoang") || lowerMessage.includes("introduce son nguyen") || lowerMessage.includes("introduce son nguyen hoang")) {
        return "Son Nguyen Hoang is a full-stack developer with extensive experience in AI and web development. He's currently pursuing dual degrees in Computer Science and Economics from UNC Chapel Hill.";
    }
    else if (lowerMessage.includes("introduce your skills") || lowerMessage.includes("introduce your experience") || lowerMessage.includes("introduce your projects") || lowerMessage.includes("introduce son's skills") || lowerMessage.includes("introduce son's experience") || lowerMessage.includes("introduce son's projects")) {
        return "Son has extensive experience as a full-stack developer, skilled in AWS, Django, RESTful APIs, and more. He has worked on AI, web development and has leadership experience with the Google Student Developer Clubs.";
    }
    else if (lowerMessage.includes("introduce your education") || lowerMessage.includes("introduce your university") || lowerMessage.includes("introduce your school") || lowerMessage.includes("introduce your college") || lowerMessage.includes("introduce your major") || lowerMessage.includes("introduce your degree") || lowerMessage.includes("introduce son's education") || lowerMessage.includes("introduce son's university") || lowerMessage.includes("introduce son's school") || lowerMessage.includes("introduce son's college") || lowerMessage.includes("introduce son's major") || lowerMessage.includes("introduce son's degree")) {
        return "Son is pursuing a Bachelor of Science in Computer Science and a Bachelor of Arts in Economics from The University of North Carolina at Chapel Hill.";
    }
    else {
        return "I'm here to provide information on Son's skills, experience, and projects. Could you please specify your query?";
    }
}

const chatbotInput = document.getElementById("chatbotInput");
const chatbotBody = document.getElementById("chatbotBody");

chatbotInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(chatbotInput.value);
        chatbotInput.value = "";
    }
});

function sendMessage(message) {
    chatbotBody.innerHTML += `
        <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
    `;
    let botReply = elizaResponse(message);
    setTimeout(() => {
        chatbotBody.innerHTML += `
            <div style="text-align: left; margin-bottom: 10px; color: white;">${botReply}</div>
        `;
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 1000);
}

document.getElementById('minimizeButton').addEventListener('click', function() {
    const chatbotBody = document.getElementById('chatbotBody');
    const chatbotInput = document.getElementById('chatbotInput');

    if(chatbotBody.style.display !== 'none') {
        chatbotBody.style.display = 'none';
        chatbotInput.style.display = 'none';
    }
    else {
        chatbotBody.style.display = '';
        chatbotInput.style.display = '';
    }
});

const chatbotContainer = document.getElementById("chatbotContainer");

window.onload = function() {
    chatbotContainer.style.display = 'none';
    chatbotBody.style.display = 'none';
    chatbotInput.style.display = 'none';
};

const backToTopButton = document.getElementById("back-to-top");

backToTopButton.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.addEventListener("scroll", function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        chatbotContainer.style.display = "block";
        backToTopButton.style.bottom = "10px";
    }
    else {
        chatbotContainer.style.display = "none";
        backToTopButton.style.bottom = "-20%";
    }
});

window.addEventListener('resize', checkModalHeight);
document.addEventListener('DOMContentLoaded', checkModalHeight);

function checkModalHeight() {
    let modalContent = document.querySelector('.services__modal-content');
    if (!modalContent) return;

    let windowHeight = window.innerHeight;
    let modalContentHeight = modalContent.scrollHeight;

    if (modalContentHeight > windowHeight) {
        modalContent.style.overflowY = 'scroll';
    }
    else {
        modalContent.style.overflowY = 'hidden';
    }
}

document.addEventListener('scroll', function() {
    let scrollUpButton = document.getElementById('back-to-top');
    let footer = document.querySelector('footer');

    let footerPosition = footer.getBoundingClientRect().top + window.scrollY;
    let scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition >= footerPosition) {
        scrollUpButton.style.color = 'white';
    }
    else {
        scrollUpButton.style.color = '';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let chatbotContainer = document.getElementById('chatbotContainer');
    let minimizeButton = document.getElementById('minimizeButton');

    minimizeButton.addEventListener('click', function() {
        if (chatbotContainer.classList.contains('minimized')) {
            chatbotContainer.classList.remove('minimized');
            minimizeButton.innerHTML = '+';
        }
        else {
            chatbotContainer.classList.add('minimized');
            minimizeButton.innerHTML = '-';
        }
    });
});

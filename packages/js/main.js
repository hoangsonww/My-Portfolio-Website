import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

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

    for (let i = 0; i < skillsContent.length; i++) {
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
        let sectionId = current.getAttribute("id");

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

async function elizaResponse(message) {
    const conversationHistory = [];
    let fullResponse = "Loading...";

    try {
        const genAI = new GoogleGenerativeAI(getAIResponse());
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are an AI personal assistant for Son Nguyen. Use the following resume information to answer questions - people might ask questions about his experience, qualifications, or details: Son Nguyen is a results-driven software engineer seeking internships to enhance programming skills in creating innovative solutions. Experienced in contributing to large-scale projects, with a focus on efficiency and user experience. Eager to apply a strong foundation in data analytics and full-stack development in a challenging environment. Committed to continuous learning and adapting to new technologies. Contact information: +1 (413) 437-6759, hoangson091104@gmail.com, Portfolio Website: sonnguyenhoang.com, LinkedIn: linkedin.com/in/hoangsonw, GitHub: github.com/hoangsonww, Location: Chapel Hill, NC, USA 27514. Experience 1: VNG Corporation (Software Engineering Intern from June 2023 to August 2023) - Contributed to the design and development of vCloudcam’s security camera management website using Angular, React, and Beego, boosting site performance by 30%, and supporting user traffic of over 50,000 monthly visits. Enhanced the video fetching system using Web Assembly, improving live security camera stream efficiency by 20%. Experience 2: Huong Hua Co., Ltd. (Contract Full-Stack Software Engineer from December 2023 to February 2024) - Developed the company’s web application and job application database using PHP, React, Django, MongoDB, and MySQL. Experience 3: FPT Corporation (Software Engineering Intern - from June 2024 to August 2024) Contributed to the development of FPT ICDP, FPT Telecom’s internal communication platform, using Express, Node.js, MongoDB, RabbitMQ, Kafka, Redis, and React, enhancing collaboration and communication between FPT teams by 25%. Participated in AI initiatives, utilizing TensorFlow, PyTorch, and Optuna for a 15% improvement in ICDP’s AI model fine-tuning and optimization. Deployed using Docker & AWS Lambda, enhancing operational efficiency by 40%, handling over 50,000 users, and managing approximately 200 job applications per month. Education: University of North Carolina at Chapel Hill - Bachelor of Science in Computer Science & Bachelor of Artsin Economics & Data Science Minor (Cumulative GPA: 3.9 / 4.0) - Date Attended: August 2022 - December 2025. NOTABLE PROJECTS: MovieVerse (movie-verse.com): An extensive web-based movie database featuring detailed information on 900,000+ movies & TV shows and over 1 million actors & directors. Currently attracting over 320,000 monthly visitors, with more than 55,000 active users and 145,000 movie ratings to date. WeatherMate (hoangsonww.github.io/WeatherMate-App): A user-friendly weather tracking app that offers real-time weather and detailed forecast data for more than 200,000 locations worldwide. Currently attracting over 1,000 monthly visitors. AI Multitask Classifiers (hoangsonww.github.io/AI-ML-Classifiers/): Python-based AI classifiers for Object, Face, Mood, Vehicle, Flower, and Speech Recognition, utilizing OpenCV, Keras, Pandas, TensorFlow, YOLOv3, and PyTorch. Includes a self-trained custom sentiment analysis tool with an average accuracy of over 90%. SKILLS: Languages: Java, Python, JavaScript, Swift, C, Go, PHP. Databases: MySQL, MongoDB, Redis, PostgreSQL, Red5. Data Analytics: PowerBI, Tableau, Stata, R. Web Development: React, Vue, Angular, WASM, jQuery, Webpack, Django, Express, REST APIs. AI/ML: TensorFlow, PyTorch, Keras, NLP, Pandas, OCR,scikit-learn. Other: SEO, Docker, Git, RabbitMQ.",
        });

        conversationHistory.push({ role: "user", parts: [{ text: message }] });

        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain"
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
            ],
            history: conversationHistory
        });

        const result = await chatSession.sendMessage(message);
        fullResponse = result.response.text();
        conversationHistory.push({ role: "model", parts: [{ text: fullResponse }] });
    }
    catch (error) {
        console.error('Error fetching response:', error.message);
        fullResponse = "An error occurred while generating the response, possibly due to high traffic or safety concerns. Please understand that I am trained by MovieVerse to provide safe and helpful responses within my limitations. I apologize for any inconvenience caused. Please try again with a different query or contact MovieVerse support for further assistance.";
    }

    return removeMarkdown(fullResponse);
}

function getAIResponse() {
    const response = 'QUl6YVN5Q1RoUWVFdmNUb01ka0NqWlM3UTNxNzZBNUNlNjVyMW9r';
    return atob(response);
}

function removeMarkdown(text) {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}

const chatbotInput = document.getElementById("chatbotInput");
const chatbotBody = document.getElementById("chatbotBody");

chatbotInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(chatbotInput.value);
        chatbotInput.value = "";
    }
});

async function sendMessage(message) {
    chatbotBody.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
  `;

    const loadingElement = document.createElement("div");
    loadingElement.style.textAlign = "left";
    loadingElement.style.marginBottom = "10px";
    loadingElement.style.color = "white";
    chatbotBody.appendChild(loadingElement);

    let dotCount = 0;

    let loadingInterval = setInterval(() => {
        loadingElement.textContent = "Loading" + ".".repeat(dotCount);
        dotCount = (dotCount + 1) % 4;
    }, 500);

    let botReply = await elizaResponse(message);

    clearInterval(loadingInterval);
    loadingElement.textContent = botReply;
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
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

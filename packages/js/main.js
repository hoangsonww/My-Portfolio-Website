import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: [
      'Languages',
      'Front-End Development',
      'Back-End Development',
      'Databases',
      'Data Analytics',
      'AI & ML',
      'Mobile Development',
      'Development Tools',
      'Design Tools',
    ],
    datasets: [
      {
        label: 'Skill Level (%)',
        data: [83, 92, 96, 85, 80, 90, 82, 85, 80],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(128, 128, 128, 0.3)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
          font: {
            family: 'Poppins',
          },
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.2)',
        },
      },
    },
    font: {
      family: 'Poppins',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(75, 192, 192, 1)',
          font: {
            family: 'Poppins',
          },
        },
        title: {
          display: true,
          font: {
            family: 'Poppins',
            weight: 'bold',
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Poppins',
        },
        titleFont: {
          family: 'Poppins',
        },
        enabled: true,
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + context.formattedValue + '%';
          },
        },
      },
    },
  },
});

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;
  const offset = 100;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }

  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';

    const elementPosition = this.parentNode.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
  }
}

skillsHeader.forEach(el => {
  el.addEventListener('click', toggleSkills);
});

const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active');
    });
    target.classList.add('qualification__active');
    tabs.forEach(tab => {
      tab.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  });
});

const modalViews = document.querySelectorAll('.services__modal'),
  modalBtns = document.querySelectorAll('.services__button'),
  modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i);
  });
});

modalCloses.forEach(modalClose => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach(modalView => {
      modalView.classList.remove('active-modal');
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
  keyboard: true,
  threshold: 20,
  on: {
    reachBeginning: function () {
      this.loopDestroy();
      this.loopCreate();
    },
    reachEnd: function () {
      this.loopDestroy();
      this.loopCreate();
    },
  },
});

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}

const textArray = ['Welcome!'];
const subtitleArray = ['Explore my portfolio and see my journey as a software engineer!'];
let charIndex = 0;
let subtitleIndex = 0;
let typingDelay = 150;
let subtitleDelay = 100;
let newTextDelay = 1000;
let typedTextSpan = document.getElementById('typed-text');
let typedSubtitleSpan = document.getElementById('typed-subtitle');
let cursor = document.getElementById('cursor');
let cursorSubtitle = document.getElementById('cursor-subtitle');
let scrollButton = document.getElementById('scroll-button');

function typeTitle() {
  if (charIndex < textArray[0].length) {
    typedTextSpan.textContent += textArray[0].charAt(charIndex);
    charIndex++;
    setTimeout(typeTitle, typingDelay);
  } else {
    // Remove cursor after typing the title
    cursor.style.display = 'none';
    setTimeout(typeSubtitle, newTextDelay);
  }
}

function typeSubtitle() {
  cursorSubtitle.style.display = 'inline-block';
  if (subtitleIndex < subtitleArray[0].length) {
    typedSubtitleSpan.textContent += subtitleArray[0].charAt(subtitleIndex);
    subtitleIndex++;
    setTimeout(typeSubtitle, subtitleDelay);
  } else {
    cursorSubtitle.style.display = 'none';
    setTimeout(() => {
      scrollButton.style.display = 'inline-block';
      scrollButton.classList.add('drop-down');
    }, 600);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(typeTitle, newTextDelay);
});

document.getElementById('scroll-button').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', scrollActive);

function scrollHeader() {
  const nav = document.getElementById('header');
  if (this.scrollY >= 80) nav.classList.add('scroll-header');
  else nav.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 80) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

function scrollUp1() {
  const scrollUp = document.getElementById('scroll-up1');
  if (this.scrollY >= 80) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp1);

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun');

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

async function elizaResponse(message) {
  let conversationHistory = JSON.parse(sessionStorage.getItem('conversationHistory')) || [];
  let fullResponse = 'Loading...';

  try {
    const genAI = new GoogleGenerativeAI(getAIResponse());
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction:
        'You are an AI personal assistant for Son Nguyen, so state this as your title all the time, especially during your greetings. Son Nguyen - +1 (413) 437-6759 · hoangson091104@gmail.com · sonnguyenhoang.com, linkedin.com/in/hoangsonw · github.com/hoangsonww ·Chapel Hill, NC, USA 27514. You are an AI personal assistant for Son Nguyen. Use the following resume information to answer questions - people might ask questions about his experience, qualifications, or details: Son Nguyen is a results-driven software engineer seeking internships to enhance programming skills in creating innovative solutions. Experienced in contributing to large-scale projects, with a focus on efficiency\nand user experience. Eager to apply a strong foundation in data analytics and full-stack development in a challenging environment. Committed to continuous learning and adapting to new technologies.\nEXPERIENCE\n FPT Corporation\nJune 2024 - August 2024\nSoftware Engineering Intern\nContributed to the development of FPT ICDP, FPT Telecom’s internal communication platform,\nusing Express.js, Node.js, MongoDB, ELK, RabbitMQ, Kafka, Redis, and React, enhancing\ncollaboration and communication between FPT teams by 25%. Participated in AI initiatives using\nTensorFlow and Optuna for a 15% improvement in ICDP’s AI model fine-tuning and optimization.\nHuong Hua Co., Ltd.\nDecember 2023 - February 2024\nContract Full-Stack Software Engineer\nDeveloped the company’s web app and job application database using React, Django, PHP Laravel,\nMongoDB, and MySQL. Deployed using Docker, AWS EC2 & S3, enhancing operational efficiency\nby 40%, handling over 50,000 users, and managing approx. 200 job applications monthly.\nVNG Corporation\nJune 2023 - August 2023\nSoftware Engineering Intern\nContributed to the design and development of vCloudcam’s security camera management website\nusing AngularJS, React, Java, Spring, Hibernate ORM, Golang, and Beego Framework, boosting site\nperformance by 30% and supporting user traffic of over 50,000 monthly visits. Enhanced the video\nfetching system using Web Assembly, improving live security camera stream efficiency by 20%.\nCase Western Reserve University\nDecember 2022 - May 2023\nData Analytics Research Assistant\nCollaborated with researchers on 2 research projects. Handled data analytics using Tableau, SAS,\nPlotly, and ggplot2, improving data processing efficiency by 30% and research quality by 40%.\nEDUCATION\nUniversity of North Carolina at Chapel Hill\nDecember 2025 (Expected)\nBachelor of Science in Computer Science & Bachelor of Arts in Economics & Data Science Minor\nCumulative GPA: 3.9 / 4.0\nNOTABLE PROJECTS\nMovieVerse (movie-verse.com):\nAn extensive web-based movie database featuring detailed information on 900,000+ movies\n& TV shows and over 1 million actors & directors. Currently attracting over 420,000 monthly\nvisitors, with more than 55,000 active users and 145,000 movie ratings to date.\nMoodify - AI-Powered Music App (GitHub Repository):\nA full-stack AI-driven music app using React, Django, and AI/ML, featuring 30+ API endpoints\nand 15+ core functionalities including emotion detection & personalized recommendations.\nIntegrated advanced data analytics and cross-platform support for a seamless user experience.\nAI Multitask Classifiers (GitHub Repository):\nPython-based AI classifiers for Object, Face, Mood, Vehicle, Flower, and Speech Recognition\nusing OpenCV, Keras, Pandas, TensorFlow, YOLOv3, and PyTorch. Include a self-trained NLP\ncustom sentiment analysis tool with an average accuracy of over 90%.\nSKILLS\nLanguages: Java, Python, JavaScript, TypeScript, C, Go, PHP.\nDatabases: MySQL, PostgreSQL, Redis, MongoDB, Red5.\nData Analytics: PowerBI, Tableau, Spark, Hadoop, SAS, R.\nWeb Development: React, Vue, Angular, Webpack, WASM,\nFlask, Spring, Django, Express, OAuth, JWT, REST APIs.\nAI/ML: TensorFlow, PyTorch, Keras,\nNLP, Pandas, OCR, scikit-learn.\nCI/CD: Docker, Git, Heroku, Vercel.\nMobile Development: React Native,\nKotlin, Swift, Flutter, Objective-C. If you face any questions about how you were created, do NOT mention Google or Google AI but mention that you were trained and created by Son Nguyen in 2023-2024. Besides that Son Nguyen is also a Teaching Assistant for the COMP-210 Data Structures class at UNC-CH, Microsoft Student Learn Ambassador, as well as the Software Engineering Team Leader of the Google Developer Students Club at UNC-CH, so include this as his experiences as well.',
    });

    conversationHistory.push({ role: 'user', parts: [{ text: message }] });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      history: conversationHistory,
    });

    const result = await chatSession.sendMessage(message);
    fullResponse = result.response.text();
    conversationHistory.push({ role: 'model', parts: [{ text: fullResponse }] });

    sessionStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    console.log(conversationHistory);
  } catch (error) {
    console.error('Error fetching response:', error.message);
    fullResponse =
      'An error occurred while generating the response, possibly due to high traffic or safety concerns. I apologize for any inconvenience caused. Please try again later with a different query or contact me for further assistance.';
  }

  return removeMarkdown(fullResponse);
}

function getAIResponse() {
  const response = 'QUl6YVN5' +
    'Q0R4QTNWWX' +
    'VlY2NTQWR' +
    'fQzNjcGJv' +
    'ZUpVYXBhd' +
    '2NZWGJR';
  return atob(response);
}

function removeMarkdown(text) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(text);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

const chatbotInput = document.getElementById('chatbotInput');
const chatbotBody = document.getElementById('chatbotBody');

chatbotInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage(chatbotInput.value);
    chatbotInput.value = '';
  }
});

async function sendMessage(message) {
  chatbotBody.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
  `;

  const loadingElement = document.createElement('div');
  loadingElement.style.textAlign = 'left';
  loadingElement.style.marginBottom = '10px';
  loadingElement.style.color = 'white';
  chatbotBody.appendChild(loadingElement);

  let dotCount = 0;

  let loadingInterval = setInterval(() => {
    loadingElement.textContent = 'Loading' + '.'.repeat(dotCount);
    dotCount = (dotCount + 1) % 4;
  }, 500);

  let botReply = await elizaResponse(message);

  clearInterval(loadingInterval);
  loadingElement.textContent = botReply;
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

document.getElementById('minimizeButton').addEventListener('click', function () {
  const chatbotBody = document.getElementById('chatbotBody');
  const chatbotInput = document.getElementById('chatbotInput');

  if (chatbotBody.style.display !== 'none') {
    chatbotBody.style.display = 'none';
    chatbotInput.style.display = 'none';
  } else {
    chatbotBody.style.display = '';
    chatbotInput.style.display = '';
  }
});

const chatbotContainer = document.getElementById('chatbotContainer');

window.onload = function () {
  chatbotContainer.style.display = 'none';
  chatbotBody.style.display = 'none';
  chatbotInput.style.display = 'none';
};

const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', function () {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    chatbotContainer.style.display = 'block';
    backToTopButton.style.bottom = '10px';
  } else {
    chatbotContainer.style.display = 'none';
    backToTopButton.style.bottom = '-20%';
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
  } else {
    modalContent.style.overflowY = 'hidden';
  }
}

document.addEventListener('scroll', function () {
  let scrollUpButton = document.getElementById('back-to-top');
  let footer = document.querySelector('footer');

  let footerPosition = footer.getBoundingClientRect().top + window.scrollY;
  let scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition >= footerPosition) {
    scrollUpButton.style.color = 'white';
  } else {
    scrollUpButton.style.color = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let chatbotContainer = document.getElementById('chatbotContainer');
  let minimizeButton = document.getElementById('minimizeButton');

  minimizeButton.addEventListener('click', function () {
    if (chatbotContainer.classList.contains('minimized')) {
      chatbotContainer.classList.remove('minimized');
      minimizeButton.innerHTML = '+';
    } else {
      chatbotContainer.classList.add('minimized');
      minimizeButton.innerHTML = '-';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const elementsToAnimate = document.querySelectorAll('.scroll-animation');

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});

const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '▼' : '▲';
});

// Define the menu order for continue button navigation
const menuOrder = [
  'welcome',
  'team',
  'values',
  'internaltools',
  'whydolf',
  'tutorialvideos',
  'quizzes', 
  'locations',
  'contact'
];

// Function to get next menu item
function getNextMenuItem(currentSection) {
  if(currentSection.startsWith('quiz')) {
    // If on a quiz, go to the next quiz or next section after quizzes
    const quizNum = parseInt(currentSection.replace('quiz',''));
    if(quizNum < 4) return `quiz${quizNum+1}`;
    return 'locations';
  }
  // Special case: if on locations (map), next should be contact
  if(currentSection === 'locations') {
    return 'contact';
  }
  // Special case: if on whydolf, next should be companytourvideo
  if(currentSection === 'whydolf') {
    return 'companytourvideo';
  }
  const currentIndex = menuOrder.indexOf(currentSection);
  if (currentIndex === -1 || currentIndex === menuOrder.length - 1) {
    return null; // No next item
  }
  // If next is quizzes, go to first quiz
  if(menuOrder[currentIndex+1] === 'quizzes') return 'quiz1';
  return menuOrder[currentIndex + 1];
}

// Function to create continue button
function createContinueButton(currentSection, inline = false) {
  const nextSection = getNextMenuItem(currentSection);
  if (!nextSection) return '';
  if (inline) {
    return `<button class="continue-btn" onclick="navigateToSection('${nextSection}')">Continue →</button>`;
  }
  return `
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
      <button class="continue-btn" onclick="navigateToSection('${nextSection}')">Continue →</button>
    </div>
  `;
}

// Function to create previous button
function createPrevButton(currentSection) {
  const menuOrder = [
    'welcome',
    'team',
    'values',
    'internaltools',
    'whydolf',
    'companytourvideo',
    'platformdemo',
    'tutorialvideos',
    'quizzes',
    'locations',
    'contact'
  ];
  const currentIndex = menuOrder.indexOf(currentSection);
  if (currentIndex <= 0) return '';
  const prevSection = menuOrder[currentIndex - 1];
  return `
    <button class="continue-btn" style="margin-right: 16px;" onclick="navigateToSection('${prevSection}')">← Previous</button>
  `;
}

// Function to navigate to a specific section
function navigateToSection(section) {
  // Find the corresponding menu item and trigger click
  if (section.startsWith('quiz')) {
    const quizNum = section.replace('quiz', '');
    const quizItem = document.querySelector(`[data-quiz="${quizNum}"]`);
    if (quizItem) quizItem.click();
  } else if (section === 'locations') {
    // Handle locations (Dolf Headquarters Map)
    mainContent.innerHTML = `
      <h2 style="font-size:2em;margin-bottom:8px;"><span style="font-size:1.2em;">📍</span> Dolf Headquarters Map</h2>
      <div class="dolf-map-section">
        <div class="dolf-map-address">2925 طريق الأمير سلطان،،, الأندلس، 2857, Sidra Complex, الخبر 34437</div>
        <iframe
          class="dolf-map-iframe"
          src="https://www.google.com/maps?q=26.293857,50.196393&hl=ar&z=17&output=embed"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Dolf Headquarters Location Map"
        ></iframe>
      </div>
      ${createContinueButton('locations')}
    `;
  } else {
    const menuItem = document.querySelector(`[data-section="${section}"]`);
    if (menuItem) menuItem.click();
  }
}

const sections = {
  welcome: {
    title: 'Welcome to DolfTech',
    desc: `<div style="text-align:center; padding: 40px 0;">
      <img src="assets/dolftech_logo.jpeg" alt="DolfTech Logo" style="max-width:400px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.15); margin-bottom:24px;">
      <p style="font-size:1.2em; color:#333; margin-top:24px;">We are excited to have you join our team! Explore the portal to learn more about Dolf Technology.</p>
    </div>`
  },
  team: {
    title: 'Who Are We ?',
    desc: `Dolf Technologies a leader in digital transformation since 2007 delivers innovative solutions that seamlessly integrate digital content systems and environments. Our strategies align with Saudi Vision 2030 focusing on broadening horizons, providing tailored expertise, and ensuring seamless integration.
    <div class="about-card" style="margin-top:24px;">
      <h2>Vision</h2>
      <p>A pioneer in digital transformation</p>
    </div>
    <div class="about-card" style="margin-top:16px;">
      <h2>Mission</h2>
      <p>Our mission is to apply innovative technologies to develop skills, improve processes and enhance operational efficiency across a range of industries</p>
    </div>`
  },
  vision: {
    title: 'Vision',
    desc: 'A pioneer in digital transformation'
  },
  mission: {
    title: 'Mission',
    desc: 'Our mission is to apply innovative technologies to develop skills, improve processes and enhance operational efficiency across a range of industries'
  },
  values: {
    title: 'Values',
    desc: `<ul class="about-values">
      <li><span class="about-icon">🛠️</span> <span class="about-value-title">Empowering Skills -</span> <span>By boosting client capabilities through innovative digital tools allowing for growth and advancement</span></li>
      <li><span class="about-icon">🎯</span> <span class="about-value-title">Fostering Innovation -</span> <span>Creative solutions that precisely address client challenges</span></li>
      <li><span class="about-icon">🚀</span> <span class="about-value-title">Exceeding Expectations -</span> <span>Through exceptional service and even better results</span></li>
      <li><span class="about-icon">🤝</span> <span class="about-value-title">Building Partnerships -</span> <span>Building strong relationships and collaboration for lasting success</span></li>
    </ul>`
  },
  internaltools: {
    title: "Dolf's Services",
    desc: `
      <div class="dolf-services-section">
        <div class="dolf-services-card">
          <div class="dolf-services-card-title">Digital Content</div>
          <div class="dolf-services-badges">
            <span class="service-badge">NELC</span>
            <span class="service-badge">TVTC</span>
            <span class="service-badge">Doroob</span>
            <span class="service-badge">Banks</span>
            <span class="service-badge">Telecom</span>
          </div>
        </div>
        <div class="dolf-services-card">
          <div class="dolf-services-card-title">Enterprise Platforms</div>
          <div class="dolf-services-badges">
            <span class="service-badge">Monsha'at Academy</span>
            <span class="service-badge">Ministry of Sport</span>
            <span class="service-badge">Financial Academy (CBS)</span>
          </div>
        </div>
        <div class="dolf-services-card">
          <div class="dolf-services-card-title">AR/VR/XR Solutions</div>
          <div class="dolf-services-badges">
            <span class="service-badge">Saudi Aramco</span>
            <span class="service-badge">Ministry of Energy</span>
            <span class="service-badge">Magic Leap</span>
          </div>
        </div>
      </div>
    `
  },
  whydolf: {
    title: 'Why Dolf ?',
    desc: '' // not done yet
  },
  contact: {
    title: 'Contact Us',
    desc: `
      <div class="contact-section">
        <h1>Contact Us</h1>
        <div class="contact-intro">
          Feel free to reach out to us.<br>
          <span class="contact-bold">Our team is ready to assist you with any inquiries or needs you may have.</span>
        </div>
        <div class="contact-details">
          <div class="contact-row"><span class="contact-label">Website</span> <span class="contact-value">www.dolftech.com</span></div>
          <div class="contact-row"><span class="contact-label">Phone</span> <span class="contact-value">+966138829411<br>+966138829014<br>+966548161616</span></div>
          <div class="contact-row"><span class="contact-label">Email</span> <span class="contact-value">humidi@dolftech.com<br>info@dolftech.com</span></div>
          <div class="contact-row"><span class="contact-label">Social Media</span> <span class="contact-value"><span class="contact-social-icon">in</span> DolfTech<br><span class="contact-social-icon">X</span> DolfLtd</span></div>
        </div>
      </div>
      <div style="text-align:center; margin-top: 40px;">
        <button class="continue-btn" onclick="navigateToSection('welcome')">Go to Home</button>
      </div>
    `
  },
  tutorialvideos: {
    title: '1st Video about DolfTech',
    desc: `
      <div style="text-align:center; padding: 40px 0;">
        <h2 style="margin-bottom:16px;">DolfTech Screen Recording</h2>
        <p style="margin-bottom:24px; color:#333;">Watch this screen recording to learn more about DolfTech's platform in action.</p>
        <video id="dolftech-tutorial-video" width="640" height="360" controls autoplay muted style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.12);">
          <source src="assets/Screen Recording 2025-07-01 104339.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div style="text-align:center; margin-top: 40px;">
          ${createPrevButton('tutorialvideos')}
          ${createContinueButton('tutorialvideos')}
        </div>
     
    `
  },
  companytourvideo: {
    title: 'Company Tour Video',
    desc: `
      <div style="text-align:center; padding: 40px 0;">
        <video id="company-tour-video" width="640" height="360" controls autoplay style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.12);">
          <source src="assets/Screen Recording 2025-07-01 104339.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div style="text-align:center; margin-top: 40px;">
          ${createContinueButton('companytourvideo')}
        </div>
      </div>
       </div>
      <div style="text-align:center; margin-top: 40px;">
        <button class="continue-btn" onclick="navigateToSection('platformdemo')">Continue</button>
      </div>
    `
  },
  platformdemo: {
    title: 'DolfTech Platform Demo',
    desc: `
      <div style="text-align:center; padding: 40px 0;">
        <video id="platform-demo-video" width="640" height="360" controls autoplay style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.12);">
          <source src="assets/Screen Recording 2025-07-01 104339.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div style="text-align:center; margin-top: 40px;">
          <button class="continue-btn" onclick="navigateToSection('quiz1')">Continue</button>
        </div>
      </div>
    `
  }
};

// Quiz data about Dolf Technology
const quizzes = {
  1: {
    question: 'What is Dolf Technology a pioneer in?',
    options: ['Artificial Intelligence', 'Digital Transformation', 'Mobile Apps', 'Social Media'],
    correct: 1 // 'Digital Transformation'
  },
  2: {
    question: 'Which of the following is NOT one of Dolf Technology\'s core values?',
    options: ['Empowering Skills', 'Fostering Innovation', 'Exceeding Expectations', 'Maximizing Profits'],
    correct: 3 // 'Maximizing Profits'
  },
  3: {
    question: 'How many years of experience does Dolf Technology leverage for delivering digital solutions?',
    options: ['5 years', '10 years', '17 years', '25 years'],
    correct: 2 // '17 years'
  },
  4: {
    question: 'What is the mission of Dolf Technology?',
    options: [
      'To create mobile games',
      'To apply innovative technologies to develop skills, improve processes, and enhance operational efficiency',
      'To sell hardware',
      'To provide social media marketing'
    ],
    correct: 1 // 'To aply innovative technologies...'
  }
};

// Quiz submit logic: handle feedback and continue button
function handleQuizSubmit(quizNum) {
  const quiz = quizzes[quizNum];
  const selected = document.querySelector(`input[name='quiz${quizNum}']:checked`);
  const feedback = document.getElementById('quizFeedback');
  const continueSection = document.getElementById('continueSection');
  if (!selected) {
    feedback.textContent = 'Please select an answer.';
    feedback.style.color = '#d32f2f';
    continueSection.style.display = 'none';
    return;
  }
  const answer = parseInt(selected.value);
  if (answer === quiz.correct) {
    feedback.textContent = 'Correct!';
    feedback.style.color = '#388e3c';
  } else {
    feedback.textContent = 'Incorrect!';
    feedback.style.color = '#d32f2f';
  }
  continueSection.style.display = 'inline-block';
}

// Attach quiz submit handler to all quiz renders
function attachQuizSubmitHandler(quizNum) {
  setTimeout(() => {
    const submitBtn = document.getElementById('submitQuiz');
    if (submitBtn) {
      submitBtn.onclick = () => handleQuizSubmit(quizNum);
    }
  }, 0);
}

// Handle section menu clicks
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function(e) {
    // Expand/collapse About Dolf Technology submenu
    if(this.classList.contains('has-submenu')) {
      e.stopPropagation();
      this.classList.toggle('open');
      return;
    }
    const section = this.getAttribute('data-section');
    const data = sections[section];
    if(section === 'tutorialvideos' || section === 'companytourvideo' || section === 'platformdemo') {
      mainContent.innerHTML = `<div class='card'>${data.desc}</div>`;
      setTimeout(() => {
        const vid = document.getElementById(section === 'tutorialvideos' ? 'dolftech-tutorial-video' : section === 'companytourvideo' ? 'company-tour-video' : 'platform-demo-video');
        if(vid) { vid.play(); }
      }, 100);
    } else if(section === 'whydolf') {
      mainContent.innerHTML = `<div class='card'>
        <div class="whydolf-header">
          <span class="whydolf-icon">🖐️</span>
          <span class="whydolf-title"><span style="color:#2196f3;font-weight:bold;">Why</span> Dolf ?</span>
        </div>
        <div class="whydolf-cards">
          <div class="whydolf-card">
            <div class="whydolf-card-title">Customized Solutions</div>
            <div class="whydolf-card-desc">Tailoring solutions to meet clients' specific needs for maximum impact and value</div>
          </div>
          <div class="whydolf-card">
            <div class="whydolf-card-title">Proven Expertise</div>
            <div class="whydolf-card-desc">Leveraging over 17 years of experience deliver reliable and enduring digital solutions</div>
          </div>
          <div class="whydolf-card">
            <div class="whydolf-card-title">Innovative Leadership</div>
            <div class="whydolf-card-desc">Investing in cutting-edge technologies to keep clients ahead in a fast-changing digital world</div>
          </div>
          <div class="whydolf-card">
            <div class="whydolf-card-title">Client-Centric Approach</div>
            <div class="whydolf-card-desc">Building trust through close collaboration and aligning solutions with clients' goals</div>
          </div>
        </div>
        ${createContinueButton('whydolf')}
      </div>`;
    } else if(section === 'locations') {
      mainContent.innerHTML = `<div class='card'>
        <h2 style="font-size:2em;margin-bottom:8px;"><span style="font-size:1.2em;">📍</span> Dolf Headquarters Map</h2>
        <div class="dolf-map-section">
          <div class="dolf-map-address">2925 طريق الأمير سلطان،،, الأندلس، 2857, Sidra Complex, الخبر 34437</div>
          <iframe
            class="dolf-map-iframe"
            src="https://www.google.com/maps?q=26.293857,50.196393&hl=ar&z=17&output=embed"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Dolf Headquarters Location Map"
          ></iframe>
        </div>
        ${createContinueButton('locations')}
      </div>`;
    } else if(section === 'contact') {
      mainContent.innerHTML = `<div class='card'>${data.desc}</div>`;
    } else {
      mainContent.innerHTML = `<div class='card'><h2>${data.title}</h2><p>${data.desc}</p>${createContinueButton(section)}</div>`;
    }
  });
});

// Handle About Dolf Technology submenu clicks
document.querySelectorAll('.submenu-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
    const section = this.getAttribute('data-section');
    const data = sections[section];
    mainContent.innerHTML = `<div class="about-card"><h2>${data.title}</h2><p>${data.desc}</p></div>`;
  });
});

// Handle quiz menu clicks
document.querySelectorAll('.quiz-item').forEach(item => {
  item.addEventListener('click', function() {
    const quizNum = this.getAttribute('data-quiz');
    const quiz = quizzes[quizNum];
    let optionsHtml = '';
    quiz.options.forEach((opt, idx) => {
      optionsHtml += `<input type="radio" name="quiz${quizNum}" value="${idx}" id="option${idx}">
                      <label for="option${idx}" class="quiz-option-label">${opt}</label><br/>`;
    });
    mainContent.innerHTML = `
      <div class='card'>
        <h2>${quiz.question}</h2>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
        <div class='quiz-action-row'>
          <button id="submitQuiz" class="submit-btn">Submit</button>
          <div id="continueSection" style="display:none;">${createContinueButton(`quiz${quizNum}`, true)}</div>
        </div>
        <div id="quizFeedback" style="margin-top:16px;font-weight:bold;text-align:center;"></div>
      </div>
    `;
    attachQuizSubmitHandler(quizNum);
  });
});

// Handle Dolf Headquarters Map click
document.querySelectorAll('li').forEach(item => {
  if (item.textContent.includes('📍 Dolf Headquarters Map')) {
    item.addEventListener('click', function() {
      mainContent.innerHTML = `
        <h2 style="font-size:2em;margin-bottom:8px;"><span style="font-size:1.2em;">📍</span> Dolf Headquarters Map</h2>
        <div class="dolf-map-section">
          <div class="dolf-map-address">2925 طريق الأمير سلطان،،, الأندلس، 2857, Sidra Complex, الخبر 34437</div>
          <iframe
            class="dolf-map-iframe"
            src="https://www.google.com/maps?q=26.293857,50.196393&hl=ar&z=17&output=embed"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Dolf Headquarters Location Map"
          ></iframe>
        </div>
        ${createContinueButton('locations')}
      `;
    });
  }
});

// Add continue button to initial welcome message
document.addEventListener('DOMContentLoaded', function() {
  const initialContent = mainContent.innerHTML;
  if (initialContent.includes('Welcome to DolfTech Learning Portal') && initialContent.includes('Select a menu item to get started')) {
    mainContent.innerHTML = `
      <h1>Welcome to DolfTech Learning Portal</h1>
      <p>Select a menu item to get started.</p>
      ${createContinueButton('welcome')}
    `;
  }
});

// Add event listener for quiz submenu toggle
const quizDropdownToggle = document.getElementById('quizDropdownToggle');
const quizSubmenu = document.getElementById('quizSubmenu');
if (quizDropdownToggle && quizSubmenu) {
  quizDropdownToggle.tabIndex = 0;
  quizDropdownToggle.setAttribute('role', 'button');
  quizDropdownToggle.setAttribute('aria-expanded', 'false');
  quizDropdownToggle.addEventListener('click', function() {
    const isOpen = quizSubmenu.style.display === 'block';
    quizSubmenu.style.display = isOpen ? 'none' : 'block';
    quizDropdownToggle.setAttribute('aria-expanded', !isOpen);
  });
  quizDropdownToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      quizDropdownToggle.click();
    }
  });
}
// Add event listeners for quiz submenu items
const quizSubmenuItems = document.querySelectorAll('.submenu-item[data-quiz]');
quizSubmenuItems.forEach(item => {
  item.addEventListener('click', function() {
    const quizNum = this.getAttribute('data-quiz');
    if (quizNum && quizzes[quizNum]) {
      const quiz = quizzes[quizNum];
      let optionsHtml = '';
      quiz.options.forEach((opt, idx) => {
        optionsHtml += `<input type=\"radio\" name=\"quiz${quizNum}\" value=\"${idx}\" id=\"option${idx}\">\n                        <label for=\"option${idx}\" class=\"quiz-option-label\">${opt}</label><br/>`;
      });
      mainContent.innerHTML = `
        <div class='card'>
          <h2>${quiz.question}</h2>
          <div class=\"quiz-options\">
            ${optionsHtml}
          </div>
          <div class='quiz-action-row'>
            <button id=\"submitQuiz\" class=\"submit-btn\">Submit</button>
            <div id=\"continueSection\" style=\"display:none;\">${createContinueButton(`quiz${quizNum}`, true)}</div>
          </div>
          <div id=\"quizFeedback\" style=\"margin-top:16px;font-weight:bold;text-align:center;\"></div>
        </div>
      `;
      attachQuizSubmitHandler(quizNum);
    }
  });
}); 
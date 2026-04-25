const themeBtn = document.getElementById("themeBtn");
const greetingEl = document.getElementById("greeting");
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const projectSearch = document.getElementById("projectSearch");
const projectCount = document.getElementById("projectCount");
const backToTop = document.getElementById("backToTop");

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const projectCardsContainer = document.getElementById("projectCards");
const emptyState = document.getElementById("emptyState");
const projectFeedback = document.getElementById("projectFeedback");
const projectLinks = document.querySelectorAll(".project-link");
const sortProjects = document.getElementById("sortProjects");

const musicBtn = document.getElementById("musicBtn");
const musicSearch = document.getElementById("musicSearch");
const musicStatus = document.getElementById("musicStatus");
const musicResults = document.getElementById("musicResults");

const visitorNameInput = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const visitorMessage = document.getElementById("visitorMessage");
const timeOnSite = document.getElementById("timeOnSite");

// Footer year
yearEl.textContent = new Date().getFullYear();

// Greeting by time of day
const hour = new Date().getHours();
let greeting = "Hello!";

if (hour < 12) {
  greeting = "Good morning 👋";
} else if (hour < 18) {
  greeting = "Good afternoon 👋";
} else {
  greeting = "Good evening 👋";
}

greetingEl.textContent = greeting;

// Theme state
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDarkMode = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  themeBtn.textContent = isDarkMode ? "☀️" : "🌙";
});

// Mobile menu
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

projectSearch.addEventListener("input", updateProjects);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Project links
projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    projectFeedback.textContent =
      "This project demo is not available yet, but the project description is included above.";
  });
});

// Visitor name state
function loadVisitorName() {
  const savedName = localStorage.getItem("visitorName");

  visitorMessage.classList.remove("success", "error");

  if (savedName) {
    visitorMessage.textContent = `Welcome back, ${savedName}!`;
    visitorNameInput.value = savedName;
    visitorMessage.classList.add("success");
  } else {
    visitorMessage.textContent = "Save your name to personalize your visit.";
  }
}

saveNameBtn.addEventListener("click", () => {
  const name = visitorNameInput.value.trim();

  visitorMessage.classList.remove("success", "error");

  if (name.length < 2) {
    visitorMessage.textContent = "Please enter a name with at least 2 characters.";
    visitorMessage.classList.add("error");
    return;
  }

  localStorage.setItem("visitorName", name);
  visitorMessage.textContent = `Nice to meet you, ${name}! Your name has been saved.`;
  visitorMessage.classList.add("success");
});

// Project filtering + sorting + saved state
let currentFilter = localStorage.getItem("projectFilter") || "all";
let currentSort = localStorage.getItem("projectSort") || "default";

function sortCards(cards, sortValue) {
  const sortedCards = [...cards];

  if (sortValue === "az") {
    sortedCards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
  } else if (sortValue === "za") {
    sortedCards.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
  } else if (sortValue === "newest") {
    sortedCards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
  } else if (sortValue === "oldest") {
    sortedCards.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
  }

  return sortedCards;
}

function updateProjects() {
  const searchTerm = projectSearch.value.trim().toLowerCase();

  let visibleCards = projectCards.filter((card) => {
    const categories = card.dataset.category;
    const title = card.dataset.title.toLowerCase();
    const description = card.textContent.toLowerCase();

    const matchesFilter = currentFilter === "all" || categories.includes(currentFilter);
    const matchesSearch =
      searchTerm === "" ||
      title.includes(searchTerm) ||
      description.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  visibleCards = sortCards(visibleCards, currentSort);

  projectCards.forEach((card) => card.classList.add("hidden"));

  visibleCards.forEach((card) => {
    card.classList.remove("hidden");
    projectCardsContainer.appendChild(card);
  });

  emptyState.hidden = visibleCards.length !== 0;

  projectCount.textContent = projectCards.length;

  let feedbackText = "";

  if (visibleCards.length === 0) {
    feedbackText = "No projects match your current filter or search.";
  } else if (currentFilter === "all") {
    feedbackText = `Showing ${visibleCards.length} project(s).`;
  } else {
    feedbackText = `Showing ${visibleCards.length} ${currentFilter.toUpperCase()} project(s).`;
  }

  if (currentSort !== "default" && visibleCards.length > 0) {
    feedbackText += ` Sorted by ${sortProjects.options[sortProjects.selectedIndex].text}.`;
  }

  localStorage.setItem("projectFilter", currentFilter);
  localStorage.setItem("projectSort", currentSort);

  projectFeedback.textContent = feedbackText;
}

filterButtons.forEach((button) => {
  if (button.dataset.filter === currentFilter) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }

  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    updateProjects();
  });
});

sortProjects.value = currentSort;

sortProjects.addEventListener("change", () => {
  currentSort = sortProjects.value;
  updateProjects();
});

// Contact form validation
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  formMsg.classList.remove("success", "error");

  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill in all fields before sending your message.";
    formMsg.classList.add("error");
    return;
  }

  if (name.length < 2) {
    formMsg.textContent = "Your name should be at least 2 characters long.";
    formMsg.classList.add("error");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formMsg.textContent = "Please enter a valid email address.";
    formMsg.classList.add("error");
    return;
  }

  if (message.length < 10) {
    formMsg.textContent = "Your message should be at least 10 characters long.";
    formMsg.classList.add("error");
    return;
  }

  if (message.length > 300) {
    formMsg.textContent = "Your message should not be more than 300 characters.";
    formMsg.classList.add("error");
    return;
  }

  formMsg.textContent = `Thank you, ${name}! Your message has been validated successfully.`;
  formMsg.classList.add("success");
  contactForm.reset();
});

// iTunes API
musicBtn.addEventListener("click", fetchMusic);

async function fetchMusic() {
  const query = musicSearch.value.trim();

  musicResults.innerHTML = "";
  musicStatus.classList.remove("error", "success");

  if (query === "") {
    musicStatus.textContent = "Please enter a song title or artist name.";
    musicStatus.classList.add("error");
    return;
  }

  musicStatus.textContent = "Loading music recommendations...";

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch music data.");
    }

    const data = await response.json();

    if (data.results.length === 0) {
      musicStatus.textContent = "No songs found. Try another search term.";
      return;
    }

    musicStatus.textContent = `Showing results for "${query}".`;

    data.results.forEach((song) => {
      const card = document.createElement("article");
      card.classList.add("music-card");

      card.innerHTML = `
        <h3>${song.trackName}</h3>
        <p><strong>Artist:</strong> ${song.artistName}</p>
        <p><strong>Album:</strong> ${song.collectionName}</p>
        ${
          song.previewUrl
            ? `<a href="${song.previewUrl}" target="_blank" rel="noopener noreferrer">Listen to Preview</a>`
            : `<p>No preview available.</p>`
        }
      `;

      musicResults.appendChild(card);
    });
  } catch (error) {
    musicStatus.textContent = "Sorry, music data could not be loaded. Please try again.";
    musicStatus.classList.add("error");
  }
}

// Timer
let secondsOnSite = 0;

function updateTimer() {
  secondsOnSite++;
  const minutes = Math.floor(secondsOnSite / 60);
  const seconds = secondsOnSite % 60;
  timeOnSite.textContent = `Time on site: ${minutes} minute(s) and ${seconds} second(s)`;
}

setInterval(updateTimer, 1000);
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Initialize page state
loadVisitorName();
updateProjects();
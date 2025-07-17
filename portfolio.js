// Nav logic
const buttons = document.querySelectorAll('.nav button');
const sections = document.querySelectorAll('.section');
const clickSound = document.getElementById('click-sound');
const pickSound = document.getElementById('pick-sound');

// Start music only after interaction
const loadingOverlay = document.getElementById("loading-overlay");



buttons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-section');
    showSection(target);
    playClick();
  });
  button.addEventListener('mouseover', () => {
    playPick();
  });
});

// Project detail logic
document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-project');
    showSection(target);
    playClick();
  });
});
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showSection('projects');
    playClick();
  });
});

function showSection(target) {
  sections.forEach(section => {
    section.classList.toggle('active', section.id === target);
    section.classList.toggle('hidden', section.id !== target);
  });
}

function playClick() { clickSound.currentTime = 0; clickSound.play(); }
function playPick() { pickSound.currentTime = 0; pickSound.play(); }



document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-overlay");

  // Wait 5 seconds, then fade out
  setTimeout(() => {
    loader.classList.add("fade-out");

    // After fade-out animation ends, hide the loader completely
    setTimeout(() => {
      loader.style.display = "none";

      // Show first section (optional)
      document.getElementById("about")?.classList.remove("hidden");
    }, 800); // fade-out time
  }, 1000); // wait 5 seconds before starting fade
});


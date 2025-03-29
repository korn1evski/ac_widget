// Create and inject the widget container
const container = document.createElement("div");
container.id = "accessibility-widget-root";
document.body.appendChild(container);

// Create the floating button
const button = document.createElement("button");
button.innerHTML = "♿";
button.style.cssText = `
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4169e1;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999999;
`;

// Add hover effect
button.addEventListener("mouseover", () => {
  button.style.transform = "scale(1.1)";
  button.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
});

button.addEventListener("mouseout", () => {
  button.style.transform = "scale(1)";
  button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
});

// Append button to document immediately
document.body.appendChild(button);

// Create the widget panel
const widget = document.createElement("div");
widget.style.cssText = `
  position: fixed;
  top: 50%;
  right: -520px;
  transform: translateY(-50%);
  height: 90vh;
  width: 500px;
  background: white;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease;
  z-index: 10001;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

// Add the widget content
widget.innerHTML = `
  <div style="background: #0D6EFD; color: white; padding: 20px;">
    <h2 style="margin: 0; font-size: 24px;">Accessibility Adjustments</h2>
    <div style="display: flex; gap: 8px; margin-top: 15px;">
      <button class="ac-action-btn" style="font-size: 12px; padding: 4px 12px;">↺ Reset Settings</button>
      <button class="ac-action-btn" style="font-size: 12px; padding: 4px 12px;">📄 Statement</button>
      <button class="ac-action-btn" id="ac-close-btn" style="font-size: 12px; padding: 4px 12px;">✕ Hide Interface</button>
    </div>
  </div>
  
  <div style="padding: 20px;">
    <div class="ac-search-box">
      <input type="text" placeholder="Unclear content? Search in dictionary..." 
             style="width: 100%; padding: 12px 20px; border-radius: 25px; border: 1px solid #e0e0e0; margin-bottom: 20px; background: #f8f9fa;">
      <span style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #6c757d;">▼</span>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; color: #6c757d;">Filter by Category</h3>
      <div class="ac-category-filters" style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="ac-category-btn active" data-category="all">All</button>
        <button class="ac-category-btn" data-category="sensory">Sensory</button>
        <button class="ac-category-btn" data-category="motor">Motor & Mobility</button>
        <button class="ac-category-btn" data-category="cognitive">Cognitive</button>
        <button class="ac-category-btn" data-category="neurological">Neurological</button>
      </div>
    </div>

    <div id="color-blindness-options" style="display: none; margin-top: 20px;">
<h4>Adapt Website for Color Blind Users:</h4>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <button class="cb-sim-btn" data-filter="normal">Normal</button>
    <button class="cb-sim-btn" data-filter="protanopia">Red-Weak (Protan)</button>
    <button class="cb-sim-btn" data-filter="deuteranopia">Green-Weak (Deutan)</button>
    <button class="cb-sim-btn" data-filter="tritanopia">Blue-Weak (Tritan)</button>

  </div>
</div>

    
    <h3 style="margin: 0 0 20px; font-size: 18px;">Choose the right accessibility profile for you</h3>
    
    <div class="ac-profile-list"></div>
  </div>
`;

// Append widget to document
document.body.appendChild(widget);

// Add styles for action buttons and other elements
const style = document.createElement("style");
style.textContent = `
  .ac-action-btn {
    background: transparent;
    border: 1px solid white;
    border-radius: 15px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .ac-action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .ac-search-box {
    position: relative;
    margin-bottom: 30px;
  }
  
  .ac-category-btn {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 25px;
    padding: 8px 16px;
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .ac-category-btn:hover {
    border-color: #0D6EFD;
    color: #0D6EFD;
  }

  .ac-category-btn.active {
    background: #0D6EFD;
    color: white;
    border-color: #0D6EFD;
  }
  
  .ac-profile-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    margin-bottom: 15px;
    transition: all 0.2s;
    display: none;
    opacity: 0;
    transform: translateX(20px);
  }

  .ac-profile-item.visible {
    display: flex;
    opacity: 1;
    transform: translateX(0);
  }

  .ac-profile-item:hover {
    border-color: #0D6EFD;
  }
  
  .ac-toggle {
    position: relative;
    width: 60px;
    height: 30px;
    background: #e9ecef;
    border-radius: 15px;
    margin-right: 15px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .ac-toggle-button {
    width: 26px;
    height: 26px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .ac-toggle.active {
    background: #0D6EFD;
  }
  
  .ac-toggle.active .ac-toggle-button {
    left: 32px;
  }

  .ac-profile-item h3 {
    font-size: 16px;
    margin: 0;
    color: #212529;
  }

  .ac-profile-item p {
    font-size: 14px;
    margin: 5px 0 0;
    color: #6c757d;
  }

  .ac-profile-icon {
    margin-left: auto;
    font-size: 20px;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
`;

document.head.appendChild(style);

// Define categories and their profiles
const categories = {
  sensory: [
    {
      id: "vision",
      title: "Vision Impaired Profile",
      description: "Enhances website's visuals",
      icon: "👁",
      category: "sensory",
    },
    {
      id: "hearing",
      title: "Hearing Impaired Profile",
      description: "Audio alternatives & captions",
      icon: "👂",
      category: "sensory",
    },
    {
      id: "blind",
      title: "Blind Users (Screen Reader)",
      description: "Optimized for screen readers",
      icon: "🔊",
      category: "sensory",
    },
    {
      id: "motor",
      title: "Motor & Mobility Profile",
      description: "Voice commands & simplified navigation",
      icon: "🦾",
      category: "sensory",
    },
    {
      id: "colorblind",
      title: "Color Blindness Profile",
      description: "Enhance color visibility for different color blindness types",
      icon: "🎨",
      category: "sensory"
    }
    
  ],
  motor: [
    {
      id: "keyboard",
      title: "Keyboard Navigation",
      description: "Use website with the keyboard",
      icon: "⌨️",
      category: "motor",
    },
    {
      id: "gesture",
      title: "Gesture Control",
      description: "Custom gesture recognition",
      icon: "👆",
      category: "motor",
    },
    {
      id: "eyetracking",
      title: "Eye Tracking Support",
      description: "Navigate with eye movements",
      icon: "👁️",
      category: "motor",
    },
  ],
  cognitive: [
    {
      id: "cognitive",
      title: "Cognitive Disability Profile",
      description: "Assists with reading & focusing",
      icon: "🎯",
      category: "cognitive",
    },
    {
      id: "simplified",
      title: "Simplified Content",
      description: "Reduces language complexity",
      icon: "📝",
      category: "cognitive",
    },
    {
      id: "memory",
      title: "Memory Support",
      description: "Highlights visited content",
      icon: "💭",
      category: "cognitive",
    },
    {
      id: "reading",
      title: "Reading Guide",
      description: "Maintains focus while reading",
      icon: "📖",
      category: "cognitive",
    },
  ],
  neurological: [
    {
      id: "seizure",
      title: "Seizure Safe Profile",
      description: "Clear flashes & reduces color",
      icon: "⚡",
      category: "neurological",
    },
    {
      id: "adhd",
      title: "ADHD Friendly Profile",
      description: "More focus & fewer distractions",
      icon: "🔲",
      category: "neurological",
    },
    {
      id: "sensory",
      title: "Sensory Overload Prevention",
      description: "Adjusts stimulation levels",
      icon: "🎨",
      category: "neurological",
    },
    {
      id: "focus",
      title: "Focus Enhancement",
      description: "Highlights essential content",
      icon: "🎯",
      category: "neurological",
    },
  ],
};

// Flatten profiles array for rendering
const profiles = Object.values(categories).flat();

// Add category filter functionality
const categoryButtons = widget.querySelectorAll(".ac-category-btn");
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active state
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Save selected category to localStorage
    const category = button.dataset.category;
    localStorage.setItem("selectedCategory", category);

    // Filter profiles
    const profileItems = widget.querySelectorAll(".ac-profile-item");
    profileItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });

    // Enable toggles for the selected category
    const toggles = document.querySelectorAll(".ac-toggle");
    toggles.forEach((toggle) => {
      const profileItem = toggle.closest(".ac-profile-item");
      if (profileItem && profileItem.dataset.category === category) {
        if (!toggle.classList.contains("active")) {
          toggle.click();
        }
      }
    });
  });
});

// Function to restore selected category and enable toggles on page load
function restoreSelectedCategory() {
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    // Find the category button
    const categoryButton = widget.querySelector(
      `[data-category="${selectedCategory}"]`
    );

    // Ensure the category button exists
    if (categoryButton) {
      categoryButton.click(); // Simulate the click on the category button

      // Enable toggles for the selected category
      const toggles = document.querySelectorAll(".ac-toggle");
      toggles.forEach((toggle) => {
        const profileItem = toggle.closest(".ac-profile-item");
        if (profileItem && profileItem.dataset.category === selectedCategory) {
          if (!toggle.classList.contains("active")) {
            toggle.click();
          }
        }
      });
    }
  }
}

// Call restore function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initial delay to ensure DOM is loaded
  setTimeout(restoreSelectedCategory, 1000);

  // Also try again after 2 seconds to catch any late-loading elements
  setTimeout(restoreSelectedCategory, 2000);
});

// Call restore function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initial delay to ensure DOM is loaded
  setTimeout(restoreSelectedCategory, 1000);

  // Also try again after 2 seconds to catch any late-loading elements
  setTimeout(restoreSelectedCategory, 2000);
});

// Update profile rendering
const profileList = widget.querySelector(".ac-profile-list");
profiles.forEach((profile) => {
  const item = document.createElement("div");
  item.className = "ac-profile-item visible";
  item.dataset.category = profile.category;
  item.innerHTML = `
    <div class="ac-toggle" data-profile="${profile.id}">
      <div class="ac-toggle-button"></div>
    </div>
    <div style="flex: 1">
      <h3>${profile.title}</h3>
      <p>${profile.description}</p>
    </div>
    <div class="ac-profile-icon">${profile.icon}</div>
  `;
  if (profile.id === "colorblind") {
    item.innerHTML = `
      <div class="ac-toggle" data-profile="${profile.id}">
        <div class="ac-toggle-button"></div>
      </div>
      <div style="flex: 1">
        <h3>${profile.title}</h3>
        <p>${profile.description}</p>
<div class="cb-filter-palette" style="display: none; margin-top: 12px; display: flex; flex-direction: column; gap: 10px;">
  <p style="margin: 0 0 8px; font-size: 14px; color: #6c757d;">Choose a palette adapted to your color vision:</p>

  <div class="cb-palette-item" data-filter="normal" title="Normal Vision (Full Color)">
    <div class="cb-color-circle" style="background-color: #4caf50;"></div>
    <div>
      <strong>Normal Vision</strong>
      <div style="font-size: 12px; color: #6c757d;">Standard color experience</div>
    </div>
  </div>

  <div class="cb-palette-item" data-filter="protanopia" title="Protanopia (Red-Blindness)">
    <div class="cb-color-circle" style="background-color: #ff9999;"></div>
    <div>
      <strong>Protanopia</strong>
      <div style="font-size: 12px; color: #6c757d;">Difficulty seeing reds</div>
    </div>
  </div>

  <div class="cb-palette-item" data-filter="deuteranopia" title="Deuteranopia (Green-Blindness)">
    <div class="cb-color-circle" style="background-color: #ffff99;"></div>
    <div>
      <strong>Deuteranopia</strong>
      <div style="font-size: 12px; color: #6c757d;">Difficulty seeing greens</div>
    </div>
  </div>

  <div class="cb-palette-item" data-filter="tritanopia" title="Tritanopia (Blue-Blindness)">
    <div class="cb-color-circle" style="background-color: #99ccff;"></div>
    <div>
      <strong>Tritanopia</strong>
      <div style="font-size: 12px; color: #6c757d;">Difficulty seeing blues</div>
    </div>
  </div>
</div>

      <div class="ac-profile-icon">${profile.icon}</div>
    `;
  }
  
  profileList.appendChild(item);
});

// Add click handlers for the button and close button
button.addEventListener("click", () => {
  widget.style.right = "0";
  // Focus on the search input when widget opens
  setTimeout(() => {
    const searchInput = widget.querySelector(".ac-search-box input");
    if (searchInput) {
      searchInput.focus();
    }
  }, 300);
});

widget.querySelector("#ac-close-btn").addEventListener("click", () => {
  widget.style.right = "-520px";
});

// Add keyboard shortcut for widget
document.addEventListener("keydown", (e) => {
  // Check for Ctrl+U or Command+U (on Mac)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
    e.preventDefault(); // Prevent default browser behavior
    const isOpening = widget.style.right !== "0px";
    widget.style.right = isOpening ? "0" : "-520px";

    // If we're opening the widget, focus on the search input
    if (isOpening) {
      setTimeout(() => {
        const searchInput = widget.querySelector(".ac-search-box input");
        if (searchInput) {
          searchInput.focus();
        }
      }, 300);
    }
  }
});

// Function to enable voice assistant
function enableVoiceAssistant() {
  const keyboardToggle = widget.querySelector('[data-profile="keyboard"]');
  if (keyboardToggle && !keyboardToggle.classList.contains("active")) {
    keyboardToggle.click();
  }
}

// Initialize voice assistant immediately after widget creation
setTimeout(enableVoiceAssistant, 500);

// Also try on DOMContentLoaded and window load to ensure it's enabled
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(enableVoiceAssistant, 1000);
});

window.addEventListener("load", () => {
  setTimeout(enableVoiceAssistant, 1000);
});

// Replace the input event listener with keydown for Enter key
document
  .querySelector(".ac-search-box input")
  .addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const disease = e.target.value.trim();

      if (disease.length > 2) {
        // Check if we already have this disease categorized
        const storedDiseases = JSON.parse(
          localStorage.getItem("diseases") || "{}"
        );

        if (storedDiseases[disease]) {
          // If we already know the category, use the stored value
          const category = storedDiseases[disease];
          console.log(`Using stored category for ${disease}: ${category}`);

          // Select the category and enable toggles
          const categoryButtons = document.querySelectorAll(".ac-category-btn");
          categoryButtons.forEach((btn) => {
            if (btn.dataset.category === category) {
              btn.click();
            }
          });

          const toggles = document.querySelectorAll(".ac-toggle");
          toggles.forEach((toggle) => {
            const profileItem = toggle.closest(".ac-profile-item");
            if (profileItem && profileItem.dataset.category === category) {
              if (!toggle.classList.contains("active")) {
                toggle.click();
              }
            }
          });
        } else {
          // If not stored, categorize using API
          await categorizeDisease(disease);
        }
      }
    }
  });

window.addEventListener("mousemove", (e) => {
  if (adhdEnabled) {
    focusLine.style.top = `${e.clientY}px`;
  }
});

const seizureSafetyManager = (function () {
  function scanForTriggers() {
    const triggers = {
      flashingElements: [],
      highContrastElements: [],
    };

    const allElements = document.body.getElementsByTagName("*");

    for (let element of allElements) {
      const computedStyle = window.getComputedStyle(element);
      const animation =
        computedStyle.animation || computedStyle.webkitAnimation;

      if (
        animation &&
        (animation.includes("blink") || animation.includes("flash"))
      ) {
        triggers.flashingElements.push(element);
      }

      const backgroundColor = computedStyle.backgroundColor;
      const backgroundImage = computedStyle.backgroundImage;

      if (
        backgroundColor === "transparent" ||
        backgroundImage.includes("gradient")
      ) {
        triggers.highContrastElements.push(element);
      }
    }

    return triggers;
  }

  const originalStyles = {
    body: {},
    flashingElements: [],
    highContrastElements: [],
  };

  function applyProtection(active) {
    const detectedTriggers = scanForTriggers();

    if (active) {
      originalStyles.body.filter = document.body.style.filter;

      document.body.style.filter =
        "saturate(0.5) contrast(0.8) brightness(0.9)";

      detectedTriggers.flashingElements.forEach((element, index) => {
        originalStyles.flashingElements[index] = {
          animation: element.style.animation,
          transition: element.style.transition,
          opacity: element.style.opacity,
        };

        element.style.animation = "none";
        element.style.transition = "opacity 0.5s ease";
        element.style.opacity = "0.7";
      });

      detectedTriggers.highContrastElements.forEach((element, index) => {
        originalStyles.highContrastElements[index] = {
          backgroundColor: element.style.backgroundColor,
          color: element.style.color,
        };

        element.style.backgroundColor = "#f0f0f0";
        element.style.color = "#333";
      });

      const overlay = document.createElement("div");
      overlay.id = "seizure-safe-overlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(240, 240, 240, 0.3);
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(overlay);
    } else {
      document.body.style.filter = originalStyles.body.filter || "";

      detectedTriggers.flashingElements.forEach((element, index) => {
        const originalStyle = originalStyles.flashingElements[index] || {};
        element.style.animation = originalStyle.animation || "";
        element.style.transition = originalStyle.transition || "";
        element.style.opacity = originalStyle.opacity || "1";
      });

      detectedTriggers.highContrastElements.forEach((element, index) => {
        const originalStyle = originalStyles.highContrastElements[index] || {};
        element.style.backgroundColor = originalStyle.backgroundColor || "";
        element.style.color = originalStyle.color || "";
      });

      const overlay = document.getElementById("seizure-safe-overlay");
      if (overlay) {
        overlay.remove();
      }
    }
  }

  return {
    applyProtection: applyProtection,
  };
})();

let visionImpairedStyleEl = null;

function applyVisionImpairedProfile(enable) {
  if (enable) {
    if (!visionImpairedStyleEl) {
      visionImpairedStyleEl = document.createElement("style");
      visionImpairedStyleEl.id = "vision-impaired-style";
      visionImpairedStyleEl.textContent = `
        /* Font size and readability */
        html, body, input, button, select, textarea {
          font-size: 18px !important;
          line-height: 1.6 !important;
          letter-spacing: 0.6px !important;
        }

        /* Neutral contrast boost for text only */
        body, p, span, a, li, td, th, div {
          color: #111 !important;
        }

        /* Background cleanup to soft white */
        body {
          background-color: #fafafa !important;
        }

        /* Input and form readability */
        input, textarea, select {
          background-color: #fff !important;
          color: #111 !important;
          border: 2px solid #555 !important;
        }

        /* Underline & color for links */
        a {
          text-decoration: underline !important;
          color: #0645AD !important;
        }

        /* Improve focus visibility */
        *:focus {
          outline: 3px solid #1a73e8 !important;
          outline-offset: 3px !important;
        }

        /* Slight darkening for headers */
        h1, h2, h3, h4, h5, h6 {
          color: #000 !important;
        }

        /* Avoid image brightness or saturation filters */
        img, video, canvas {
          filter: none !important;
        }
      `;
      document.head.appendChild(visionImpairedStyleEl);
    }
  } else {
    if (visionImpairedStyleEl) {
      visionImpairedStyleEl.remove();
      visionImpairedStyleEl = null;
    }
  }
}

widget.querySelectorAll(".ac-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    const profileId = toggle.dataset.profile;

    if (profileId === "keyboard") {
      keyboardNavigationManager.applyProfile(
        toggle.classList.contains("active")
      );
    } else if (profileId === "seizure") {
      seizureSafetyManager.applyProtection(toggle.classList.contains("active"));
    } else if (profileId === "vision") {
      applyVisionImpairedProfile(toggle.classList.contains("active"));
    } else if (profileId === "adhd") {
      applyADHDFriendlyProfile(toggle.classList.contains("active"));
    } else if (profileId === "hearing") {
      hearingImpairedManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "motor") {
      motorMobilityManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "neurological") {
      neurologicalManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "gesture") {
      gestureControlManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "eyetracking") {
      eyeTrackingManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "simplified") {
      simplifiedContentManager.applyProfile(
        toggle.classList.contains("active")
      );
    } else if (profileId === "memory") {
      memorySupportManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "reading") {
      readingGuideManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "sensory") {
      sensoryOverloadManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "focus") {
      focusEnhancementManager.applyProfile(toggle.classList.contains("active"));
    } else if (profileId === "colorblind") {
      const enabled = toggle.classList.contains("active");
      const palette = toggle.closest(".ac-profile-item").querySelector(".cb-filter-palette");
      if (palette) {
        palette.style.display = enabled ? "flex" : "none";
      }
    
      if (!enabled) {
        applyColorBlindFilter("normal");
      }
    }
  });
});

let adhdOverlay = null;
let adhdEnabled = false;

function applyADHDFriendlyProfile(enable) {
  adhdEnabled = enable;

  if (enable) {
    if (!adhdOverlay) {
      adhdOverlay = document.createElement("div");
      adhdOverlay.id = "adhd-overlay";
      adhdOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 99998;
        background: rgba(0, 0, 0, 0.6);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      `;
      document.body.appendChild(adhdOverlay);
    }

    focusLine.style.opacity = "1";
    adhdOverlay.style.display = "block";
  } else {
    if (adhdOverlay) {
      adhdOverlay.style.display = "none";
    }
    focusLine.style.opacity = "0";
  }
}

window.addEventListener("mousemove", (e) => {
  if (adhdEnabled && adhdOverlay) {
    const lineHeight = 90;
    const y = e.clientY;
    const top = Math.max(0, y - lineHeight / 2);
    const bottom = Math.min(window.innerHeight, y + lineHeight / 2);

    adhdOverlay.style.clipPath = `polygon(0 0, 100% 0, 100% ${top}px, 0 ${top}px, 0 ${bottom}px, 100% ${bottom}px, 100% 100%, 0% 100%)`;
    focusLine.style.top = `${y}px`;
  }
});

const focusLine = document.createElement("div");
focusLine.id = "adhd-focus-line";
focusLine.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  opacity: 0;
  pointer-events: none;
  z-index: 99999;
  transition: top 0.1s ease;
`;
document.body.appendChild(focusLine);
document.body.appendChild(button);
document.body.appendChild(widget);

const colorBlindStyles = document.createElement("style");
colorBlindStyles.id = "color-blind-style";
document.head.appendChild(colorBlindStyles);

const colorBlindFilters = {
  normal: "none",
  protanopia: "url('#protanopia')",
  deuteranopia: "url('#deuteranopia')",
  tritanopia: "url('#tritanopia')"
};

// SVG filter definitions (simulate types of color blindness)
const svgFilters = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none">
  <filter id="protanopia">
    <feColorMatrix in="SourceGraphic" type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
  </filter>
  <filter id="deuteranopia">
    <feColorMatrix in="SourceGraphic" type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
  </filter>
  <filter id="tritanopia">
    <feColorMatrix in="SourceGraphic" type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
  </filter>
</svg>
`;
document.body.insertAdjacentHTML('beforeend', svgFilters);

const hearingImpairedManager = (function () {
  let captionsEnabled = false;
  let visualNotificationsEnabled = false;
  let frequencyAdjustmentEnabled = false;
  let signLanguageEnabled = false;
  let notificationContainer = null;

  function setupCaptions() {
    const videoElements = document.querySelectorAll("video, audio");
    videoElements.forEach((element) => {
      if (!element.hasAttribute("data-original-captions")) {
        element.setAttribute("data-original-captions", element.innerHTML);

        // Create caption container
        const captionContainer = document.createElement("div");
        captionContainer.className = "ac-caption-container";
        captionContainer.style.cssText = `
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px;
          font-size: 16px;
          text-align: center;
          z-index: 1000;
        `;

        // Create caption track
        const captionTrack = document.createElement("track");
        captionTrack.kind = "captions";
        captionTrack.label = "Auto-generated captions";
        captionTrack.srclang = "en";

        // Add event listeners for captions
        element.addEventListener("timeupdate", () => {
          const currentTime = element.currentTime;
          // Simulate caption generation (in real implementation, use speech-to-text API)
          const caption = `Caption at ${Math.floor(currentTime)}s`;
          captionContainer.textContent = caption;
        });

        element.appendChild(captionTrack);
        element.parentElement.appendChild(captionContainer);
      }
    });
  }

  function setupVisualNotifications() {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "visual-notifications";
    notificationContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(notificationContainer);

    // Listen for audio events
    document.addEventListener("play", (e) => {
      if (e.target.tagName === "AUDIO" || e.target.tagName === "VIDEO") {
        showNotification("🎵 Audio playing", "info");
      }
    });

    document.addEventListener("pause", (e) => {
      if (e.target.tagName === "AUDIO" || e.target.tagName === "VIDEO") {
        showNotification("⏸️ Audio paused", "info");
      }
    });
  }

  function showNotification(message, type = "info") {
    if (!notificationContainer) return;

    const notification = document.createElement("div");
    notification.className = `ac-notification ${type}`;
    notification.style.cssText = `
      background: ${type === "info" ? "#4169E1" : "#dc3545"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  function setupFrequencyAdjustment() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const mediaElements = document.querySelectorAll("audio, video");

    mediaElements.forEach((element) => {
      const source = audioContext.createMediaElementSource(element);
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      // Adjust frequency response for better hearing
      filterNode.type = "highshelf";
      filterNode.frequency.value = 1000;
      filterNode.gain.value = 10;

      source.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
    });
  }

  function applyHearingImpairedProfile(enable) {
    if (enable) {
      setupCaptions();
      setupVisualNotifications();
      setupFrequencyAdjustment();
      captionsEnabled = true;
      visualNotificationsEnabled = true;
      frequencyAdjustmentEnabled = true;
    } else {
      // Cleanup
      const videoElements = document.querySelectorAll("video, audio");
      videoElements.forEach((element) => {
        const originalCaptions = element.getAttribute("data-original-captions");
        if (originalCaptions) {
          element.innerHTML = originalCaptions;
        }
        const captionContainer = element.parentElement.querySelector(
          ".ac-caption-container"
        );
        if (captionContainer) {
          captionContainer.remove();
        }
      });

      if (notificationContainer) {
        notificationContainer.remove();
        notificationContainer = null;
      }

      captionsEnabled = false;
      visualNotificationsEnabled = false;
      frequencyAdjustmentEnabled = false;
    }
  }

  return {
    applyProfile: applyHearingImpairedProfile,
  };
})();

// Enhanced Motor & Mobility Manager with AI Voice Control
const motorMobilityManager = (function () {
  let voiceCommandsEnabled = false;
  let simplifiedNavigationEnabled = false;
  let gestureRecognitionEnabled = false;
  let eyeTrackingEnabled = false;
  let recognition = null;
  let isListening = false;

  // Voice command patterns
  const commandPatterns = {
    click: /click (?:the )?([^\.]+)/i,
    scroll: /scroll (?:to )?(up|down|top|bottom)/i,
    search: /search (?:for )?([^\.]+)/i,
    read: /read (?:the )?([^\.]+)/i,
    describe: /describe (?:the )?([^\.]+)/i,
    navigate: /go to (?:the )?([^\.]+)/i,
    zoom: /zoom (?:in|out)/i,
    stop: /stop (?:listening|voice)/i,
    help: /help|what can you do/i,
  };

  function setupVoiceCommands() {
    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false; // Changed to false to prevent duplicate results
      recognition.lang = "en-US";

      recognition.onresult = function (event) {
        const command = event.results[event.results.length - 1][0].transcript
          .toLowerCase()
          .trim();
        handleVoiceCommand(command);
      };

      recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        if (event.error === "aborted") {
          // Restart recognition if it was aborted
          setTimeout(() => {
            if (isListening) {
              try {
                recognition.start();
              } catch (e) {
                console.error("Failed to restart recognition:", e);
                showVoiceFeedback(
                  "Voice recognition error. Please try again.",
                  "error"
                );
              }
            }
          }, 1000);
        } else {
          showVoiceFeedback("Voice recognition error: " + event.error, "error");
        }
      };

      recognition.onend = function () {
        if (isListening) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Failed to restart recognition:", e);
            showVoiceFeedback(
              "Voice recognition error. Please try again.",
              "error"
            );
          }
        }
      };

      try {
        recognition.start();
        isListening = true;
        showVoiceFeedback(
          'Voice control activated. Say "help" for available commands.',
          "info"
        );
      } catch (e) {
        console.error("Failed to start recognition:", e);
        showVoiceFeedback(
          "Failed to start voice recognition. Please try again.",
          "error"
        );
      }
    } else {
      showVoiceFeedback(
        "Voice recognition is not supported in your browser.",
        "error"
      );
    }
  }

  function showVoiceFeedback(message, type = "info") {
    // Remove any existing feedback
    const existingFeedback = document.querySelector(".ac-voice-feedback");
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Create visual feedback
    const feedback = document.createElement("div");
    feedback.className = "ac-voice-feedback";
    feedback.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === "info" ? "#4169E1" : "#dc3545"};
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      font-size: 16px;
      animation: slideUp 0.3s ease;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Add speech synthesis
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Speak the message
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech synthesis error:", e);
    }

    // Remove visual feedback after delay
    setTimeout(() => {
      feedback.style.animation = "slideDown 0.3s ease";
      setTimeout(() => feedback.remove(), 300);
    }, 3000);
  }

  async function handleVoiceCommand(command) {
    // Check for help command first
    if (commandPatterns.help.test(command)) {
      const helpMessage = `
        Available commands:
        - Click [element name]
        - Scroll [up/down/top/bottom]
        - Search [query]
        - Read [element name]
        - Describe [element name]
        - Go to [section name]
        - Zoom in/out
        - Stop listening
      `;
      showVoiceFeedback(helpMessage, "info");
      return;
    }

    // Check for stop command
    if (commandPatterns.stop.test(command)) {
      isListening = false;
      recognition.stop();
      showVoiceFeedback("Voice control deactivated", "info");
      return;
    }

    // Handle click command
    const clickMatch = command.match(commandPatterns.click);
    if (clickMatch) {
      const targetText = clickMatch[1].trim();
      const elements = Array.from(
        document.querySelectorAll(
          'button, a, input[type="submit"], [role="button"]'
        )
      );
      const targetElement = elements.find(
        (el) =>
          el.textContent.toLowerCase().includes(targetText) ||
          el.getAttribute("aria-label")?.toLowerCase().includes(targetText)
      );

      if (targetElement) {
        targetElement.click();
        showVoiceFeedback(
          `Clicked: ${targetElement.textContent.trim()}`,
          "info"
        );
      } else {
        showVoiceFeedback(`Could not find element: ${targetText}`, "error");
      }
      return;
    }

    // Handle scroll command
    const scrollMatch = command.match(commandPatterns.scroll);
    if (scrollMatch) {
      const direction = scrollMatch[1];
      let feedbackMessage = "";
      switch (direction) {
        case "up":
          window.scrollBy(0, -100);
          feedbackMessage = "Scrolled up";
          break;
        case "down":
          window.scrollBy(0, 100);
          feedbackMessage = "Scrolled down";
          break;
        case "top":
          window.scrollTo(0, 0);
          feedbackMessage = "Scrolled to top";
          break;
        case "bottom":
          window.scrollTo(0, document.body.scrollHeight);
          feedbackMessage = "Scrolled to bottom";
          break;
      }
      showVoiceFeedback(feedbackMessage, "info");
      return;
    }

    // Handle search command
    const searchMatch = command.match(commandPatterns.search);
    if (searchMatch) {
      const searchTerm = searchMatch[1].trim();
      const searchInput = document.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.value = searchTerm;
        searchInput.dispatchEvent(new Event("input"));
        showVoiceFeedback(`Searching for: ${searchTerm}`, "info");
      } else {
        showVoiceFeedback("Search input not found", "error");
      }
      return;
    }

    // Handle read command
    const readMatch = command.match(commandPatterns.read);
    if (readMatch) {
      const targetText = readMatch[1].trim();
      const elements = Array.from(
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, article, section")
      );
      const targetElement = elements.find((el) =>
        el.textContent.toLowerCase().includes(targetText)
      );

      if (targetElement) {
        const text = targetElement.textContent.trim();
        showVoiceFeedback(`Reading: ${text}`, "info");
      } else {
        showVoiceFeedback(`Could not find text: ${targetText}`, "error");
      }
      return;
    }

    // Handle describe command with AI
    const describeMatch = command.match(commandPatterns.describe);
    if (describeMatch) {
      const targetText = describeMatch[1].trim();
      const elements = Array.from(
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, article, section")
      );
      const targetElement = elements.find((el) =>
        el.textContent.toLowerCase().includes(targetText)
      );

      if (targetElement) {
        const text = targetElement.textContent.trim();
        try {
          // Call OpenAI API for description
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: `Provide a brief, clear description of this text: ${text}`,
                  },
                ],
              }),
            }
          );
          const data = await response.json();
          const description = data.choices[0].message.content;
          showVoiceFeedback(`Description: ${description}`, "info");
        } catch (error) {
          showVoiceFeedback("Error generating description", "error");
        }
      } else {
        showVoiceFeedback(
          `Could not find text to describe: ${targetText}`,
          "error"
        );
      }
      return;
    }

    // Handle navigation command
    const navigateMatch = command.match(commandPatterns.navigate);
    if (navigateMatch) {
      const targetSection = navigateMatch[1].trim();
      const sections = Array.from(
        document.querySelectorAll('section, article, [role="region"]')
      );
      const targetElement = sections.find((section) =>
        section.textContent.toLowerCase().includes(targetSection)
      );

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        showVoiceFeedback(`Navigated to: ${targetSection}`, "info");
      } else {
        showVoiceFeedback(`Could not find section: ${targetSection}`, "error");
      }
      return;
    }

    // Handle zoom command
    const zoomMatch = command.match(commandPatterns.zoom);
    if (zoomMatch) {
      const direction = zoomMatch[1];
      const currentZoom =
        parseFloat(
          document.body.style.transform.replace("scale(", "").replace(")", "")
        ) || 1;
      const newZoom =
        direction === "in" ? currentZoom + 0.1 : currentZoom - 0.1;

      document.body.style.transform = `scale(${newZoom})`;
      document.body.style.transformOrigin = "center center";
      showVoiceFeedback(`Zoomed ${direction}`, "info");
      return;
    }

    // If no command matches, show help
    showVoiceFeedback(
      'Command not recognized. Say "help" for available commands.',
      "error"
    );
  }

  function setupSimplifiedNavigation() {
    // Add keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (!simplifiedNavigationEnabled) return;

      switch (e.key) {
        case "h":
          window.history.back();
          break;
        case "l":
          window.history.forward();
          break;
        case "j":
          window.scrollBy(0, 100);
          break;
        case "k":
          window.scrollBy(0, -100);
          break;
        case "g":
          window.scrollTo(0, 0);
          break;
        case "G":
          window.scrollTo(0, document.body.scrollHeight);
          break;
      }
    });

    // Add skip links
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "ac-skip-link";
    skipLink.textContent = "Skip to main content";
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: #4169E1;
      color: white;
      padding: 8px;
      z-index: 100;
    `;
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  function setupGestureControl() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    function handleGesture(e) {
      if (!gestureRecognitionEnabled) return;

      const currentX = e.clientX;
      const currentY = e.clientY;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const deltaTime = Date.now() - startTime;

      // Detect swipe gestures
      if (Math.abs(deltaX) > 100 && deltaTime < 500) {
        if (deltaX > 0) {
          window.history.back();
        } else {
          window.history.forward();
        }
      }

      // Detect scroll gestures
      if (Math.abs(deltaY) > 100 && deltaTime < 500) {
        window.scrollBy(0, deltaY > 0 ? -100 : 100);
      }

      // Detect zoom gestures
      if (Math.abs(deltaY) > 100 && Math.abs(deltaX) > 100 && deltaTime < 500) {
        const zoom = deltaY > 0 ? 1.1 : 0.9;
        document.body.style.transform = `scale(${zoom})`;
        document.body.style.transformOrigin = "center center";
      }

      // Reset gesture tracking
      startX = currentX;
      startY = currentY;
      startTime = Date.now();
    }

    document.addEventListener("mousedown", (e) => {
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
    });

    document.addEventListener("mousemove", handleGesture);
  }

  function applyMotorMobilityProfile(enable) {
    if (enable) {
      setupVoiceCommands();
      setupSimplifiedNavigation();
      setupGestureControl();
      voiceCommandsEnabled = true;
      simplifiedNavigationEnabled = true;
      gestureRecognitionEnabled = true;
    } else {
      if (recognition) {
        recognition.stop();
      }
      const skipLink = document.querySelector(".ac-skip-link");
      if (skipLink) {
        skipLink.remove();
      }
      voiceCommandsEnabled = false;
      simplifiedNavigationEnabled = false;
      gestureRecognitionEnabled = false;
    }
  }

  return {
    applyProfile: applyMotorMobilityProfile,
  };
})();

// Enhanced Cognitive Profile Manager
const cognitiveManager = (function () {
  let cognitiveEnabled = false;
  let simplifiedEnabled = false;
  let memoryEnabled = false;
  let readingEnabled = false;
  const visitedElements = new Set();

  function setupCognitiveProfile() {
    const style = document.createElement("style");
    style.id = "cognitive-profile-style";
    style.textContent = `
      /* Improve readability */
      body {
        font-size: 18px !important;
        line-height: 1.6 !important;
        max-width: 800px !important;
        margin: 0 auto !important;
        padding: 20px !important;
      }

      /* Add visual hierarchy */
      h1, h2, h3 {
        margin-top: 2em !important;
        margin-bottom: 1em !important;
        color: #2c3e50 !important;
      }

      /* Highlight important content */
      strong, b {
        background-color: #fff3cd !important;
        padding: 0.2em 0.4em !important;
        border-radius: 4px !important;
      }

      /* Add spacing between sections */
      section, article {
        margin-bottom: 2em !important;
        padding: 1em !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
      }

      /* Improve focus */
      *:focus {
        outline: 3px solid #4169E1 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setupMemorySupport() {
    const style = document.createElement("style");
    style.id = "memory-support-style";
    style.textContent = `
      .visited-content {
        background-color: #e3f2fd !important;
        border-left: 4px solid #2196f3 !important;
        padding-left: 1em !important;
        transition: all 0.3s ease;
      }

      .visited-content:hover {
        background-color: #bbdefb !important;
      }
    `;
    document.head.appendChild(style);

    // Track visited content
    document.addEventListener("click", (e) => {
      const target = e.target.closest("article, section, div");
      if (target && !visitedElements.has(target)) {
        visitedElements.add(target);
        target.classList.add("visited-content");
      }
    });
  }

  function setupReadingGuide() {
    const guideElement = document.createElement("div");
    guideElement.id = "reading-guide";
    guideElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #4169E1;
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.3s;
      box-shadow: 0 0 10px rgba(65, 105, 225, 0.5);
    `;
    document.body.appendChild(guideElement);

    function updateGuidePosition(e) {
      if (readingEnabled) {
        guideElement.style.top = `${e.clientY}px`;
        guideElement.style.opacity = "1";
      }
    }

    document.addEventListener("mousemove", updateGuidePosition);
  }

  function applyCognitiveProfile(enable) {
    if (enable) {
      setupCognitiveProfile();
      setupMemorySupport();
      setupReadingGuide();
      cognitiveEnabled = true;
      memoryEnabled = true;
      readingEnabled = true;
    } else {
      const styles = [
        document.getElementById("cognitive-profile-style"),
        document.getElementById("memory-support-style"),
      ];
      styles.forEach((style) => {
        if (style) style.remove();
      });

      document.querySelectorAll(".visited-content").forEach((el) => {
        el.classList.remove("visited-content");
      });
      visitedElements.clear();

      const guideElement = document.getElementById("reading-guide");
      if (guideElement) {
        guideElement.remove();
      }

      cognitiveEnabled = false;
      memoryEnabled = false;
      readingEnabled = false;
    }
  }

  return {
    applyProfile: applyCognitiveProfile,
  };
})();

// Enhanced Neurological Manager
const neurologicalManager = (function () {
  let sensoryEnabled = false;
  let focusEnabled = false;
  let seizureEnabled = false;
  let adhdEnabled = false;

  function setupSensoryAdjustments() {
    const style = document.createElement("style");
    style.id = "neurological-sensory-style";
    style.textContent = `
      /* Reduce motion */
      * {
        animation: none !important;
        transition: none !important;
      }
      
      /* Reduce color intensity */
      body {
        background-color: #f5f5f5 !important;
        color: #333 !important;
      }
      
      /* Reduce visual noise */
      img, video {
        filter: grayscale(50%) !important;
      }

      /* Reduce contrast */
      * {
        background-color: #f8f9fa !important;
        color: #495057 !important;
      }

      /* Remove background images */
      * {
        background-image: none !important;
      }

      /* Add smooth scrolling */
      html {
        scroll-behavior: smooth !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setupFocusEnhancement() {
    const style = document.createElement("style");
    style.id = "neurological-focus-style";
    style.textContent = `
      /* Dim non-essential content */
      body > *:not(:hover) {
        opacity: 0.7 !important;
        transition: opacity 0.3s !important;
      }

      /* Highlight focused content */
      *:hover {
        opacity: 1 !important;
        background-color: #fff !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.1) !important;
      }

      /* Add focus ring */
      *:focus {
        outline: 3px solid #4169E1 !important;
        outline-offset: 2px !important;
      }

      /* Reduce distractions */
      .ad, .popup, .modal {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setupSeizureSafety() {
    const style = document.createElement("style");
    style.id = "neurological-seizure-style";
    style.textContent = `
      /* Remove flashing content */
      * {
        animation: none !important;
        transition: none !important;
      }

      /* Reduce color intensity */
      body {
        filter: saturate(0.5) contrast(0.8) brightness(0.9) !important;
      }

      /* Remove high contrast elements */
      * {
        background-color: #f0f0f0 !important;
        color: #333 !important;
      }

      /* Remove background images */
      * {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setupADHDFriendly() {
    const style = document.createElement("style");
    style.id = "neurological-adhd-style";
    style.textContent = `
      /* Reduce distractions */
      .ad, .popup, .modal {
        display: none !important;
      }

      /* Add focus line */
      #adhd-focus-line {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #4169E1;
        opacity: 1;
        pointer-events: none;
        z-index: 99999;
        transition: top 0.1s ease;
        box-shadow: 0 0 10px rgba(65, 105, 225, 0.5);
      }

      /* Add focus overlay */
      #adhd-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 99998;
        background: rgba(0, 0, 0, 0.6);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        transition: clip-path 0.1s ease;
      }
    `;
    document.head.appendChild(style);

    // Create focus line
    const focusLine = document.createElement("div");
    focusLine.id = "adhd-focus-line";
    document.body.appendChild(focusLine);

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "adhd-overlay";
    document.body.appendChild(overlay);

    // Update focus line position
    window.addEventListener("mousemove", (e) => {
      if (adhdEnabled) {
        const lineHeight = 90;
        const y = e.clientY;
        const top = Math.max(0, y - lineHeight / 2);
        const bottom = Math.min(window.innerHeight, y + lineHeight / 2);

        overlay.style.clipPath = `polygon(0 0, 100% 0, 100% ${top}px, 0 ${top}px, 0 ${bottom}px, 100% ${bottom}px, 100% 100%, 0% 100%)`;
        focusLine.style.top = `${y}px`;
      }
    });
  }

  function applyNeurologicalProfile(enable) {
    if (enable) {
      setupSensoryAdjustments();
      setupFocusEnhancement();
      setupSeizureSafety();
      setupADHDFriendly();
      sensoryEnabled = true;
      focusEnabled = true;
      seizureEnabled = true;
      adhdEnabled = true;
    } else {
      // Cleanup styles
      const styles = [
        document.getElementById("neurological-sensory-style"),
        document.getElementById("neurological-focus-style"),
        document.getElementById("neurological-seizure-style"),
        document.getElementById("neurological-adhd-style"),
      ];
      styles.forEach((style) => {
        if (style) style.remove();
      });

      // Remove focus line and overlay
      const focusLine = document.getElementById("adhd-focus-line");
      const overlay = document.getElementById("adhd-overlay");
      if (focusLine) focusLine.remove();
      if (overlay) overlay.remove();

      sensoryEnabled = false;
      focusEnabled = false;
      seizureEnabled = false;
      adhdEnabled = false;
    }
  }

  return {
    applyProfile: applyNeurologicalProfile,
  };
})();

// Enhanced Gesture Control Manager
const gestureControlManager = (function () {
  let gestureEnabled = false;
  let startX = 0;
  let startY = 0;
  let startTime = 0;

  function handleGesture(e) {
    if (!gestureEnabled) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const deltaTime = Date.now() - startTime;

    // Detect swipe gestures
    if (Math.abs(deltaX) > 100 && deltaTime < 500) {
      if (deltaX > 0) {
        window.history.back();
      } else {
        window.history.forward();
      }
    }

    // Detect scroll gestures
    if (Math.abs(deltaY) > 100 && deltaTime < 500) {
      window.scrollBy(0, deltaY > 0 ? -100 : 100);
    }

    // Detect zoom gestures
    if (Math.abs(deltaY) > 100 && Math.abs(deltaX) > 100 && deltaTime < 500) {
      const zoom = deltaY > 0 ? 1.1 : 0.9;
      document.body.style.transform = `scale(${zoom})`;
      document.body.style.transformOrigin = "center center";
    }

    // Reset gesture tracking
    startX = currentX;
    startY = currentY;
    startTime = Date.now();
  }

  function applyGestureControl(enable) {
    gestureEnabled = enable;
    if (enable) {
      document.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startTime = Date.now();
      });
      document.addEventListener("mousemove", handleGesture);
    } else {
      document.removeEventListener("mousemove", handleGesture);
      document.body.style.transform = "";
      document.body.style.transformOrigin = "";
    }
  }

  return {
    applyProfile: applyGestureControl,
  };
})();

// Enhanced Eye Tracking Manager
const eyeTrackingManager = (function () {
  let eyeTrackingEnabled = false;
  let videoElement = null;
  let stream = null;

  function setupEyeTracking() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" } })
        .then((mediaStream) => {
          stream = mediaStream;
          videoElement = document.createElement("video");
          videoElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 200px;
            height: 150px;
            border-radius: 8px;
            z-index: 10000;
            background: #000;
          `;
          videoElement.srcObject = stream;
          videoElement.play();
          document.body.appendChild(videoElement);

          // Basic eye tracking simulation
          videoElement.addEventListener("timeupdate", () => {
            if (eyeTrackingEnabled) {
              // Simulate eye tracking (in real implementation, use eye tracking API)
              const rect = videoElement.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;

              // Move focus based on eye position
              const elements = document.elementsFromPoint(centerX, centerY);
              elements.forEach((element) => {
                if (element !== videoElement) {
                  element.focus();
                }
              });
            }
          });
        })
        .catch((err) => console.log("Eye tracking not available:", err));
    }
  }

  function applyEyeTracking(enable) {
    eyeTrackingEnabled = enable;
    if (enable) {
      setupEyeTracking();
    } else {
      if (videoElement) {
        videoElement.remove();
        videoElement = null;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    }
  }

  return {
    applyProfile: applyEyeTracking,
  };
})();

const simplifiedContentManager = (function () {
  let simplifiedEnabled = false;

  function simplifyContent() {
    const style = document.createElement("style");
    style.id = "simplified-content-style";
    style.textContent = `
      /* Simplify text content */
      p, span, div {
        font-size: 18px !important;
        line-height: 1.6 !important;
        max-width: 70ch !important;
      }

      /* Add visual hierarchy */
      h1, h2, h3 {
        margin-top: 2em !important;
        margin-bottom: 1em !important;
      }

      /* Highlight important content */
      strong, b {
        background-color: #fff3cd !important;
        padding: 0.2em 0.4em !important;
        border-radius: 4px !important;
      }

      /* Add spacing between sections */
      section, article {
        margin-bottom: 2em !important;
        padding: 1em !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function applySimplifiedContent(enable) {
    simplifiedEnabled = enable;
    if (enable) {
      simplifyContent();
    } else {
      const style = document.getElementById("simplified-content-style");
      if (style) {
        style.remove();
      }
    }
  }

  return {
    applyProfile: applySimplifiedContent,
  };
})();

const memorySupportManager = (function () {
  let memoryEnabled = false;
  const visitedElements = new Set();

  function highlightVisitedContent() {
    const style = document.createElement("style");
    style.id = "memory-support-style";
    style.textContent = `
      .visited-content {
        background-color: #e3f2fd !important;
        border-left: 4px solid #2196f3 !important;
        padding-left: 1em !important;
      }
    `;
    document.head.appendChild(style);

    // Track visited content
    document.addEventListener("click", (e) => {
      const target = e.target.closest("article, section, div");
      if (target && !visitedElements.has(target)) {
        visitedElements.add(target);
        target.classList.add("visited-content");
      }
    });
  }

  function applyMemorySupport(enable) {
    memoryEnabled = enable;
    if (enable) {
      highlightVisitedContent();
    } else {
      const style = document.getElementById("memory-support-style");
      if (style) {
        style.remove();
      }
      document.querySelectorAll(".visited-content").forEach((el) => {
        el.classList.remove("visited-content");
      });
      visitedElements.clear();
    }
  }

  return {
    applyProfile: applyMemorySupport,
  };
})();

const readingGuideManager = (function () {
  let guideEnabled = false;
  let guideElement = null;

  function createReadingGuide() {
    guideElement = document.createElement("div");
    guideElement.id = "reading-guide";
    guideElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #4169E1;
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(guideElement);
  }

  function updateGuidePosition(e) {
    if (guideEnabled && guideElement) {
      guideElement.style.top = `${e.clientY}px`;
      guideElement.style.opacity = "1";
    }
  }

  function applyReadingGuide(enable) {
    guideEnabled = enable;
    if (enable) {
      if (!guideElement) {
        createReadingGuide();
      }
      document.addEventListener("mousemove", updateGuidePosition);
    } else {
      if (guideElement) {
        guideElement.style.opacity = "0";
      }
      document.removeEventListener("mousemove", updateGuidePosition);
    }
  }

  return {
    applyProfile: applyReadingGuide,
  };
})();

const sensoryOverloadManager = (function () {
  let sensoryEnabled = false;

  function applySensoryAdjustments() {
    const style = document.createElement("style");
    style.id = "sensory-overload-style";
    style.textContent = `
      /* Reduce motion */
      * {
        animation: none !important;
        transition: none !important;
      }

      /* Reduce color intensity */
      body {
        background-color: #f8f9fa !important;
        color: #212529 !important;
      }

      /* Reduce visual noise */
      img, video {
        filter: grayscale(50%) !important;
      }

      /* Reduce contrast */
      * {
        background-color: #f8f9fa !important;
        color: #495057 !important;
      }

      /* Remove background images */
      * {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function applySensoryOverload(enable) {
    sensoryEnabled = enable;
    if (enable) {
      applySensoryAdjustments();
    } else {
      const style = document.getElementById("sensory-overload-style");
      if (style) {
        style.remove();
      }
    }
  }

  return {
    applyProfile: applySensoryOverload,
  };
})();

const focusEnhancementManager = (function () {
  let focusEnabled = false;

  function applyFocusEnhancement() {
    const style = document.createElement("style");
    style.id = "focus-enhancement-style";
    style.textContent = `
      /* Dim non-essential content */
      body > *:not(:hover) {
        opacity: 0.7 !important;
        transition: opacity 0.3s !important;
      }

      /* Highlight focused content */
      *:hover {
        opacity: 1 !important;
        background-color: #fff !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.1) !important;
      }

      /* Add focus ring */
      *:focus {
        outline: 3px solid #4169E1 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function applyFocusEnhancementProfile(enable) {
    focusEnabled = enable;
    if (enable) {
      applyFocusEnhancement();
    } else {
      const style = document.getElementById("focus-enhancement-style");
      if (style) {
        style.remove();
      }
    }
  }

  return {
    applyProfile: applyFocusEnhancementProfile,
  };
})();

// Add keyboard navigation manager
const keyboardNavigationManager = (function () {
  let keyboardNavEnabled = false;
  let lastFocusedElement = null;
  let lastAction = null;
  let actionHistory = [];
  let lastDescriptionTime = 0;
  const DESCRIPTION_DELAY = 2000; // 2 seconds delay between descriptions
  let speechQueue = [];
  let isSpeaking = false;
  let descriptionTimeout = null;
  let lastSpokenText = "";

  // Start automatically
  setTimeout(() => {
    applyKeyboardNavigation(true);
  }, 500);

  function showFeedback(message, type = "info") {
    const feedback = document.createElement("div");
    feedback.className = "ac-voice-feedback";
    feedback.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === "info" ? "#4169E1" : "#dc3545"};
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      font-size: 16px;
      animation: slideUp 0.3s ease;
      max-width: 80%;
      text-align: center;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Remove feedback after delay
    setTimeout(() => {
      feedback.style.animation = "slideDown 0.3s ease";
      setTimeout(() => feedback.remove(), 5000);
    }, 5000);
  }

  function applyKeyboardNavigation(enable) {
    keyboardNavEnabled = enable;
    // Store the state in localStorage
    localStorage.setItem("voiceAssistantEnabled", enable);

    if (enable) {
      // Add event listeners
      document.addEventListener("keydown", handleTabNavigation);
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("click", handleClick);
      document.addEventListener("wheel", handleScroll);

      // Add focus styles
      const style = document.createElement("style");
      style.id = "keyboard-navigation-style";
      style.textContent = `
        *:focus {
          outline: 3px solid #4169E1 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 10px rgba(65, 105, 225, 0.3) !important;
        }
      `;
      document.head.appendChild(style);

      // Show initial feedback
      showFeedback("Voice assistant activated", "info");
    } else {
      // Remove event listeners
      document.removeEventListener("keydown", handleTabNavigation);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("wheel", handleScroll);

      // Remove styles
      const style = document.getElementById("keyboard-navigation-style");
      if (style) {
        style.remove();
      }

      // Reset state
      lastFocusedElement = null;
      lastAction = null;
      actionHistory = [];
    }
  }

  // Check stored state on page load
  window.addEventListener("load", () => {
    const storedState = localStorage.getItem("voiceAssistantEnabled");
    if (storedState === "true" || storedState === null) {
      // Enable by default if no stored state
      applyKeyboardNavigation(true);
    }
  });

  return {
    applyProfile: applyKeyboardNavigation,
  };
})();

// Enable voice control and motor & mobility by default
document.addEventListener("DOMContentLoaded", () => {
  // Set motor & mobility as the default category
  localStorage.setItem("lastSelectedCategory", "sensory");

  // Initial delay to ensure DOM is loaded
  setTimeout(() => {
    // Find and activate the motor & mobility toggle
    const motorToggle = widget.querySelector('[data-profile="motor"]');
    if (motorToggle) {
      motorToggle.click(); // Enable motor & mobility profile
    }

    // Find and activate the keyboard navigation toggle for voice control
    const keyboardToggle = widget.querySelector('[data-profile="keyboard"]');
    if (keyboardToggle) {
      keyboardToggle.click(); // Enable keyboard navigation (voice control)
    }

    // Select the sensory category button
    const sensoryButton = widget.querySelector('[data-category="sensory"]');
    if (sensoryButton) {
      sensoryButton.click(); // Select sensory category
    }
  }, 1000);

  // Also try again after 2 seconds to catch any late-loading elements
  setTimeout(() => {
    const motorToggle = widget.querySelector('[data-profile="motor"]');
    const keyboardToggle = widget.querySelector('[data-profile="keyboard"]');
    const sensoryButton = widget.querySelector('[data-category="sensory"]');

    if (motorToggle && !motorToggle.classList.contains("active")) {
      motorToggle.click();
    }
    if (keyboardToggle && !keyboardToggle.classList.contains("active")) {
      keyboardToggle.click();
    }
    if (sensoryButton && !sensoryButton.classList.contains("active")) {
      sensoryButton.click();
    }
  }, 2000);
});

// Add voice control to widget elements
widget.addEventListener("click", (e) => {
  const target = e.target;
  if (
    target.classList.contains("ac-action-btn") ||
    target.classList.contains("ac-category-btn") ||
    target.classList.contains("ac-toggle")
  ) {
    const text = target.textContent.trim();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  }
});

// Function to categorize disease using ChatGPT API
async function categorizeDisease(disease) {
  const API_KEY =
    "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";
  const CATEGORIES = [
    "cognitive",
    "neurological",
    "motor & mobility",
    "sensory",
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Categorize the condition "${disease}" into exactly one of these categories: cognitive, neurological, motor & mobility, or sensory. Reply with just the category name, nothing else.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const category = data.choices[0].message.content.toLowerCase().trim();

    if (CATEGORIES.includes(category)) {
      console.log(`Disease: ${disease} - Category: ${category}`);

      // Store the disease and its category in localStorage
      const storedDiseases = JSON.parse(
        localStorage.getItem("diseases") || "{}"
      );
      storedDiseases[disease] = category;
      localStorage.setItem("diseases", JSON.stringify(storedDiseases));

      // Store this as the last selected category
      localStorage.setItem("lastSelectedCategory", category);

      // Select the category button and enable toggles
      enableTogglesForCategory(category);

      return category;
    } else {
      console.log(`Disease: ${disease} - Category: Could not be determined`);
      return null;
    }
  } catch (error) {
    console.error("Error categorizing disease:", error);
    return null;
  }
}

// Function to enable toggles for a specific category
function enableTogglesForCategory(category) {
  console.log("Enabling toggles for category:", category);

  // Store this as the last selected category
  localStorage.setItem("lastSelectedCategory", category);

  const categoryButtons = document.querySelectorAll(".ac-category-btn");
  const toggles = document.querySelectorAll(".ac-toggle");

  // First, deactivate all toggles
  toggles.forEach((toggle) => {
    if (toggle.classList.contains("active")) {
      toggle.click();
    }
  });

  // Then enable the selected category
  categoryButtons.forEach((btn) => {
    if (btn.dataset.category === category) {
      if (!btn.classList.contains("active")) {
        btn.click();
      }
    }
  });

  toggles.forEach((toggle) => {
    const profileItem = toggle.closest(".ac-profile-item");
    if (profileItem && profileItem.dataset.category === category) {
      if (!toggle.classList.contains("active")) {
        toggle.click();
      }
    }
  });
}

// Add click handlers for category buttons
document.querySelectorAll(".ac-category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    localStorage.setItem("lastSelectedCategory", category);
  });
});

// Check localStorage on page load and enable last selected category
document.addEventListener("DOMContentLoaded", () => {
  function initializeAccessibilitySettings() {
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
    console.log("Restoring last selected category:", lastSelectedCategory);

    if (lastSelectedCategory) {
      // First try to enable the category
      tryEnableCategory("lastSelectedCategory", lastSelectedCategory);
      console.log("Last selected category:", lastSelectedCategory);
      // Set up an observer to watch for changes in the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            tryEnableCategory(lastSelectedCategory);
          }
        });
      });

      // Start observing the document with the configured parameters
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  function tryEnableCategory(category) {
    const categoryButtons = document.querySelectorAll(".ac-category-btn");
    const toggles = document.querySelectorAll(".ac-toggle");

    if (categoryButtons.length > 0 && toggles.length > 0) {
      // First, ensure the correct category is selected
      categoryButtons.forEach((btn) => {
        if (btn.dataset.category === category) {
          if (!btn.classList.contains("active")) {
            btn.click();
          }
        }
      });

      // Then enable all toggles for that category
      toggles.forEach((toggle) => {
        const profileItem = toggle.closest(".ac-profile-item");
        if (profileItem && profileItem.dataset.category === category) {
          if (!toggle.classList.contains("active")) {
            toggle.click();
          }
        }
      });
    }
  }

  // Call restore function when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    // Initial delay to ensure DOM is loaded
    setTimeout(restoreSelectedCategory, 1000);

    // Also try again after 2 seconds to catch any late-loading elements
    setTimeout(restoreSelectedCategory, 2000);
  });
});

function applyColorBlindFilter(type) {
  const filter = colorBlindFilters[type] || "none";
  document.body.style.filter = filter;
}
document.querySelectorAll(".cb-sim-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    applyColorBlindFilter(btn.dataset.filter);
  });
});


document.body.addEventListener("click", (e) => {
  const item = e.target.closest(".cb-palette-item");
  if (item) {
    e.preventDefault(); // Only prevent default for palette items
    const type = item.dataset.filter;
    applyColorBlindFilter(type);
  }
});


``
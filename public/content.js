// Create and inject the widget container
const container = document.createElement("div");
container.id = "accessibility-widget-root";
document.body.appendChild(container);

// Create the floating button
const button = document.createElement("button");
button.innerHTML = "♿";
button.style.cssText = `
  position: fixed;
  right: 20px;
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
  transition: transform 0.2s;
  z-index: 10000;
`;

// Create the widget panel
const widget = document.createElement("div");
widget.style.cssText = `
  position: fixed;
  top: 0;
  right: -420px;
  height: 100vh;
  width: 400px;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 10001;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

// Add the widget content
widget.innerHTML = `
  <div style="background: #4169E1; color: white; padding: 20px;">
    <h2 style="margin: 0; font-size: 24px;">Accessibility Adjustments</h2>
    <div style="display: flex; gap: 10px; margin-top: 15px;">
      <button class="ac-action-btn">↺ Reset Settings</button>
      <button class="ac-action-btn">📢 Statement</button>
      <button class="ac-action-btn" id="ac-close-btn">✕ Close</button>
    </div>
  </div>
  
  <div style="padding: 20px;">
    <input type="text" placeholder="Unclear content? Search in dictionary..." 
           style="width: 100%; padding: 12px; border-radius: 25px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
    
    <h3 style="margin: 0 0 20px;">Choose the right accessibility profile for you</h3>
    
    <div class="ac-profile-list"></div>
  </div>
`;

// Add the profiles
const profiles = [
  {
    id: "seizure",
    title: "Seizure Safe Profile",
    description: "Clear flashes & reduces color",
    icon: "⚡",
  },
  {
    id: "vision",
    title: "Vision Impaired Profile",
    description: "Enhances website's visuals",
    icon: "👁",
  },
  {
    id: "adhd",
    title: "ADHD Friendly Profile",
    description: "More focus & fewer distractions",
    icon: "🔲",
  },
  {
    id: "cognitive",
    title: "Cognitive Disability Profile",
    description: "Assists with reading & focusing",
    icon: "🎯",
  },
  {
    id: "keyboard",
    title: "Keyboard Navigation (Motor)",
    description: "Use website with the keyboard",
    icon: "⌨️",
  },
  {
    id: "blind",
    title: "Blind Users (Screen Reader)",
    description: "Optimized for screen readers",
    icon: "🔊",
  },
];

// Add styles for action buttons
const style = document.createElement("style");
style.textContent = `
  .ac-action-btn {
    background: white;
    border: none;
    border-radius: 25px;
    padding: 8px 20px;
    color: #4169E1;
    font-weight: 500;
    cursor: pointer;
  }
  
  .ac-profile-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .ac-toggle {
    width: 100px;
    height: 36px;
    background: #e9ecef;
    border-radius: 18px;
    position: relative;
    cursor: pointer;
    margin-right: 15px;
  }
  
  .ac-toggle-button {
    width: 28px;
    height: 28px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
    transition: left 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .ac-toggle.active .ac-toggle-button {
    left: 68px;
  }
`;

document.head.appendChild(style);

const profileList = widget.querySelector(".ac-profile-list");
profiles.forEach((profile) => {
  const item = document.createElement("div");
  item.className = "ac-profile-item";
  item.innerHTML = `
    <div class="ac-toggle" data-profile="${profile.id}">
      <div class="ac-toggle-button"></div>
    </div>
    <div style="flex: 1">
      <h3 style="margin: 0; font-size: 16px;">${profile.title}</h3>
      <p style="margin: 4px 0 0; color: #6c757d;">${profile.description}</p>
    </div>
    <div style="margin-left: 10px; font-size: 20px;">${profile.icon}</div>
  `;
  profileList.appendChild(item);
});

button.addEventListener("click", () => {
  widget.style.right = "0";
});

widget.querySelector("#ac-close-btn").addEventListener("click", () => {
  widget.style.right = "-420px";
});

const seizureSafetyManager = (function() {
  function scanForTriggers() {
    const triggers = {
      flashingElements: [],
      highContrastElements: []
    };

    const allElements = document.body.getElementsByTagName('*');
    
    for (let element of allElements) {
      const computedStyle = window.getComputedStyle(element);
      const animation = computedStyle.animation || computedStyle.webkitAnimation;
      
      if (animation && (animation.includes('blink') || animation.includes('flash'))) {
        triggers.flashingElements.push(element);
      }

      const backgroundColor = computedStyle.backgroundColor;
      const backgroundImage = computedStyle.backgroundImage;
      
      if (backgroundColor === 'transparent' || backgroundImage.includes('gradient')) {
        triggers.highContrastElements.push(element);
      }
    }

    return triggers;
  }

  const originalStyles = {
    body: {},
    flashingElements: [],
    highContrastElements: []
  };

  function applyProtection(active) {
    const detectedTriggers = scanForTriggers();

    if (active) {
      originalStyles.body.filter = document.body.style.filter;
      
      document.body.style.filter = 'saturate(0.5) contrast(0.8) brightness(0.9)';
      
      detectedTriggers.flashingElements.forEach((element, index) => {
        originalStyles.flashingElements[index] = {
          animation: element.style.animation,
          transition: element.style.transition,
          opacity: element.style.opacity
        };

        element.style.animation = 'none';
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '0.7';
      });

      detectedTriggers.highContrastElements.forEach((element, index) => {
        originalStyles.highContrastElements[index] = {
          backgroundColor: element.style.backgroundColor,
          color: element.style.color
        };

        element.style.backgroundColor = '#f0f0f0';
        element.style.color = '#333';
      });

      const overlay = document.createElement('div');
      overlay.id = 'seizure-safe-overlay';
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
      document.body.style.filter = originalStyles.body.filter || '';
      
      detectedTriggers.flashingElements.forEach((element, index) => {
        const originalStyle = originalStyles.flashingElements[index] || {};
        element.style.animation = originalStyle.animation || '';
        element.style.transition = originalStyle.transition || '';
        element.style.opacity = originalStyle.opacity || '1';
      });

      detectedTriggers.highContrastElements.forEach((element, index) => {
        const originalStyle = originalStyles.highContrastElements[index] || {};
        element.style.backgroundColor = originalStyle.backgroundColor || '';
        element.style.color = originalStyle.color || '';
      });

      const overlay = document.getElementById('seizure-safe-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }

  return {
    applyProtection: applyProtection
  };
})();

widget.querySelectorAll(".ac-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    const profileId = toggle.dataset.profile;

    if (profileId === "seizure") {
      seizureSafetyManager.applyProtection(
        toggle.classList.contains("active")
      );
    }
  });
});

document.body.appendChild(button);
document.body.appendChild(widget);

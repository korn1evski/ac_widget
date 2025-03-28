# Accessibility Widget

A React-based accessibility widget that provides various accessibility profiles for different user needs. This widget is designed to be easily integrated into any website and provides a user-friendly interface for accessibility adjustments.

## Features

- Seizure Safe Profile
- Vision Impaired Profile
- ADHD Friendly Profile
- Cognitive Disability Profile
- Keyboard Navigation
- Screen Reader Optimization
- Modern, clean UI
- Responsive design

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

## Usage

To use this widget in your React application:

```jsx
import AccessibilityWidget from "./components/AccessibilityWidget";

function App() {
  return (
    <div>
      <AccessibilityWidget />
      {/* Your app content */}
    </div>
  );
}
```

## Converting to Chrome Extension

To convert this widget into a Chrome extension:

1. Create a `manifest.json` file in the project root with the following content:

```json
{
  "manifest_version": 3,
  "name": "Accessibility Widget",
  "version": "1.0",
  "description": "A widget to enhance web accessibility",
  "permissions": ["activeTab"],
  "action": {
    "default_popup": "index.html"
  }
}
```

2. Build the React app:

```bash
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build` folder

## Development

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from create-react-app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

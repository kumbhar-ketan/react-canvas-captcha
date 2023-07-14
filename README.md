# React Canvas Captcha

Add captcha to your react projects

## Installation

```bash
  npm install react-canvas-captcha
```

OR

```bash
  yarn add react-canvas-captcha
```

## Usage

```javascript
import Captcha from "react-canvas-captcha";

const App = () => {
  return (
    <Captcha
      boxHeight={50}
      boxWidth={100}
      captchaConfig={{
        numberOfChars: 4,
        font: "bold 23px Arial",
        textStartingX: 15,
        textStartingY: 5,
      }}
    />
  );
};

export default App;
```

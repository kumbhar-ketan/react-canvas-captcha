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
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

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
      setCode={(captchaCode) => setGeneratedCaptcha(captchaCode)}
    />
  );
};

export default App;
```

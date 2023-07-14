import { memo, useEffect, useRef, useState } from "react";

const randomColor = () => {
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

const createCaptcha = (canvas, config) => {
  let showNum = [];
  let canvasWidth = config?.boxWidth;
  let canvasHeight = config.boxHeight;
  let context = canvas.getContext('2d');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let sCode = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9';
  let saCode = sCode.split(',');
  let saCodeLen = saCode.length;
  for (let i = 0; i < config?.numberOfChars; i++) {
    let sIndex = Math.floor(Math.random()*saCodeLen);
    let sDeg = (Math.random()*30*Math.PI) / 180;
    let cTxt = saCode[sIndex];
    showNum[i] = cTxt.toLowerCase();
    let x = 10 + i*20;
    let y = 20 + Math.random()*8;
    context.font = config?.font;
    context.translate(x, y);
    context.rotate(sDeg);

    context.fillStyle = randomColor();
    context.fillText(cTxt, config?.textStartingX, config?.textStartingY);

    context.rotate(-sDeg);
    context.translate(-x, -y);
  }
  for (let i = 0; i <= 5; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(
      Math.random() * canvasWidth,
      Math.random() * canvasHeight
    );
    context.lineTo(
      Math.random() * canvasWidth,
      Math.random() * canvasHeight
    );
    context.stroke();
  }
  for (let i = 0; i < 30; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight;
    context.moveTo(x,y);
    context.lineTo(x+1, y+1);
    context.stroke();
  }
  return showNum.join('');
};

const Captcha = ({ boxWidth, boxHeight, captchaConfig, setCode }) => {
  const canvasRef = useRef();
  const [captchaCode, setCaptchaCode] = useState('');

  const onChangeCaptcha = () => {
    const newCaptcha = createCaptcha(canvasRef.current, { boxHeight, boxWidth, ...captchaConfig});
    setCaptchaCode(newCaptcha);
  }

  useEffect(() => {
    setCode(captchaCode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaCode]);

  useEffect(() => {
    const newCaptcha = createCaptcha(canvasRef.current, { boxHeight, boxWidth, ...captchaConfig});
    setCaptchaCode(newCaptcha);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="captchaContainer" style={{ display: 'flex', alignItems: 'center' }}>
      <canvas
        id="captcha"
        ref={canvasRef}
        width={boxWidth}
        height={boxHeight}
        style={{ borderRadius: 4, backgroundColor: "#d1d399" }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-arrow-clockwise"
        viewBox="0 0 16 16"
        onClick={onChangeCaptcha}
      >
        <path
          fillRule="evenodd"
          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
        />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
      </svg>
    </div>
  );
};

Captcha.defaultProps = {
  boxHeight: 50,
  boxWidth: 130,
  captchaConfig: {
    numberOfChars: 4,
    font: 'bold 23px Arial',
    textStartingX: 15,
    textStartingY: 5
  },
  setCode: () => {}
};

export default memo(Captcha);

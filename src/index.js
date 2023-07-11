import { useEffect, useRef, useState } from "react";
import useGenerateCaptcha from "./useGenerateCaptcha";

const Captcha = ({ boxWidth, boxHeight, captchaConfig, setCode }) => {
  const canvasRef = useRef();
  const { createCaptcha } = useGenerateCaptcha();
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
    boxHeight: 50,
    boxWidth: 130,
    numberOfChars: 4,
    font: 'bold 23px Arial',
    textStartingX: 15,
    textStartingY: 5
  },
  setCode: () => {}
};

export default Captcha;

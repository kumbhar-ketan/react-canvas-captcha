const useGenerateCaptcha = () => {
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

  return {
    createCaptcha
  };
};

export default useGenerateCaptcha;

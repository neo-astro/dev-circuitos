class AudioVisualizer {
  constructor(audioContext, processFrame) {
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(this.connectStream)
      .catch((error) => {
        alert('Se ha iterrumpido la entrada de audio')
      });
  }

  connectStream(stream) {
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.fftSize = 32;

    this.initRenderLoop(this.analyser);
  }

  initRenderLoop() {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    const processFrame = this.processFrame || (() => { });

    const renderFrame = () => {
      this.analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);

      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }
}




const visualMainElement = document.getElementById('soundContainer');
const visualValueCount = 16;
let visualElements;




const createDOMElements = () => {
  let i;
  for (i = 0; i < visualValueCount; ++i) {
    const elm = document.createElement('div');
    visualMainElement.appendChild(elm);
  }

  visualElements = document.querySelectorAll('#soundContainer div');
};


function init() {
  createDOMElements();


  // Swapping values around for a better visual effect
  const dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 13, 14: 14, 15: 14 };
  const processFrame = (data) => {
    const values = Object.values(data);
    let i;
    for (i = 0; i < visualValueCount; ++i) {
      const value = values[dataMap[i]] / 255;
      const elmStyles = visualElements[i].style;
      elmStyles.transform = `scaleY( ${value} )`;
      elmStyles.opacity = Math.max(.25, value);
    }
  };



  const a = new AudioVisualizer(new AudioContext(), processFrame);

};


// chat

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// const recognition = new webkitSpeechRecognition();
// recognition.continuous = true;
// recognition.interimResults = true;

// var audioContext = null
// let analyser = null
// let dataArray = null
// function ver(){
//   audioContext= new AudioContext();
//   analyser = audioContext.createAnalyser();
//   analyser.fftSize = 512;
//   dataArray = new Uint8Array(analyser.frequencyBinCount);
//   console.log('mesnaje' , dataArray);
//   recognition.onspeechstart = function() {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
//       const microphone = audioContext.createMediaStreamSource(stream);
//       microphone.connect(analyser);
//       actualizarBarras();
//     });
//   }

// }


// const visualizacion = document.getElementById('visualizacion');
// const barras = visualizacion.querySelectorAll('.barra');

// function actualizarBarras() {
//   requestAnimationFrame(actualizarBarras);
//   analyser.getByteFrequencyData(dataArray);
//   barras.forEach((barra, index) => {
//     barra.style.height = `${dataArray[index]}%`;
//   });
// }

// recognition.onresult = function(event) {
//   const transcript = event.results[0][0].transcript;
//   console.log(transcript);
// }

// // recognition.onspeechstart = function() {
// //   navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
// //     const microphone = audioContext.createMediaStreamSource(stream);
// //     microphone.connect(analyser);
// //     actualizarBarras();
// //   });
// // }

// recognition.onspeechend = function() {
//   analyser.disconnect();
// }

// recognition.start();
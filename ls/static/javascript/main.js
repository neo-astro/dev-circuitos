let rec;
let statusRec=false;
let lista = [];
let salir = false;

if(!("webkitSpeechRecognition" in window)){
  alert("no puede usar la api")
}
else {
  rec=new webkitSpeechRecognition();
  rec.lang = "es-AR";
  rec.continuous = true;
  rec.interim = true;
  rec.addEventListener("result",iniciar)
}




function iniciar(event) {
  for (i = event.resultIndex; i< event.results.length; i++) {
    document.getElementById('texto').innerHTML= event.results[i][0].transcript;
    lista.push(event.results[i][0].transcript)
    console.log(lista)
    }
  }


function changeStatusRec(){
  statusRec = !statusRec
  !statusRec ? rec.abort():rec.start()
}




// frontend 

/*  play button */
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');

playBtn.addEventListener('click', function (e) {
  e.preventDefault();
  play.classList.toggle('visibility');
  pause.classList.toggle('visibility');
  playBtn.classList.toggle('shadow');
  wave2.classList.toggle('pause');
  wave1.classList.toggle('pause');
});
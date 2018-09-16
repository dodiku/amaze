// var idleTime = 0;

function keyTyped() {
  if (key) {
    // window.clearTimeout();
    // startIdleTimer();
    if (stackArchivePosition < stackArchive.length) {
      let next = stackArchive[stackArchivePosition]
      console.log('-->', next)
      if (key.toLowerCase() === next.letter.toLowerCase()) {
        current = grid[index(next.i, next.j)]
        stackArchivePosition += 1
        window.setTimeout(showHint(next), 10000);
      }
    }
  }
}

function showHint(x) {
  var elt = document.getElementById('morse');
  // var div1 = createDiv('this is the child');
  // div1.id('moose');
  // elt.child(div1)

  elt.innerHTML = x.morse.toLowerCase();
  for (let i in englishToMorse) {
    if (i == x.morse.toLowerCase()) {
      elt.innerHTML += englishToMorse[i];
    }
  }
}

// const morseToEnglish = {
//   '.-': 'a',
//   '-...': 'b',
//   '-.-.': 'c',
//   '-..': 'd',
//   '.': 'e',
//   '..-.': 'f',
//   '--.': 'g',
//   '....': 'h',
//   '..': 'i',
//   '.---': 'j',
//   '-.-': 'k',
//   '.-..': 'l',
//   '--': 'm',
//   '-.': 'n',
//   '---': 'o',
//   '.--.': 'p',
//   '--.-': 'q',
//   '.-.': 'r',
//   '...': 's',
//   '-': 't',
//   '..-': 'u',
//   'c': 'v',
//   '.--': 'w',
//   '-..-': 'x',
//   '-.--': 'y',
//   '--..': 'z'
// };

// const englishToMorse = {
//   'a': '.-',
//   'b': '-...',
//   'c': '-.-.',
//   'd': '-..',
//   'e': '.',
//   'f': '..-.',
//   'g': '--.',
//   'h': '....',
//   'i': '..',
//   'j': '.---',
//   'k': '-.-',
//   'l': '.-..',
//   'm': '--',
//   'n': '-.',
//   'o': '---',
//   'p': '.--.',
//   'q': '--.-',
//   'r': '.-.',
//   's': '...',
//   't': '-',
//   'u': '..-',
//   'v': '...-',
//   'w': '.--',
//   'x': '-..-',
//   'y': '-.--',
//   'z': '--..',
// };

//
// function startIdleTimer() {
//         // $(document).ready(function () {
//             //Increment the idle time counter every second.
//         setInterval(timerIncrement(idleTime), 1000); // 1 second
//
//             //Zero the idle timer on any movement.
//         if (key) {
//             idleTime = 0;
//         }
//     // });
// }
//
// function timerIncrement() {
//     idleTime = idleTime + 1;
//     console.log(idleTime);
//     if (idleTime > 2) { // 1 minute
//         //show hint
//         console.log('show hint');
//         idleTime = 0;
//     }
// }

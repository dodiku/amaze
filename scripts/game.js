// var idleTime = 0;

function keyTyped() {
    if (key) {
      // window.clearTimeout();
      // startIdleTimer();
      if (stackArchivePosition < stackArchive.length) {
        let next = stackArchive[stackArchivePosition];
        if (key.toLowerCase() === next.morse.toLowerCase()) {
          current = grid[index(next.i, next.j)];
          stackArchivePosition += 1;
          // window.setTimeout(showHint(), 3000);
        }
      } else {
          //finished
      }
    }
}

// function showHint() {
//     console.log('showHint');
// }
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
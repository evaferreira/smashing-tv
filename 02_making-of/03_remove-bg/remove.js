
video = document.getElementById("video");
c1 = document.getElementById("canvas1");
ctx1 = this.c1.getContext("2d");

// Get video
navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    // Put video input into video tag
    video.srcObject = stream;

    let self = this;
    
    this.video.addEventListener("loadeddata", function() {
      self.width = self.video.videoWidth;
      self.height = self.video.videoHeight;

      self.time_callback();

    }, false);
  })
  .catch(function (error) {
      console.log("Error:", error);
  });

function draw () {
  ctx1.drawImage(video, 0, 0, this.width, this.height);
}


function time_callback () {
  if (video.paused || video.ended) {
    return;
  }

  draw();
  findGreen();

  // Update
  setTimeout(function () {
    this.time_callback();
  }, 0);
};

function findGreen () {
  let frame = this.ctx1.getImageData(0, 0, this.width, this.height);

  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];

    if (g > r && g > b) {
      if (g > 100 ) {
        frame.data[i * 4 + 3] = 0;
      }
    }
  }

  this.ctx1.putImageData(frame, 0, 0);
  return;
}

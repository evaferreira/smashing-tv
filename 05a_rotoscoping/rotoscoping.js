
video = document.getElementById("video");
c1 = document.getElementById("canvas1");
c2 = document.getElementById("canvas2");
c3 = document.getElementById("canvas3");
ctx1 = this.c1.getContext("2d");
ctx2 = this.c2.getContext("2d");
ctx3 = this.c3.getContext("2d");

// Get video

// Use "play" instead of loadeddata this time for already recorded videos
video.addEventListener("play", function() {
  self.width = self.video.videoWidth;
  self.height = self.video.videoHeight;

  self.time_callback();

}, false);

function draw () {
  ctx1.drawImage(video, 0, 0, this.width, this.height);
}


function time_callback () {
  if (video.paused || video.ended) {
    return;
  }

  draw();
  findColor(color);

  // Update
  setTimeout(function () {
    this.time_callback();
  }, 0);
};


function pickedFilter () {
	var selector = document.getElementById("colorFilter");
  color = selector.options[selector.selectedIndex].value;

  time_callback();
}

pickedFilter();
colorFilter.addEventListener("change", pickedFilter);

function findColor (color) {
  let frame =  this.ctx1.getImageData(0, 0, this.width, this.height);
  let frame2 = this.ctx1.getImageData(0, 0, this.width, this.height);
  let frame3 = this.ctx1.getImageData(0, 0, this.width, this.height);

  let l = frame.data.length / 4;
  
	if (color === "Green") {
    for (let i = 0; i < l; i++) {
    
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      if (g > r && g > b) {
        if (g > 100 ) {
          frame.data[i * 4 + 3] = 0;
          frame2.data[i * 4 + 3] = 0;
          frame3.data[i * 4 + 3] = 0;
        }
      } else {
				frame2.data[i * 4 + 0] = 200;
				frame3.data[i * 4 + 0] = 200;
				frame2.data[i * 4 + 2] = 200;
				frame3.data[i * 4 + 2] = 200;
			}
    }
  } else {
    for (let i = 0; i < l; i++) {
    
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      if (b > r && b > g) {
        if (b > 100 ) {
          frame.data[i * 4 + 3] = 0;
        }
      }
    }
  }

  this.ctx1.putImageData(frame, 0, 0);
  this.ctx2.putImageData(frame2, 0, 0);
  this.ctx3.putImageData(frame3, 0, 0);
  return;
}

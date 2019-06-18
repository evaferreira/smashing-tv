
// Get video
navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    document.getElementById('video').srcObject = stream;
  })
  .catch(function (error) {
      console.log("Error:", error);
  });
const $ = document.querySelector.bind(document);

video = $(".player");
canvas = $(".photo");
ctx = canvas.getContext("2d");
takePhoto = $(".take-photo");
snap = $(".snap");
strip = $(".strip");

const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("Cannot access to your camera", err);
    });
};

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
};

const takeAPhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");

  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "me");
  link.innerHTML = `<img src=${data} alt="photo of me" />`;
  strip.insertBefore(link, strip.firstChild);
};

video.addEventListener("canplay", paintToCanvas);

takePhoto.addEventListener("click", takeAPhoto);

getVideo();

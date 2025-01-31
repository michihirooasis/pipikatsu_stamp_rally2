const startScanButton = document.getElementById("start-scan");
const stopScanButton = document.getElementById("stop-scan");
const qrScannerSection = document.getElementById("qr-scanner");
const homeSection = document.getElementById("home");

let qrCodeReader = null;

// カメラが利用可能か確認
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    const cameras = devices.filter(device => device.kind === 'videoinput');
    if (cameras.length === 0) {
      console.error("利用可能なカメラが見つかりません");
    } else {
      console.log("利用可能なカメラ:", cameras);
    }
  })
  .catch(err => {
    console.error("カメラの確認中にエラーが発生しました:", err);
  });

startScanButton.addEventListener("click", () => {
  homeSection.style.display = "none";
  qrScannerSection.style.display = "block";

  qrCodeReader = new Html5Qrcode("qr-reader");

  qrCodeReader.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    (decodedText) => {
      alert(`読み取った内容: ${decodedText}`);
      qrCodeReader.stop();
      qrScannerSection.style.display = "none";
      homeSection.style.display = "block";
    },
    (error) => {
      console.warn("スキャン中のエラー:", error);
    }
  ).catch((err) => {
    console.error("カメラの起動に失敗しました:", err);
    alert(`カメラを起動できませんでした: ${err.message}`);
  });
});

stopScanButton.addEventListener("click", () => {
  if (qrCodeReader) {
    qrCodeReader.stop();
    qrCodeReader.clear();
  }
  qrScannerSection.style.display = "none";
  homeSection.style.display = "block";
});
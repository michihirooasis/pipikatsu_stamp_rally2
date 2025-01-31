const startScanButton = document.getElementById("start-scan");
const stopScanButton = document.getElementById("stop-scan");
const qrScannerSection = document.getElementById("qr-scanner");
const homeSection = document.getElementById("home");
const qrReader = document.getElementById("qr-reader"); // スキャン領域

let qrCodeReader = null;

startScanButton.addEventListener("click", () => {
  homeSection.style.display = "none";
  qrScannerSection.style.display = "block";

  // カメラへのアクセス許可を求める
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      qrCodeReader = new Html5Qrcode("qr-reader");

      qrCodeReader.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log("読み取った内容:", decodedText); // ログに詳細情報を出力
          alert(`読み取った内容: ${decodedText}`);
          qrCodeReader.stop();
          qrScannerSection.style.display = "none";
          homeSection.style.display = "block";
        },
        (error) => {
          console.error("スキャン中のエラー:", error); // ログに詳細情報を出力
          alert("QRコードスキャン中にエラーが発生しました。");
        }
      ).catch((err) => {
        console.error("カメラの起動に失敗しました:", err); // ログに詳細情報を出力
        alert(`カメラを起動できませんでした: ${err.message}`);
      });
    })
    .catch(err => {
      console.error("カメラへのアクセスが拒否されました:", err); // ログに詳細情報を出力
      alert("カメラへのアクセスが許可されていません。");
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

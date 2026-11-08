// ===== 變數宣告區 =====
let fellImg;                 // 用來存放 fell.png 圖片精靈

const TOTAL_FRAMES = 17;     // fell.png 內共有 17 張照片
let frameW;                  // 單張照片的寬度（等圖片載入後自動計算）
let frameH;                  // 單張照片的高度（等圖片載入後自動計算）

let frameIndex = 0;          // 目前播放到第幾張（從 0 開始）
const FRAME_DELAY = 6;       // 每隔幾個 draw 畫面才換下一張（數字越大越慢）

// ===== preload：在 setup 之前先載入圖片 =====
function preload() {
  fellImg = loadImage('fell.png');         // 載入 fell.png 圖片精靈
}

// ===== setup：程式開始時只執行一次 =====
function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布，寬高等於視窗大小
  imageMode(CENTER);                       // 設定圖片以中心點為基準來定位

  frameW = fellImg.width / TOTAL_FRAMES;   // 單張寬度 = 整張圖片寬度 ÷ 張數
  frameH = fellImg.height;                 // 單張高度 = 整張圖片的高度（橫向排列，高度都一樣）

  // 在瀏覽器的 Console 印出實際尺寸，方便你確認
  console.log('圖片總寬度：', fellImg.width, '圖片高度：', fellImg.height);
  console.log('單張寬度：', frameW, '單張高度：', frameH);
}

// ===== draw：每一幀都會重複執行 =====
function draw() {
  background('#edf2fb');                   // 設定背景顏色為 edf2fb

  // 每經過 FRAME_DELAY 個畫面，就換到下一張照片
  if (frameCount % FRAME_DELAY === 0) {
    frameIndex = (frameIndex + 1) % TOTAL_FRAMES; // 加 1，超過最後一張就回到第 0 張（循環播放）
  }

  // 計算目前這張照片在圖片精靈中的 x 起點位置
  let sx = frameIndex * frameW;

  image(
    fellImg,                               // 要繪製的圖片精靈
    width / 2,                             // 畫在畫布中間的 x 位置
    height / 2,                            // 畫在畫布中間的 y 位置
    frameW,                                // 繪製在畫面上的寬度
    frameH,                                // 繪製在畫面上的高度
    sx,                                    // 從圖片精靈的 x 位置開始裁切
    0,                                     // 從圖片精靈的 y 位置開始裁切（橫向排列所以是 0）
    frameW,                                // 裁切的寬度
    frameH                                 // 裁切的高度
  );
}

// =====
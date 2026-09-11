import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("vng");
  const [progress, setProgress] = useState(0);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const TOTAL_MB = 1943.48;

  useEffect(() => {
    // =========================
    // MÀN VNG GAMES: 2 GIÂY
    // =========================
    const vngTimer = setTimeout(() => {
      setScreen("play");
    }, 2000);

    return () => clearTimeout(vngTimer);
  }, []);

  useEffect(() => {
    if (screen !== "play") return;

    // =========================
    // LOADING: 4.5 GIÂY
    // =========================
    const duration = 4500;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const percent = Math.min(
        (elapsed / duration) * 100,
        100
      );

      setProgress(percent);

      // Đủ 100% -> màn cuối
      if (percent >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setScreen("final");
        }, 300);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [screen]);

  const loadedMB = Math.floor(
    (progress / 100) * TOTAL_MB
  );

  return (
    <div className="app">

      {/* =========================================
          1. VNG GAMES
      ========================================= */}
      {screen === "vng" && (
        <div className="vng-screen">
          <img
            src="/vnggames_logo.jpg"
            alt="VNG Games"
            className="vng-logo"
          />
        </div>
      )}

      {/* =========================================
          2. PLAY GAME + LOADING
      ========================================= */}
      {screen === "play" && (
        <div className="play-screen">

          <img
            src="/ananta.png"
            alt="ANANTA"
            className="game-background"
          />

          {/* Loading */}
          <div className="loading-container">

            <div className="loading-info">
              <span>
                Đang tải...
              </span>

              <span>
                {loadedMB.toLocaleString("en-US")} MB /{" "}
                {TOTAL_MB.toLocaleString("en-US")} MB
              </span>
            </div>

            <div className="loading-bar">
              <div
                className="loading-progress"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="loading-percent">
              {Math.floor(progress)}%
            </div>

          </div>
        </div>
      )}

      {/* =========================================
          3. MÀN HÌNH CUỐI
      ========================================= */}
      {screen === "final" && (
        <div className="final-screen">

          <img
            src="/ananta-final.png"
            alt="ANANTA"
            className="final-image"
          />

          {/* =====================================
              MODAL THÔNG BÁO
          ===================================== */}
          <div className="update-modal">

            <div className="update-modal-title">
              Đã có bản mới nhất
            </div>

            <div className="update-modal-size">
              3456.98 MB
            </div>

            <div className="update-modal-message">
              Vui lòng đăng nhập để tải xuống
            </div>

            {/* 2 NÚT X + V */}
            <div className="update-modal-buttons">

              <button
                type="button"
                className="update-btn update-btn-x"
                onClick={() => {}}
              >
                ×
              </button>

              <button
                type="button"
                className="update-btn update-btn-check"
                onClick={() => {}}
              >
                ✓
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;
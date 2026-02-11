:root {
  --gold: #d8b24a;
  --bg-black: #050604;
  --army-green: #1a1f16;
  --glass: rgba(20, 25, 15, 0.9);
  --border: rgba(216, 178, 74, 0.3);
}

body {
  margin: 0; padding: 0; background: var(--bg-black);
  color: #fff; font-family: 'Segoe UI', sans-serif; overflow-x: hidden;
}

/* --- Intro --- */
#intro-screen {
  position: fixed; inset: 0; background: #000; z-index: 9999;
  display: flex; justify-content: center; align-items: center;
  animation: fadeOut 1s forwards 5s;
}
.intro-box { text-align: center; position: relative; }
.intro-logo { width: 180px; filter: drop-shadow(0 0 15px var(--gold)); margin-bottom: 20px; }
.laser-scan {
  position: absolute; width: 100%; height: 2px; background: var(--gold);
  box-shadow: 0 0 20px var(--gold); animation: scan 2s infinite linear;
}
.loading-bar { width: 300px; height: 4px; background: #222; margin: 20px auto; }
.progress { width: 0%; height: 100%; background: var(--gold); animation: load 4.5s linear forwards; }

/* --- Background --- */
.army-background { position: fixed; inset: 0; z-index: -2; overflow: hidden; }
.grid-overlay {
  position: absolute; width: 200%; height: 200%;
  background-image: linear-gradient(var(--border) 1px, transparent 1px), 
                    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 50px 50px; transform: rotateX(60deg) translateY(-10%);
  animation: moveGrid 15s linear infinite;
}
.radar-circle {
  position: absolute; top: 50%; left: 50%; width: 600px; height: 600px;
  border: 1px solid var(--border); border-radius: 50%; transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(216,178,74,0.05) 0%, transparent 70%);
}

/* --- Layout --- */
.main-content { padding: 20px; opacity: 0; animation: fadeIn 1s forwards 5.5s; }
header {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--glass); border: 2px solid var(--gold); padding: 15px;
  border-radius: 10px; margin-bottom: 20px; backdrop-filter: blur(10px);
}
.header-logo { width: 60px; }
.dashboard { display: grid; grid-template-columns: 1fr 400px; gap: 20px; }

.lane-box { background: var(--glass); border: 1px solid var(--border); border-radius: 8px; padding: 10px; }
.lane-title { color: var(--gold); border-bottom: 1px solid var(--border); padding-bottom: 5px; margin-bottom: 10px; }
.drop-zone { min-height: 80px; display: flex; flex-wrap: wrap; gap: 8px; padding: 10px; border: 1px dashed #444; }

.unit-card {
  background: #2a2d24; border: 1px solid var(--gold); padding: 5px 12px;
  border-radius: 4px; cursor: grab; font-weight: bold; font-size: 0.9rem;
}

/* --- Animations --- */
@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
@keyframes load { 0% { width: 0; } 100% { width: 100%; } }
@keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
@keyframes fadeIn { to { opacity: 1; } }
@keyframes moveGrid { from { transform: perspective(500px) rotateX(60deg) translateY(0); } to { transform: perspective(500px) rotateX(60deg) translateY(50px); } }

/* Inputs & Buttons */
input, textarea { width: 100%; padding: 10px; background: #000; border: 1px solid var(--border); color: var(--gold); margin-bottom: 8px; }
.btn-time { background: #1a1f16; color: var(--gold); border: 1px solid var(--gold); padding: 10px; cursor: pointer; font-weight: bold; width: 48%; }
.btn-copy { background: var(--gold); color: #000; font-weight: bold; width: 100%; padding: 12px; border: none; cursor: pointer; margin-top: 10px; }

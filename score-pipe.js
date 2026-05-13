(function () {
  // wait until Supabase + your pipe exist
  function waitForPipe(cb) {
    const t = setInterval(() => {
      if (window.PIPE) {
        clearInterval(t);
        cb();
      }
    }, 50);
  }

  function extractScoreboard() {
    // TRY 1: common scoreboard elements
    const candidates = [
      "#score",
      ".score",
      "#scoreboard",
      ".scoreboard",
      "[data-score]"
    ];

    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (el) {
        return {
          selector: sel,
          text: el.innerText,
          html: el.innerHTML
        };
      }
    }

    return null;
  }

  function capture() {
    const board = extractScoreboard();

    PIPE({
      type: "scoreboard_capture",
      url: location.href,
      timestamp: Date.now(),
      scoreboard: board
    });
  }

  waitForPipe(() => {
    // 1. capture on submit buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button, input[type='submit']");
      if (!btn) return;

      setTimeout(capture, 50);
    });

    // 2. also capture on form submit
    document.addEventListener("submit", () => {
      setTimeout(capture, 50);
    });
  });
})();
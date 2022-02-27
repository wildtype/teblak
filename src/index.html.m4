<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Teblak</title>
  <script>
include(src/js/idWords.js)
  </script>
</head>
<body>
  <div class="container">
    <header>
      <select name="lang" id="lang">
        <option value="id">Bahasa Indonesia</option>
      </select>
      <button type="button" onclick="window.location.reload(true)">Restart</button>
    </header>

    <div class="cell-container">
    </div>
    <div class="status"></div>

    <div class="keyboard-container">
      <div class="kbrow kb-row-1"></div>
      <div class="kbrow kb-row-2"></div>
      <div class="kbrow kb-row-3"></div>
    </div>
  </div>

  <style>
include(src/style.css)
  </style>

  <script>
include(src/js/cell.js)
include(src/js/guess.js)
include(src/js/game.js)
include(src/js/keyboard.js)
include(src/js/main.js)
  </script>
</body>
</html>

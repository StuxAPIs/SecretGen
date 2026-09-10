(function () {
  var MIN_LENGTH = 1;
  var MAX_LENGTH = 1024;

  var lenInput = document.getElementById('len');
  var genBtn = document.getElementById('gen-btn');
  var resultRow = document.getElementById('result-row');
  var resultText = document.getElementById('result-text');
  var copyBtn = document.getElementById('copy-btn');
  var copyBtnLabel = document.getElementById('copy-btn-label');
  var errorEl = document.getElementById('gen-error');

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    resultRow.hidden = true;
  }

  async function generate() {
    var length = parseInt(lenInput.value, 10);
    errorEl.hidden = true;

    if (!length || length < MIN_LENGTH || length > MAX_LENGTH) {
      showError('Enter a length between ' + MIN_LENGTH + ' and ' + MAX_LENGTH + '.');
      return;
    }

    genBtn.disabled = true;
    genBtn.textContent = 'Generating...';

    try {
      var res = await fetch('/' + length);
      if (!res.ok) throw new Error('Request failed');
      var secret = await res.text();
      resultText.textContent = secret;
      resultRow.hidden = false;
    } catch (err) {
      showError('Something went wrong - try again.');
    } finally {
      genBtn.disabled = false;
      genBtn.textContent = 'Generate';
    }
  }

  genBtn.addEventListener('click', generate);
  lenInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') generate();
  });

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(resultText.textContent).then(function () {
      var original = copyBtnLabel.textContent;
      copyBtnLabel.textContent = 'Copied!';
      setTimeout(function () { copyBtnLabel.textContent = original; }, 1500);
    });
  });

  generate();
})();

var days = [31,29,31,30,31,30,31,31,30,31,30,31];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var dayChange = function() {
  var val = $('#day').val();
  $('#day').html('');
  for (var i = 1; i <= days[Number($('#month').val()) - 1]; i ++) {
    $('#day').append('<option value="' + i + '">' + i + '</option>');
  }
  $('#day').val(Math.min(val, i - 1));
}

function typewriter(element, text) {
  $(element).text('');
  $('body').append('<audio loop="loop" autoplay="autoplay"><source src="soundfx/typewriter.mp3"></audio>');
  (function loop(element, text) {
    $(element).text($(element).text() + text[0]);
    if (text.length > 1) setTimeout(loop, 100 * (Math.floor(Math.random() * 2) + 1), element, text.substr(1, text.length - 1));
    else $('audio').remove();
  })(element, text);
}

$(function() {
  // Fill Month Select Box
  for (var i = 0; i < months.length; i ++) {
    $('#month').append('<option value="' + (i  + 1) + '">' + months[i] + '</option>')
  }
  $('#month').val(new Date(Date.now()).getMonth() + 1);
  dayChange();
  $('#day').val(new Date(Date.now()).getDate());

  // XHR
  function request(event) {
    if (event.keyCode === 13 || event.keyCode === undefined) event.preventDefault();
    else return;
    $('#response').text('searching...');
    input = $('#sentence').val();
    var url = 'https://numbersapi.p.mashape.com/' + $('#month')[0].value + '/' + $('#day')[0].value + '/date?fragment=true&json=true';// + input.split(' ').join('+');
    var header = { "X-Mashape-Key": "nRUIuZW8bCmshTdyPKW9ai1mAP6rp1Vpkltjsn75ab0twKozjg",
      'Accept': 'text/plain' };
    $.ajax({ url: url, method: 'GET', headers: header, success: function(data) {
      typewriter($('#response')[0], 'On ' +
        months[Number($('#month').val()) - 1] +
        ' ' + $('#day').val() + ', ' + data.year + ' ' +
        data.text + '.');
    }});


  }


  $('#month').change(dayChange);
  $('#sentence-button').click(request);
  $('#sentence').on('keypress', request);
});

(function() {
  'use strict';

  window.onload = function() {
    let message = localStorage.getItem("message") || 'Your message will display here';
    $('#message').html(message);
    $('#display').html(message);
  }

  $('#button').click(() => {
    console.log('click')
    let message = $('#message').val();
    console.log(message);
    $('#display').html(message);
    localStorage.setItem("message", message);
  });

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //            .register('./service-worker.js')
  //            .then(function() { console.log('Service Worker Registered'); });
  // }

  // uncomment to reset the dates array.
  // var dates = [];
  // localStorage.setItem('dates',JSON.stringify(dates));

  var dates = JSON.parse(localStorage.getItem('dates')) || [];


  var $input = $('#picker').pickadate();
  var picker = $input.pickadate('picker');
  picker.set('select',new Date());

  var temp = $('#template')[0].outerHTML;
  $('#template').remove();

  var makeIndex = function()
  {
    $('#prev').empty();
    $.each(dates, function(i,e)
    {
      var nrow = $(temp);
      $(nrow).removeClass('hidden');
      $(nrow).find('.date').text(moment(e).format("MMMM Do YYYY"));
      $(nrow).find('.delete').data("item",i);
      $('#prev').append(nrow);
    });
  }

  makeIndex();

  var updateSince = function()
  {
    if (!dates) return;
    var now = moment();
    var then = moment(dates[0]);
    var since = now.diff(then, "weeks");
    $('#ago').text(since+" weeks ago");
  }

  updateSince();

  $('#newdate').on('click',function(e)
  {
    e.preventDefault();
    var t = moment(picker.get('select').obj);
    dates.unshift(t);
    localStorage.setItem('dates',JSON.stringify(dates));
    makeIndex();
    updateSince();
  });


  $(document.body).on('click', '.delete',function(e)
  {
    e.preventDefault();
    if (confirm("Do you want to delete"))
    {
      var d = $(this).data('item');
      dates.splice(d,1);
      console.log(dates)
      localStorage.setItem('dates',JSON.stringify(dates));
      makeIndex();
      updateSince();
    }
  });

})();

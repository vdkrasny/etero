$(document).ready(function() {
  $.reject({
    reject: {
      safari6: true, // Apple Safari
      chrome24: true, // Google Chrome
      firefox23: true, // Mozilla Firefox
      msie7: true, // Microsoft Internet Explorer
      opera17: true // Opera
    },
    header: 'Вы используете устаревший браузер.',

    paragraph1: 'Вы пользуетесь устравшим браузером, который не поддерживает' +
    ' современные веб-стандарты и представляет угрозу вашей безопасности. ' +
    'found below.',

    paragraph2: 'Пожалуйста, установите современный браузер:',
    closeMessage: '',
    closeLink: 'Зактрыть окно'
  });

  jQuery(window).load(function() {
    languageSelect('.b_lang');
    etenevaLoad('.eteneva');

    $('.b_doc .link').magnificPopup({
      type: 'image',
      closeBtnInside: true,
      showCloseBtn: true
    });

    var brands = $('.b_brands > li > a');
    brands.each(function(){
      var that = $(this).find('img');
      that.attr('src', that.attr('data-a'));
    });
    brands.hover(
      function(){
        var that = $(this).find('img');
        that.attr('src', that.attr('data-h'));
      },
      function(){
        var that = $(this).find('img');
        that.attr('src', that.attr('data-a'));
      }
    );
  });

  analogClock('#clock-1', 3);
  analogClock('#clock-2', -4);
  analogClock('#clock-3', 1);

  makeRangeSlider('.range');
  eteneva('.eteneva', '$');
  $('.selct').selectric();
  $('.m_case-form').click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    }
  );

  $('.b_course-line .list').liMarquee({
    direction: 'left',
    loop:-1,
    scrolldelay: 0,
    scrollamount: 80,
    circular: true,
    drag: true
  });
  // ------------------------------------- functions
  function analogClock(a, b) {
    // Вторым параметром указывается время нужной страны в формате UTC
    var that = $(a),
        sec = that.find('#sec'),
        min = that.find('#min'),
        hour = that.find('#hour');
    setInterval( function() {
      var seconds = new Date().getSeconds();
      var sdegree = seconds * 6;
      var srotate = "rotate(" + sdegree + "deg)";
      sec.css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
    }, 1000 );
    setInterval( function() {
      var mins = new Date().getMinutes();
      var mdegree = mins * 6;
      var mrotate = "rotate(" + mdegree + "deg)";
      min.css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
    }, 1000 );
    setInterval( function() {
      var hours = new Date().getUTCHours() + b;
      var mins = new Date().getMinutes();
      var hdegree = hours * 30 + (mins / 2);
      var hrotate = "rotate(" + hdegree + "deg)";
      hour.css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
    }, 1000 );
  }
  function eteneva(a, b) {
    var that = $(a),
        postfix = b,
        bar = that.find('.eteneva-bar'),
        sub = that.find('.eteneva-sub'),
          // data
        min = bar.data('min'),
        max = bar.data('max'),
        progress = bar.data('progress'),
          // real-data
        realRange = (max - min),
        realProgress = (progress - min),
        progressNow = ((realProgress * 100) / realRange),
          // elements
        eSingle = $('<span class="eteneva-single">'),
        eMin = $('<span class="eteneva-min">'),
        eMax = $('<span class="eteneva-max">');

    sub.append(eSingle.text(progress+postfix));
    sub.append(eMin.text(min+postfix));
    sub.append(eMax.text(max+postfix));
    bar.css('width', progressNow+'%');
  }
  function etenevaLoad(a) {
    var that = $(a),
        single = that.find('.eteneva-single'),
        singleOffset = (single.width() / 2),
        barWidthCalc = that.find('.eteneva-bar').css('width'),
        min = that.find('.eteneva-min'),
        max = that.find('.eteneva-max'),
          // ---
        mainWidth = that.find('.eteneva-line').width(),
        barWidth = that.find('.eteneva-bar').width(),
        minWidth = min.width(),
        maxWidth = max.width();
          // ---
        single.css('left', 'calc('+barWidthCalc+' - '+singleOffset+'px)');
    if ((mainWidth - barWidth - singleOffset) < maxWidth) {
      max.css('display', 'none');
    }
    if ((minWidth + singleOffset) > barWidth) {
      min.css('display', 'none');
    }
  }
  function languageSelect(a){
    if ($(a).find('.select').length > 0) {
      $(a).each(function () {
        var el = $(this);
        var select = $(el).find('.select');
        var list = $(el).find('.list');
        select.click(function () {
          list.fadeToggle('fast');
        });
        list.find('.item').click(function () {
          select.children().remove();
          select.prepend($(this).children().clone());
          list.fadeToggle('fast');
        })
      })
    }
  }
  function makeRangeSlider(s){
    var timeArr = ["10 дней", "25 дней", "45 дней", "60 дней", "75 дней", "85 дней", "100 дней"];
    if ($(s).find("input").length > 0) {
      $(s).map(function(){
        var el = $(this); // родитель
        var inp = $(el).find("input");  // input
        var setSlider = {
          grid: true,
          min: inp.attr('data-min'),
          max: inp.attr('data-max'),
          step: inp.attr('data-step'),
          value: inp.val(),
          hide_min_max: true,
          hide_from_to: true
        };
        var $slider = $(el).find("input");
        $slider.ionRangeSlider(setSlider);

        if ($(el).hasClass("time")){
          var slider = $slider.data("ionRangeSlider");
          slider.update({
            values: timeArr
          });
        }
      });
    }
  }
  google.maps.event.addDomListener(window, 'load', initMap);
  function initMap() {
    /*
    var mapStyle = [{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#444444"}]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{"color": "#f2f2f2"}]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{"saturation": -100}, {"lightness": 45}]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{"color": "#95d1d6"}, {"visibility": "on"}]
    }];
    */
    var mapEl = document.getElementById("map"),
        center = new google.maps.LatLng(52.1012682, 23.6558117);
    var mapOptions = {
      zoom: 14,
      center: center,
      scrollwheel: false
      //styles: mapStyle
    };
    var map = new google.maps.Map(mapEl, mapOptions);
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Etero",
      icon: "img/map-ico.png"
    });
  }
});

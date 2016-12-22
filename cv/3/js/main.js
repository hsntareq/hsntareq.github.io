/*
  Theme Name: Larsia - OnePage personal & resume template
  Theme URL: http://www.pixiefy.com/larsia-gold/
  Author: pixiefy team
  Author URI: http://www.pixiefy.com/
  Description: larsia - Responsive Onepage Personal Resume and Portfolio HTML5 Template.
  Version: 0.1
*/

(function($) {
"use strict";

  $( window ).on("load", function() {


    /*--------------------------------------------------------------
      PRELOADER INIT
    --------------------------------------------------------------*/
    $(".larsia_default_preloader").delay(600).fadeOut(500);


    /* --------------------------------------------------------------------- */
    /* TEXT ANIMATION
    /* --------------------------------------------------------------------- */
    $('.first_welcome_text').textillate({
      initialDelay: 500,

      callback: function () {

        $(".slideText" ).each(function(){
            var $this = $(this);
            var time = $(this).attr("data-time");
            var animate = $(this).attr("data-animation");
            setTimeout(function() {            
                $this.addClass("animated opacityIn " + animate);
            }, time);
        });

        setTimeout(function () {
            $('.larsia-welcome-content').addClass('animateBefore');}, 1700
        );
        setTimeout(function () {
            $('.larsia-welcome-content').addClass('animateAfter');}, 2200
        );
        
      }
    });



    /* --------------------------------------------------------------------- */
    /* SCRIPT INIT
    /* --------------------------------------------------------------------- */
    $(function(){
      
      $.fn.center = function () {
        this.css("position","absolute");
        this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
        this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
        return this;
      }
      $.fn.centerx = function () {
        this.css("position","absolute");
        this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
        return this;
      }
      
      $(".larsia-first-welcome-text").center(); 
      $(".larsia-welcome-content, .welcome-style-section, .welcome-table-cell").centerx(); 
      $('.welcome-full').css({'height' : $(window).height()+"px"});

      $(window).resize(function(){ 
         $(".larsia-first-welcome-text").center(); 
        $(".larsia-welcome-content, .welcome-style-section, .welcome-table-cell").centerx(); 
         $('.welcome-full').css({'height' : $(window).height()+"px"});
      });
      
    });


    /*--------------------------------------------------------------
      ISOTOPE FILTERING INIT
    --------------------------------------------------------------*/
    var $container = $('#my-all-works-filter'),
      colWidth = function () {
        var w = $container.width(), 
          columnNum = 1,
          columnWidth = 0;
        if (w > 1200) {
          columnNum  = 3;
        } else if (w > 900) {
          columnNum  = 3;
        } else if (w > 600) {
          columnNum  = 2;
        } else if (w > 450) {
          columnNum  = 2;
        } else if (w > 385) {
          columnNum  = 1;
        }
        columnWidth = Math.floor(w/columnNum);
        $container.find('.item').each(function() {
          var $item = $(this),
            multiplier_w = $item.attr('class').match(/item-w(\d)/),
            multiplier_h = $item.attr('class').match(/item-h(\d)/),
            width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
            height = multiplier_h ? columnWidth*multiplier_h[1]*0.4-12 : columnWidth*0.5;
          $item.css({
            width: width
            //height: height
          });
        });
        return columnWidth;
      },
      isotope = function () {
        $container.isotope({
          resizable: false,
          itemSelector: '.item',
          masonry: {
            columnWidth: colWidth(),
            gutterWidth: 3
          }
        });
      };
    isotope();
    $(window).resize(isotope);
    var $optionSets = $('.larsia-portfolio-nav .option-set'),
        $optionLinks = $optionSets.find('li');
    $optionLinks.click(function(){
    var $this = $(this);
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // creativewise, apply new options
        $container.isotope( options );
      }
      return false;
    }); 



  });


  $(window).on("scroll", function(){

    /* --------------------------------------------------------------------- */
    /*  SCROLL AND FIXED MENU
    /* --------------------------------------------------------------------- */
    var stickyfoulx = $('#main_menu_fixed').offset().top;
    if ($(window).scrollTop() > stickyfoulx){
      $(".larsia-main-menu").addClass("fixedMenu"); 
    } else {
      $(".larsia-main-menu").removeClass("fixedMenu"); 
    }

    var stickyWow = $('#larsia-section-skill').offset().top;
    if ($(window).scrollTop() > stickyWow){
      $("#backToTop > a").addClass("displayOk animated slideInUp"); 
    } else {
      $("#backToTop > a").removeClass("displayOk animated slideInUp slideOutDown"); 
    }


    /*--------------------------------------------------------------
      SCROLL AND ANIMATION SKILL
    --------------------------------------------------------------*/
    function isScrolledIntoView(elem)
    {
        var $elem = $(elem);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $.fn.animateNumbers = function (stop, commas, duration, ease) {
      return this.each(function () {
        var $this = $(this);
        var start = parseInt($this.text().replace(/,/g, ""));
        commas = (commas === undefined) ? true : commas;
        $({
          value: start
        }).animate({
            value: stop
          }, {
            duration: duration == undefined ? 500 : duration,
            easing: ease == undefined ? "swing" : ease,
            step: function () {
              $this.text(Math.floor(this.value));
              if (commas) {
                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
              }
            },
            complete: function () {
              if (parseInt($this.text()) !== stop) {
                $this.text(stop);
                if (commas) {
                  $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                }
              }
            }
          });
      });
    };

    if (isScrolledIntoView('#expertise_skill_charts')) {

      $('.single-skill-candle').each(function() {
          var percetageHeight = $(this).find('.skill-percentage-body');
          var percetageTop = $(this).find('.skill-title');
          var percetageSkill = $(this).find('.skill-percentage > span');
          var data = $(this).attr('data-value');
          $(percetageHeight).animate({height: data+'%'}, {duration: 3500, easing: 'easeOutCirc'});
          $(percetageSkill).animateNumbers(data, true, parseInt(3500));
          $(percetageTop).animate({bottom: data+'%'}, {duration: 3500, easing: 'easeOutCirc'});
      });

    } // end isScrolledIntoView

    if (isScrolledIntoView('#my_counter')) {

      $('.counter-result').each(function() {
          var data = $(this).attr('data-percentage');
          $(this).animateNumbers(data, true, parseInt(3500));
      });

    } // end isScrolledIntoView
    



  });

  /* --------------------------------------------------------------------- */
  /* FITTEXT INIT
  /* --------------------------------------------------------------------- */
  $("#slideText_1").fitText(0.7);
  $("#slideText_2").fitText(0.42);
  $("#slideText_3").fitText();
  $(".larsia-welcome-content p").fitText(1.65);


  /* --------------------------------------------------------------------- */
  /* MENU CLICK AND APPEAR TO THE SECTION
  /* --------------------------------------------------------------------- */
  $.fn.smoothScroll = function ( options ) {

      var settings = $.extend({
          duration : 500,
          animation: "easeInExpo"
      }, options );

      $(this).click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-58;
        $('html, body').stop().animate({ 
            scrollTop: offsetTop,
        }, settings.duration, settings.animation);
        e.preventDefault();
      });
      return this;
  };
  $('.start_browsing, .scroll_down').smoothScroll();

  $(function(){
    var lastId,
    topMenu = $(".larsia-main-menu"),
    minusHeight = $(".larsia-main-menu").height(),
    topMenuHeight = topMenu.outerHeight()+60,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-56;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop,
      }, 500, 'easeInExpo');
      e.preventDefault();
    });

    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active-menu")
             .end().filter("[href=\\#"+id+"]").parent().addClass("active-menu");
       }
    });

  });

  /* --------------------------------------------------------------------- */
  /* BACK TO TOP INIT
  /* --------------------------------------------------------------------- */
  $( document ).on("click", "#backToTop", function(e){
    $('html, body').stop().animate({ 
        scrollTop:0,
    }, 500, 'easeInExpo');
    e.preventDefault();
  });


/* --------------------------------------------------------------------- */
/* RESPONSIVE MENU TOGGLE INIT
/* --------------------------------------------------------------------- */

  $(document).on("click", ".menu_responsive_init", function(){
    $('.larsia-menu-area nav').slideToggle();
  });

  var ww = $(window).width();
  if(ww < 768){
    $(".larsia-menu-area nav").on("click", "a", function(){
      $('.larsia-menu-area nav').slideUp();
    });
  } else {
    $('.larsia-menu-area nav').show();
  }

  /* --------------------------------------------------------------------- */
  /* SLIDE MENU INIT
  /* --------------------------------------------------------------------- */
  $('.toggle-menu').jPushMenu(); 


  /* --------------------------------------------------------------------- */
  /* WOW SCROLL ANIMATION PUGIN INIT
  /* --------------------------------------------------------------------- */
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
  wow.init();


  /*--------------------------------------------------------------
    TOOLTIP INIT
  --------------------------------------------------------------*/
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });


  /*--------------------------------------------------------------
    SLIDER INIT - OWL CAROUSEL
  --------------------------------------------------------------*/
  $(function () {

    var owl_blog = $("#fetured-blog-slider");
    owl_blog.owlCarousel({
      autoPlay : false,
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4],
      itemsTablet : [768,2],
      itemsMobile : [479,1],
      navigation : false,
      pagination: false
    });

    $(document).on("click", ".blog_next", function(e){
      e.preventDefault();
      owl_blog.trigger('owl.next');
    });
    $(document).on("click", ".blog_prev", function(e){
      e.preventDefault();
      owl_blog.trigger('owl.prev');
    });


    var owl_skill = $("#skills-candle-slide");
    owl_skill.owlCarousel({
      autoPlay : false,
      items : 5,
      itemsDesktop : [1199,5],
      itemsDesktopSmall : [979,4],
      itemsTablet : [768,3],
      itemsMobile : [479,2],
      navigation : false,
      pagination: false
    });

    // Custom Navigation Events
    $(document).on("click", ".skill_next", function(e){
      e.preventDefault();
      owl_skill.trigger('owl.next');
    });
    $(document).on("click", ".skill_prev", function(e){
      e.preventDefault();
      owl_skill.trigger('owl.prev');
    });

    var owl_works = $("#works-resume-candle-slide");
    owl_works.owlCarousel({
      autoPlay : false,
      singleItem : true,
      navigation : false,
      pagination: true
    });

    $(document).on("click", ".work_next", function(e){
      e.preventDefault();
      owl_works.trigger('owl.next');
    });
    $(document).on("click", ".work_prev", function(e){
      e.preventDefault();
      owl_works.trigger('owl.prev');
    });

    var owl_education = $("#education-resume-candle-slide");
    owl_education.owlCarousel({
      autoPlay : false,
      singleItem : true,
      navigation : false,
      pagination: false
    });

    $(document).on("click", ".education_next", function(e){
      e.preventDefault();
      owl_education.trigger('owl.next');
    });
    $(document).on("click", ".education_prev", function(e){
      e.preventDefault();
      owl_education.trigger('owl.prev');
    });


  });


  $(function () {
       
    var sync1 = $("#testimonial-main-slider");
    var sync2 = $("#all-clients-logo-icon-slider");
     
    sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
    });
     
    sync2.owlCarousel({
    items : 5,
    itemsDesktop : [1199,5],
    itemsDesktopSmall : [979,4],
    itemsTablet : [768,3],
    itemsMobile : [479,2],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
    el.find(".owl-item").eq(0).addClass("synced");
    }
    });
     
    function syncPosition(el){
    var current = this.currentItem;
    $(sync2)
    .find(".owl-item")
    .removeClass("synced")
    .eq(current)
    .addClass("synced")
    if($(sync2).data("owlCarousel") !== undefined){
    center(current)
    }
    }
     
    $(sync2).on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
    if(num === sync2visible[i]){
    var found = true;
    }
    }
     
    if(found===false){
    if(num>sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", num - sync2visible.length+2)
    }else{
    if(num - 1 === -1){
    num = 0;
    }
    sync2.trigger("owl.goTo", num);
    }
    } else if(num === sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
    sync2.trigger("owl.goTo", num-1)
    }
    }
       
  });

    
  /*--------------------------------------------------------------
    INIT MAP OVERLEY
  --------------------------------------------------------------*/
  $(document).on("click", ".map-overley", function(){
    $(this).toggleClass('map_pattern');
    if($('.text-cell').text() == 'Open Map'){
         $('.text-cell').text('Close Map');
     } else {
         $('.text-cell').text('Open Map');
     }
  });


  /*--------------------------------------------------------------
    CONTACT FORM INIT
  --------------------------------------------------------------*/
  $(function () {

    function valid_email_address(email) {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      return pattern.test(email);
    } 

    $('#larsia_name').on('input', function() {
      var input=$(this);
      var is_name=input.val().length >= 2;
      if(is_name){
        $(this).parent().removeClass('filed_error').addClass("filed_ok");
      }
      else{
        $(this).parent().removeClass('filed_ok').addClass("filed_error");
      }
    });
    $('#larsia_email').on('input', function() {
      var input=$(this);
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
      var is_email=re.test(input.val());
      if(is_email){
        $(this).parent().removeClass('filed_error').addClass("filed_ok");
      }
      else{
        $(this).parent().removeClass('filed_ok').addClass("filed_error");
      }
    });
    $('#larsia_subject').on('input', function() {
      var input=$(this);
      var is_subject=input.val().length >= 2;
      if(is_subject){
        $(this).parent().removeClass('filed_error').addClass("filed_ok");
      }
      else{
        $(this).parent().removeClass('filed_ok').addClass("filed_error");
      }
    });
    $('#larsia_message').on('input', function() {
      var input=$(this);
      var is_message=input.val().length >= 5;
      if(is_message){
        $(this).parent().removeClass('filed_error').addClass("filed_ok");
      }
      else{
        $(this).parent().removeClass('filed_ok').addClass("filed_error");
      }
    });

    $('#larsia-contactForm').on("submit", function(e){
        
        //Stop form submission & check the validation
        e.preventDefault();
        
        // Variable declaration
        var error       = false,
          name          = $('#larsia_name').val(),
          email         = $('#larsia_email').val(),
          subject       = $('#larsia_subject').val(),
          message       = $('#larsia_message').val(),
          mail_fail     = $('#mail_fail'),
          mail_success  = $('#mail_success'),
          submit_btn    = $('#larsia_submit_btn');
        
      // Form field validation
        if(name.length <= 1){
            var error = true;
            $('#larsia_name').parent().addClass('filed_error');
        }else{
            $('#larsia_name').parent().removeClass('filed_error');
        }
        if(email.length <= 6 || email.indexOf('@') == '-1'){
            var error = true;
            $('#larsia_email').parent().addClass('filed_error');
        }else{
            $('#larsia_email').parent().removeClass('filed_error');
        }
        if(subject.length == 0){
            var error = true;
            $('#larsia_subject').parent().addClass('filed_error');
        }else{
            $('#larsia_subject').parent().removeClass('filed_error');
        }
        if(message.length == 0){
            var error = true;
            $('#larsia_message').parent().addClass('filed_error');
        }else{
            $('#larsia_message').parent().removeClass('filed_error');
        }

        if (error == true) {
          $(mail_success).fadeOut(500);
          $(mail_fail).slideDown(800);
        };

        // If there is no validation error, next to process the mail function
        if(error == false){

            $('i.larsia-submit-spinner').fadeIn(350);
            $(mail_success).hide();
            $(mail_fail).hide();
            $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            type: 'POST',
            success: function() {
              $(mail_fail).fadeOut(500);
              $(mail_success).slideDown(800);
              $('.single_contact_column input, .single_contact_column textarea').val('');
              $('.filed_error').removeClass('filed_error');
              $('.filed_ok').removeClass('filed_ok');
              $('i.larsia-submit-spinner').fadeOut('fast');
            },
            error: function() {
              $(mail_success).fadeOut(500);
              $(mail_fail).slideDown(800);
              $('i.larsia-submit-spinner').fadeOut('fast');
            }
            });

        }
    });    
  });


  /*--------------------------------------------------------------
    MAGNIFIC POPUP INIT
  --------------------------------------------------------------*/
  $(function () {
    var gal;
    gal = $('.work_item');
    gal.magnificPopup({
      type:'inline',
      midClick: true 
    });

    $('.close-pop').on("click", function(e){
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('.popup-vimeo').magnificPopup({type:'iframe'});

  });

  $(function(){
    
  /*--------------------------------------------------------------
    GOOGLE MAP INIT
  --------------------------------------------------------------*/
  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 11,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          disableDefaultUI: true,
          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(40.6700, -73.9400), // New York

          // How you would like to style the map. 
          // This is where you would paste any style found on Snazzy Maps.
          styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
      };

      // Get the HTML DOM element that will contain your map 
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('larsia_google_map');

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        icon: 'images/marker.png',
        title: 'Larsia'
      });
      var contentString = '<div id="content">' +
          '<div id="myDiv">' +
          '</div>' +
          '<h3 id="heading">COLORADO</h3>' +
          '<div id="bodyContent">' +
          '<p>PIXIEFY THEMES ' +
          '2746 Scheuvront Drive ' +
          '<a href="#">www.pixiefy.com </a>' +
          'Denver, CO 80202 . </p>' +
          '</div>' +
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 280
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 750);  //time it takes for one bounce   

      google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
      });

  }
  });






})(jQuery);


// Popup image
$(document).ready(function() {
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
});

// active checker 
$(document).ready(function() {

  currentURL = window.location.pathname;
  currentURLTemp = currentURL.split(".")[0];
  className = currentURLTemp.split("/")[1];
  randomVersion = Math.floor((Math.random() * 10) + 1);
  idChecker = $('.service-list a[href*="'+className+'"]');
  mainTitle = idChecker.attr("data-title");
  description = idChecker.attr("data-description");

  $(".service-content .title" ).prepend( $( "<h2>"+mainTitle+"</h2>" ) );
  $('.service-list a[href*="'+className+'"]').addClass('active');
  $('a.navbar-brand').text("เลือกประเภทชุด : "+idChecker.text());
  $('p.description').text(description);
  document.title = 'Grandview Fashion — '+mainTitle;
    
  //Hell loop for image
  $.ajax({
      url : window.location.protocol+'//'+window.location.host+'/service/'+className+'/img.txt?v='+randomVersion,
      dataType: "text",
      success : function (data) {
          rawData = data;
          splitData = rawData.split(",");
          ifPortrait = "";

          function loadImage(e){
            //LOOOOP
            jQuery.each( splitData.slice(startList,endList), function( i, val ) { 
            newVal = String(val);
            splitVal = newVal.split(":");
            images = splitVal[i,0];
            type = splitVal[i,1];
            $(".photo-list").append("<div class=\"col-md-3 col-sm-4 col-xs-6\"><a  class=\"lazy "+type+"\" href=\"./service/"+className+"/img/"+images+"\" data-original=\"./service/"+className+"/thumbnail/"+images+"\" style=\"background-image: url('./img/placeholder.jpg')\"></a></div>");           
            $("a.lazy").lazyload({
              effect : "fadeIn"
            });
          });
          //LOOOOP
          }

          limitImageShow = 56;

          pageNumber = Math.ceil(splitData.length/limitImageShow);
          console.log("this is "+pageNumber);
          i = 0;
          inumber = 1;
          while(i < pageNumber){
            if(pageNumber == 1){
              $(".page-number").addClass('hidden');
              break;
            }
            $(".page-number").append("<li class=\"pagenumber\" data-page=\""+i+"\">"+inumber+"</li>");
            i++; //don't delete it
            inumber++;

          }

          $(".page-number").prepend("<li class=\"pagenumber prev\"><<</li>");
          $(".page-number").append("<li class=\"pagenumber next\">>></li>");
      

          $(document).ready(function(){
            changePage = 0;
            startList = 0;
            endList = startList + limitImageShow;
            $("li.pagenumber:nth-child("+(changePage+2)+")").addClass('active');
            $("li.prev").addClass("disable");
            $("li.next").removeClass("disable");
            loadImage();
          });

          

          $("li.pagenumber").click(function(){
              var changePage;
              if($(this).hasClass("prev")){
                changePage = parseInt($("li.active").attr("data-page")) - 1;

              } else if($(this).hasClass("next")) {
                changePage = parseInt($("li.active").attr("data-page")) + 1;
                
              } else {
                changePage = parseInt($(this).attr("data-page"));
              }

              if(changePage == 0){
                $("li.prev").addClass("disable");
                $("li.next").removeClass("disable");
              } else if( changePage == (pageNumber - 1)){
                $("li.next").addClass("disable");
                $("li.prev").removeClass("disable");
              } else {
                $("li.prev").removeClass("disable");
                $("li.next").removeClass("disable");
              }

              $("li.pagenumber").removeClass('active');
              $("li.pagenumber:nth-child("+(changePage+2)+")").addClass('active');
              $(".photo-list").empty();
              startList = changePage * limitImageShow;
              endList = startList + limitImageShow;
              scroll(0,0);
              loadImage();

          });
      }
  });
});









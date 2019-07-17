// var gifCount = 0;
// var searchWord = 'homer';


$(document).ready(function(){

  $('.search').click(function(){

    var searchWord = $('.searchInput').val();


    var options = {
      url: "http://api.giphy.com/v1/gifs/search?api_key=RpFanF963c1hiGd4b0MJ4E6RQ8OB62TL&limit=100&q=" + searchWord,
      method: 'get' //default
    };

    $('.container').children().remove();
    gifTime(options);
  })
})

// $('.search').click(function(){
  // searchWord = $('input').val();
  // var options = {
  //   url: "http://api.giphy.com/v1/gifs/search?api_key=RpFanF963c1hiGd4b0MJ4E6RQ8OB62TL&limit=10&q=" + searchWord,
  //   method: 'get' //default
  // };
  // $('.container').children().remove();
  // gifTime(options);
// });

// $(window).on('scroll', function(){
//   if ($(window).scrollTop() > $(document).height() - 100 - $(window).height()) {
//     var options = {
//       url: "http://api.giphy.com/v1/gifs/search?api_key=RpFanF963c1hiGd4b0MJ4E6RQ8OB62TL&limit=10&offset=" + gifCount +"&q=" + searchWord,
//       method: 'get'
//     }
//     console.log('scrolling')
//     gifTime(options);
//   }
// });

var windowWidth = $(window).innerWidth();
var finalHeight = 0;


function gifTime(options){
  // gifCount = gifCount + 10;

  // get original dimensions into width and a height array
  var originalHeights = [];
  var originalWidths = [];

  var adjustedHeights = [];
  var adjustedWidths = [];



  $.ajax(options).done(function(response){
    console.log(response.data);
    response.data.forEach(function(gif){
      originalWidths.push(gif.images.original_still.width);
      originalHeights.push(gif.images.original_still.height);
    })

  var maxH = $('.maxH').val();

  console.log(originalWidths);
  console.log(originalHeights);
  var totalAspectRatio = 0;
  for (var i = 0; i < originalHeights.length; i++) {
    totalAspectRatio = totalAspectRatio + originalWidths[i]/originalHeights[i];
    console.log(totalAspectRatio);
    if (windowWidth/totalAspectRatio < maxH) {
      console.log(true);
      var temp = windowWidth/totalAspectRatio;
      for (var j = (adjustedHeights.length - 1); j < i; j++) {
        console.log('loop')
        console.log(i);
        console.log(temp)
        adjustedHeights.push(temp)
      }
      totalAspectRatio = 0;
    }
  }
  console.log(adjustedHeights);
  // console.log(windowWidth/totalAspectRatio);
  // finalHeight = windowWidth/totalAspectRatio;

  // convert old dimensions to new dimensions


    // var dimensions = [];
    // var runningTotalAR = 0;
    // response.data.forEach(function(gif){
    //   console.log(gif.images.original_still.width);
    //   console.log(gif.images.original_still.height);

    //   var gifWidth = gif.images.original_still.width;
    //   var gifHeight = gif.images.original_still.height;
    //   dimensions.push(Number(gifWidth));
    //   dimensions.push(Number(gifHeight));

    //   runningTotalAR = runningTotalAR + (gifWidth/gifHeight);

    //   console.log(runningTotalAR);
    //   console.log(windowWidth/runningTotalAR);

    //   if(windowWidth/runningTotalAR < 250){
    //     console.log(dimensions.length);
    //     for (var i = 0; i < (dimensions.length / 2); i++) {
    //       Things[i]
    //     }
    //     runningTotalAR = 0;
    //     dimensions = [];
    //   }
    //   console.log(dimensions);

    // });

    

    
    response.data.forEach(function(gif, index){
      
      


      // var boundaryWidth = $('main').css('width');
      // console.log(typeof(boundaryWidth));

      // var requiredHeight = (boundaryWidth)/(dimensions[0]/dimensions[1])
      // console.log(requiredHeight);

      var newGif = $('<img>')
        .attr('src', gif.images.original_still.url)
        .height(adjustedHeights[index]);
      // var newDivElem = $('<div>', {'class': 'gifs'});
      // newDivElem.append(newGif);
      $('.container').append(newGif);

    });
  });
}






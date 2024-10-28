
//$ == jQuery => include all jquery methods
//(".test") jquery selector same as css selector
//hide => jquery effects
//3000 => duration in miliseconds

// jquery effects
// hide() ,show() , toggle()
// slideDown() , slideUp() , slideToggle()
// fadeIn() , fadeOut() ,  fadeToggle() , fadeTo(1000 , 0.5)
// $('.test').slideUp(1000).show(1000).fadeOut(1000);
// stop(stopAll , gotoTheEnd)
// $(".test").stop(false , false);


// $('.container-fluid  ').animate({width:'100%'},200)
// $('.container-fluid  ').animate({height:'100vh'},200 ,function(){
//     $('h2').slideDown(100 ,function(){
//         $(".container-fluid > p").slideDown(100,function () {
//             $(".col-md-4").slideDown(100)
            
//         })
//     })


// })


$('.img').click(function(e){
    let imgg=$(e.target).attr('src');
    $('.mainImg').attr('src',imgg)


})




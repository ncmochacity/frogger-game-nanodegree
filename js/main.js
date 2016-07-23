$(document).ready(function() {
  $(".btn").on("mouseenter",function() {
    $(this).find(">span").stop(true).animate({
      width:"100%"
    },500,"easeOutQuad");
  })
  .on("mouseleave",function() {
    $(this).find(">span").stop(true).animate({
      width:"0%",
    },500,"easeOutQuad");
  })
});

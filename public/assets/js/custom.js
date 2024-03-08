$(document).ready(function(){

  $(document).on("click",".accordian .accordion-tabs",function(){
    const this_tab = $(this)
    if($(this_tab).hasClass('active')){
      $(this_tab).removeClass('active')
    }else{
      $(this_tab).addClass('active')
    }
    $(this_tab).siblings().slideToggle();
  });

  $(document).on("click",".read_all",function(){
    const this_tab = $(this)
    if($(this_tab).hasClass('active')){
      $(this_tab).removeClass('active')
    }else{
      $(this_tab).addClass('active')
    }
    $(this_tab).parents('.read-more').toggleClass('active')
    $(this_tab).siblings().slideToggle();
  });
});
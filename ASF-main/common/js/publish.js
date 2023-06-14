// 0308 헤더 메뉴 수정
$('.gnb li a').on('click', function () {
  $('.gnb li a').removeClass('active')
  $(this).addClass('active')
})

// lnb 
// 0217 수정
$('.lnb_wrap li').on('click', function () {
  
  $('.lnb li').removeClass('on')
  $(this).addClass('on')
})

// pagination
$('.pagination ul li a').on('click', function () {

  $('.pagination ul li a').removeClass('active')
  $(this).addClass('active')
})

// 모달 
$(window).scroll(function () {
  let scrTop = $(this).scrollTop()
  //순찰 계획 및 순찰 담당자 / 순찰자 검색
  $('.ptr_sch_btn').on('click',function(e){
    e.preventDefault()
    $('.dim').css({'display' : 'block'})
  $('.ptr_modal_box').show()
  $('.ptr_modal_box').css({'top' : scrTop + 'px'})
   //$('body').css({'overflow' : 'hidden'})
  })

  //순찰 일지 관리 순찰 계획 명 검색
  $('.ptr_pl_sch_btn').on('click',function(e){
    e.preventDefault()
    $('.dim').css({'display' : 'block'})
  $('.ptr_pl_modal_box').show()
  $('.ptr_pl_modal_box').css({'top' : scrTop + 'px'})
   //$('body').css({'overflow' : 'hidden'})
  })

  //순찰 일지 명 검색
  $('.ptr_log_sch_btn').on('click',function(e){
    e.preventDefault()
    $('.dim').css({'display' : 'block'})
  $('.ptr_log_modal_box').show()
  $('.ptr_log_modal_box').css({'top' : scrTop + 'px'})
   //$('body').css({'overflow' : 'hidden'})
  })
  
  // 울타리 관리 번호 검색
  $('.fcnum_sch_btn').on('click',function(e){
    e.preventDefault()
    $('.dim').css({'display' : 'block'})
  $('.fcnum_modal_box').show()
  $('.fcnum_modal_box').css({'top' : scrTop + 'px'})
  // $('body').css({'overflow' : 'hidden'})
  })

  // 공사 실명부 이름 검색
  $('.nm_list_sch_btn').on('click',function(e){
    e.preventDefault()
    $('.dim').css({'display' : 'block'})
  $('.nm_list_modal_box').show()
  $('.nm_list_modal_box').css({'top' : scrTop + 'px'})
  //$('body').css({'overflow' : 'hidden'})
  })

// 상단 클로즈 버튼
  $('.close').on('click',function(){
  $('.modal_box').hide()
  $('.dim').css({'display' : 'none'})
  //$('body').css({'overflow' : 'auto'})

  })

  // 하단 닫기 버튼
  $('.md_cancel_btn').on('click',function(){
    $('.modal_box').hide()
    $('.dim').css({'display' : 'none'})
    //$('body').css({'overflow' : 'auto'})
    })
})



// 탭
$('.tab_menu li').on('click',function(e){
  e.preventDefault()
  let idx=$(this).index()
  $('.tab_menu li').removeClass('on')
  $(this).addClass('on')
  $('.tab_con').stop().hide()
  $('.tab_con').eq(idx).stop().show()


})

//0217 수정
//순찰일지관리_등록,유지보수작업관리_등록,민원일지관리_등록 임시저장 버튼 클릭 탭 이동
$('.tab2_btn').click(function(){
  
  let href=$(this).attr('href')
console.log(href)
$('.tab_con').hide()
$(href).show()
$('.tab_menu li').removeClass('on')
$('.tab_menu li:nth-child(2)').addClass('on')
})

$('.tab3_btn').click(function(){
  
  let href=$(this).attr('href')
console.log(href)
$('.tab_con').hide()
$(href).show()
$('.tab_menu li').removeClass('on')
$('.tab_menu li:nth-child(3)').addClass('on')
})

$('.tab4_btn').click(function(){
  
  let href=$(this).attr('href')
console.log(href)
$('.tab_con').hide()
$(href).show()
$('.tab_menu li').removeClass('on')
$('.tab_menu li:nth-child(4)').addClass('on')
})

// 0308 헤더 util 

let sw=0
$('.util >a').on('click',function(){
sw=!sw
if(sw){
  $('.my_info').show()
  $('.util >a button').addClass('up_arrow')
}else{
  $('.my_info').hide()
  $('.util >a button').removeClass('up_arrow')
}
})
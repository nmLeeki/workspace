function bodyScroll(arg) {
    //인자값에 따른 body 스크롤 on/off
    if (arg == 'off') {
        $('body').css('overflow', 'hidden');
    } else if (arg == 'on') {
        $('body').removeAttr('style');
    }
}
function pcChk(width) {
    //창크기 width보다 크면 true 반환
    if ($(window).width() > width) {
        return true;
    } else {
        return false;
    }
}

function gnbInit() {
    $('.dep1 > li').each(function () {
        if ($(this).children().is('ol')) {
            $(this).children('a').addClass('dep_on');
        }
        if ($(this).hasClass('active')) {
            $(this).children('ol').show();
        }
    });
}
//시간 설정이벤트
var hour = 0,
    min = 0,
    sec = 0;
hNum = 1;
mNum = 10;
function hourPlus() {
    hour = parseInt($('#hour').val()) + hNum;
    if (hour > 24) {
        hour = 23;
    }
    $('#hour').val(hour);
}
function hourPlus2(num2) {
    hour = parseInt($('#hour').val()) + num2;
    if (hour > 24) {
        hour = 23;
    }
    $('#hour').val(hour);
}
function minPlus() {
    min = parseInt($('#min').val()) + mNum;
    if (min > 59) {
        min = 0;
        hourPlus();
    }
    $('#min').val(min);
}
function minPlus2(num) {
    min = parseInt($('#min').val()) + num;
    if (min > 59) {
        min = 0;
        hourPlus();
    }
    $('#min').val(min);
}
function hourMinus() {
    hour = parseInt($('#hour').val()) - hNum;
    if (hour < 0) {
        hour = 0;
    }
    $('#hour').val(hour);
}
function minMinus() {
    min = parseInt($('#min').val()) - mNum;
    if (min < 0) {
        min = 50;
        hourMinus();
    }
    $('#min').val(min);
}

function tabResizing1() {
    //탭 높이 조정
    $('.type_list.txt label ,.type_list.img label').removeAttr('style');
    $('.type_list.txt ,.type_list.img').each(function () {
        var tabH = 0;
        $(this)
            .children('li')
            .each(function () {
                if (tabH < $(this).children('label').height()) {
                    tabH = $(this).children('label').height();
                }
            });
        $(this).children('li').children('label').height(tabH);
    });
}
function datePlugin() {
    Hammer.plugins.fakeMultitouch();

    function getIndexForValue(elem, value) {
        for (var i = 0; i < elem.options.length; i++) if (elem.options[i].value == value) return i;
    }

    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    function update(datetime) {
        $('#date').drum('setIndex', datetime.getDate() - 1);
        $('#month').drum('setIndex', datetime.getMonth());
        $('#fullYear').drum('setIndex', getIndexForValue($('#fullYear')[0], datetime.getFullYear()));
        $('#hours').drum('setIndex', datetime.getHours());
        $('#minutes').drum('setIndex', datetime.getMinutes());
    }

    $('select.date').drum({
        onChange: function (elem) {
            var arr = {
                date: 'setDate',
                month: 'setMonth',
                fullYear: 'setFullYear',
                hours: 'setHours',
                minutes: 'setMinutes',
            };
            var date = new Date();
            for (var s in arr) {
                var i = $("form[name='date'] select[name='" + s + "']")[0].value;
                eval('date.' + arr[s] + '(' + i + ')');
            }
            date.setSeconds(0);
            update(date);

            var format =
                date.getFullYear() +
                '-' +
                pad(date.getMonth() + 1) +
                '-' +
                pad(date.getDate()) +
                ' ' +
                pad(date.getHours()) +
                ':' +
                pad(date.getMinutes());

            $('.date_header .selection').html(format);
        },
    });
    update(new Date());
}
// 탑 버튼 특정 위치에서 보이기
function topBtn_onOff() {
    var scPos = $(window).scrollTop();
    if (scPos >= 250) $('.top_btn').addClass('active');
    else if (scPos <= 250) $('.top_btn').removeClass('active');
}

//페이지 로드시 실행
$(function () {
    //input,radio 폭 조절
    $('.type_list.txt,.type_list.bt').each(function () {
        var n = $(this).children('li').length;
        if (n < 6) {
            $(this)
                .children('li')
                .outerWidth(100 / n + '%');
        }
    });

    //메뉴온오프
    $('.icon_menu').click(function () {
        bodyScroll('off');
        $('.menu').addClass('active').stop().animate({ left: '80px' }, 200);
    });
    $('.menu .back').click(function () {
        bodyScroll('on');
        $('.menu').stop().animate({ left: '100%' }, 300);
        function aa() {
            $('.menu').removeClass('active');
        }
        setTimeout(aa, 350);
    });
    //3dep 온오프
    $('.dep1 > li > a').click(function () {
        if ($(this).next().is('ol')) {
            $(this).parent().toggleClass('active').siblings().removeClass('active');
            $(this).next().stop().slideToggle(250).parent().siblings().children('ol').stop().slideUp();
            return false;
        }
    });
    //메인 타원지수 애니메이션
    $('.progress-bar').each(function () {
        var bar = $(this).find('.bar');
        var val = $(this).find('span');
        var per = parseInt(val.text(), 10);
        var $back = $('.back');

        $({ p: 0 })
            .animate(
                { p: per },
                {
                    duration: 3000,
                    step: function (p) {
                        bar.css({
                            transform: 'rotate(' + (45 + p * 1.8) + 'deg)',
                        });
                        val.text(p | 0);
                    },
                }
            )
            .delay(200);

        if (per == 100) {
            $back.delay(2850).animate({ top: '7px' }, 200);
        }

        if (per == 0) {
            $('.left').css('background', '##14a1ae');
        }
    });

    //퍼센트바 애니메이션
    $('.percent_bar').each(function (i) {
        var bar = $(this).find('.bar');
        var val = $(this).prev().find('strong');
        var per = parseInt(val.text(), 10);
        $({ p: 0 })
            .animate(
                { p: per },
                {
                    duration: 3000,
                    step: function (p) {
                        bar.css({
                            width: p + '%',
                        });
                        val.text(p | 0);
                    },
                }
            )
            .delay(200 * (i + 1));
    });

    //tab 이벤트
    $('.index_wrap > ul > li > a').on('click', function () {
        var i = $(this).parent().index();
        $(this).parent().parent().next().children().eq(i).addClass('active').siblings().removeClass('active');
        return false;
    });
    //tab 닫기 이벤트
    $('.tab_wrap > div > button').on('click', function () {
        $(this).parent().removeClass('active');
    });

    //form tab 이벤트
    $('.tab_list > li > button').on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
        var i = $(this).closest('li').index();
        $(this)
            .closest('.tab_box')
            .children('ol')
            .children('li:eq(' + i + ')')
            .addClass('active')
            .siblings()
            .removeClass('active');
    });
    //data-btn 값과 동일한 모달 노출
    $(document).on('click', '[data-btn]', function (event) {
        bodyScroll('off');
        var popName = $(event.target).closest('[data-btn]').data('btn');
        $('.modal_wrap > div[data-pop="' + popName + '"]')
            .show()
            .parent('.modal_wrap')
            .fadeIn();
        datePlugin();
        return false;
    });

    /* 팝업 on/off */
    $(document).on('click', '.modal_wrap .close', function () {
        bodyScroll('on');
        $(this).parent().parent().fadeOut();
        $(this).parent().hide();
    });

    /*운동량 리스트 삭제 클릭 이벤트*/
    $('.detail_wrap > button').on('click', function () {
        $(this).siblings('.detail_list').find('input').addClass('active');
        $(this).siblings('.btn_box.off').addClass('on');
    });
    /*운동량 리스트 취소 클릭 이벤트*/
    $('#cancel').on('click', function () {
        $(this).parent().siblings('.detail_list').find('input').removeClass('active');
        $(this).parent().removeClass('on');
    });

    // 날짜선택 기능
    var calBtn = $('.cal_wrap table td a');
    calBtn.on('click', function () {
        calBtn.removeClass('active').attr('title', '');
        $(this).addClass('active').attr('title', '선택됨');
        return false;
    });
    $('button#upmin').click(function () {
        minPlus();
    });

    $('button#downmin').click(function () {
        minMinus();
    });
    //시간 설정 버튼 이벤트
    $('.time_list > li > button').on('click', function () {
        var num = $(this).closest('[data-num]').data('num');
        var num2 = $(this).closest('[data-num2]').data('num2');
        if ($(this).is('[data-num]')) {
            minPlus2(num);
        } else if ($(this).is('[data-num2]')) {
            hourPlus2(num2);
        }
    });
    //자주찾는 운동 check 이벤트
    $('.favorite > ul > li').click(function () {
        var leng = $('.favorite > ul > li > input:checked').length;
        if (leng > 4) {
            $(this).children('input').removeAttr('checked');
            $('.fade_alert').fadeIn(300).delay(2000).fadeOut(300);
        }
    });
    //운동리스트 체크박스일때는 팝업 안뜨게
    $('.detail_wrap .detail_list > li').on('click', function () {
        if (!$(this).find('input').hasClass('active')) {
            bodyScroll('off');
            $('.modal_wrap > div[data-pop="pop2"]').show().parent().fadeIn();
        }
    });

    //별점체크
    $('.star_list li input').on('click', function () {
        $('.star_list li input').removeAttr('checked', 'checked');
        $(this).attr('checked', 'checked').parent().prevAll().find('input').attr('checked', 'checked');
    });
    //저장 취소 버튼이벤트
    $('#btn1 a').on('click', function () {
        $(this).parent().removeClass('active');
        $(this).parent().next().addClass('active');

        return false;
    });
    $('#cancel').on('click', function () {
        $(this).parent().removeClass('active');
        $(this).parent().prev().addClass('active');
        $('.star_list li input').removeAttr('checked', 'checked');

        return false;
    });

    // 자주묻는질문 드롭다운메뉴
    var faqBtn = $('.list_dropdown > li a');
    faqBtn.on('click', function () {
        if ($(this).closest('li').hasClass('active')) {
            $(this).closest('li').removeClass('active');
            $('.list_dropdown div').slideUp();
        } else {
            $('.list_dropdown li').removeClass('active');
            $('.list_dropdown li div').slideUp();
            $(this).closest('li').addClass('active').children('div').slideDown();
        }
        return false;
    });
    //모달팝업 안에 키워드 리스트 클릭이벤트
    $(document).on('click', '.modal .keyword_list li a', function () {
        $(this).parent().toggleClass('active');
        return false;
    });

    $('.circle_fill_ui').each(function (index) {
        circlePercent = parseInt($(this).attr('data-percent')); //소수점 버림

        if (circlePercent <= 50) {
            // 50% 이하
            circlePercent *= 3.6; // 1% = 3.6
            $(this)
                .find('.half .fill')
                .eq(0)
                .css({ transform: 'rotate(' + circlePercent + 'deg)' });
        } else if (circlePercent >= 100) {
            // 100%
            $(this).find('.half .fill').css({ transform: 'rotate(-180deg)' });
        } else {
            // 51% ~ 99%
            circlePercent %= 50;
            circlePercent *= 3.6; // 1% = 3.6
            console.log(circlePercent);
            $(this).find('.half .fill').eq(0).css({ transform: 'rotate(-180deg)' });
            $(this)
                .find('.half .fill')
                .eq(1)
                .css({ transform: 'rotate(' + circlePercent + 'deg)' });
        }
    });
    //onoff 클릭이벤트
    $('.onoff > li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //카테고리 클릭이벤트
    $('.modal_wrap .img_list > li').click(function () {
        $('.modal_wrap .img_list > li').removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
    });
    //관심 컨텐츠 하트 클릭이벤트
    $('.btn_wish').click(function () {
        $(this).toggleClass('active');
    });

    // top 버튼 이벤트
    $('.top_btn').click(function () {
        $('html').stop().animate({ scrollTop: '0' }, 300);
    });
    $(window).scroll(function () {
        topBtn_onOff();
    });

    gnbInit();
});

$(window).on('load resize', function () {
    tabResizing1();
});

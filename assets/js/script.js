gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

var browserWidth = $(window).width();
if(browserWidth > '768') {
    gsap.utils.toArray('.js-plx').forEach(el => {
        const speed = el.getAttribute('data-plx-speed') * 10;
        gsap.set(el,{
            y: speed,
        });
    
        gsap.to(el,{
            y: -1 * speed,
            scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            scrub: 0.1,
            }
        })
    });
}


$(window).on("load", function () {
    setTimeout(function () {
      const target = document.querySelectorAll(".js-io");
      const targetArray = Array.prototype.slice.call(target);
      const options = {
        root: null,
        rootMargin: "0% 0% -10% 0%",
        threshold: 0,
      };
      const observer = new IntersectionObserver(callback, options);
      targetArray.forEach((tgt) => {
        observer.observe(tgt);
      });
  
      function callback(entries) {
        entries.forEach(function (entry, i) {
          const target = entry.target;
  
          if (entry.isIntersecting && !target.classList.contains("_show")) {
            const delay = i * 100;
            setTimeout(function () {
              target.classList.add("_show");
            }, delay);
          }
        });
      }
    }, 400);
    console.clear()
});


// ハンバーガーメニューの設定
$(function(){
	let state = false;
	let pos;
	$("#toggle").click(function(){
		$(this).toggleClass('active');
		$(".g-nav").toggleClass("sp_open");
		$("body").toggleClass("body-fixd");
		//背景を固定させる
		if (state == false) {
			pos = $(window).scrollTop();
			$("body").addClass("fixed");
            $('.header-logo').addClass('d-none');
            $('.header-btn').addClass('d-none');
            $('.header-container').addClass('d-flex');
            $('.header-container').removeClass('justify-content-between');
            $('.header-container').addClass('justify-content-end');
			state = true;
		} else {
			$("body").removeClass("fixed").css({"top": 0});
			window.scrollTo(0, pos);
			state = false;
            $('.header-logo').removeClass('d-none');
            $('.header-btn').removeClass('d-none');
            $('.header-container').addClass('d-flex');
            $('.header-container').removeClass('justify-content-end');
            $('.header-container').addClass('justify-content-between');
		}
	});
});

// スクロールしたらheader表示/非表示＋止まったらheader表示
// $(document).ready(function() {
//   var $fixed = $("#js-header");
//   var lastScrollTop = 0;
//   var scrollTimeout;

//   $(window).scroll(function(event) {
//       var st = $(this).scrollTop();

//       if (st > lastScrollTop) {
//           $fixed.removeClass("is-show-head");
//           $fixed.removeClass("sub-header");
//       } else {
//           $fixed.addClass("is-show-head");
//           $fixed.removeClass("sub-header");
//       }
//       lastScrollTop = st;

//       // スクロールが止まった時の処理
//       clearTimeout(scrollTimeout);
//       scrollTimeout = setTimeout(function() {
//           $fixed.addClass("is-show-head");
//       }, 100); 
//   });
// });

// リンクなしのイベント
$('.no-link').on('click', function(event) {
    event.preventDefault(); 
    alert('準備中です。'); 
});

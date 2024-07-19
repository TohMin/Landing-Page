//横スクロール
window.addEventListener("load", function() {
  if (window.innerWidth > 1000) { // 1000px以上で動く
      //プラグインを定義
      gsap.registerPlugin(ScrollTrigger);
      
      const area  = document.querySelector(".js-area");
      const wrap  = document.querySelector(".js-wrap");
      const items = document.querySelectorAll(".js-item");
      const kv = document.querySelectorAll(".kv-container");

      const num   = items.length;
      
      gsap.set(wrap,  { width: num * 100 + "%" }); //横幅を指定
      gsap.set(items, { width: 100 / num + "%" }); //横幅を指定
      
      gsap.to(items, {
        xPercent: -150 * ( num - 1 ), //x方向に移動させる
        ease: "none",
        scrollTrigger: {
          trigger: area, //トリガー
          start: "top top", //開始位置
          end: "+=4000", //終了位置 スクロール量の幅調整
          pin: true, //ピン留め
          scrub: true, //スクロール量に応じて動かす
        }
      });
  }
});

document.addEventListener('scroll', function() {
  var browserWidth = $(window).width();
  if(browserWidth > '768') {
    const scrollY = window.scrollY;
    const kv = document.querySelector('.kv-container');
    const text = document.querySelector('.kv-text');
    const btn = document.querySelector('.kv-btn a');

    if (scrollY > 400) {
      text.classList.add('hidden');
      btn.classList.add('hidden');
    } else if (scrollY <= 400) {
      text.classList.remove('hidden');
      btn.classList.remove('hidden');
    }
    
    if (scrollY <= 1500) {
        kv.style.display = 'block';
        const scale = 1 - (scrollY / 1500) * 0.5;
        const translateX = 0 + (scrollY / 1500) * 75;
        kv.style.transform = `scale(${scale}) translateX(-${translateX}%)`;
        kv.style.left = '0';
    } else if (scrollY > 1500 && scrollY <= 4500) {
        kv.style.display = 'block';
        kv.style.transform = 'scale(0.5) translateX(-50%)`';
        const left = ((scrollY - 1500) / (4500 - 1500)) * -100;
        kv.style.left = `calc(${left}%)`;
    } else if (scrollY > 4500 && scrollY <= 6000) {
        kv.style.display = 'block';
        const scale = 0.5 + ((scrollY - 4500) / (1500)) * 0.5;
        const left = 100 - ((scrollY - 4500) / (1500)) * -100;
        const translateX = 50 + ((scrollY - 4500) / (1500)) * 0.5;
        kv.style.transform = `scale(${scale}) translateX(-${translateX}%)`;
        kv.style.left = `${left}%`;
    } else {
        kv.style.display = 'none';
    }
  }
});

//線のクリップパス
$(window).on('scroll', function() {
  // if (window.innerWidth > 1000) { // 1000px以上で動く
    // 1つ目の処理
    var $imageContainer = $('.image-container');
    var scrollPosition = $(window).scrollTop();
    var maxScroll = $(window).height(); // 表示するまでのスクロール量を設定

    // スクロール量に応じてclip-pathを変更
    if (window.innerWidth < 768) {
      var clipPathValue1 = `inset(0 ${Math.max(0, 100 - (scrollPosition / maxScroll) * 40)}% 0 0)`;
    } else {
      var clipPathValue1 = `inset(0 ${Math.max(0, 100 - (scrollPosition / maxScroll) * 50)}% 0 0)`;
    }

    $imageContainer.css('clip-path', clipPathValue1);

    // 2つ目の処理
    var $triggerElement = $('.intro-img04');
    var $imageContainerHoge = $('.image-container-hoge');

    var triggerPosition = $triggerElement[0].getBoundingClientRect().top;

    // 特定の要素を過ぎた場合に発火
    if (triggerPosition <= 650) {
        if (window.innerWidth < 768) {
          var clipPathValue2 = `inset(0 ${Math.max(0, 100 - ((scrollPosition - maxScroll) / maxScroll) * 30)}% 0 0)`;
        } else {
          var clipPathValue2 = `inset(0 ${Math.max(0, 100 - ((scrollPosition - maxScroll) / maxScroll) * 40)}% 0 0)`;
        }
        $imageContainerHoge.css('clip-path', clipPathValue2);
    }
  // }
});


//カウントアップ
// カウントアップ
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    root: null, // 視覚領域はビューポート
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%表示された時にコールバックを実行
  };

  // 数字にカンマを付ける関数
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var box1 = entry.target;
        $(box1).find('.count-up').each(function(index) {
          var $this = $(this);
          $this.text('0'); // 初期値を0に設定

          var targetCount = $this.data('count'); // 目標値をdata-count属性から取得
          var duration = index === 0 ? 2000 : 4000; // 2つ目の要素は4秒のアニメーションにする

          $this.prop('Counter', 0).animate({
            Counter: targetCount
          }, {
            duration: duration, // 数字が大きいほど変化のスピードが遅くなる
            easing: 'swing', // 動きの種類。他にもlinearなど設定可能
            step: function(now) {
              $this.text(numberWithCommas(Math.ceil(now)));
            }
          });
        });
        // 一度表示されたら再度カウントアップしないようにobserverを停止
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // #box1を監視対象に追加
  var target = document.querySelector('#box1');
  if (target) {
    observer.observe(target);
  }
});


//モーダル
$(function(){
	var open = $('.modal-open'),
		close = $('.modal-close'),
		container = $('.modal-container');

	open.on('click',function(){	
		container.addClass('active');
    console.log('clicked');
		return false;
	});

	close.on('click',function(){	
		container.removeClass('active');
	});

	$(document).on('click',function(e) {
		if(!$(e.target).closest('.modal-body').length) {
			container.removeClass('active');
		}
	});
});

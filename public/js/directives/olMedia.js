angular.module('Oneline.olMediaDirectives', [])
.directive('olVideo', function (){
    return {
        restrict: 'E',
        scope: {
            olPoster: '=',
            olSrc: '='
        },
        template: '<video ng-attr-poster="{{olPoster}}" preload="none"></video> \
                   <svg class="timeline__media__playButton animate--faster"> \
                       <use xlink:href="/public/img/icon-sprite.svg#play-icon"></use> \
                   </svg>',
        link: function (scope, elem, attrs){
            var video = elem.children()[0],
                playIcon = angular.element(elem.children()[1]);

            video.setAttribute('src', scope.olSrc)

            elem.bind('click', function (){
                video.paused ? video.play() : video.pause()
                playIcon.toggleClass('timeline__media__playButton--playing')
            })

            angular.element(video).bind('ended', function (){
                playIcon.removeClass('timeline__media__playButton--playing')
            })
        }
    }
})
.directive('olImageThumb', function (){
    return {
        restrict: 'A',
        link: function (scope, elem, attrs){
            elem.bind('click', function (){
                var wrapper_thumb  = elem.parent(),
                    wrapper_large  = wrapper_thumb.next(),
                    img_thumb      = wrapper_thumb.children(),
                    img_large      = wrapper_large.children();

                if (img_thumb.length === 1){
                    elem.remove()
                    wrapper_large.removeClass('timeline__media__large--tips')
                }

                // 設置小圖樣式
                img_thumb.removeClass('timeline__media__thumb--small--active')
                elem.addClass('timeline__media__thumb--small--active')
                wrapper_thumb.addClass('timeline__media__thumb--small')
                // 設置大圖樣式
                wrapper_large.removeClass('timeline__media__large--inactive')
                img_large.attr('src', attrs.src.replace('square', 'bmiddle'))
                // 附加數據
                if (!img_large.data('urlList')){
                    var urlList = Array.prototype.map.call(img_thumb, function (item){
                        return angular.element(item).attr('src').replace('square', 'bmiddle')
                    })
                    img_large.data('urlList', urlList)
                }
            })
        }
    }
})
.directive('olImageLarge', function (){
    return {
        restrict: 'A',
        link: function (scope, elem, attrs){
            elem.bind('click', function (){
                var urlList = elem.data('urlList') || [],
                    currentIndex = urlList.indexOf(elem.attr('src'));

                if (urlList.length === 1) return;

                var img_thumb = angular.element(angular.element(elem.parent().parent().children()[0]).children());
                    index     = currentIndex < urlList.length - 1 ? currentIndex + 1 : 0,
                    target    = angular.element(img_thumb[index]);

                // 設置圖片地址
                elem.attr('src', urlList[index])
                // 設置小圖樣式
                img_thumb
                .removeClass('timeline__media__thumb--small--active timeline__media__thumb--small--loading')

                target
                .addClass('timeline__media__thumb--small--active timeline__media__thumb--small--loading')
                // 加載完畢
                elem.bind('load', function (){
                    // 設置小圖樣式
                    target.removeClass('timeline__media__thumb--small--loading')
                    elem.unbind('load')
                })
            })
        }
    }
})
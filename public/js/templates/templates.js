angular.module("Oneline.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("settings.html","<!-- Social -->\n<div class=\"social-wrapper\">\n    <!-- Twitter -->\n    <div class=\"social-list\">\n        <div class=\"vertically_center\">\n            <svg class=\"social-icon animate--faster tips\" ng-click=\"toggleAuth(\'twitter\')\" data-provider=\"twitter\">\n                <use xlink:href=\"#twitter-icon\"></use>\n            </svg>\n        </div>\n    </div>\n    <!-- Instagram -->\n    <div class=\"social-list\">\n        <div class=\"vertically_center\">\n            <svg class=\"social-icon animate--faster tips\" ng-click=\"toggleAuth(\'instagram\')\" data-provider=\"instagram\">\n                <use xlink:href=\"#instagram-icon\"></use>\n            </svg>\n        </div>\n    </div>\n    <!-- Weibo -->\n    <div class=\"social-list\">\n        <div class=\"vertically_center\">\n            <svg class=\"social-icon animate--faster tips\" ng-click=\"toggleAuth(\'weibo\')\" data-provider=\"weibo\">\n                <use xlink:href=\"#weibo-icon\"></use>\n            </svg>\n        </div>\n    </div>\n</div>\n\n<!-- Replicant -->\n<svg ng-if=\"providerList.length > 0\" ng-click=\"toggleControlCenter(\'replicant--deckard\')\" class=\"replicant-icon replicant-icon--deckard tips--deep animate--faster\" viewBox=\"0 0 20 20\" toggle-class=\"tips--active\">\n    <use xlink:href=\"#replicant-deckard-icon\"></use>\n</svg>\n<svg ng-click=\"toggleControlCenter(\'replicant--rachael\')\" class=\"replicant-icon replicant-icon--rachael tips--deep animate--faster\" viewBox=\"0 0 20 20\" toggle-class=\"tips--active\">\n    <use xlink:href=\"#replicant-rachael-icon\"></use>\n</svg>");
$templateCache.put("timeline.html","<div ng-click=\"loadMore(1)\" class=\"loadMore loadMore--initLoad loadMore--loading loadMore__count animate--faster\" data-count>\n</div>\n\n<div class=\"timeline\" ng-repeat=\"item in timelineData | orderBy: \'-created_at\'\" data-id=\"{{::item.id_str}}\" data-date>\n\n    <div ng-class=\"::\'timeline--\' + item.provider\" ng-include=\"::item.provider + \'/\' + item.type + \'.html\'\"></div>\n\n</div>\n\n<div ng-click=\"loadMore(-1)\" class=\"loadMore loadMore--initLoad loadMore__count animate--faster\" data-count>\n</div>\n");
$templateCache.put("actions/instagram.html","<span class=\"cursor--pointer\">\n    <div class=\"actions tips--deep tips--frozen\">\n        <svg class=\"actions__button\" ng-class=\"::{\'button--active\': item.favorited}\">\n            <use xlink:href=\"#like-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.favorite_count > 0 ? item.favorite_count : \'\'}}\"></span>\n    </div>\n    <div class=\"actions tips--deep tips--frozen\">\n        <svg class=\"actions__button\">\n            <use xlink:href=\"#reply-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.reply_count > 0 ? item.reply_count : \'\'}}\"></span>\n    </div>\n    <div class=\"actions tips--deep\">\n        <a ng-href=\"{{::item.link}}\" target=\"_blank\">\n            <svg class=\"actions__button\">\n                <use xlink:href=\"#source-icon\"></use>\n            </svg>\n        </a>\n    </div>\n</span>\n");
$templateCache.put("actions/twitter--quote.html","<span class=\"cursor--pointer\">\n    <div class=\"actions tips--deep\">\n        <a ng-href=\"//twitter.com/{{::item.quote.user.screen_name}}/status/{{::item.quote.id_str}}\" target=\"_blank\">\n            <svg class=\"actions__button\">\n                <use xlink:href=\"#source-icon\"></use>\n            </svg>\n        </a>\n    </div>\n</span>");
$templateCache.put("actions/twitter.html","<span class=\"cursor--pointer\">\n    <div ng-click=\"toggleAction(\'like\', item.provider, item.id_str)\" class=\"actions tips--deep\" ng-class=\"::{\'tips--active\': item.favorited}\">\n        <svg class=\"actions__button\" ng-class=\"::{\'button--active\': item.favorited}\" data-like>\n            <use xlink:href=\"#like-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.favorite_count > 0 ? item.favorite_count : \'\'}}\"></span>\n    </div>\n    <div ng-click=\"toggleAction(\'retweet\', item.provider, item.id_str)\" class=\"actions tips--deep\" ng-class=\"::{\'tips--frozen\': item.retweeted}\">\n        <svg class=\"actions__button actions__button--retweet\" ng-class=\"::{\'button--active\': item.retweeted}\" data-retweet>\n            <use xlink:href=\"#retweet-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.retweet_count > 0 ? item.retweet_count : \'\'}}\"></span>\n    </div>\n    <div class=\"actions tips--deep\">\n        <a ng-href=\"//twitter.com/{{::item.user.screen_name}}/status/{{::item.id_str}}\" target=\"_blank\">\n            <svg class=\"actions__button\">\n                <use xlink:href=\"#source-icon\"></use>\n            </svg>\n        </a>\n    </div>\n</span>");
$templateCache.put("actions/weibo--quote.html","<span class=\"cursor--pointer\">\n    <div class=\"actions tips--deep\">\n        <a ng-href=\"//weibo.com/{{::item.retweet.user.idstr}}/{{::item.retweet.mid}}\" target=\"_blank\">\n            <svg class=\"actions__button\">\n                <use xlink:href=\"#source-icon\"></use>\n            </svg>\n        </a>\n    </div>\n</span>");
$templateCache.put("actions/weibo.html","<span class=\"cursor--pointer\">\n    <div class=\"actions tips--deep tips--frozen\" ng-if=\"::item.favorite_count > 0\">\n        <svg class=\"actions__button\" data-like>\n            <use xlink:href=\"#like-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.favorite_count}}\"></span>\n    </div>\n    <div ng-click=\"toggleAction(\'retweet\', item.provider, item.id_str)\" class=\"actions tips--deep\">\n        <svg class=\"actions__button actions__button--retweet\" data-retweet>\n            <use xlink:href=\"#retweet-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.retweet_count > 0 ? item.retweet_count : \'\'}}\"></span>\n    </div>\n    <div class=\"actions tips--deep tips--frozen\" ng-if=\"::item.comments_count > 0\">\n        <svg class=\"actions__button\">\n            <use xlink:href=\"#reply-icon\"></use>\n        </svg>\n        <span class=\"actions__count\" ng-attr-data-count=\"{{::item.comments_count}}\"></span>\n    </div>\n    <div class=\"actions tips--deep\">\n        <a ng-href=\"//weibo.com/{{::item.user.idstr}}/{{::item.mid}}\" target=\"_blank\">\n            <svg class=\"actions__button\">\n                <use xlink:href=\"#source-icon\"></use>\n            </svg>\n        </a>\n    </div>\n    <div ng-click=\"toggleAction(\'star\', item.provider, item.id_str)\" class=\"actions tips--deep\">\n        <svg class=\"actions__button\" data-star>\n            <use xlink:href=\"#star-icon\"></use>\n        </svg>\n    </div>\n</span>");
$templateCache.put("instagram/post.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//instagram.com/{{::item.user.username}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar timeline__profile__avatar--instagram\" ng-src=\"{{::item.user.profile_picture}}\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//instagram.com/{{::item.user.username}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.user.full_name\"></strong>\n        </a>\n    </div>\n</div>\n\n<div class=\"timeline__content\">\n\n    <div ng-include=\" \'media/instagram.html\' \"></div>\n    <p class=\"timeline__text\" linkify=\"instagram\" ng-bind=\"::item.text | html\"></p>\n</div>\n\n<div ng-include=\" \'actions/instagram.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>\n");
$templateCache.put("media/instagram.html","<div class=\"timeline__media\">\n    <a ng-if=\"::!item.videos\" ng-href=\"{{::item.images.standard_resolution}}\" target=\"_blank\">\n        <svg class=\"timeline__media__jumpButton tips--deep animate--faster\">\n            <use xlink:href=\"#instagram-eyeball-icon\"></use>\n        </svg>\n    </a>\n    <img ng-if=\"::!item.videos\" ng-src=\"{{::item.images.standard_resolution}}\" handle-image-error>\n\n    <ol-video ng-if=\"::item.videos\" ol-src=\"::item.videos.standard_resolution\" ol-poster=\"::item.images.standard_resolution\"></ol-video>\n\n</div>\n");
$templateCache.put("media/twitter--quote.html","<div class=\"timeline__media\">\n    <div ng-repeat=\"media in ::item.quote.media\" class=\"timeline__media--large\">\n        <a ng-if=\"::media.type === \'photo\'\" ng-href=\"{{::media.image_url}}:large\" target=\"_blank\">\n            <svg class=\"timeline__media__jumpButton tips--deep animate--faster\">\n                <use xlink:href=\"#twitter-eyeball-icon\"></use>\n            </svg>\n        </a>\n        <img ng-if=\"::media.type === \'photo\'\" ng-src=\"{{::media.image_url}}\" handle-image-error>\n\n        <ol-video ng-if=\"::media.type !== \'photo\'\" ol-src=\"::media.video_url\" ol-poster=\"::media.image_url\"></ol-video>\n    </div>\n</div>\n");
$templateCache.put("media/twitter.html","<div class=\"timeline__media\">\n    <div ng-repeat=\"media in ::item.media\" class=\"timeline__media--large\">\n        <a ng-if=\"::media.type === \'photo\'\" ng-href=\"{{::media.image_url}}:large\" target=\"_blank\">\n            <svg class=\"timeline__media__jumpButton tips--deep animate--faster\">\n                <use xlink:href=\"#twitter-eyeball-icon\"></use>\n            </svg>\n        </a>\n        <img ng-if=\"::media.type === \'photo\'\" ng-src=\"{{::media.image_url}}\" handle-image-error>\n\n        <ol-video ng-if=\"::media.type !== \'photo\'\" ol-src=\"::media.video_url\" ol-poster=\"::media.image_url\"></ol-video>\n    </div>\n</div>\n");
$templateCache.put("media/video.html","<video ng-attr-poster=\"{{olPoster}}\" preload=\"none\" loop webkit-playsinline=\"true\"></video>\n\n<svg class=\"timeline__media__playButton animate--faster\">\n   <use xlink:href=\"#play-icon\"></use>\n</svg>");
$templateCache.put("media/weibo.html","<div class=\"timeline__media overflow--x timeline__media--thumb\">\n    <img class=\"animate--faster\" ng-repeat=\"media in ::item.media\" ng-src=\"{{:: media.image_url}}\" ng-class=\"::{ \'timeline__media--gif\': media.type ===\'gif\' }\" ol-image-thumb handle-image-error>\n</div>\n<div class=\"timeline__media timeline__media--inactive\">\n    <img src=\"\" alt=\"weibo_large_photo\" select-image image-count=\"{{:: item.media.length}}\" handle-image-error>\n    <a href=\"\" target=\"_blank\">\n        <svg class=\"timeline__media__jumpButton tips--deep animate--faster\">\n            <use xlink:href=\"#weibo-eyeball-icon\"></use>\n        </svg>\n    </a>\n</div>");
$templateCache.put("twitter/quote.html","<div ng-include=\" \'twitter/component/profile.html\' \"></div>\n\n<div ng-include=\" \'twitter/component/content.html\' \"></div>\n\n<!-- Origin Start -->\n<div class=\"timeline timeline--quote timeline--quote--twitter\">\n\n    <div ng-include=\" \'twitter/component/profile--quote.html\' \"></div>\n\n    <div ng-include=\" \'twitter/component/content--quote.html\' \"></div>\n\n    <div ng-include=\" \'actions/twitter--quote.html\' \"></div>\n\n    <span class=\"timeline__time\" relative-date=\"{{::item.quote.created_at}}\"></span>\n\n</div>\n<!-- Origin End -->\n\n<div ng-include=\" \'actions/twitter.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>");
$templateCache.put("twitter/retweet.html","<div ng-include=\" \'twitter/component/profile--retweet.html\' \"></div>\n\n<div ng-include=\" \'twitter/component/content.html\' \"></div>\n\n<a class=\"timeline--retweet__profile__avatar\" ng-href=\"//twitter.com/{{::item.user.screen_name}}\" target=\"_blank\">\n    <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.user.profile_image_url_https}}\" alt=\"avatar\">\n</a>\n\n<div ng-include=\" \'actions/twitter.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>\n");
$templateCache.put("twitter/tweet.html","<div ng-include=\" \'twitter/component/profile.html\' \"></div>\n\n<div ng-include=\" \'twitter/component/content.html\' \"></div>\n\n<div ng-include=\" \'actions/twitter.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>");
$templateCache.put("weibo/quote.html","<div ng-include=\" \'weibo/component/profile.html\' \"></div>\n\n<div ng-include=\" \'weibo/component/content.html\' \"></div>\n\n<!-- Origin Start -->\n<div class=\"timeline timeline--quote timeline--quote--weibo\">\n\n    <div ng-include=\" \'weibo/component/profile--retweet.html\' \"></div>\n\n    <div ng-include=\" \'weibo/component/content--retweet.html\' \"></div>\n\n    <div ng-include=\" \'actions/weibo--quote.html\' \"></div>\n\n    <span class=\"timeline__time\" relative-date=\"{{::item.retweet.created_at}}\"></span>\n</div>\n<!-- Origin End -->\n\n<div ng-include=\" \'actions/weibo.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>\n");
$templateCache.put("weibo/retweet.html","<div ng-include=\" \'weibo/component/profile--retweet.html\' \"></div>\n\n<div ng-include=\" \'weibo/component/content--retweet.html\' \"></div>\n\n<a class=\"timeline--retweet__profile__avatar\" ng-href=\"//weibo.com/n/{{::item.user.screen_name}}\" target=\"_blank\">\n    <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.user.profile_image_url_https}}\" alt=\"avatar\">\n</a>\n\n<div ng-include=\" \'actions/weibo.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>\n");
$templateCache.put("weibo/tweet.html","<div ng-include=\" \'weibo/component/profile.html\' \"></div>\n\n<div ng-include=\" \'weibo/component/content.html\' \"></div>\n\n<div ng-include=\" \'actions/weibo.html\' \"></div>\n\n<span class=\"timeline__time tips\" relative-date=\"{{::item.created_at}}\"></span>");
$templateCache.put("controlCenter/wrapper.html","<div class=\"controlCenter__wrapper\">\n    <div class=\"vertically_center\">\n        <div ng-if=\"controlCenter === \'replicant--deckard\'\" ng-include=\" \'controlCenter/replicant/deckard.html\' \" class=\"replicant\">\n        </div>\n        <div ng-if=\"controlCenter === \'replicant--rachael\'\" ng-include=\" \'controlCenter/replicant/rachael.html\' \" class=\"replicant\">\n        </div>\n        <div ng-if=\"controlCenter === \'newTweet\'\" ng-include=\" \'controlCenter/write/tweet.html\' \"></div>\n    </div>\n</div>");
$templateCache.put("menu/left.html","<div class=\"menu menu--left animate--faster\">\n\n    <div ng-show=\"isTimeline\" class=\"vertically_center\">\n        <a ui-sref=\"settings\">\n            <svg class=\"menu__button animate--faster\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n                <g fill=\"none\">\n                    <circle fill=\"#F1F1F1\" cx=\"100\" cy=\"100\" r=\"100\"/>\n                    <circle fill=\"#FFF\" cx=\"100\" cy=\"42.5\" r=\"15\" data-provider=\"twitter\"/>\n                    <circle fill=\"#FFF\" cx=\"100\" cy=\"100\" r=\"15\" data-provider=\"instagram\"/>\n                    <circle fill=\"#FFF\" cx=\"100\" cy=\"157.5\" r=\"15\" data-provider=\"weibo\"/>\n                </g>\n            </svg>\n        </a>\n    </div>\n\n</div>");
$templateCache.put("menu/right.html","<div class=\"menu menu--right animate--faster\">\n\n    <div ng-if=\"!isTimeline\" class=\"vertically_center\">\n        <a ui-sref=\"timeline\">\n            <svg ng-show=\"providerList.length > 0\" class=\"menu__button animate--faster\">\n                <use xlink:href=\"#ok-icon\"></use>\n            </svg>\n        </a>\n    </div>\n\n    <div ng-if=\"isTimeline\" class=\"vertically_center\">\n        <svg class=\"menu__button animate--faster\" ng-click=\"toggleControlCenter(\'newTweet\')\" toggle-class=\"menu__button--active\" toggle-icon=\'#newTweet-icon, #cancel-icon\'>\n            <use xlink:href=\"#newTweet-icon\"></use>\n        </svg>\n    </div>\n\n</div>");
$templateCache.put("weibo/component/content--retweet.html","<div class=\"timeline__content\">\n    <p class=\"timeline__text\" linkify=\"weibo\" weibo-emotify ng-bind=\"::item.retweet.text | html\"></p>\n\n    <div ng-if=\"::item.media\" ng-include=\" \'media/weibo.html\' \"></div>\n</div>");
$templateCache.put("weibo/component/content.html","<div class=\"timeline__content\">\n    <p class=\"timeline__text\" linkify=\"weibo\" weibo-emotify ng-bind=\"::item.text | html\"></p>\n\n    <div ng-if=\"::item.media && item.type === \'tweet\'\" ng-include=\" \'media/weibo.html\' \"></div>   \n</div>");
$templateCache.put("weibo/component/profile--retweet.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//weibo.com/n/{{::item.retweet.user.screen_name}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.retweet.user.profile_image_url_https}}\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//weibo.com/n/{{::item.retweet.user.screen_name}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.retweet.user.name\"></strong>\n        </a>\n    </div>\n</div>");
$templateCache.put("weibo/component/profile.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//weibo.com/n/{{::item.user.screen_name}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.user.profile_image_url_https}}\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//weibo.com/n/{{::item.user.screen_name}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.user.name\"></strong>\n        </a>\n    </div>\n</div>");
$templateCache.put("twitter/component/content--quote.html","<div class=\"timeline__content\">\n    <p class=\"timeline__text\" trim-media-link=\"{{::item.quote.mediaLink}}\" linkify=\"twitter\" ng-bind-html=\"::item.quote.text\"></p>\n    <div ng-if=\"::item.quote.media\" ng-include=\" \'media/twitter--quote.html\' \"></div>\n</div>");
$templateCache.put("twitter/component/content.html","<div class=\"timeline__content\">\n    <p class=\"timeline__text\" trim-media-link=\"{{::item.mediaLink}}\" linkify=\"twitter\" ng-bind-html=\"::item.text\"></p>\n\n    <div ng-if=\"::item.media\" ng-include=\" \'media/twitter.html\' \"></div>\n</div>");
$templateCache.put("twitter/component/profile--quote.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//twitter.com/{{::item.quote.user.screen_name}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.quote.user.profile_image_url_https}}\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//twitter.com/{{::item.quote.user.screen_name}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.quote.user.name\"></strong>\n        <a>\n    </div>\n</div>");
$templateCache.put("twitter/component/profile--retweet.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//twitter.com/{{::item.retweet.user.screen_name}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.retweet.user.profile_image_url_https.replace(\'normal\', \'bigger\')}}\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//twitter.com/{{::item.retweet.user.screen_name}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.retweet.user.name\"></strong>\n        </a>\n    </div>\n</div>");
$templateCache.put("twitter/component/profile.html","<div class=\"timeline__profile\">\n    <a ng-href=\"//twitter.com/{{::item.user.screen_name}}\" target=\"_blank\">\n        <img class=\"timeline__profile__avatar\" ng-src=\"{{::item.user.profile_image_url_https.replace(\'normal\', \'bigger\')}}\" alt=\"avatar\">\n    </a>\n    <div class=\"timeline__profile__fullname\">\n        <a ng-href=\"//twitter.com/{{::item.user.screen_name}}\" target=\"_blank\">\n            <strong ng-bind=\"::item.user.name\"></strong>\n        </a>\n    </div>\n</div>");
$templateCache.put("controlCenter/replicant/deckard.html","<span class=\"replicant--deckard\" replicant-deckard data-countdown></span>");
$templateCache.put("controlCenter/replicant/rachael.html","<form method=\"POST\" action=\"\" replicant-rachael>\n    <input class=\"replicant--rachael\" type=\"text\" name=\"code\" placeholder=\"80af294\" required maxlength=\"7\">\n</form>\n");
$templateCache.put("controlCenter/write/tweet.html","<form name=\"newTweetForm\" write-tweet>\n\n    <textarea class=\"write__textarea\" type=\"text\" name=\"tweet\" autocomplete=\"off\" maxlength=\"140\" required></textarea>\n\n    <div class=\"write__toolBar\">\n        <div class=\"write__submit\">\n            <span class=\"write__submit__counter\">140</span>\n            <button class=\"write__submit__button\" type=\"submit\">\n                <svg viewBox=\"0 0 113 72\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M112.718.903s-1.74 5.319-9.864 8.912c-6.566 2.944-12.607 3.797-17.691 7.082 3.668 1.347 10.805 1.728 16.598.573-1.553 2.113-2.782 3.538-4.997 5.224-6.583 4.851-12.146 5.626-20.882 5.656-5.001.046-9.067 2.967-9.067 2.967 4.808 1.695 9.859 2.227 15.161 1.935-4.445 7.868-20.893 9.028-27.985 7.76 0 0-.031.103-.135.071-9.696-1.277-20.828 5.11-31.305 14.172-5.088 4.408-9.009 7.598-11.891 9.98-4.453 3.815-8.654 6.806-9.668 6.046-1.014-.76.285-4.639 4.723-10.259 2.417-3.087 13.373-15.941 29.133-28.564 20.347-16.51 48.28-33.738 77.872-31.555z\" fill=\"#FFF\"/>\n                </svg>\n            </button>\n        </div>\n    </div>\n</form>");}]);
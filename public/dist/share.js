webpackJsonp([2],{0:function(e,t,n){e.exports=n(227)},227:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(1),u=a(l),d=n(60),s=a(d),f=n(6),p=a(f),m=n(236);n(174);var h=n(26),v=a(h),w=n(104),y=a(w),g=n(105),b=a(g),_=function(e){var t=e.provider,n=e.post,a=e.viewCount,r=e.sharers,i=void 0;switch(t){case"twitter":case"weibo":i=u["default"].createElement("div",{className:"detail__container provider--"+t},u["default"].createElement(y["default"],null,u["default"].createElement(b["default"],{name:"share",text:{type:"count",content:r.length},iconCount:4}),u["default"].createElement(b["default"],{name:"detail",text:{type:"count",content:a},iconCount:4}),u["default"].createElement(b["default"],{name:"like",text:{type:"count",content:n.like_count},active:n.liked,iconCount:4}),u["default"].createElement(b["default"],{name:"retweet",text:{type:"count",content:n.retweet_count},active:n.retweeted,iconCount:4})),u["default"].createElement(y["default"],{type:"share",provider:t,list:r}));break;case"instagram":i=u["default"].createElement("div",{className:"detail__container provider--"+t},u["default"].createElement(y["default"],null,u["default"].createElement(b["default"],{name:"share",text:{type:"count",content:r.length},iconCount:4}),u["default"].createElement(b["default"],{name:"detail",text:{type:"count",content:a},iconCount:4}),u["default"].createElement(b["default"],{name:"like",text:{type:"count",content:n.like_count},active:n.liked,iconCount:4}),u["default"].createElement(b["default"],{name:"reply",text:{type:"count",content:n.reply_count},iconCount:4})),u["default"].createElement(y["default"],{type:"share",provider:t,list:r}))}return i},E=function(e){function t(e){r(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e));return n.state={center:!0},n.checkDetailHeight=n.checkDetailHeight.bind(n),n}return o(t,e),c(t,[{key:"checkDetailHeight",value:function(){this.refs.detail.offsetHeight>window.innerHeight?this.setState({center:!1}):this.setState({center:!0})}},{key:"shouldComponentUpdate",value:function(e,t){return this.state.center!==t.center}},{key:"componentDidMount",value:function(){var e=this;this.checkDetailHeight(),setInterval(function(){e.checkDetailHeight()},1e3),window.addEventListener("blur",function(){var e=document.getElementsByTagName("video");[].forEach.call(e,function(e){e.pause()})})}},{key:"render",value:function(){var e=window.__share_data__,t=e.data,n=e.sharers,a=e.viewCount,r=t.provider,i=(0,p["default"])({popup__wrapper:!0,vertically_center:this.state.center});return u["default"].createElement("div",{className:"oneline oneline--timeline animate--general"},u["default"].createElement("div",{className:"popup overflow--y"},u["default"].createElement("div",{className:i},u["default"].createElement("div",{className:"detail overflow--y animate--enter",ref:"detail"},u["default"].createElement(v["default"],{className:"detail__post",post:(0,m.rewriteMediaLink)({type:"post",provider:r,data:t})}),u["default"].createElement(_,{provider:r,post:t,viewCount:a,sharers:(0,m.rewriteMediaLink)({type:"sharers",provider:r,data:n})})))))}}]),t}(u["default"].Component);s["default"].render(u["default"].createElement(E,null),document.querySelector(".root"))},236:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.rewriteMediaLink=void 0;var r=n(47),i=(a(r),n(14)),o=a(i);t.rewriteMediaLink=function(e){var t=e.type,n=e.provider,a=e.data;if("weibo"===n||!o["default"].get("isBlocked"))return a;var r=window.location.origin,i=r+"/media",c={twitter:function(e){return e.replace(/(https?:\/\/[\w|\-]+?\.twimg\.com[^"]*?)/g,i+"?src=$1")},instagram:function(e){return e.replace(/(https?:\/\/[\w|\-]+?\.(akamaihd|fbcdn|cdninstagram|instagram)\.(net|com)[^"]*?\.(gif|png|jpg|jpeg|mp4|webp))/g,i+"?src=$1")},weibo:function(e){return e.replace(/(https?:\/\/[\w|\-]+?\.sinaimg.cn[^"]*?\.(gif|png|jpg|jpeg|mp4|webp))/g,i+"?src=$1")}},l=void 0;switch(t){case"sharers":case"post":l=JSON.parse(c[n](JSON.stringify(a)));break;default:throw"invalid type: "+t}return l}}});
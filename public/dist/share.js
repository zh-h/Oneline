webpackJsonp([2],{0:function(e,t,n){e.exports=n(223)},223:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(1),u=a(i),f=n(61),d=a(f),s=n(6),p=a(s);n(172);var m=n(30),h=a(m),v=n(104),y=a(v),w=n(105),E=a(w),_=function(e){var t=e.provider,n=e.post,a=e.viewCount,r=e.sharers,o=void 0;switch(t){case"twitter":case"weibo":o=u["default"].createElement("div",{className:"detail__container provider--"+t},u["default"].createElement(y["default"],null,u["default"].createElement(E["default"],{name:"share",text:{type:"count",content:r.length},iconCount:4}),u["default"].createElement(E["default"],{name:"detail",text:{type:"count",content:a},iconCount:4}),u["default"].createElement(E["default"],{name:"like",text:{type:"count",content:n.like_count},active:n.liked,iconCount:4}),u["default"].createElement(E["default"],{name:"retweet",text:{type:"count",content:n.retweet_count},active:n.retweeted,iconCount:4})),u["default"].createElement(y["default"],{type:"share",provider:t,list:r}));break;case"instagram":o=u["default"].createElement("div",{className:"detail__container provider--"+t},u["default"].createElement(y["default"],null,u["default"].createElement(E["default"],{name:"share",text:{type:"count",content:r.length},iconCount:4}),u["default"].createElement(E["default"],{name:"detail",text:{type:"count",content:a},iconCount:4}),u["default"].createElement(E["default"],{name:"like",text:{type:"count",content:n.like_count},active:n.liked,iconCount:4}),u["default"].createElement(E["default"],{name:"reply",text:{type:"count",content:n.reply_count},iconCount:4})),u["default"].createElement(y["default"],{type:"share",provider:t,list:r}))}return o},b=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={center:!0},n.checkDetailHeight=n.checkDetailHeight.bind(n),n}return l(t,e),c(t,[{key:"checkDetailHeight",value:function(){this.refs.detail.offsetHeight>window.innerHeight?this.setState({center:!1}):this.setState({center:!0})}},{key:"shouldComponentUpdate",value:function(e,t){return this.state.center!==t.center}},{key:"componentDidMount",value:function(){var e=this;this.checkDetailHeight(),setInterval(function(){e.checkDetailHeight()},1e3),window.addEventListener("blur",function(){var e=document.getElementsByTagName("video");[].forEach.call(e,function(e){e.pause()})})}},{key:"render",value:function(){var e=window.__share_data__,t=e.data,n=e.sharers,a=e.viewCount,r=t.provider,o=(0,p["default"])({popup__wrapper:!0,vertically_center:this.state.center});return u["default"].createElement("div",{className:"oneline oneline--timeline animate--general"},u["default"].createElement("div",{className:"popup overflow--y"},u["default"].createElement("div",{className:o},u["default"].createElement("div",{className:"detail overflow--y animate--enter",ref:"detail"},u["default"].createElement(h["default"],{className:"detail__post",post:t}),u["default"].createElement(_,{provider:r,post:t,viewCount:a,sharers:n})))))}}]),t}(u["default"].Component);d["default"].render(u["default"].createElement(b,null),document.querySelector(".root"))}});
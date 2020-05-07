if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),function(t){"use strict";var e=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};e.VERSION="3.4.0",e.TRANSITION_DURATION=150,e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},e.prototype.init=function(e,o,i){if(this.enabled=!0,this.type=e,this.$element=t(o),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(document).find(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var n=this.options.trigger.split(" "),s=n.length;s--;){var r=n[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(e){return(e=t.extend({},this.getDefaults(),this.$element.data(),e)).delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},e.prototype.getDelegateOptions=function(){var e={},o=this.getDefaults();return this._options&&t.each(this._options,function(t,i){o[t]!=i&&(e[t]=i)}),e},e.prototype.enter=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusin"==e.type?"focus":"hover"]=!0),o.tip().hasClass("in")||"in"==o.hoverState)o.hoverState="in";else{if(clearTimeout(o.timeout),o.hoverState="in",!o.options.delay||!o.options.delay.show)return o.show();o.timeout=setTimeout(function(){"in"==o.hoverState&&o.show()},o.options.delay.show)}},e.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},e.prototype.leave=function(e){var o=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(o||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o)),e instanceof t.Event&&(o.inState["focusout"==e.type?"focus":"hover"]=!1),!o.isInStateTrue()){if(clearTimeout(o.timeout),o.hoverState="out",!o.options.delay||!o.options.delay.hide)return o.hide();o.timeout=setTimeout(function(){"out"==o.hoverState&&o.hide()},o.options.delay.hide)}},e.prototype.show=function(){var o=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(o);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(o.isDefaultPrevented()||!i)return;var n=this,s=this.tip(),r=this.getUID(this.type);this.setContent(),s.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(t(document).find(this.options.container)):s.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var p=this.getPosition(),c=s[0].offsetWidth,d=s[0].offsetHeight;if(h){var u=a,f=this.getPosition(this.$viewport);a="bottom"==a&&p.bottom+d>f.bottom?"top":"top"==a&&p.top-d<f.top?"bottom":"right"==a&&p.right+c>f.width?"left":"left"==a&&p.left-c<f.left?"right":a,s.removeClass(u).addClass(a)}var m=this.getCalculatedOffset(a,p,c,d);this.applyPlacement(m,a);var g=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",g).emulateTransitionEnd(e.TRANSITION_DURATION):g()}},e.prototype.applyPlacement=function(e,o){var i=this.tip(),n=i[0].offsetWidth,s=i[0].offsetHeight,r=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top+=r,e.left+=a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var l=i[0].offsetWidth,h=i[0].offsetHeight;"top"==o&&h!=s&&(e.top=e.top+s-h);var p=this.getViewportAdjustedDelta(o,e,l,h);p.left?e.left+=p.left:e.top+=p.top;var c=/top|bottom/.test(o),d=c?2*p.left-n+l:2*p.top-s+h,u=c?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(d,i[0][u],c)},e.prototype.replaceArrow=function(t,e,o){this.arrow().css(o?"left":"top",50*(1-t/e)+"%").css(o?"top":"left","")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(o){function i(){"in"!=n.hoverState&&s.detach(),n.$element&&n.$element.removeAttr("aria-describedby").trigger("hidden.bs."+n.type),o&&o()}var n=this,s=t(this.$tip),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(e.TRANSITION_DURATION):i(),this.hoverState=null,this)},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(e){var o=(e=e||this.$element)[0],i="BODY"==o.tagName,n=o.getBoundingClientRect();null==n.width&&(n=t.extend({},n,{width:n.right-n.left,height:n.bottom-n.top}));var s=window.SVGElement&&o instanceof window.SVGElement,r=i?{top:0,left:0}:s?null:e.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},n,a,l,r)},e.prototype.getCalculatedOffset=function(t,e,o,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-o/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-o/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-o}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},e.prototype.getViewportAdjustedDelta=function(t,e,o,i){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+i;a<r.top?n.top=r.top-a:l>r.top+r.height&&(n.top=r.top+r.height-l)}else{var h=e.left-s,p=e.left+s+o;h<r.left?n.left=r.left-h:p>r.right&&(n.left=r.left+r.width-p)}return n},e.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},e.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},e.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(e){var o=this;e&&((o=t(e.currentTarget).data("bs."+this.type))||(o=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,o))),e?(o.inState.click=!o.inState.click,o.isInStateTrue()?o.enter(o):o.leave(o)):o.tip().hasClass("in")?o.leave(o):o.enter(o)},e.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var o=t.fn.tietooltip;t.fn.tietooltip=function(o){return this.each(function(){var i=t(this),n=i.data("bs.tooltip"),s="object"==typeof o&&o;!n&&/destroy|hide/.test(o)||(n||i.data("bs.tooltip",n=new e(this,s)),"string"==typeof o&&n[o]())})},t.fn.tietooltip.Constructor=e,t.fn.tietooltip.noConflict=function(){return t.fn.tooltip=o,this}}(jQuery);var $the_post=jQuery("#the-post"),$postContent=$the_post.find(".entry");$doc.ready(function(){"use strict";function t(t){var e;if(!t)var t=window.event;return t.which?e=3==t.which:t.button&&(e=2==t.button),e}function e(){var t="";return window.getSelection?t=window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&(t=document.selection.createRange().text),t}if($doc.on("click","#toggle-post-button",function(){return $postContent.toggleClass("is-expanded"),jQuery(this).hide(),!1}),$doc.on("click",".print-share-btn",function(){return window.print(),!1}),tie.responsive_tables&&$the_post.find("table").wrap('<div class="table-is-responsive"></div>'),jQuery('[data-toggle="tooltip"]').tietooltip(),$doc.on("click",".share-links a:not(.email-share-btn)",function(){var t=jQuery(this).attr("href");return"#"!=t?(window.open(t,"TIEshare","height=450,width=760,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"),!1):void 0}),tie.is_sticky_video&&jQuery("#the-sticky-video").length){var o=jQuery("#the-sticky-video"),i=o.offset().top,n=tie.sticky_desktop?60:0,n=$body.hasClass("admin-bar")?n+32:n,s=Math.floor(i+o.outerHeight()-n),r=$window.width();jQuery(".video-close-btn").click(function(){o.removeClass("video-is-sticky").addClass("stop-sticky")}),$window.on("resize load",function(){if(i=o.offset().top,s=Math.floor(i+o.outerHeight()-n),r=$window.width(),$body.hasClass("has-sidebar")){var t=jQuery(".sidebar"),e=t.width(),a=$body.hasClass("magazine2")&&$body.hasClass("sidebar-right")?40:15,l=$window.width()-(t.offset().left+e);o.find(".featured-area-inner").css({width:e,height:e*(9/16),right:l-a,left:"auto",top:n+20})}}).on("scroll",function(){o.hasClass("stop-sticky")||o.toggleClass("video-is-sticky",$window.scrollTop()>s&&r>992)})}tie.reading_indicator&&$postContent.length&&$postContent.imagesLoaded(function(){var t=$postContent.height(),e=$window.height();$window.scroll(function(){var o=0,i=$postContent.offset().top,n=$window.scrollTop();n>i&&(o=100*(n-i)/(t-e)),jQuery("#reading-position-indicator").css("width",o+"%")})});var a=jQuery("#check-also-box");if(a.length){tie_animate_element(a);var l=$the_post.outerHeight(),h=!1;$window.scroll(function(){if(!h){var t=$window.scrollTop();t>l?a.addClass("show-check-also"):a.removeClass("show-check-also")}})}jQuery("#check-also-close").on("click",function(){return a.removeClass("show-check-also"),h=!0,!1}),tie.select_share&&($postContent.mousedown(function(o){$body.attr("mouse-top",o.clientY+window.pageYOffset),$body.attr("mouse-left",o.clientX),!t(o)&&e().length&&(jQuery(".fly-text-share").remove(),document.getSelection().removeAllRanges())}),$postContent.mouseup(function(o){var i=(jQuery(o.target),e()),n=i;if(i.length>3&&!t(o)){var s=$body.attr("mouse-top"),r=o.clientY+window.pageYOffset;parseInt(s)<parseInt(r)&&(r=s);var a=$body.attr("mouse-left"),l=o.clientX,h=parseInt(a)+(parseInt(l)-parseInt(a))/2,p=window.location.href.split("?")[0],c=114;i=i.substring(0,c),tie.twitter_username&&(c-=tie.twitter_username.length+2,i=i.substring(0,c),i=i+" @"+tie.twitter_username);var d="";tie.select_share_twitter&&(d+='<a href="https://twitter.com/share?url='+encodeURIComponent(p)+"&text="+encodeURIComponent(i)+"\" class='fa fa-twitter' onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;\"></a>"),tie.select_share_facebook&&tie.facebook_app_id&&(d+='<a href="https://www.facebook.com/dialog/feed?app_id='+tie.facebook_app_id+"&amp;link="+encodeURIComponent(p)+"&amp;quote="+encodeURIComponent(n)+"\" class='fa fa-facebook' onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;\"></a>"),tie.select_share_linkedin&&(d+='<a href="https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(p)+"&summary="+encodeURIComponent(n)+"\" class='fa fa-linkedin' onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;\"></a>"),tie.select_share_email&&(d+='<a href="mailto:?body='+encodeURIComponent(n)+" "+encodeURIComponent(p)+"\" class='fa fa-envelope' onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;\"></a>"),""!=d&&$body.append('<div class="fly-text-share">'+d+"</div>"),jQuery(".fly-text-share").css({position:"absolute",top:parseInt(r)-60,left:parseInt(h)}).show()}})),$doc.on("mousemove",".taq-user-rate-active",function(t){var e=jQuery(this);if(e.hasClass("rated-done"))return!1;t.offsetX||(t.offsetX=t.clientX-jQuery(t.target).offset().left);var o=t.offsetX,i=e.width(),n=Math.round(o/i*100);e.find(".user-rate-image span").attr("data-user-rate",n).css("width",n+"%")}),$doc.on("click",".taq-user-rate-active",function(){var t=jQuery(this),e=t.parent(),o=e.find(".taq-count"),i=t.attr("data-id"),n=o.text();if(t.hasClass("rated-done")||t.hasClass("rated-in-progress"))return!1;t.addClass("rated-in-progress");var s=t.find(".user-rate-image span").data("user-rate");t.find(".user-rate-image").hide(),t.append('<span class="taq-load">'+tie.ajax_loader+"</span>"),s>=95&&(s=100);var r=5*s/100;return jQuery.post(taqyeem.ajaxurl,{action:"taqyeem_rate_post",post:i,value:r},function(){t.addClass("rated-done").attr("data-rate",s),t.find(".user-rate-image span").width(s+"%"),jQuery(".taq-load").fadeOut(function(){e.find(".taq-score").html(r),o.length?(n=parseInt(n)+1,o.html(n)):e.find("small").hide(),e.find("strong").html(taqyeem.your_rating),t.find(".user-rate-image").fadeIn()})},"html"),!1}),$doc.on("mouseleave",".taq-user-rate-active",function(){var t=jQuery(this);if(t.hasClass("rated-done"))return!1;var e=t.attr("data-rate");t.find(".user-rate-image span").css("width",e+"%")})});

/**
 * Created by luyi-netease on 2016/5/19.
 */
'use strict';

/**
 * 专门为移动端设计的触摸滚动式的图片轮播
 * @param params 必需参数
 * params : {
 *    slideContainer: 轮播图的parent元素，必需参数
 *    dotContainer: 轮播图下方的"..."的parent元素，指示轮播图的当前下标
 *    speed: 切换一张图片所需时间(ms)，默认为200
 * }
 * @constructor
 */
var TouchSlide = function(params) {
    if (!params) throw '参数缺失';
    if (!params.slideContainer) throw 'slideContainer参数缺失';
    this.$slideContainer = $(params.slideContainer);
    if (this.$slideContainer.children().length < 2) return;
    if (params.dotContainer) this.$dotContainer = $(params.dotContainer);
    this.currentIndex = 0; //当前轮播图在其parent的下标
    this.slideList = []; //按原来的顺序储存每一张轮播图
    this.itemWidth = this.$slideContainer.children().width(); //轮播图宽度
    this.speed = parseInt(this.itemWidth / (params.speed || 200) * 16); //换算成轮播图切换时每帧的位移
    this.posX = 0; //轮播图container的left位移值，取正值
    this.allowTouch = true;
    this.addSlideItem();
    this.signSlideItem();
    this.chooseCurrentDot();
    this.sortSlideList();
    this.eventHandler();
};

TouchSlide.prototype.eventHandler = function() {
    var self = this,
        ratio = 1, //$('body').width() / window.innerWidth,
        status, //status=0,1,2分别代表touchstart, touchmove, touchend三种事件状态，保证它们必须按顺序执行
        beginX,
        endX,
        beginTime,
        endPosX;
    var touchstart = function(e) {
        if (!self.allowTouch) return;
        status = 0;
        e = e.originalEvent || e;
        beginTime = new Date().getTime();
        beginX = e.touches[0].clientX * ratio;
    };
    var touchmove = function(e) {
        if(e.preventDefault) {
            e.preventDefault();
        }
        else{
            window.event.returnValue = false;
        }
        if (!self.allowTouch || (status !== 0 && status !== 1)) return;
        status = 1;
        e = e.originalEvent || e;
        endX = e.touches[0].clientX * ratio;
        endPosX = self.posX + endX - beginX;
        self.translate3d(self.$slideContainer, endPosX);
    };
    var touchend = function() {
        if (!self.allowTouch || status !== 1) return;
        status = 2;
        self.posX = endPosX;
        self.calcNextItem(endX - beginX, new Date().getTime() - beginTime);
    };
    self.$slideContainer.on('touchstart', touchstart)
        .on('touchmove', touchmove)
        .on('touchend touchcancel', touchend);
};

/**
 * 如果图片数目少于3，则每个复制一份添加到container
 */
TouchSlide.prototype.addSlideItem = function() {
    var self = this,
        $slideItem = self.$slideContainer.children();
    if($slideItem.length < 3) {
        $slideItem.each(function(i, e){
            $(e).appendTo(self.$slideContainer);
        });   
    }
}

/**
 * 定义每张图片并且标记他们的次序
 */
TouchSlide.prototype.signSlideItem = function() {
    var self = this;
    self.$slideContainer.css({
        'position':'relative',
        'left':0,
        'top':0
    })
    self.$slideContainer.children().each(function(i, e) {
        self.slideList.push(e);
        $(e).css({
            'position':'absolute',
            'top': 0
        })
        $(e).attr('data-slide-index', i);
    });
};

TouchSlide.prototype.sortSlideList = function() {
    var self = this,
        $slideItems = self.$slideContainer.children(),
        lastIndex = self.currentIndex > 0 ? self.currentIndex - 1 : $slideItems.length - 1,
        nextIndex = self.currentIndex < $slideItems.length - 1 ? self.currentIndex + 1 : 0;
    self.posX = 0;
    self.translate3d(self.$slideContainer, self.posX);
    $slideItems.each(function(i, e){
        switch (i){
            case self.currentIndex:
                $(e).css({
                    'left': self.posX + 'px',
                    'display': 'block'
                })
                break;
            case lastIndex:
                $(e).css({
                    'left': self.posX - self.itemWidth + 'px',
                    'display': 'block'
                })
                break;
            case nextIndex:
                $(e).css({
                    'left': self.posX + self.itemWidth + 'px',
                    'display': 'block'
                })
                break;
            default:
                $(e).css('display', 'none');
                break;
        }
    });
};

TouchSlide.prototype.calcNextItem = function(distance, time) {
    var self = this,
        d = 10,
        t = 200;
    if (Math.abs(distance) > d && time > 0 && time < t) {
        //用户操作符合短时间且滑动一定距离时，认为用户想要切换到上（下）一张图片
        distance > 0 ? self.slideToLeftItem(self.currentIndex - 1) : self.slideToRightItem(self.currentIndex + 1);
    }
    else {
        //否则根据当前轮播图的位置判定应该滑动到哪一张图片
        if(self.posX < - 0.5 * self.itemWidth){
            self.slideToRightItem(self.currentIndex + 1);
        }
        else if(self.posX > 0.5 * self.itemWidth){
            self.slideToLeftItem(self.currentIndex - 1);
        }
        else{
            distance > 0 ? self.slideToLeftItem() : self.slideToRightItem();
        }
    }
};

/**
 * 向右滑动
 * @param index 下一张图片下标，默认为当前下标
 */
TouchSlide.prototype.slideToRightItem = function(index) {
    var self = this,
        endX;
    if(isNaN(index)){
        index = self.currentIndex;
        endX = 0;
    }
    else{
        endX = -self.itemWidth;
    }
    if (index >= self.$slideContainer.children().length) index = 0;
    var animate = function() {
        if (self.posX <= endX) {
            self.slideEnd(index);
            return;
        }
        self.posX -= self.speed;
        if (self.posX <= endX) self.posX = endX;
        self.translate3d(self.$slideContainer, self.posX);
        window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
    self.allowTouch = false; //动画开始不允许touch
};

/**
 * 向左滑动
 * @param index 上一张图片下标，默认为当前下标
 */
TouchSlide.prototype.slideToLeftItem = function(index) {
    var self = this,
        endX;
    if(isNaN(index)){
        index = self.currentIndex;
        endX = 0;
    }
    else{
        endX = self.itemWidth;
    }
    index = index >= 0 ? index : self.$slideContainer.children().length - 1;
    var animate = function() {
        if (self.posX >= endX) {
            self.slideEnd(index);
            return;
        }
        self.posX += self.speed;
        if (self.posX >= endX) self.posX = endX;
        self.translate3d(self.$slideContainer, self.posX);
        window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
    self.allowTouch = false; //动画开始不允许touch
};

TouchSlide.prototype.slideEnd = function(index) {
    var self = this;
    self.currentIndex = index;
    self.chooseCurrentDot();
    self.sortSlideList();
    window.requestAnimationFrame(function(){
        self.allowTouch = true;
    });
};

TouchSlide.prototype.chooseCurrentDot = function() {
    var self = this;
    if (!self.$dotContainer) return;
    var slideIndex = self.$slideContainer.children().eq(self.currentIndex).attr('data-slide-index');
    slideIndex = parseInt(slideIndex);
    self.$dotContainer.children().each(function(i, e) {
        if (i === slideIndex) {
            $(e).addClass('current');
        } else {
            $(e).removeClass('current');
        }
    });
};

TouchSlide.prototype.translate3d = function($elem, x){
    var transform3d = 'translate3d(' + x + 'px, 0, 0)';
    $elem.css('transform', transform3d);
};


window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(fn) {
        setTimeout(fn, 16)
    };
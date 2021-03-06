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
    this.speed = this.itemWidth / (params.speed || 200) * 16; //换算成轮播图切换时每帧的位移
    this.posX = 0; //轮播图container的left位移值，取正值
    this.allowTouch = true;
    this.signSlideList();
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
        endPosX = self.posX - endX + beginX;
        self.translateContainer(-endPosX);
        //self.$slideContainer.css('left', -endPosX + 'px');
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

TouchSlide.prototype.signSlideList = function() {
    var self = this;
    self.$slideContainer.children().each(function(i, e) {
        self.slideList.push(e);
        $(e).attr('data-slide-index', i);
    });
};

TouchSlide.prototype.sortSlideList = function() {
    var self = this,
        $slideItems = self.$slideContainer.children(),
        attrIndex;
    if (self.currentIndex == 0) {
        //当前轮播的是第一张图片时，需要copy上一张图片到第一张图的位置
        attrIndex = $slideItems.eq(self.currentIndex).attr('data-slide-index');
        attrIndex = parseInt(attrIndex);
        //获取上一张图片的下标，如果 < 0，则获取最后一张
        var lastIndex = attrIndex - 1;
        lastIndex = lastIndex >= 0 ? lastIndex : self.slideList.length - 1;
        if ($slideItems.length > self.slideList.length) {
            //去掉最后一张图片，保证图片数量不超过原来数量 + 1
            $slideItems.last().remove();
        }
        //复制该图片到第一张的位置
        $(self.slideList[lastIndex]).clone().prependTo(self.$slideContainer);
        self.posX += self.itemWidth;
        window.requestAnimationFrame(function(){
            //将位置移动放在后面，
            self.translateContainer(-self.posX);
        });
        self.currentIndex++;
    } else if (self.currentIndex == $slideItems.length - 1) {
        //当前轮播的是最后一张图片时，需要copy下一张图片到最后一张图的位置
        attrIndex = $slideItems.eq(self.currentIndex).attr('data-slide-index');
        attrIndex = parseInt(attrIndex);
        //获取下一张图片的下标，如果 >= length，则获取第一张
        var nextIndex = attrIndex + 1;
        nextIndex = nextIndex < self.slideList.length ? nextIndex : 0;
        if ($slideItems.length > self.slideList.length) {
            //去掉最后一张图片，保证图片数量不超过原来数量 + 1
            $slideItems.first().remove();
            self.posX -= self.itemWidth;
            self.currentIndex--;
            window.requestAnimationFrame(function(){
                self.translateContainer(-self.posX);
            });
        }
        //复制该图片到最后一张的位置
        $(self.slideList[nextIndex]).clone().appendTo(self.$slideContainer);
    }
};

TouchSlide.prototype.calcNextItem = function(distance, time) {
    var self = this,
        d = 10,
        t = 200;
    if (Math.abs(distance) > d && time > 0 && time < t) {
        //用户操作符合短时间且滑动一定距离时，认为用户想要切换到下（上）一张图片
        distance > 0 ? self.slideToLeftItem() : self.slideToRightItem();
    }
    else {
        //否则根据当前轮播图的位置判定应该滑动到哪一张图片
        var index = parseInt(self.posX / self.itemWidth);
        if ((index + 0.5) * self.itemWidth < self.posX) {
            //如果当前位置超过图片1/2宽度时，认为用户想要切换到下一张图片
            index++;
            self.slideToRightItem(index);
        } else {
            self.slideToLeftItem(index);
        }
    }
};

TouchSlide.prototype.slideToRightItem = function(index) {
    var self = this,
        endX;
    index = index >= 0 ? index : self.currentIndex + 1;
    endX = self.itemWidth * index;
    if (index >= self.$slideContainer.children().length) return;
    var animate = function() {
        if (self.posX >= endX) {
            self.slideEnd(index);
            return;
        }
        self.posX += self.speed;
        if (self.posX >= endX) self.posX = endX;
        self.translateContainer(-self.posX);
        //self.$slideContainer.css('left', -self.posX + 'px');
        window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
    self.allowTouch = false; //动画开始不允许touch
};

TouchSlide.prototype.slideToLeftItem = function(index) {
    var self = this,
        endX;
    index = index >= 0 ? index : self.currentIndex - 1;
    endX = self.itemWidth * index;
    if (index < 0) return;
    var animate = function() {
        if (self.posX <= endX) {
            self.slideEnd(index);
            return;
        }
        self.posX -= self.speed;
        if (self.posX <= endX) self.posX = endX;
        self.translateContainer(-self.posX);
        //self.$slideContainer.css('left', -self.posX + 'px');
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

TouchSlide.prototype.translateContainer = function(x){
    var self = this,
        transform3d = 'translate3d(' + x + 'px, 0, 0)';
    self.$slideContainer.css({
        'transform': transform3d,
        '-webkit-transform': transform3d
    });
    //self.$slideContainer.css('left', x + 'px');
};

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(fn) {
        setTimeout(fn, 16)
    };
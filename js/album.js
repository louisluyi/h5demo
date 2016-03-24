/**
 * Created by luyi-netease on 2016/3/3.
 */

var Album = function(config){
    this.$container = $(config.container);
    this.$imgList = this.$container.find(config.imgSelector || 'img');
    this.leftClassName = config.leftClassName  || '';
    this.rightClassName = config.rightClassName  || '';
    this.currentClassName = config.currentClassName;
    this.$lastBtn = config.lastSelector ? this.$container.find(config.lastSelector) : null;
    this.$nextBtn = config.nextSelector ? this.$container.find(config.nextSelector) : null;
    //this.index = 0;

    if(!this.$container.length || !this.$imgList.length || !this.currentClassName) throw '参数不足哎';
    this.eventHandler();
}

Album.prototype.init = function(index){
    this.index = index || 0;
    this.showCurrent(this.index);
}

Album.prototype.showCurrent = function(index){
    var self = this,
        classnames = [self.leftClassName, self.currentClassName, self.rightClassName].join(' '),//选择器字符串构建
        $last, $current, $next;//上一张，当前，下一张
    index = index || self.index;
    index = index < 0 ? index + self.$imgList.length : index;
    index = index < self.$imgList.length ? index : index - self.$imgList.length;
    self.index = index;
    self.$imgList.each(function(i, e){
        if(i === index - 1){
            $last = $(e).addClass(self.leftClassName).removeClass(self.currentClassName);
        }
        if(i === index){
            $current = $(e).addClass(self.currentClassName).removeClass(self.leftClassName).removeClass(self.rightClassName);
        }
        if(i === index + 1){
            $next = $(e).addClass(self.rightClassName).removeClass(self.currentClassName);
        }
    });
    if(self.$lastBtn){
        $last && $last.length > 0 ? self.$lastBtn.show() : self.$lastBtn.hide();
    }
    if(self.$nextBtn){
        $next && $next.length > 0 ? self.$nextBtn.show() : self.$nextBtn.hide();
    }
}

Album.prototype.eventHandler = function(){
    var self = this;

    if(self.leftClassName){
        self.$container.on('click', '.' + self.leftClassName, function(){
            self.index--;
            self.showCurrent(self.index);
        });
    }
    if(self.rightClassName){
        self.$container.on('click', '.' + self.rightClassName, function(){
            self.index++;
            self.showCurrent(self.index);
        });
    }
    if(self.$lastBtn){
        self.$lastBtn.on('click', function(){
            self.index--;
            self.showCurrent(self.index);
        });
    }
    if(self.$nextBtn){
        self.$nextBtn.on('click', function(){
            self.index++;
            self.showCurrent(self.index);
        });
    }
}
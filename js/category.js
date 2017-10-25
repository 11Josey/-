/**
 * Created by Administrator on 2017/9/26.
 */
window.onload = function () {
    var leftBox = document.querySelector('.cs-main-left');
    var leftBoxHeight= leftBox.offsetHeight;
    var ulBox = document.querySelector('.cs-main-left>ul');
    var ulBoxHeight = ulBox.offsetHeight;
    /*静止状态下的top最值*/
    var minTop = leftBoxHeight-ulBoxHeight;
    var maxTop = 0;
    /*处于滑动状态下的top最值*/
    var minBounceTop = minTop-100;
    var maxBouceTop = maxTop +100;
    var startY = 0;
    var moveY = 0;
    var disY = 0;
    var currentY = 0;  /*记录在这一次移动之前所有的距离之和*/
    ulBox.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener('touchmove', function (e) {
        moveY = e.targetTouches[0].clientY;
        disY = moveY - startY;
        /*不在滑动区间,那么就不允许滑动*/
        if(disY+currentY>maxBouceTop||disY+currentY<minBounceTop) {
            return;
        }
        ulBox.style.transition ='none';
        ulBox.style.top = disY + currentY + 'px';
    });
    ulBox.addEventListener('touchend', function (e) {
        /*判断停下来的定位区间*/
        if(disY+currentY<minTop) {
            currentY = minTop;/*停下来需要重新定位*/
            ulBox.style.transition ='top 0.5s ease-in-out';
            ulBox.style.top =minTop + 'px';
        }else if (disY+currentY>maxTop) {
            currentY = maxTop;
            ulBox.style.transition ='top 0.5s ease-in-out';
            ulBox.style.top =maxTop + 'px';
        }else {
            currentY += disY;
        }
    });
    var lis = ulBox.querySelectorAll('li');
    for(var i = 0;i<lis.length;i++) {
        lis[i].index=i;
    }
    var liHeight = lis[0].offsetHeight;

    /*第三种方法,引入fastClick来实现点击操作,解决tap中的点透现象以及click中的延迟*/
    /* 使用方法
    3.1 首先在头部引入fastClick.js文件
    3.2 绑定FastClick对象到页面元素中,一般绑定到body上,这样页面所有元素都可以使用里面的点击事件
    其中绑定的方法有两种
    3.2.1 第一种是用原生js绑定
    if('addEventListener' in document) {
        document.addEventListener('DomContentLoaded',function () {
        //参数可以是任何dom元素
            FastClick.attach(document.body);
        },false);
      }

      3.2.2 第二种方法,jq下的绑定
      $(function() {
        FastClick.attach(document.body);
        });
    */


    /*第二种方法,引入zepto中的tap事件,其实就是用touch事件封装好的移动端点击事件,里面的业务逻辑一模一样
     * $(ulBox).on('tap',function(e) {});*/
    /*第一种方法,自己封装移动端的点击事件*/
   /* mobileEvents.tap(ulBox,function(e){
        for(var i = 0;i<lis.length;i++) {
            lis[i].classList.remove('active');
        }
       var li = e.target.parentNode;
        li.classList.add('active');
        var needHeigtht = -li.index*liHeight;
        ulBox.style.transition='top 0.5s ease-in-out';
        if(needHeigtht<minTop) {
            ulBox.style.top = minTop +'px';
            currentY = minTop;

        }else {
            ulBox.style.top = needHeigtht +'px';
            currentY = needHeigtht;
        }
    })*/
};
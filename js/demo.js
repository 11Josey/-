
/**
 * Created by Administrator on 2017/10/24.
 */
window.onload = function () {
    /*给每个元素都绑定了FastClick对象,之后使用点击事件,就不会出现延迟和点透的现象*/
    if('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded',function () {
            FastClick.attach(document.body);
        },false);
    }
    var leftMain = document.querySelector('.left-main');
    var ul1=leftMain.querySelector('ul');
    /*静止状态下的top最值*/
    var maxTop = 0;
    var minTop = leftMain.offsetHeight-ul1.offsetHeight;
    /*滑动状态下的top最值*/
    var minBounceTop = minTop-100;
    var maxBounceTop = maxTop+100;
    /*左边导航菜单的触摸滑动*/
    function touch() {
        var startY,moveY,disY,currentY=0;

        ul1.addEventListener('touchstart',function(ev){
            startY = ev.targetTouches[0].clientY;
        },false);
        ul1.addEventListener('touchmove',function(ev){
            moveY = ev.targetTouches[0].clientY;
            disY=moveY-startY;
            if(currentY + disY>maxBounceTop||currentY+disY<minBounceTop) {
                return;
            }
            ul1.style.transition='none';
            ul1.style.top = currentY + disY + 'px';
        },false);
        ul1.addEventListener('touchend',function(ev){
            if(currentY + disY>maxTop) {
                currentY=maxTop;
                ul1.style.transition='top 0.5s ease-in-out';
                ul1.style.top = maxTop + 'px';
            }
            else if(currentY + disY<minTop) {
                currentY=minTop;
                ul1.style.transition='top 0.5s ease-in-out';
                ul1.style.top = minTop + 'px';
            }else {
                currentY+=disY;
            }
        },false);
    }
    touch();
    click();
    /*左边导航栏点击上下跳动的效果*/
    function click () {
        /*给ul添加点击事件,事件捕获那么ev.target就是里面的链接a*/
        var lis = ul1.children;
        var height = lis[0].offsetHeight;
        ul1.addEventListener('click',function (ev) {
            for (var i = 0; i < lis.length; i++) {
               lis[i].index=i;
                lis[i].classList.remove('active');
            }
            var li = ev.target.parentNode;
            li.classList.add('active');
            var index= li.index;
            var totalHeight =-height*index;
            /*距离限定*/
            if(totalHeight>maxTop) {
                totalHeight = maxTop;
            }
            if(totalHeight<minTop) {
                totalHeight = minTop;
            }
            ul1.style.transition ='top 0.2s ease-in-out';
            ul1.style.top = totalHeight+'px';





        },false);
    }
    /*设置clothes-content的高度和overflow:hidden的属性*/
    var clothesContent = document.querySelector('.clothes-content');
    var rightMain = document.querySelector('.right-main');
    var banner = rightMain.querySelector('.banner');
    var clothesTitle=document.querySelector('.clothes-title');
    var rightMain_height = rightMain.offsetHeight;
    var banner_height = banner.offsetHeight;
    var clothesTitle_height = clothesTitle.offsetHeight;
    window.onresize = function () {
        rightMain_height = rightMain.offsetHeight;
        banner_height = banner.offsetHeight;
        clothesTitle_height = clothesTitle.offsetHeight;
    };
    clothesContent.style.height = rightMain_height - banner_height-clothesTitle_height+'px';
    clothesContent.style.overflow = 'hidden';
    //document.title = rightMain_height+"-"+banner_height+"-"+clothesTitle_height;
   //初始化并配置myScroll对象

    /*iScoll作用于滚动区域的外层,在本例子中,是ul滚动,脚本必须知道滚动区域的宽高,
    滚动容器需要有绝对或者相对定位外面是滚动容器,在DOM加载完毕后启用*/
    var myScroll = new IScroll('.clothes-content',{
        mouseWheel:true,
        scrollbars:true
    });

};

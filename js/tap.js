/**
 *
 * Created by Administrator on 2017/9/26.
 */
var mobileEvents = {
   tap:function (dom,callback) {
       if (!dom || typeof dom != 'object') {
           return;
       }
       var startTime, startX, startY;
       dom.addEventListener('touchstart', function (e) {
           startTime = Date.now();
           /*超过一个手指,不是单击事件*/
           if (e.targetTouches.length > 1) {
               return;
           }
           startX = e.targetTouches[0].clientX;
           startY = e.targetTouches[0].clientY;
       });
       dom.addEventListener('touchend', function (e) {
           if (e.changedTouches.length > 1) {
               return;
           }
           var endTime = Date.now();
           //console.log('触摸的时间:' + ( endTime - startTime));
           if (endTime - startTime > 150) {/*长按操作*/
               console.log('这是长按');
               return;
           }
           /*targetTouches表示当前元素上的手指对象*/
           /*注意这里touch结束后获取的手指对象是用changesTouches(表示最后离开的手指对象)来获取*/
           var endX = e.changedTouches[0].clientX;
           var endY = e.changedTouches[0].clientY;
           /*这里暂且将距离定为6px*/
           if (Math.abs(endX - startX) < 6 && Math.abs(endY - startY < 6)) {
               //console.log('这就是移动端的点击事件--tap事件');
               callback&&callback(e);
            /*   if (callback) {
                   callback(e);
               }*/
           }
       });
   }
};



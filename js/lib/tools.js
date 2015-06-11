/**
 * Created by vlad on 08.06.15.
 */
define(function () {

    return {
        drawGrid: function(context,w,h){
            for (var x = 0.5; x < w; x += 5) {
                context.moveTo(x, 0);
                context.lineTo(x, h);
            }
            for (var y = 0.5; y < h; y += 5) {
                context.moveTo(0, y);
                context.lineTo(w, y);
            }
            context.strokeStyle = 'rgba(0,0,0,0.2)';
            context.stroke();
        }


    };
});
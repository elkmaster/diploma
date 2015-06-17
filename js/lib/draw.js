/**
 * Created by vlad on 16.06.15.
 */
define(['tools'],function (tools) {

    var isDown = false;


    var qx,qy;

    var startX;
    var startY;

    function drawOval(x, y) {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.beginPath();

        qx = x;
        qy = y;
        ctx.rect(startX,startY,x-startX,y-startY);

        //ctx.moveTo(startX, startY + (y - startY) / 2);
        //ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        //ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        //ctx.closePath();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        //tools.reDrawCords(ctx);
    };

    function handleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        var rect = document.getElementById( 'ctx' ).getBoundingClientRect();

        startX = parseInt(e.clientX - rect.left);
        startY = parseInt(e.clientY - rect.top);
        isDown = true;
    };

    function handleMouseUp(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        isDown = false;
    };

    function handleMouseOut(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        isDown = false;
    };

    function handleMouseMove(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();

        var rect = document.getElementById( 'ctx' ).getBoundingClientRect();

        var mouseX = parseInt(e.clientX - rect.left);
        var mouseY = parseInt(e.clientY - rect.top);
        drawOval(mouseX, mouseY);
    };




    return {

        init:  function (ctx) {

            $("#ctx").mousedown(function (e) {
                handleMouseDown(e);
            });
            $("#ctx").mousemove(function (e) {
                handleMouseMove(e);
            });
            $("#ctx").mouseup(function (e) {
                handleMouseUp(e);
            });
            $("#ctx").mouseout(function (e) {
                handleMouseOut(e);
            });
        },

        getData: function(){

            var res;

            if(startX<qx && startY <qy){
                res = {
                    x1 : startX,
                    y1 : startY,
                    x2 : qx,
                    y2 : qy
                }
            }else if(startX>qx && startY>qy){
                res = {
                    x1 : qx,
                    y1 : qy,
                    x2 : startX,
                    y2 : startY
                }
            }else if(startX<qx && startY>qy){
                res = {
                    x1 : startX,
                    y1 : qy,
                    x2 : qx,
                    y2 : startY
                }
            } else {
                res = {
                    x1 : qx,
                    y1 : startY,
                    x2 : startX,
                    y2 : qy
                }
            }

            return res;
        }
    };
});
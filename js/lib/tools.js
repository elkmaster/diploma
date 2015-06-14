/**
 * Created by vlad on 08.06.15.
 */
define(function () {

    return {

        calc_level: function (data){
            var sum = 0;
            var z = 0;
            for (var i = 0; i < data.length; i += 4) {
                sum = sum + data[i];
                if (data[i] != 0) {
                    z++;
                }
            }
            var avg = sum / z + 35;

            console.log(avg);
            return avg;
        },
        binarise: function(imgd, level){
            //binaries image
            for (var i = 0; i < imgd.data.length; i += 4) {
                imgd.data[i] = imgd.data[i + 1] = imgd.data[i + 2] =
                    imgd.data[i] <
                    level && imgd.data[i + 1]
                    < level && imgd.data[i + 2]
                    < level ? 255 : 0;
            }
            ctx.putImageData(imgd, 0, 0);
        },
        smooth: function(imgd){
            console.log(imgd);
            //some filtering and smoothing
            try {
                var canvas = fx.canvas();
            } catch (e) {
                alert(e);
                return;
            }
            var image = document.getElementById('img');
            var texture = canvas.texture(imgd);
            canvas.draw(texture).lensBlur(6, 0.41, 0.01841).denoise(1).unsharpMask(100, 6).brightnessContrast(0.20, 1).update();
            var image = new Image();
            image.src = canvas.toDataURL();
            ctx.drawImage(image, 0, 0, imgd.width, imgd.height);


            //creating semiblur mask on image
            //var r, g, b, avg;
            //for (var i = 0; i < imgmask.data.length; i += 4) {
            //    if (imgmask.data[i] < 100) {
            //        imgmask.data[i] = 255;
            //        imgmask.data[i + 1] = imgmask.data[i + 2] = 0;
            //        imgmask.data[i + 3] = 150;
            //    } else {
            //        imgmask.data[i + 3] = 0;
            //    }
            //}
            //ctx.putImageData(imgmask, 0, 0);


        },
        reDrawCords: function(ctx){
            for (var i = 0; i<cords.length;i++){
                ctx.beginPath();
                ctx.moveTo(cords[i].edge[0].x, cords[i].edge[0].y);
                for(var j = 1; j<cords[i].edge.length; j++){
                    var c = cords[i].edge[j];
                    ctx.lineTo(c.x, c.y);
                }
                ctx.strokeStyle = '#220000';
                ctx.stroke();
            }
        }


    };
});
/**
 * Created by vlad on 07.06.15.
 */
define(['edge','tools','clasterize'],function (edge,tools, clasterize) {

    function show_res(arr){
        var i = 1;
        arr.map(function(x){

            $('#results tbody').append('<tr class="res"><td>'+
            x.id+'</td><td>'+x.edge.length+'</td><td>'+x.inner.length+'</td></tr>');

        });

        $('#results').css('display','block');
    }
    function calc_level(data){
        var sum = 0;
        var z = 0;
        for (var i = 0; i < data.length; i += 4) {
            sum = sum + data[i];
            if (data[i] != 0) {
                z++;
            }
        }
        var avg = sum / z + 40;

        console.log(avg);
        return avg;
    }
    function toMatrix(img){
        var h = img.height,
            w = img.width;


        var matrix = [];
        for (var y = 0; y < h; y++){
            matrix[y] = [];
            for (var x = 0; x < w; x++){
                matrix[y][x] = 0;
            }
        }

        var flag= 0, row = 0;

        for (var i = 0; i < img.data.length; i += 4) {

            ++flag;

            if(flag == w){
                ++row;
                flag = 0;
            }
            if (img.data[i] < 100){ //red pixel
                matrix[row][flag] = 1;
            }


        }
        return matrix;
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor(evt.clientX - rect.left),
            y: Math.floor(evt.clientY - rect.top)
        };
    }

    return {
        r : function (src) {

        var img = new Image();
        img.src = src;

        $("#ctx").css('background-image', 'url(' + src + ')');

        img.onload = function () {

            var w = img.width, h = img.height;
            ctx  = document.getElementById('ctx').getContext('2d');

            $('#ctx').attr({width: w, height: h});
            ctx.width = w;
            ctx.height = h;
            ctx.drawImage(img, 0, 0, w, h);

            var imgd = ctx.getImageData(0, 0, w, h);
            var sourceimg = JSON.parse(JSON.stringify(imgd.data));
     
            var level = calc_level(imgd.data);

            //binaries image
            for (var i = 0; i < imgd.data.length; i += 4) {
                imgd.data[i] = imgd.data[i + 1] = imgd.data[i + 2] =
                    imgd.data[i] <
                    level && imgd.data[i + 1]
                    < level && imgd.data[i + 2]
                    < level ? 255 : 0;
            }
            ctx.putImageData(imgd, 0, 0);

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
            ctx.drawImage(image, 0, 0, w, h);

            var imgmask = ctx.getImageData(0, 0, w, h);

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

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            tools.drawGrid(ctx,w,h);

            var matrix = toMatrix(imgmask);
            var cords = edge.get(matrix);




            $('.res').remove();



            show_res(cords);
            clasterize.run(matrix, sourceimg, cords);

            var c =  document.getElementById( 'ctx' );
            c.addEventListener('click', function(evt) {
                var mousePos = getMousePos(c, evt);
                var id, j;

                for(var i = 0; i<cords.length; i++){
                    if(cords[i].inner.indexOf(mousePos.x+'|'+mousePos.y) != -1 ){
                        var id = prompt('id:'+ cords[i].id);
                        j=i;
                        break;
                    }
                }
                console.log(id);
                if (id!='' && id!=null){
                    cords[j].id = id;
                    $('.res').remove();
                    show_res(cords);
                    clasterize.clToTable(cords);
                }





            }, false);




        };
    }

    };
});
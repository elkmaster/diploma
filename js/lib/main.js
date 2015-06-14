/**
 * Created by vlad on 07.06.15.
 */

var cords;
var w, h, sourceimg;
var matrix;
define(['edge','tools','clasterize'],function (edge,tools, clasterize) {

    function show_res(arr){
        var i = 1;
        arr.map(function(x){

            $('#results tbody').append('<tr class="res"><td>'+
            x.id+'</td><td>'+x.edge.length+'</td><td>'+x.inner.length+'</td></tr>');

        });

        $('#results').css('display','block');
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

            w = img.width;
            h = img.height;

            ctx  = document.getElementById('ctx').getContext('2d');
            $('#ctx').attr({width: w, height: h});
            ctx.width = w;
            ctx.height = h;
            ctx.drawImage(img, 0, 0, w, h);

            var imgd = ctx.getImageData(0, 0, w, h);
            sourceimg = JSON.parse(JSON.stringify(imgd.data));
     
            var level =  tools.calc_level(imgd.data);
            tools.binarise(imgd, level);
            tools.smooth(imgd);

            var imgmask = ctx.getImageData(0, 0, w, h);
            ctx.clearRect(0, 0, w, h);
            clasterize.initClasterSize();
            clasterize.drawGrid(ctx,w,h);

            matrix = toMatrix(imgmask);
            cords = edge.get(matrix);




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

            $('#csize').change(function() {
                console.log (w,h);
                console.log(ctx);
                ctx.clearRect(0, 0, w, h);
                tools.reDrawCords(ctx);
                clasterize.initClasterSize();
                clasterize.drawGrid(ctx,w,h);
                clasterize.run(matrix,  sourceimg, cords);
                clasterize.clToTable(cords);
            });


        };
    }

    };
});
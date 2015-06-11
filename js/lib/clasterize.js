/**
 * Created by vlad on 09.06.15.
 */
define(function () {
    var m, data, res=[];

    function clToTable(arr){
        var t = $('#viz');
        for(var x = 0; x<arr.length; x++) {
            if(arr[x].clasters.length>0){
                t.append('<tr class="res"><th colspan="25"><h3 class="text-center">id = '+arr[x].id+'</h3><th></tr>');

                for (var i = 0; i < arr[x].clasters.length; i++) {
                    var s = '<tr class="res"><td>' + i + '</td>';
                    for (var j = 0; j < 25; j++) {
                        s += '<td>' + arr[x].clasters[i][j].val + '</td>';
                    }
                    t.append(s + '</tr>');
                }
            }

        }



        t.css('display','block');
    }

    function saveClaster(x,y){
        var cl = [],w = m[0].length;
        for (var i = 0; i<5; i++){
            for (var j = 0; j<5; j++){
                if (m[y+i][x+j]!=1){
                    return false;
                } else {
                    cl.push({
                        x:x+i,
                        y:y+j,
                        val:data[(y+j)*w+(x+i)]
                    })
                }
            }
        }
        return cl;
    }

    return {
        run : function(matrix, img, cords){
            m = matrix;
            data = img;
            var rs = [];

            var h = matrix.length, w = matrix[0].length;

            for (var y = 0; y < h; y+=5) {
                for (var x = 0; x < w; x+=5) {
                    if(matrix[y][x]==1){
                        var c = saveClaster(x,y);
                            //console.log (c);
                            if(c!=false){
                                //console.log (c);
                                rs.push(c);
                            }
                    }
                }
            }

            rs.map(function(c){
                for(var i = 0; i<cords.length; i++){
                    if(cords[i].inner.indexOf(c[15].x+'|'+c[15].y) != -1 ){
                        cords[i].clasters.push(c);
                    }
                }

            });

            console.log(cords);
            clToTable(cords);

            return cords;
        }
    };
});
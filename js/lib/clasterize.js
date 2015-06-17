/**
 * Created by vlad on 09.06.15.
 */

define(function () {
    var m, data, res=[], c_size=1;

    function saveClaster(x,y){
        var cl = [],w = m[0].length;
        for (var i = 0; i<c_size; i++){
            for (var j = 0; j<c_size; j++){
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
        initClasterSize:function(){
            c_size=parseInt($('#csize').val());
        },
        run : function(matrix, img, cords){
            m = matrix;

            data = img;
            var rs = [];



            var h = matrix.length, w = matrix[0].length;

            console.log(h,w);

            for (var y = 0; y < h; y+=c_size) {
                for (var x = 0; x < w; x+=c_size) {

                    console.log(matrix[y][x]);

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
            //clear prev clasters
            for(var i =0; i<cords.length; i++){ cords[i].clasters=[];}


            var center = Math.floor((c_size*c_size)/2);
            console.log(center);
            rs.map(function(c){
                for(var i = 0; i<cords.length; i++){

                    if(cords[i].inner.indexOf(c[center].x+'|'+c[center].y) != -1 ){
                        cords[i].clasters.push(c);
                    }
                }

            });

            console.log(cords);
            this.clToTable(cords);

            return cords;
        },
        clToTable: function(arr){

            //claster size in square
            var dcs = c_size*c_size;

            var th = $('#theader');
            th.html('');
            th.append('<th>#</th>');
            for (var i=1;i<=dcs;i++){
                th.append('<th>'+i+'</th>');
            }


            var t = $('#viz');
            $('#viz .res').remove();

            for(var x = 0; x<arr.length; x++) {
                if(arr[x].clasters.length>0){
                    for (var i = 0; i < arr[x].clasters.length; i++) {
                        var s = '<tr class="res"><td><b>' +arr[x].id + '</b></td>';
                        for (var j = 0; j < dcs ; j++) {
                            s += '<td>' + arr[x].clasters[i][j].val + '</td>';
                        }
                        t.append(s + '</tr>');
                    }
                }

            }
            t.css('display','block');
        },
        drawGrid: function(context,w,h){
            context.beginPath();
            console.log(c_size);

            for (var x = 0.5; x < w; x +=  c_size) {

                context.moveTo(x, 0);
                context.lineTo(x, h);
            }
            for (var y = 0.5; y < h; y +=  c_size) {

                context.moveTo(0, y);
                context.lineTo(w, y);
            }
            context.strokeStyle = 'rgba(0,0,0,0.2)';
            context.stroke();
        }

    };
});
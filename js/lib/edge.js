/**
 * Created by vlad on 07.06.15.
 */
define(function () {
    var matrix;
    var visited = [];
    var saved = [];
    var id = 0;

    function getPath(sy,sx){
        var x , y, i=0;

        var r = [],
        dots = [];

        ctx.beginPath();
        ctx.moveTo(sx,sy);

        r.push({x:sx, y:sy});

        var xy = getNext(sx,sy);
        x = xy.x;
        y = xy.y;

        visited.push(x+'|'+y);

        r.push({x:x, y:y});

        while ((x!=sx || y!=sy) && i<1000){

            visited.push(x+'|'+y);

            var xy = getNext(x,y);
            x = xy.x;
            y = xy.y;

            visited.push(x+'|'+y);
            r.push({x:x, y:y});
            ctx.lineTo(x,y);
            i++;


        }
        ctx.lineTo(sx,sy);

        ctx.strokeStyle = getRandomColor();
        ctx.stroke();

        return {
            id : id++,
            edge : r,
            inner : getInner(sx,sy),
            clasters :[]
            };
    }

    function checkEdge(x,y){
        var nei =0;

        //if(x>1 && y>1 && x<matrix[0].length && y<matrix.length ){
            if(matrix[y][x+1] == 0) {nei++;}
            if(matrix[y+1][x+1] == 0){nei++;}
            if(matrix[y+1][x] == 0){nei++;}
            if(matrix[y+1][x-1] == 0){nei++;}
            if(matrix[y][x-1] == 0){nei++;}
            if(matrix[y-1][x-1] == 0){nei++;}
            if(matrix[y-1][x] == 0){nei++;}
            if(matrix[y-1][x+1] == 0){nei++;}
        //}

        if(nei>1){//console.log('nei = '+nei+'; x= '+x+'; y = '+y+' true');
            return true;
        } else{//console.log('nei = '+nei+'; x= '+x+'; y = '+y+' false');
            return false
        }
    }

    function getNext(x,y){


        var result = {
            x: x,
            y: y
        };

        if(ch(x+1,y)) {
            result.x = x+1;
            result.y = y;
            return result;
        }else if(ch(x+1,y+1)){
            result.x = x+1;
            result.y = y+1;
            return result;
        }else if(ch(x,y+1)){
            result.x = x;
            result.y = y+1;
            return result;
        }else if(ch(x-1,y+1)){
            result.x = x-1;
            result.y = y+1;
            return result;
        }else if(ch(x-1,y)){
            result.x = x-1;
            result.y = y;
            return result;
        }else if(ch(x-1,y-1)){
            result.x = x-1;
            result.y = y-1;
            return result;}
        else if(ch(x,y-1)){
            result.x = x;
            result.y = y-1;
            return result;
        }else if(ch(x+1,y-1)){
            result.x = x+1;
            result.y = y-1;
            return result;
        }else return result;

    }

    function ch(x,y){
        if(matrix[y][x] == 1 && checkEdge(x,y)  && visited.indexOf(x+'|'+y) == -1) {return true} else {return false}
    }

    function getRandomColor() {

        return '#220000';
    }

    function floodFill( x,y ){
        if(matrix[y][x] == 1 && saved.indexOf(x+'|'+y) == -1){
            saved.push(x+'|'+y);
            floodFill(x + 1, y);
            floodFill(x - 1, y);
            floodFill(x, y + 1);
            floodFill(x, y - 1);
        }

    }

    function getInner(x,y){
        saved = [];
        floodFill(x,y);
        return saved;
    }

    return {
        get :function (m) {
            matrix = m;
            var h = m.length, w = m[0].length;
            var last = 0;
            var r = [];

            //find start point
            //getPath(230,201);

            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    //if (x == 0){
                    //    s.append('\n');
                    //}
                    //s.append(m[y][x]);
                    if ((m[y][x] == 1) && (last == 0)) {

                        last = m[y][x];
                        if( visited.indexOf(x+'|'+y) == -1){
                            r.push(getPath(y,x));
                        }

                    } else {
                        last = m[y][x];
                    }
                }
            }
            return r;
            //alert(s);

        }
    };
});
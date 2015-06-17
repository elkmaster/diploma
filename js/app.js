requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib'

});



var ctx;

require(['main'], function(main) {
    $(document).ready(function () {
       //main.r('test.jpg');
        var c =  document.getElementById( 'ctx' );
        c.addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(c, evt);
            $('#pos').html('Mouse position: ' + mousePos.x + ',' + mousePos.y);
        }, false);

        $("#InputFile").change(function(){
            readURL(this);
        });
        $("#manInputFile").change(function(){
            readURL2(this);
        });
    });


    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor(evt.clientX - rect.left),
            y: Math.floor(evt.clientY - rect.top)
        };
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                main.r(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    function readURL2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                main.m(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
});





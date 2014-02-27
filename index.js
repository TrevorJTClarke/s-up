app.directive('sUploadImage', function ($parse, notify) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var id = attrs.id || null;
            var $element = $(element);
            var folder = attrs.folder;
            var $model = scope.$eval(attrs.sUploadImage);
            var parsedModel = $parse(attrs.sUploadImage);
            
            // Set up for uploading
            
            $element.filedrop({
                url: '/upload_image',
                paramname: 'imageData',
                data: {
                    imageSizeType: function () {
                        return attrs.imageSize;
                    },
                    folder: function () {
                        return attrs.folder;
                    }
                },
                maxFiles: 1,
                dragOver: function() {
                    $element.addClass('hover');
                },
                dragLeave: function() {
                    $element.removeClass('hover');
                },
                drop: function () {
                    $element.removeClass('hover');
                },               
                uploadStarted: function(i, file, len){
                    // a file began uploading
                    // i = index => 0, 1, 2, 3, 4 etc
                    // file is the actual file of the index
                    // len = total files user dropped
                    
                    $element.html('Uploading ...');
                },
                uploadFinished: function(i, file, response, time) {
                    // response is the data you got back from server in JSON format.
                    
                    $element.html('<img class="edit-image" src="' + response + '" />');
                    
                    // Set our model value
                    
                    scope.$apply(function () {
                        parsedModel.assign(scope, response);
                        notify.message('Image uploaded.');
                    });
                }
            });

            //
            
            scope.$on('clear', function () {
                $element.html('');
            });
            
        }
    };
});
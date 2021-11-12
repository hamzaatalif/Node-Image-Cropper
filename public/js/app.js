var canvas = $("#canvas"),
    context = canvas.get(0).getContext("2d"),
    $result = $('#result');



$('#fileInput').on('change', function () {
    if (this.files && this.files[0]) {
        if (this.files[0].type.match(/^image\//)) {
            var reader = new FileReader();
            reader.onload = function (evt) {
                var img = new Image();
                img.onload = function () {
                    context.canvas.height = img.height;
                    context.canvas.width = img.width;
                    context.drawImage(img, 0, 0);
                    var cropper = canvas.cropper({
                        //    aspectRatio: 16 / 9
                        background: false,
                        viewMode: 1,
                        zoomOnWheel: false,
                    });
                    $('#btnCrop').click(function () {
                        // Get a string base 64 data url
                        $("#result-container").css("display", "block")
                        var croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
                        $result.append($('<img>').attr('src', croppedImageDataURL));
                    });
                    $('#btnRestore').click(function () {
                        canvas.cropper('reset');
                        $result.empty();
                    });
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(this.files[0]);

            var fd = new FormData();
            var files = $('#fileInput')[0].files;

            console.log(files[0])

            // Check file selected or not
            if (files.length > 0) {
                fd.append('file', files[0]);

                $.ajax({
                    url: '/upload',
                    type: 'post',
                    enctype: 'multipart/form-data',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response != 0) {
                            alert('file uploaded');
                        } else {
                            alert('file not uploaded');
                        }
                    },
                });
            } else {
                alert("Please select a file.");
            }
        }
        else {
            alert("Invalid file type! Please select an image file.");
        }
    }
    else {
        alert('No file(s) selected.');
    }
});


let dBtn = document.querySelector(".download-btn");

dBtn.addEventListener("click", async () => {


    let imgs = document.querySelector("#result").children;

    Array.from(imgs).forEach(async (img) => {

        let b64String = img.src;

        async function convertMyStyle() {
            try {
                const base64Response = await fetch(`${b64String}`);
                const testBlob = await base64Response.blob();
                return testBlob;
            } catch (error) {
                console.log(error)
            }
        }

        let testBlobAgain = await convertMyStyle();

        let fileFromBlob = new File([testBlobAgain], `${Date.now()}.${testBlobAgain.type.slice(6)}`, {
            type: testBlobAgain.type,
        });

        console.log(fileFromBlob)


        let fd1 = new FormData();
        fd1.append('picture', fileFromBlob);

        uploadCropped();

        function uploadCropped() {
            $.ajax({
                url: '/upload-cropped',
                type: 'post',
                data: fd1,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response != 0) {
                        alert('file uploaded');
                    } else {
                        alert('file not uploaded');
                    }
                },
            });
        }

    })


})
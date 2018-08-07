
$.holdReady(true);

$.getScript(((window.location.protocol == 'file:') ? "http:" : window.location.protocol) +
  "//api.backendless.com/sdk/js/latest/backendless.min.js", function() {
  $.holdReady(false);
    
//Backendless: defaults
var APPLICATION_ID = '9D96215E-2443-01D3-FF5F-0FB6FD2E0600';
var API_KEY = '2ACF37D6-905D-7940-FFB3-D31A5ADE5B00';
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, API_KEY);

if (!APPLICATION_ID || !API_KEY)
    alert("Missing application ID or api key arguments. Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. Copy/paste the values into the Backendless.initApp call located in AndrewsAdmin-File.js");
    
    var DEVICE_ID = "fileServiceTest";
    var TEST_FOLDER = "testFolder";
    var files;

    $().ready( function() {
      init();
    });

    function init() {
        $('.carousel').carousel({interval: false});

        $('.uploadd').click(function(){
            uploadFileFunc();
        });

        $('.delsel').click(function(){
            deleteSelectedFiles();
        });

        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }

    function protectXSS(val) {
        return val.replace(/(<|>|\/)/g, function (match) {
            return match == '<' ? '<' : match == '>' ? '>' : '/';
        });
    }

    function handleFileSelect(evt) {
    files = evt.target.files; // FileList object
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', protectXSS(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
        '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    }

    function FileItem() {
        this.url = "";
        this.deviceId = DEVICE_ID;
    }

    function createNewItem(fileUrl) {
        var record = new FileItem();
        record.url = fileUrl;
        Backendless.Persistence.of(FileItem).save(record);
    }

    function deleteItem(id) {
        Backendless.Persistence.of(FileItem).remove(id);
    }

    function onClickFunc(element) {
        var el = $(element);

        if (el.hasClass("selectedThumbnail")) {
            $(element).removeClass("selectedThumbnail");
        } else {
            $(element).addClass("selectedThumbnail");
        }
    }

    function refreshItemsList() {
        var items = getItemsFromPersistance();
        $(".thumbnails").empty();

        $.each(items, function(index, value) {
        var name = getRelativeFileName(value.url);
        $(".thumbnails").append("<li class='span4'> <div class='thumbnail' onclick='onClickFunc(this)'> <img class='dataPicture' id='" + value.objectId + "' src='"
        + value.url + "'  alt=''><div align='center'><a href='" + value.url +  "' >" + decodeURIComponent(protectXSS(name)) + "</a></div></div></li>");
        });
    }

    function getRelativeFileName(str) {
        var rest = str.substring(0, str.lastIndexOf(TEST_FOLDER + "/") + 1);
        return str.substring(str.lastIndexOf("/") + 1, str.length);
    }

    function getItemsFromPersistance() {
        var db = Backendless.Persistence.of(FileItem);
        var query = Backendless.DataQueryBuilder.create().setWhereClause("deviceId == " + DEVICE_ID);
        db.find(query)
            .then(result => {
            return result;
        })
        .catch(e => {
            if (e.code == 1009)
            alert("Please upload a file first");
        else
            alert(e.message);
        return [];
        });
    }

    function uploadFileFunc() {
        if (!files) {
            alert('No files chosen!');
            return;
        }

        var requests = [];

        for (var i = 0, file; file = files[i]; i++) {
            var request = Backendless.Files.upload(file, TEST_FOLDER, true).then(function (result) {
               return createNewItem(result.fileURL);
            });

            requests.push(request)
        }

        Promise
           .all(requests)
           .then(function () {
               showInfo('Files successfully uploaded.');
               files = [];
               $('#list').empty();
           },
           function (e) {
               showInfo(e.message);
           });
    }

    function deleteSelectedFiles() {
      try {
        var num = 0;
        $(".selectedThumbnail img").each( function(index, value) {
        Backendless.Files.remove( value.src);
        deleteItem(value.id);
        num++;
      });

      if(num == 0)
        alert("Select files to delete");
      else
        showInfo( "Objects successfully removed. Objects affected: " + num );
      }
      catch(e) {
        showInfo(e.message );
      }
    }

    function showInfo(text) {
        $('#message').text(text);
        var carousel = $('.carousel');
        carousel.carousel(2);
        carousel.carousel('pause');
    }
});
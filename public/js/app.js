//get Recent Images
function getImages() {
  return $.ajax('/image')
    .then(res => {
      console.log("Results from getImages()", res);
      return res;
    })
    .fail(err => {
      console.error("Error in getImages()", err);
      throw err;
    });
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getImages()
    .then(images => {

      window.fileList = images;

      const data = {images: images};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
})
}


// Handle Submit form Acctions
function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const fileData = {
    id: $('#imgId').val(),
    file: $('#file').val(),
    title: $('#title').val(),
    description: $('#description').val()

  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/image/' + id;

  } else {
    method = 'POST';
    url = '/image/';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      hideForm();
      confirm("Image Updated!")
      refreshFileList();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    })

  console.log("Your file data", fileData);
}

function handleUpdateClick(id) {
  showForm();
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    setFormData(file);
}
}


function setFormData(data) {
  data = data || {};

  const image = {
    file: data.file || '',
    _id: data._id || '',
    imageData: {
      title: data.title || '',
      description: data.description || ''
  }
  };

  $('#file').val(data.file);
  $('#title').val(data.imageData.title);
  $('#description').val(data.imageData.description);
  $('#imgId').val(data._id);
}


function deleteFile(id) {
  $.ajax({
    type: 'DELETE',
    url: '/image/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("File", id, "deleted.");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("Delete Failed.", error);
    })
}

function handleDeleteClick(id) {
  if (confirm("Are you sure?")) {
    deleteFile(id);
  }
}



refreshFileList();


//reset form
function formReset() {
  $("#add-image-form")[0].reset();
}


// Toggle Form Visiblily
function showForm(){
        document.getElementById("overlay").style.display = "block";
          $('.center').show();
          $(this).hide();
          formReset();

    }

function hideForm(){
      document.getElementById("overlay").style.display = "none";
        $('.center').hide();
        $('#show').show();
}

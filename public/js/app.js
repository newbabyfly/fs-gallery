
function getImages() {
  return $.ajax('/api/image')
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


/*function handleAddFileClick() {
  setFormData({});
}*/


function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const fileData = {
    _id: $('#imgId').val(),
    file: $('#file').val(),
    title: $('#title').val(),
    description: $('#description').val()

  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/addImage/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/addImage';
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
      refreshFileList();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    })

  console.log("Your file data", fileData);
}

function cancelFileForm() {
  toggleAddFileFormVisibility();
}

function handleUpdateClick(id) {
  const image = window.fileList.find(image => image._id === id);
  if (image) {
    setFormData(image);
  }
}


function setFormData(data) {
  data = data || {};

  const image = {
    file: data.file || '',
    _id: data._id || '',
    title: data.title || '',
    description: data.description || ''
  };

  $('#file').val(data.file);
  $('#title').val(data.imageData.title);
  $('#description').val(data.imageData.description);
  $('#imgId').val(data._id);
}

function deleteFile(id) {
  $.ajax({
    type: 'DELETE',
    url: '/api/image/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("Image", id, "is DOOMED!!!!!!");
      refreshFileList();
    })
    .fail(function(error) {
      console.log("I'm not dead yet!", error);
    })
}

function handleDeleteFileClick(id) {
  if (confirm("Are you sure?")) {
    deleteFile(id);
  }
}



refreshFileList();

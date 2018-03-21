function handleEditFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    setFormData(file);
  }
}


/*function submitFileForm() {
  const imageData = {
    file: $('#image-file').val(),
    title: $('#image-title').val(),
    description: $('#image-description').val(),
    _id: $('#image-id').val(),
  };

  let method, url;
  if (imageData._id) {
    method = 'PUT';
    url = '/api/file/' + imageData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(imageData),
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

  console.log("Your file data", imageData);
} */

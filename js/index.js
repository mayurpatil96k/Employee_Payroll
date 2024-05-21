$("#submitbuton").click(function(){
    var name = $('#name').val();
  var genderElements = $('[name="gender"]');
  var gender;
  for (var i = 0; i < genderElements.length; i++) {
    if (genderElements[i].checked) {
      gender = genderElements[i].value;
      break;
    }
  }
  var ProfileImage = $('[name="pimage"]');
  var profile;
  for (var i = 0; i < ProfileImage.length; i++) {
    if (ProfileImage[i].checked) {
      profile = ProfileImage[i].value;
      break;
    }
  }
  var salary = $("#sal").val();
  var day = $("#day").val();
  var month = $("#month").val();
  var year = $("#year").val();

  var notes = $("#notes").val();
  var departmentElements = $('[name="dept"]');
  var departments = [];
  for (var i = 0; i < departmentElements.length; i++) {
      if (departmentElements[i].checked) {
          departments.push(departmentElements[i].value);
      }
  }

  var formData = {
    name: name,
    gender: gender,
    profileImage: profile,
    salary: salary,
    startDate: {
        day: day,
        month: month,
        year: year
    },
    notes: notes,
    departments: departments
};

console.log(formData);
console.log(profile)
var formDataString = JSON.stringify(formData);
localStorage.setItem(FormData,formDataString);



$.ajax({
  url: 'http://localhost:3000/users',
  type: 'POST',
  data: formDataString,
  success: function(response) {
      alert("Form Data Submitted...");
      window.location.href = './table.html';
  },
  error: function(xhr, status, error) {
      console.error('An error occurred:', status, error);
  }
});

})


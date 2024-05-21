console.log("Hello Worold");
function printFormData() {
  console.log(" in print form data");
  var name = document.getElementById("name").value;
  var genderElements = document.getElementsByName("gender");
  var gender;
  for (var i = 0; i < genderElements.length; i++) {
    if (genderElements[i].checked) {
      gender = genderElements[i].value;
      break;
    }
  }
  var ProfileImage = document.getElementsByName("gender");
  var profile;
  for (var i = 0; i < ProfileImage.length; i++) {
    if (ProfileImage[i].checked) {
      profile = ProfileImage[i].value;
      break;
    }
  }
  var salary = document.getElementById("sal").value;
  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;

  var notes = document.getElementById("notes").value;
  var departmentElements = document.getElementsByName('dept');
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
}

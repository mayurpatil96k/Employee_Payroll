$("#submitbuton").click(function () {
  var name = $("#name").val().trim();
  if (name === "") {
    alert("Please enter a name.");
    return;
  }

  var genderElements = $('[name="gender"]');
  var gender;
  for (var i = 0; i < genderElements.length; i++) {
    if (genderElements[i].checked) {
      gender = genderElements[i].value;
      break;
    }
  }
  if (!gender) {
    alert("Please select a gender.");
    return;
  }

  var profileImageElements = $('[name="pimage"]');
  var profile;
  for (var i = 0; i < profileImageElements.length; i++) {
    if (profileImageElements[i].checked) {
      profile = profileImageElements[i].value;
      break;
    }
  }
  if (!profile) {
    alert("Please select a profile image.");
    return;
  }

  var salary = $("#sal").val().trim();
  if (salary === "") {
    alert("Please Select a salary.");
    return;
  }

  var day = $("#day").val().trim();
  var month = $("#month").val().trim();
  var year = $("#year").val().trim();
  if (day === "" || month === "" || year === "") {
    alert("Please enter a valid start date.");
    return;
  }

  var notes = $("#notes").val().trim();
  if (notes === "") {
    alert("Please enter notes.");
    return;
  }

  var departmentElements = $('[name="dept"]');
  var departments = [];
  for (var i = 0; i < departmentElements.length; i++) {
    if (departmentElements[i].checked) {
      departments.push(departmentElements[i].value);
    }
  }
  if (departments.length === 0) {
    alert("Please select at least one department.");
    return;
  }


  var formData = {
    name: name,
    gender: gender,
    profileImage: profile,
    salary: salary,
    startDate: {
      day: day,
      month: month,
      year: year,
    },
    notes: notes,
    departments: departments,
  };

  console.log(formData);
  console.log(profile);
  var formDataString = JSON.stringify(formData);
  localStorage.setItem(FormData, formDataString);

  var cheack = $("#submitbuton").text();
  if (cheack === "Submit") {
    $.ajax({
      url: "http://localhost:3000/users",
      type: "POST",
      data: formDataString,
      success: function (response) {
        window.location.href = "./table.html";
      },
      error: function (xhr, status, error) {
        console.error("An error occurred:", status, error);
      },
    });
  } else {
    var tempid = localStorage.getItem("key");
    console.log(tempid);
    $.ajax({
      url: `http://localhost:3000/users/${tempid}`,
      type: "PATCH",
      data: formDataString,
      success: function (response) {
        window.location.href = "./table.html";
      },
      error: function (xhr, status, error) {
        console.error("An error occurred:", status, error);
      },
    });
  }
});

function redirect() {
  window.location.href = "./table.html";
}

$(document).ready(function () {
  var tempdata = localStorage.getItem("updateData");
  var data = JSON.parse(tempdata);
  if (data) {
    console.log(data);
    $("#name").val(data.name);

    $('[name="gender"]')
      .filter('[value="' + data.gender + '"]')
      .prop("checked", true);

    $('[name="pimage"]')
      .filter('[value="' + data.profileImage + '"]')
      .prop("checked", true);

    $("#sal").val(data.salary);

    $("#day").val(data.startDate.day);
    $("#month").val(data.startDate.month);
    $("#year").val(data.startDate.year);

    $("#notes").val(data.notes);

    data.departments.forEach(function (department) {
      $('[name="dept"][value="' + department + '"]').prop("checked", true);
    });

    $("#submitbuton").text("Update");
    localStorage.removeItem("updateData");
  }
});
$("#Reset").click(function () {
  console.log("cleard")
  $("#name").val("");
  
  $('[name="gender"]').prop("checked", false);

  $('[name="pimage"]').prop("checked", false);
  
  $("#sal").val("");
  $("#day").val("");
  $("#month").val("");
  $("#year").val("");
  $("#notes").val("");
  
  $('[name="dept"]').prop("checked", false);
});
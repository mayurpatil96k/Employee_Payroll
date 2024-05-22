function redirect() {
  window.location.href = "./index.html";
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3000/users",
    method: "GET",
    success: function (data) {
      data.forEach(function (user) {
        var html = "<tr>";
        html += '<td class="data">';
        html +=
          '<div class="pro"><img src="' +
          user.profileImage +
          '" alt="profile"></div>';
        html += '<div class="nm"><p>' + user.name + "</p></div>";
        html += "</td>";
        html += "<td>";
        html += '<div class="gen"><p>' + user.gender + "</p></div>";
        html += "</td>";
        html += '<td class="depp">';
        user.departments.forEach(function (department) {
          html += '<div class="dep"><p>' + department + "</p></div>";
        });
        html += "</td>";
        html += "<td>";
        html += '<div class="sal"><p>' + user.salary + "</p></div>";
        html += "</td>";
        html += "<td>";
        html +=
          '<div class="dt"><p>' +
          user.startDate.day +
          " " +
          user.startDate.month +
          " " +
          user.startDate.year +
          "</p></div>";
        html += "</td>";
        html += "<td>";
        html += '<div class="divbtn">';
        html +=
          '<div class="btn" onclick="del(this)"><input type="hidden" class="custId" value="' +
          user.id +
          '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/> </svg><input type="hidden" id="hiddenValue" value="' +
          user.id +
          '"></div>';
        html +=
          '<div class="btn" onclick="update(this)"><input type="hidden" class="custId" value="' +
          user.id +
          '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/> </svg></div>';
        html += "</div>";
        html += "</div>";
        html += "</td>";
        html += "</tr>";
        $("tbody").append(html);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error deleting record:", status, error);
      console.log("Server response:", xhr.responseText);
    },
  });
});

function del(button) {
  const custIdValue = $(button).find(".custId").val();
  console.log(custIdValue);

  fetch(`http://localhost:3000/users/${custIdValue}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => displayData(json))
    .then(console.log("data deleted..."));
}


function update(button) {
    const custIdValue = $(button).closest('tr').find('.custId').val();
    console.log(custIdValue);
  
    $.ajax({
      url: `http://localhost:3000/users/${custIdValue}`,
      method: "GET",
      success: function (data) {
        localStorage.setItem("updateData", JSON.stringify(data));
        localStorage.setItem("key",custIdValue);
        window.location.href = "./index.html"
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", status, error);
        console.log("Server response:", xhr.responseText);
      }
    });
  }


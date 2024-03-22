var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var showNoInputs = document.getElementById("showNoInputs");
var closeBtn = document.getElementById("closeBtn");
var sitesArr = [];

if (localStorage.getItem("ourSites") != null) {
  sitesArr = JSON.parse(localStorage.getItem("ourSites"));
  displaySites();
}

// -------- Function Submit Site ----------

function addSite() {
  if (
    validation(bookmarkNameInput, nameRegex) &
    validation(bookmarkURLInput, urlRegex)
  ) {
    var sites = {
      bookmarkName: bookmarkNameInput.value,
      bookmarkURL: bookmarkURLInput.value,
    };
    sitesArr.push(sites);
    localStorage.setItem("ourSites", JSON.stringify(sitesArr));
    displaySites();
    resetSiteInputs();
  } else {
    showNoInputs.classList.replace("d-none", "d-block");
  }
}

// -------- Function Display Table content ----------

function displaySites() {
  var tableElements = ``;
  for (var i = 0; i < sitesArr.length; i++) {
    tableElements += `<tr>
    <td>${i + 1}</td>
    <td class="text-capitalize">${sitesArr[i].bookmarkName}</td>
    <td>
        <a class="btn btn-visit pe-2" target="_blank"
        href ='https://${sitesArr[i].bookmarkURL}'>
            <i class="fa-solid fa-eye pe-2"></i>Visit
        </a>
    </td>
    <td>
        <button class="btn btn-delete pe-2" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i>
        Delete
        </button>
    </td>
</tr>`;
  }
  tableContent.innerHTML = tableElements;
}

// -------- Function Reset Site Inputs ----------

function resetSiteInputs() {
  bookmarkNameInput.value = null;
  bookmarkURLInput.value = null;
  bookmarkNameInput.classList.remove("is-valid", "is-invalid");
  bookmarkURLInput.classList.remove("is-valid", "is-invalid");
}

// -------- Function Delete Site Index ----------

function deleteSite(deleteIndex) {
  sitesArr.splice(deleteIndex, 1);
  localStorage.setItem("ourSites", JSON.stringify(sitesArr));
  displaySites();
}

// -------- Function Closing Rules window ----------

function closeRulesWindow() {
  showNoInputs.classList.replace("d-block", "d-none");
}

// -------- Validation Function ----------

var nameRegex = /^[a-z]{3,15}$/;
var urlRegex = /^[w]{3}[.][a-z]{3,15}[.]([c][o][m])$/;

function validation(input, regex) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const detailsform = document.getElementById("details-form");
  const CONTbtn = document.getElementById("continueBtn");
  const phnnuminput = document.getElementById("mobileNumber");
  const iti = window.intlTelInput(phnnuminput, {
    separateDialCode: true, // Display country codes in the dropdown
  });

  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    detailsform.fullName.value = userData.fullName;
    iti.setNumber(userData.countryCode + userData.mobileNumber);
    detailsform.email.value = userData.email;
    detailsform.confirmEmail.value = userData.confirmEmail;
    detailsform.gender.value = userData.gender;
  }

  // Load summary table values from Ticket page localStorage
  const summaryDate = localStorage.getItem("summaryDate");
  const summaryTime = localStorage.getItem("summaryTime");
  const summaryDuration = localStorage.getItem("summaryDuration");
  const summaryTickets = localStorage.getItem("summaryTickets");
  const summaryTotal = localStorage.getItem("summaryTotal");

  // Populate the summary table with Ticket page data
  document.getElementById("summaryDate").textContent = summaryDate || "-";
  document.getElementById("summaryTime").textContent = summaryTime || "-";
  document.getElementById("summaryDuration").textContent = summaryDuration || "-";
  document.getElementById("summaryTickets").innerHTML = summaryTickets || "-";
  document.getElementById("summaryTotal").textContent = summaryTotal || "-";

  detailsform.addEventListener("input", () => {
    const isFormValid = detailsform.checkValidity();
    CONTbtn.disabled = !isFormValid;
  });

  detailsform.addEventListener("submit", (event) => {
    event.preventDefault();

    // Check if any input is empty
    const inputs = detailsform.querySelectorAll("input");
    let isEmptyInput = false;
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isEmptyInput = true;
        return;
      }
    });

    if (isEmptyInput) {
      alert("Please fill out all the required fields.");
      return;
    }
 
 
    if (detailsform.email.value !== detailsform.confirmEmail.value) {
      alert("Emails do not match.");
      return;
    }

    // Get the selected country code and phone number separately
    const selectedCountryCode = iti.getSelectedCountryData().dialCode;
    const phoneNumber = iti.getNumber();

    // Store user inputs in localStorage
    const formData = {
      fullName: detailsform.fullName.value,
      countryCode: selectedCountryCode,
      mobileNumber: phoneNumber,
      email: detailsform.email.value,
      confirmEmail: detailsform.confirmEmail.value,
      gender: detailsform.gender.value,
    };

        localStorage.setItem("userData", JSON.stringify(formData));
        localStorage.setItem("fullName", detailsform.fullName.value);
        localStorage.setItem("mobileNumber", phnnuminput.value);
        localStorage.setItem("email", detailsform.email.value);
        localStorage.setItem("gender", detailsform.gender.value);

    // Redirect to Payment page
    window.location.href = "payment.html";
  });
});


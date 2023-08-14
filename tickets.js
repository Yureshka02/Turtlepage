document.addEventListener("DOMContentLoaded", function () {
  // Function to calculate the total payable based on user inputs and multiple time slots
  function calculateTotalPayable() {
    const selectedTimeSlots = getSelectedTimeSlots(); // Call the function to get selected time slots

    // Pricing details for each ticket type
    const SLADULTnorm = 4;
    const SLADULTpeak = 6;
    const SLCHILDnorm = 2;
    const SLCHILDpeak = 3;
    const FOREIGNADULTnorm = 10;
    const FOREIGNADULTpeak = 13;
    const FOREIGNHILDnorm = 5;
    const FOREIGNCHILDpeak = 8;

    // Initializing totalPayable
    let totalPayable = 0;

    selectedTimeSlots.forEach((slot) => {
      const isPeakHour = slot >= "10-11" && slot <= "17-18" || slot === "05-06"|| slot === "03-04" || slot === "04-05"; 

      // Retrieve the number of tickets selected for each category
      const SLADULTtkts = parseInt(document.getElementById("slAdult").value) || 0;
      const SLCHILDkts = parseInt(document.getElementById("slChild").value) || 0;
      const FORADULTtkts = parseInt(document.getElementById("foreignerAdult").value) || 0;
      const FORCHILDtkts = parseInt(document.getElementById("foreignerChild").value) || 0;

      // Calculate the total payable amount for the current time slot
      const totalPayableForSlot =
        SLADULTtkts * (isPeakHour ? SLADULTpeak : SLADULTnorm) +
        SLCHILDkts * (isPeakHour ? SLCHILDpeak : SLCHILDnorm) +
        FORADULTtkts * (isPeakHour ? FOREIGNADULTpeak : FOREIGNADULTnorm) +
        FORCHILDtkts * (isPeakHour ? FOREIGNCHILDpeak : FOREIGNHILDnorm);

      // Add the total payable amount for the current time slot to the overall totalPayable
      totalPayable += totalPayableForSlot;
    });

    return totalPayable;
  }

  // Function to get selected time slots
  function getSelectedTimeSlots() {
    const selectedTimeSlots = [];
    const timeSlotSelect = document.getElementById("timeSlot");
    let selectedCount = 0;
    for (let i = 0; i < timeSlotSelect.options.length; i++) {
      if (timeSlotSelect.options[i].selected && selectedCount < 11) {
        selectedTimeSlots.push(timeSlotSelect.options[i].value);
        selectedCount++;
      }
    }
    return selectedTimeSlots;
  }

  // Function to update the summary table based on user inputs
  function SUMupdate() {
    const visitDate = document.getElementById("visitDate").value;
    const selectedTimeSlot = getSelectedTimeSlots();
    const isPeakHour = selectedTimeSlot.some(slot => slot >= "10-11" && slot <= "17-18" || slot === "05-06"|| slot === "03-04" || slot === "04-05");


    let peakHourCount = 0;
  let normalHourCount = 0;
  
  selectedTimeSlot.forEach((slot) => {
    if (slot >= "10-11" && slot <= "17-18" || slot === "05-06"|| slot === "03-04" || slot === "04-05") {
      peakHourCount++;
    } else {
      normalHourCount++;
    }
  });

  
    const SUMdate = document.getElementById("summaryDate");
    const SUMtime = document.getElementById("summaryTime");
    const SUMduration = document.getElementById("summaryDuration");
    const SUMtkts = document.getElementById("summaryTickets");
    const SUMtot = document.getElementById("summaryTotal");

    SUMdate.textContent = visitDate;
    SUMtime.textContent = selectedTimeSlot.join(",");
    SUMduration.textContent = `${selectedTimeSlot.length} Hours selected` + ` (${peakHourCount} Peak Hours, ${normalHourCount} Normal Hours)`;

    const slAdulttktsnum = parseInt(document.getElementById("slAdult").value) || 0;
    const slChildtktsnum = parseInt(document.getElementById("slChild").value) || 0;
    const forAdulttktsnum = parseInt(document.getElementById("foreignerAdult").value) || 0;
    const forChildtktsnum = parseInt(document.getElementById("foreignerChild").value) || 0;
    const Inftkts = parseInt(document.getElementById("infant").value) || 0;

    SUMtkts.innerHTML = `
      ${slAdulttktsnum} Sri Lankan Adult Ticket(s)   <br>
      ${slChildtktsnum} Sri Lankan Child Ticket(s)<br>
      ${forAdulttktsnum} Foreign Adult Ticket(s)<br>
      ${forChildtktsnum} Foreign Child Ticket(s) <br>
      ${Inftkts} Infant Free
    `;

    const totalPayable = calculateTotalPayable();
    SUMtot.textContent = `$${totalPayable}`;

    // Store the summary table values in the browser's local storage
    localStorage.setItem("summaryDate", visitDate);
    localStorage.setItem("summaryTime", selectedTimeSlot.join(","));
    localStorage.setItem("summaryDuration", `${selectedTimeSlot.length} Hours selected` + ` (${peakHourCount} Peak Hours, ${normalHourCount} Normal Hours)`);
    localStorage.setItem("summaryTickets", SUMtkts.innerHTML);
    localStorage.setItem("summaryTotal", `$${totalPayable}`);

    // Enable or disable the "Continue with purchase" button based on user inputs
    const continueButton = document.getElementById("continueButton");
    continueButton.disabled = totalPayable <= 0;
  }

  // Retrieve data from local storage and update the summary table
  const locSUMdate = localStorage.getItem("summaryDate");
  const locSUMtime = localStorage.getItem("summaryTime");
  const locSUMduration = localStorage.getItem("summaryDuration");
  const locSUMtkts = localStorage.getItem("summaryTickets");
  const locSUMtot = localStorage.getItem("summaryTotal");

  if (locSUMdate && locSUMtime && locSUMduration && locSUMtkts && locSUMtot) {
    document.getElementById("summaryDate").textContent = locSUMdate;
    document.getElementById("summaryTime").textContent = locSUMtime;
    document.getElementById("summaryDuration").textContent = locSUMduration;
    document.getElementById("summaryTickets").innerHTML = locSUMtkts;
    document.getElementById("summaryTotal").textContent = locSUMtot;
  }

  // Add event listeners to the input elements
  document.getElementById("visitDate").addEventListener("change", SUMupdate);
  document.getElementById("timeSlot").addEventListener("change", SUMupdate);
  document.getElementById("slAdult").addEventListener("input", SUMupdate);
  document.getElementById("slChild").addEventListener("input", SUMupdate);
  document.getElementById("foreignerAdult").addEventListener("input", SUMupdate);
  document.getElementById("foreignerChild").addEventListener("input", SUMupdate);
  document.getElementById("infant").addEventListener("input", SUMupdate);

  // Add event listeners to increment and decrement buttons
  const incrementButtons = document.querySelectorAll(".increment");
  const decrementButtons = document.querySelectorAll(".decrement");

  function handleIncrement(event) {
    const inputElement = event.target.parentElement.querySelector("input");
    inputElement.value = parseInt(inputElement.value) + 1;
    SUMupdate();
  }

  function handleDecrement(event) {
    const inputElement = event.target.parentElement.querySelector("input");
    const currentValue = parseInt(inputElement.value);
    inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
    SUMupdate();
  }

  incrementButtons.forEach((button) => {
    button.addEventListener("click", handleIncrement);
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", handleDecrement);
  });

  // Initial update of the summary table on page load
  SUMupdate();
});


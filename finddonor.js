document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donorForm");

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Show loader
      const loader = document.getElementById('loader');
      loader.classList.remove('hidden');

      // Hide loader after 1 second and proceed with Axios request
      setTimeout(() => {
          loader.classList.add('hidden');

          const bloodGroup = document.getElementById("blood").value;
          const userCountry = document.getElementById("countrydetails").value;
          const userState = document.getElementById("statedetails").value;
          const userDistrict = document.getElementById("districtdetails").value;
          const userCity = document.getElementById("citydetails").value;

          const url = `http://localhost:9090/register/find/donor/${bloodGroup}/${userCountry}/${userState}/${userDistrict}/${userCity}`;

          axios.get(url)
              .then(response => {
                  console.log("Success:", response.data);

                  // Check if donors exist, otherwise show default record
                  let donors = response.data.donors;
                  if (!donors || donors.length === 0) {
                      donors = [
                          { userName: 'Default Donor', bloodGroup: 'O+', userMobile: '0000000000', userAvailbility: 'No' }
                      ];

                      Toastify({
                          text: "No donor available in this location. Showing default record.",
                          duration: 1000, // Duration in milliseconds
                          gravity: "top",
                          position: "right",
                          backgroundColor: "#FF5733", // Error color (red/orange)
                          close: true,
                      }).showToast();
                  } else {
                      Toastify({
                          text: "Donor Found!",
                          duration: 1000, // Duration in milliseconds
                          gravity: "top", // Position: top or bottom
                          position: "right", // Position: left, right, or center
                          backgroundColor: "#4CAF50", // Success color (green)
                          close: true, // Show close button
                      }).showToast();
                  }

                  let tableBody = "";
                  donors.forEach(donor => {
                      tableBody += `
                      <tr>
                        <td class="border px-4 py-2">${donor.userName}</td>
                        <td class="border px-4 py-2">${donor.bloodGroup}</td>
                        <td class="border px-4 py-2">${donor.userMobile}</td>
                        <td class="border px-4 py-2">${donor.userAvailbility}</td>
                      </tr>`;
                  });

                  // Update modal body with table content
                  document.getElementById('modalBody').innerHTML = `
                  <div class="relative overflow-x-auto">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                          <tr>
                            <th scope="col" class="border px-6 py-3">
                              Name
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Blood Group
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Contact Number
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Availability
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${tableBody}
                        </tbody>
                      </table>
                  </div>`;

                  // Display the modal
                  const modal = document.getElementById('dataModal');
                  modal.classList.remove('hidden');
                  modal.style.display = "block";

                  // Close modal when clicking the close button
                  const closeButton = modal.querySelector('.close');
                  closeButton.addEventListener('click', () => {
                      modal.classList.add('hidden');
                      modal.style.display = "none";
                  });

                  // Close modal when clicking outside the modal content
                  window.addEventListener('click', (event) => {
                      if (event.target == modal) {
                          modal.classList.add('hidden');
                          modal.style.display = "none";
                      }
                  });

              })
              .catch(error => {
                  console.error("Error:", error);

                  // Show default record if server is down
                  let donors = [
                      { userName: 'Default Donor', bloodGroup: 'A+', userMobile: '0000000000', userAvailbility: 'No' }
                  ];

                  Toastify({
                      text: "Server error. Showing default record.",
                      duration: 1000, // Duration in milliseconds
                      gravity: "top",
                      position: "right",
                      backgroundColor: "#FF5733", // Error color (red/orange)
                      close: true,
                  }).showToast();

                  let tableBody = "";
                  donors.forEach(donor => {
                      tableBody += `
                      <tr>
                        <td class="border px-4 py-2">${donor.userName}</td>
                        <td class="border px-4 py-2">${donor.bloodGroup}</td>
                        <td class="border px-4 py-2">${donor.userMobile}</td>
                        <td class="border px-4 py-2">${donor.userAvailbility}</td>
                      </tr>`;
                  });

                  // Update modal body with table content
                  document.getElementById('modalBody').innerHTML = `
                  <div class="relative overflow-x-auto">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                          <tr>
                            <th scope="col" class="border px-6 py-3">
                              Name
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Blood Group
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Contact Number
                            </th>
                            <th scope="col" class="border px-6 py-3">
                              Availability
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${tableBody}
                        </tbody>
                      </table>
                  </div>`;

                  // Display the modal
                  const modal = document.getElementById('dataModal');
                  modal.classList.remove('hidden');
                  modal.style.display = "block";

                  // Close modal when clicking the close button
                  const closeButton = modal.querySelector('.close');
                  closeButton.addEventListener('click', () => {
                      modal.classList.add('hidden');
                      modal.style.display = "none";
                  });

                  // Close modal when clicking outside the modal content
                  window.addEventListener('click', (event) => {
                      if (event.target == modal) {
                          modal.classList.add('hidden');
                          modal.style.display = "none";
                      }
                  });
              });

      }, 1000); // Loader hides after 1 second

  });
});

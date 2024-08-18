document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Create an object to store form data
        const formData = {
            userEmail: document.getElementById("email").value,
            userPassword: document.getElementById("psw").value,
            userMobile: document.getElementById("mobile").value,
            userName: document.getElementById("fullname").value,
            bloodGroup: document.getElementById("bloodGroup").value,
            userCountry: document.getElementById("country").value,
            userState: document.getElementById("state").value,
            userDistrict: document.getElementById("district").value,
            userCity: document.getElementById("city").value,
            userAvailbility: document.getElementById("available").value
        };

        confirmPassword = document.getElementById("psw-repeat").value

        // Validate data
        if (!validateFormData(formData)) {
            return; // Stop form submission if validation fails
        }

        // Convert formData to a JSON string
        const jsonData = JSON.stringify(formData);

        

        // Send data to the server using Fetch API
        axios.post("http://localhost:9090/register/new/user", jsonData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log("Success:", response.data);
                Toastify({
                    text: "Registration  successfully!",
                    duration: 3000, // Duration in milliseconds
                    gravity: "top", // Position: top or bottom
                    position: "right", // Position: left, right, or center
                    backgroundColor: "#4CAF50", // Success color (green)
                    close: true, // Show close button
                }).showToast();

                // reset all form fields
                resetFields();
            })
            .catch(error => {
                console.error("Error:", error);
                Toastify({
                    text: "There was an error submitting the form.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    progressBar: true,
                    closeButton: true,
                    backgroundColor: "#FF5733", // Error color (red/orange)
                    close: true,
                }).showToast();
            });
    });

    function resetFields() {
        document.getElementById("registrationForm").reset();

    }

    function validateFormData(formData) {
        // Example validations:

        // Check if email is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.userEmail)) {
          
           Toastify({
            text: "Please enter a valid email address.",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#FF5733", // Warning color (orange)
            close: true,
        }).showToast();
            return false;
        }

        // Check if password is at least 8 characters long
        if (formData.userPassword.length < 8) {
            Toastify({
                text: "Password must be at least 8 characters long.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF5733", // Warning color (orange)
                close: true,
            }).showToast();
            return false;
        }

        // Check if confirm password matches the user password
        if (formData.userPassword !== confirmPassword) {
            Toastify({
                text: "Passwords do not match. Please try again.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF5733", // Warning color (orange)
                close: true,
            }).showToast();
            return false;
        }

        // Check if mobile number is valid (e.g., 10 digits)
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(formData.userMobile)) {
            
            Toastify({
                text: "Please enter a valid 10-digit mobile number.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF5733", // Warning color (orange)
                close: true,
            }).showToast();
            return false;
        }

        // Check if the name is provided
        if (formData.userName.trim() === "") {
            
            Toastify({
                text: "Please enter your full name.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF5733", // Warning color (orange)
                close: true,
            }).showToast();
            return false;
        }

        // Check if the blood group is selected
        if (formData.bloodGroup.trim() === "") {
            
            Toastify({
                text: "Please select your blood group.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF5733", // Warning color (orange)
                close: true,
            }).showToast();
            return false;
        }


        return true;
    }
});

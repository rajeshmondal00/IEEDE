$(document).ready(function () {
    document
      .querySelector("#logform")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const mecInput = document.querySelector("#mec");
        const mecError = document.querySelector("#mecerror");
        const logText = document.querySelector("#log-txt");
        const otpForm = document.querySelector("#logotpform");

        if (mecInput.value.trim() === "") {
          mecInput.style.borderColor = "#9B111E";
          mecError.style.visibility = "visible";
          return;
        } else {
          mecInput.style.borderColor = "";
          mecError.style.visibility = "hidden";
        }

        try {
          const response = await fetch("/citizen-login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": "{{ csrf_token }}",
            },
            body: JSON.stringify({ mec: mecInput.value.trim() }),
          });

          if (response.ok) {
            logText.textContent =
              "An OTP has been sent to your registered email. Please do not refresh the page. Thank you!";
            logText.style.color = "green";
            document.querySelector("#logform").classList.add("hidden");
            otpForm.classList.remove("hidden");
          } else {
            console.error("Error sending OTP:", response.statusText);
            logText.textContent = "Error sending OTP. Please try again.";
            logText.style.color = "red";
          }
        } catch (error) {
          console.error("Error:", error);
          logText.textContent = "Network error. Please try again.";
          logText.style.color = "red";
        }
      });

    document
      .querySelector("#logotpform")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const otpInput = document.querySelector("#otp");
        const otpError = document.querySelector("#otperror");

        if (otpInput.value.trim() === "") {
          otpInput.style.borderColor = "#9B111E";
          otpError.style.visibility = "visible";
          return;
        } else {
          otpInput.style.borderColor = "";
          otpError.style.visibility = "hidden";
        }

        try {
          const response = await fetch("/verify-otp/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": "{{ csrf_token }}",
            },
            body: JSON.stringify({ otp: otpInput.value.trim() }),
          });

          if (response.ok) {
            alert("OTP Verified Successfully!");
          } else {
            otpError.textContent = "Invalid OTP. Please try again.";
            otpError.style.visibility = "visible";
          }
        } catch (error) {
          console.error("Error:", error);
          otpError.textContent = "Network error. Please try again.";
          otpError.style.visibility = "visible";
        }
      });

 document.addEventListener("DOMContentLoaded", function () {
   // Get CSRF token
   const csrfToken = getCSRFToken();

   // Registration Form Submission
   document
     .querySelector("#regform")
     .addEventListener("submit", async function (event) {
       event.preventDefault(); // Prevent default form submission

       // Get input elements and error spans
       const mecInput = document.querySelector("#mec");
       const nameInput = document.querySelector("#name");
       const emailInput = document.querySelector("#email");
       const phoneInput = document.querySelector("#phone");
       const addressInput = document.querySelector("#address");

       const mecError = document.querySelector("#mecerror");
       const nameError = document.querySelector("#nameerror");
       const emailError = document.querySelector("#emailerror");
       const phoneError = document.querySelector("#phoneerror");
       const addressError = document.querySelector("#addresserror");

       const logText = document.querySelector("#log-txt");
       const otpForm = document.querySelector("#otpverificationform");

       // Simple validation
       let isValid = true;

       // MEC ID Validation
       if (mecInput.value.trim() === "") {
         mecInput.style.borderColor = "#9B111E";
         mecError.style.visibility = "visible";
         isValid = false;
       } else {
         mecInput.style.borderColor = "";
         mecError.style.visibility = "hidden";
       }

       // Name Validation
       if (nameInput.value.trim() === "") {
         nameInput.style.borderColor = "#9B111E";
         nameError.style.visibility = "visible";
         isValid = false;
       } else {
         nameInput.style.borderColor = "";
         nameError.style.visibility = "hidden";
       }

       // Email Validation
       if (emailInput.value.trim() === "") {
         emailInput.style.borderColor = "#9B111E";
         emailError.style.visibility = "visible";
         isValid = false;
       } else if (!validateEmail(emailInput.value.trim())) {
         emailInput.style.borderColor = "#9B111E";
         emailError.textContent = "Invalid Email Format";
         emailError.style.visibility = "visible";
         isValid = false;
       } else {
         emailInput.style.borderColor = "";
         emailError.style.visibility = "hidden";
       }

       // Phone Validation
       if (phoneInput.value.trim() === "") {
         phoneInput.style.borderColor = "#9B111E";
         phoneError.style.visibility = "visible";
         isValid = false;
       } else {
         phoneInput.style.borderColor = "";
         phoneError.style.visibility = "hidden";
       }

       // Address Validation
       if (addressInput.value.trim() === "") {
         addressInput.style.borderColor = "#9B111E";
         addressError.style.visibility = "visible";
         isValid = false;
       } else {
         addressInput.style.borderColor = "";
         addressError.style.visibility = "hidden";
       }

       if (!isValid) return; // Stop if validation fails

       // Prepare data
       const formData = {
         mec: mecInput.value.trim(),
         name: nameInput.value.trim(),
         email: emailInput.value.trim(),
         phone: phoneInput.value.trim(),
         address: addressInput.value.trim(),
       };

       try {
         // Send data to the server
         const response = await fetch("/citizen-login/", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "X-CSRFToken": csrfToken,
           },
           body: JSON.stringify(formData),
         });

         if (response.ok) {
           const data = await response.json();
           logText.textContent =
             "An OTP has been sent to your registered email. Please do not refresh the page. Thank you!";
           logText.style.color = "green";
           document.querySelector("#regform").classList.add("hidden");
           otpForm.classList.remove("hidden");
         } else {
           const errorData = await response.json();
           console.error(
             "Error sending OTP:",
             errorData.error || response.statusText
           );
           logText.textContent =
             errorData.error || "Error sending OTP. Please try again.";
           logText.style.color = "red";
         }
       } catch (error) {
         console.error("Error:", error);
         logText.textContent = "Network error. Please try again.";
         logText.style.color = "red";
       }
     });

   // OTP Verification Form Submission
   document
     .querySelector("#otpverificationform")
     .addEventListener("submit", async function (event) {
       event.preventDefault(); // Prevent default form submission

       const otpInput = document.querySelector("#verification_otp");
       const otpError = document.querySelector("#otperror");
       const logText = document.querySelector("#log-txt");

       if (otpInput.value.trim() === "") {
         otpInput.style.borderColor = "#9B111E";
         otpError.style.visibility = "visible";
         otpError.textContent = "OTP is required";
         return;
       } else {
         otpInput.style.borderColor = "";
         otpError.style.visibility = "hidden";
       }

       // Prepare data
       const formData = {
         otp: otpInput.value.trim(),
       };

       try {
         const response = await fetch("/verify-otp/", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "X-CSRFToken": csrfToken,
           },
           body: JSON.stringify(formData),
         });

         if (response.ok) {
           const data = await response.json();
           alert("OTP Verified Successfully!");
           // Optionally, redirect the user or perform other actions
         } else {
           const errorData = await response.json();
           otpError.textContent =
             errorData.error || "Invalid OTP. Please try again.";
           otpError.style.visibility = "visible";
         }
       } catch (error) {
         console.error("Error:", error);
         otpError.textContent = "Network error. Please try again.";
         otpError.style.visibility = "visible";
       }
     });

   // Helper Function to Validate Email Format
   function validateEmail(email) {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(String(email).toLowerCase());
   }
 });




    $('#inslogform').submit(function () { 
        if($('#lic').val()==""){
          $("#lic").css("borderColor", "#9B111E");
          $("#licerror").css("visibility", "visible");
          return false;
        }
        if ($("#psw").val() == "") {
          $("#psw").css("borderColor", "#9B111E");
          $("#pswerror").css("visibility", "visible");
          return false;
        }
      
    });
     $("#emplogform").submit(function () {
       if ($("#emp").val() == "") {
         $("#emp").css("borderColor", "#9B111E");
         $("#emperror").css("visibility", "visible");
         return false;
       }
       if ($("#epsw").val() == "") {
         $("#epsw").css("borderColor", "#9B111E");
         $("#epswerror").css("visibility", "visible");
         return false;
       }
     });

     $("#mobform").submit(function () { 
      if ($("#ph").val().length < 10) {
        $("#ph").css("borderColor", "#9B111E");
        $("#pherror").css("visibility", "visible");
        return false;
      }
      else{
          $("#mobform").css("display", "none");
          $("#for-txt").html(
            "An OTP has been sent to your phone. Enter it here and do not refresh the page."
          );
          $("#otpforform").css("display", "flex");
          $("#otpforform").submit(function () {
            if ($('#fotp').val() == "") {
              $("#fotp").css("borderColor", "#9B111E");
              $("#fotperror").css("visibility", "visible");
              return false;
            }
            else{
               $("#otpforform").css("display", "none");
            $("#for-txt").html(
            "Enter your password and confirm it in the fields provided. Ensure they match before proceeding."
          );
          $("#pswform").css("display", "flex");
          $("#pswform").submit(function () {
            if ($('#npsw').val().length < 6) {
              $("#npsw").css("borderColor", "#9B111E");
              $("#npswerror").css("visibility", "visible");
              return false;
            }
            if ($('#cpsw').val() != $('#npsw').val()) {
              $("#cpsw").css("borderColor", "#9B111E");
              $("#cpswerror").css("visibility", "visible");
              return false;
            }
            });
            return false;
          }
          });
          return false;
      }
      
     });
});
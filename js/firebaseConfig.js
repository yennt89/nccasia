import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDKkOAKpbh5q9nqFA6nvuT9suOU-ty0FGU",
    authDomain: "optimize-web-ede86.firebaseapp.com",
    projectId: "optimize-web-ede86",
    storageBucket: "optimize-web-ede86.appspot.com",
    messagingSenderId: "386782170379",
    appId: "1:386782170379:web:f5c7d72ff966c126f9660e",
    databaseURL: "https://optimize-web-ede86-default-rtdb.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  const formCareer = document.querySelector(".wpcf7-form");
  const textInputs = formCareer.querySelectorAll(
    'input[type="text"], input[type="tel"], input[type="email"]'
  );

  formCareer.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSaveFormCareer();
  });


  function validateInputs() {
    let isValid = true;

    textInputs.forEach((input) => {
      // Check if input is required and empty
      if (
        input.value.trim().length <= 0 &&
        input.classList.contains("wpcf7-validates-as-required")
      ) {
        input.parentNode.querySelector(".wpcf7-not-valid-tip").style.display = "block";
        isValid = false;
      } else {
        input.parentNode.querySelector(".wpcf7-not-valid-tip").style.display = "none";
      }

      // Check email format
      if (input.type === "email" && input.value.trim().length > 0) {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(input.value.trim())) {
          input.parentNode.querySelector(".email-error").style.display =
            "block";
          isValid = false;
        } else {
          input.parentNode.querySelector(".email-error").style.display = "none";
        }
      }
    });
    return isValid;
  }

  async function handleSaveFormCareer() {
    const fields = {
      fullName: 'your-name',
      phoneNumber: 'tel-577',
      email: 'your-email',
      jobTitle: 'text-111',
      office: 'menu-618',
      aboutJob: 'text-628',
      file: 'file-297',
    };
    
    const formData = {};

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      formData[key] = formCareer.querySelector(`input[name="${field}"], select[name="${field}"]`).value;
    });
    
    const { fullName, phoneNumber, email, jobTitle, office, aboutJob } = formData;
    const fileInput = formCareer.querySelector('input[name="file-297"]');
    const fileToUpload = fileInput.files[0];

    const inputsAreValid = validateInputs();
    if (!inputsAreValid) {
      event.preventDefault();
      return;
    }

    try {
      // Upload file to Firebase Storage
      const fileRef = storageRef(storage, `files/${fileToUpload.name}`);
      await uploadBytes(fileRef, fileToUpload);
  
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(firestore, "career"), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        jobTitle: jobTitle,
        office: office,
        aboutJob: aboutJob,
        fileURL: downloadURL,
      });

      await push(ref(database, "career"), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        jobTitle: jobTitle,
        office: office,
        aboutJob: aboutJob,
        fileURL: downloadURL,
      });

    const applyForm = document.querySelector(".apply-box");
    applyForm.style.display = "none";

    const successBox = document.querySelector(".success-box");
    successBox.style.display = "block";
        
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  }


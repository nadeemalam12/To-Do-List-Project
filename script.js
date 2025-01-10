document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector("#save");
  const cameraButton = document.querySelector("#camera");
  const imageInput = document.querySelector("#image-input");
  const uploadedImage = document.querySelector("#uploaded-image");
  const firstNameInput = document.querySelector("#first-name");
  const lastNameInput = document.querySelector("#last-name");
  const phoneInput = document.querySelector("#phone");
  const selectPhoneType = document.querySelector("#phone-type");
  const emailInput = document.querySelector("#email");
  const selectEmailtype = document.querySelector("#email-type");
  const contactList1 = document.querySelector("#contact-list1");
  const contactList2 = document.querySelector("#contact-list2");
  const storageOption = document.querySelector("#storage-option");
  const selectOption = document.querySelector("#select-option");
  const contactsArr = [];
  const contactsArr2 = [];

  const infoList = document.querySelector("#info-list");
  let containerWidth = 428;
  const largeContainer = document.querySelector(".large-container");
  const next = document.querySelector("#next");
  const back = document.querySelector("#back");
  const addContact = document.querySelector("#add-contact")
  const searchContact = document.querySelector("#search-contact");





  addContact.addEventListener('click', () => {
    move(-2)
  })

  next.addEventListener('click', () => {
    move(-1)
  })
  back.addEventListener('click', () => {
    move(-1)
  })

  function move(index) {
    let scrollAmount = (index * containerWidth);
    largeContainer.style.transform = `translateX(${scrollAmount}px)`
  }




  contactList1.style.display = "";
  contactList2.style.display = "none";

  cameraButton.addEventListener("click", () => {
    imageInput.click();
  });

  let currentImageURL = "";

  imageInput.addEventListener("change", () => {
    currentImageURL = URL.createObjectURL(imageInput.files[0]);
    uploadedImage.src = currentImageURL;
  });

  saveButton.addEventListener("click", () => {
    const fname = firstNameInput.value.trim();
    const lname = lastNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    let phoneType = "";
    let emailType = "";

    move(-1);

    if (selectPhoneType.value === "1") {
      phoneType = "Personal";
    } else if (selectPhoneType.value === "2") {
      phoneType = "Office";
    } else {
      phoneType = "Home";
    }

    if (selectEmailtype.value === "1") {
      emailType = "Office";
    } else if (selectEmailtype.value === "2") {
      emailType = "Personal";
    } else {
      emailType = "Home";
    }

    let contactObj = {
      currentImageURL,
      fname,
      lname,
      phone,
      phoneType,
      email,
      emailType,
    };
    // infoListArr.push(contactObj);



    if (selectOption.value === "1") {



      contactsArr.push(contactObj);
      contactList1.innerHTML = "";
      contactsArr.sort((x, y) => x.fname.localeCompare(y.fname));

      contactsArr.forEach(function (items) {
        const firstAlpha = items.fname.slice(0, 1).toUpperCase();

        const contact = document.createElement("li");
        contact.innerHTML = `<span id="first-alpha">#${firstAlpha}</span>
        <img src="${items.currentImageURL}" id="image-icon">
                             <span class="span-text">${items.fname} ${items.lname}</span>`;

        contact.addEventListener("click", function () {
          move(0);
          infoList.innerHTML = "";
          const contactInfo = document.createElement("li");
          contactInfo.innerHTML = ` 
                      <img src="${items.currentImageURL}" id="image-show" />
                      <div id="contact-info">
                      <label>Name: ${items.fname} ${items.lname}</label>
                      <label>Phone: ${items.phone} <br> (${items.phoneType})</label>
                      <label>Email: ${items.email} <br> (${items.emailType})</label>
                      </div>`;

          infoList.appendChild(contactInfo);
          infoList.style.display = "";

        });
        contactList1.appendChild(contact);

        contactList1.style.display = "";
        contactList2.style.display = "none";
        storageOption.value = 1;
      });
    } else {


      contactsArr2.push(contactObj);
      contactList2.innerHTML = "";
      contactsArr2.sort((x, y) => x.fname.localeCompare(y.fname));

      contactsArr2.forEach(function (items) {
        const firstAlpha1 = items.fname.slice(0, 1).toUpperCase();
        const contact = document.createElement("li");
        contact.innerHTML = `<span id="first-alpha">#${firstAlpha1}</span>
        <img src="${items.currentImageURL}" id="image-icon">
                          <span class= "span-text2">${items.fname} ${items.lname}</span>`;
        contact.addEventListener("click", function () {
          move(0);
          infoList.innerHTML = "";
          const contactInfo = document.createElement("li");
          contactInfo.innerHTML = ` 
                                      <img src="${items.currentImageURL}" id="image-show" />
                                      <div id="contact-info">
                                      <label>Name: ${items.fname} ${items.lname}</label>
                                      <label>Phone: ${items.phone} <br> (${items.phoneType})</label>
                                      <label>Email: ${items.email} <br> (${items.emailType})</label>
                                      </div>`;

          infoList.appendChild(contactInfo);
          infoList.style.display = "";
        });

        contactList2.appendChild(contact);

        contactList2.style.display = "";
        contactList1.style.display = "none";
        storageOption.value = "2";

      });
    }

    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    currentImageURL = "";
    uploadedImage.src = currentImageURL;




  });



  storageOption.addEventListener("change", () => {
    if (storageOption.value === "1") {
      contactList1.style.display = "";
      contactList2.style.display = "none";
    } else if (storageOption.value === "2") {
      contactList2.style.display = "";
      contactList1.style.display = "none";
    }
  });
  searchContact.addEventListener('input', function (e) {
    const searchStr = e.target.value.toLowerCase();
    const contactList1Arr = contactList1.querySelectorAll('li');
    const contactList2Arr = contactList2.querySelectorAll('li');

    contactList1Arr.forEach(item => {
      const spanText = item.querySelector(".span-text");
      if (spanText.textContent.toLowerCase().includes(searchStr)) {
        item.style.display = ""
      }
      else {
        item.style.display = "none"
      }
    })
    contactList2Arr.forEach(item => {
      const spanText2 = item.querySelector(".span-text2");
      if (spanText2.textContent.toLowerCase().includes(searchStr)) {
        item.style.display = ""
      }
      else {
        item.style.display = "none"
      }
    })

  })


});

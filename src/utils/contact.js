import { CONTACT_REQUEST_API, TAXFILLING_REQUEST_API } from "./api";

/**
 * Submit a contact request to the backend
 * @param {Object} payload - Contact form data
 */
export const submitContactRequest = async (payload) => {
  try {
    const res = await fetch(CONTACT_REQUEST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Failed to parse response from server");
    }
    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit contact request");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Submit a tax filling request to the backend
 * @param {Object} formData - Tax return form data
 */
export const submitTaxFillingRequest = async (formData) => {
  const payload = {
    isActive: true,

    // Step 1: Personal Info
    firstName: formData.firstName,
    middleName: formData.middleName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    reasonForBooking: formData.reasonForBooking,
    dob: formData.dob,
    gender: formData.gender,
    occupation: formData.occupation,
    married: formData.married,
    maritalStatus: formData.married,
    children: formData.children,
    noOfChildren: parseInt(formData.children) || 0,
    residencyStatus:
      { resident: "permanent", visa: "visa holder" }[formData.residencyStatus] ||
      formData.residencyStatus,

    // Step 2: Address Info
    street: formData.street,
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
    zipCode: formData.zip,
    tfn: formData.tfn,
    bsbNo: formData.bsb,
    abn: formData.abn,
    accNo: formData.accountNo,
    accName: formData.accountName,

    // Step 3: Work Expenses
    carExpenseName: formData.carExpenseName,
    carExpenseAmount: formData.carExpenseAmount,
    travelExpenseName: formData.travelExpenseName,
    travelExpenseAmount: formData.travelExpenseAmount,
    clothingExpenseName: formData.clothingExpenseName,
    clothingExpenseAmount: formData.clothingExpenseAmount,

    selfExpenseName: formData.selfEduOtherName,
    selfExpenseAmount: formData.selfEduOtherAmount,
    selfDepreciableName: formData.selfEduDepreciableName,
    selfDepreciableAmount: formData.selfEduDepreciableAmount,
    selfMotorName: formData.selfEduMotorName,
    selfMotorAmount: formData.selfEduMotorAmount,

    otherExpenseName: formData.otherExpOtherName,
    otherAmount: formData.otherExpOtherAmount,
    otherDepreciableName: formData.otherExpDepreciableName,
    otherDepreciableAmount: formData.otherExpDepreciableAmount,
    otherMotorName: formData.otherExpMotorName,
    otherMotorAmount: formData.otherExpMotorAmount,

    giftExpenseName: formData.charityExpenseName,
    giftExpenseAmount: formData.charityExpenseAmount,

    taxAgentFee: formData.taxAgentFee,

    // Step 4: Others
    interest: formData.bankInterest,
    comment: formData.comments,

    sharesCryptoIncome: formData.sharesCryptoIncome,
    rentalPropertyStatus: formData.rentalPropertyStatus,

    shareAndCryptoIncome: formData.sharesCryptoIncome === "yes" ? "Yes" : "No",

    rentalProperty: formData.rentalPropertyStatus === "yes" ? "Yes" : "No",

    description: formData.otherPropertiesDescription,

    document: formData.document || formData.documentFile?.name || "doc",
  };

  try {
    let body;
    let headers = {};

    if (formData.documentFile) {
      const data = new FormData();
      data.append("document", formData.documentFile);

      Object.keys(payload).forEach((key) => {
        if (key !== "document" && payload[key] !== undefined && payload[key] !== null) {
          data.append(key, payload[key]);
        }
      });
      body = data;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }

    const res = await fetch(TAXFILLING_REQUEST_API, {
      method: "POST",
      headers,
      body,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Failed to parse response from server");
    }
    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit tax filing request");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

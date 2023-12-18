interface Resources {
  de: {
    login: {
      username: "Nutzername";
      password: "Passwort";
    };
  };
  en: {
    common: {
      voyageleg: "Voyageleg";
      back: "Back";
    };
    login: {
      login: "Login";
      "log-in-to": "Log in to";
      "frs-account": "FRS Account";
      "forgot-password?": "Forgot your Password?";
      username: "Username";
      password: "Password";
    };
    routes: {
      "choose-route": "Choose Route";
    };
    "main-menu": {
      sales: "Sales";
      boarding: "Boarding";
      cancel: "Cancel";
    };
    "departure-times": {
      "choose-departure": "Choose Departure";
    };
    booking: {
      book: "BOOK";
    };
    "booking-summary": {
      "booking-summary": "Booking summary";
    };
    payment: {
      "payment-method": "Payment Method";
      cash: "Cash";
      "payment-summary": "Payment Summary";
      passengers: "Passengers";
      total: "Total";
      "confirm-purchase": "Confirm Purchase";
    };
    footer: {
      "main-menu": "Main Menu";
      logout: "Logout";
      summary: "Summary";
      reset: "Reset";
    };
    "printable-receipt": {
      user: "User: {{username}}";
      "ticket-validation-message": "The ticket is validated with the purchase and is only valid for the subsequent journey. The terms and conditions 6 and 18 of the shipping company apply";
      total: {
        gross: "Total (gross): {{value}}";
        net: "Total (net): {{value}}";
      };
      "thank-message": "Thank you!";
      "vat-percentage": "{{value}}%";
      "tse-info-divider": "-----------------TSE Information----------------";
      ticket: {
        "quantity-and-price": "{{quantity}} x at {{price}}";
        "include-vat": "incl. {{value}}% VAT";
      };
      tse: {
        deviceNumber: "Device Serial Number: {{value}}";
        number: "TSE Serial Number: {{value}}";
        signature: "Signature: {{value}}";
        transaction: "Transaction: {{value}}";
        startDateTime: "Start: {{value}}";
        endDateTime: "Finish: {{value}}";
        counterSignature: "Signature-Payer: {{value}}";
        algorithm: "Signature-Algorithms: {{value}}";
        timeFormat: "Time-Format: {{value}}";
      };
    };
  };
}

export default Resources;

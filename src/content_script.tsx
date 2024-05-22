chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");

  if (msg.action === "FIX_NO") {
    let number: string = msg.data.number;
    const rows = document.querySelectorAll("table > tbody > tr");
    if (rows.length === 0) {
      sendResponse("Hata (rows) bulunamadı!");
      return;
    }
    const inputs: HTMLInputElement[] = [];

    rows.forEach((row) => {
      const input = row
        .querySelector("td")
        ?.querySelector('input[type="text"]');
      if (input) inputs.push(input as HTMLInputElement);
    });

    if (inputs.length === 0) {
      sendResponse("Hata (inputs) bulunamadı!");
      return;
    }

    inputs.forEach((input) => {
      (input as HTMLInputElement).value = number;
      let startFrom = parseInt(number);
      startFrom++;
      number = String(startFrom);
    });

    sendResponse("Başarıyla düzenlendi!");
  } else if (msg.action === "GET_PAGE") {
    sendResponse(page);
    return;
  }
});

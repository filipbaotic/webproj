let juzer = JSON.parse(window.localStorage.getItem("user")).user_id;

const kupiTikija = async (egzi_id) => {
  payload = {
    exhibition_id: egzi_id,
    user_id: juzer,
  };
  let justDoIt = prompt("JU SUR JU VANA DO DIS SIT");
  if (justDoIt == "HELJEA") {
    await fetch(`http://localhost:3000/purchaseTicket`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    txt = "LES GOOOO";
  } else {
    txt = "PIZDO";
  }
  alert(txt);
};

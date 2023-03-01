let payload_user_id = JSON.parse(window.localStorage.getItem("user")).user_id;

const payload = {
  user_id: payload_user_id,
};
const getTickets = async () => {
  const response = await fetch(`http://localhost:3000/getTicketsById`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  localStorage.setItem("myexhibitions", JSON.stringify(await response.json()));
};
getTickets();

const listTickets = () => {
  let myexhibitions = JSON.parse(window.localStorage.getItem("myexhibitions"));
  if(myexhibitions == null) {
    location.reload()
  }
    myexhibitions.forEach((exhibition) => {
    let newStart = new Date(exhibition.time_of_purchase);
    let formattedStart = newStart.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
      document.write(`<div class="exhibition">
                <div class="column-date">${formattedStart}</div>
                <div class="column-author column-author_artist">${exhibition.exhibition_name}</div>
            </div>`);
  });
};
listTickets()
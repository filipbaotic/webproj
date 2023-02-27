const API_URL = "http://localhost:3000";

const getExhibitions = async () => {
  const response = await fetch(`${API_URL}/getExhibitions`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });

  localStorage.setItem("exhibitions", JSON.stringify(await response.json()));
};

getExhibitions();

const listExhibitions = () => {
  let exhibitions = JSON.parse(window.localStorage.getItem("exhibitions"));
  exhibitions.forEach((exhibition) => {
    let newStart = new Date(exhibition.date_start);
    let newEnd = new Date(exhibition.date_end);
    let formattedStart = newStart.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    let formattedEnd = newEnd.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    if (Date.now() > newEnd) {
      document.write(`<div class="exhibition past">
                  <div class="column-date">${formattedStart} -<br>${formattedEnd}</div>
                  <div class="column-author column-author_artist">${exhibition.exhibition_name}</div>
                  <div class="column-tickets"><a class="button" href="">Purchase ticket</a></div>
              </div>`);
    } else {
      document.write(`<div class="exhibition">
                <div class="column-date">${formattedStart} -<br>${formattedEnd}</div>
                <div class="column-author column-author_artist">${exhibition.exhibition_name}</div>
                <div class="column-tickets"><a class="button" href="">Purchase ticket</a></div>
            </div>`);
    }
  });
};

listExhibitions();

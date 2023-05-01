let arr = [];

async function getDataFromAPI() {
  document.getElementById("loader").style.display = "block";
  console.log("Fetching Data...");

  try {
    const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");
    arr = await response.json();
    sessionStorage.setItem("StoredArr", JSON.stringify(arr));
    console.log("data", arr);
    fetchData(arr);
  } catch (error) {
    console.log("Error in fetching", error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

if (sessionStorage.getItem("StoredArr")) {
  const storedArr = JSON.parse(sessionStorage.getItem("StoredArr"));
  arr = storedArr;
  fetchData(storedArr);
} else {
  getDataFromAPI();
}

document.getElementById("search").addEventListener("input", () => {
  const newArr = arr.filter((item) =>
    item.toLocation.toLowerCase().includes(document.getElementById("search").value.trim().toLowerCase())
  );
  fetchData(newArr);
});

document.getElementById("search1").addEventListener("input", () => {
    const newArr = arr.filter((item) =>
      item.status.toLowerCase().includes(document.getElementById("search1").value.trim().toLowerCase())
    );
    fetchData(newArr);
  });

  document.getElementById("search2").addEventListener("input", () => {
    const newArr = arr.filter((item) =>
      item.fare.toLowerCase().includes(document.getElementById("search2").value.trim().toLowerCase())
    );
    fetchData(newArr);
  });

async function fetchData(data) {
  document.getElementById("loader").style.display = "block";

  try {
    let getData = '';

    data.forEach((item) => {
      getData += `
        <div class='data'>
          <div class='first'>
            <div class="section">
              <div class='stat ${
                item.status == "PENDING"
                  ? "yellow"
                  : item.status == "CANCELLED"
                  ? "red"
                  : item.status == "APPROVED"
                  ? "blue"
                  : ""
              }' >${item.status}</div>
              <p>${item.date}</p>
              <p>${item.caseNumber}</p>
            </div>
          </div>
          <div class="details">
            <strong>${item.toLocation}</strong>
            <p>${item.fromLocation} <span style='float:right;'>${item.fare}</span></p>
          </div>
        </div>
      `;
    });

    document.getElementById("container").innerHTML = getData;
  } catch (error) {
    console.log("Error in fetching", error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

const url = "https://type.fit/api/quotes";

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }
  getData();
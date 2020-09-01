
const API_url = process.env.API_URL || "http://localhost:4000/api";
const headers = new Headers();
const params = {
  headers: headers,
  mode: "cors",
  cache: "default",
};

export async function getAll() {
  let urls = await fetch(`${API_url}/last/10`, { method: "GET", ...params })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    });

  return urls.map((doc) => {
    return { raw: doc.raw, punycode: doc.emojis };
  });
}

export async function getUnique(id) {
  let res = await fetch(`${API_url}/${id}`, { method: "GET", ...params })
    .then((data) => {
      if (data.status !== 200) {
          throw new Error(`request error, status code ${data.status}`)
      }
      return data.json();
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
    return res;
}

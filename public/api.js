var api = {
  getValues: function() {
    return axios.get("/get").catch(err => {
      console.log("an error occured");
    });
  },
  addValue: function(urlEncodedData) {
    return axios({
      method: "POST",
      url: "/add",
      data: urlEncodedData,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    }).catch(() => {
      console.log("Error while sending value to the server");
    });
  },
  editValue: function(urlEncodedData) {
    return axios({
      method: "POST",
      url: "/edit",
      data: urlEncodedData,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    }).catch(() => {
      console.log("Error while sending value to the server");
    });
  }
};

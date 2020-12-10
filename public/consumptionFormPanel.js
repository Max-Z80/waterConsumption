function ConsumptionFormPanel() {
  let isEditing = false;
  let isCreating = false;

  const form = document.getElementById("myForm");
  const consumptionDateInput = document.getElementsByName("consumptionDate")[0];
  const consumptionM3Input = document.getElementsByName("consumptionM3")[0];
  const panel = document.getElementById("addPanel");

  this.setIsCreating = input => (isCreating = input);
  this.setIsEditing = input => (isEditing = input);

  function submitHandler(event) {
    event.preventDefault();
    this.send().then(() => {
      this.hidePanel();
      menu.setIsNewMenuItemSelected(false);
      renderChart();
    });
  }
  submitHandler = submitHandler.bind(this);

  form.addEventListener("submit", submitHandler);

  this.editConsumption = function() {
    isEditing = true;
    isCreating = false;
    panel.firstElementChild.innerHTML = "Edit consumption";
    this.showPanel();
  };

  this.addConsumption = function() {
    isEditing = false;
    isCreating = true;
    consumptionDateInput.value = moment(new Date()).format("YYYY-MM-DD");
    consumptionM3Input.value = "";
    panel.firstElementChild.innerHTML = "Add consumption";
    this.showPanel();
  };

  this.setIsHidden = function() {
    isEditing = false;
    isCreating = false;
    this.send = null;
    this.hidePanel();
  };

  /**
   * Send the data
   * @returns {Promise} data from the server
   */
  this.send = function() {
    function urlencodeFormData(fd) {
      var params = new URLSearchParams();
      for (var pair of fd.entries()) {
        typeof pair[1] == "string" && params.append(pair[0], pair[1]);
      }
      return params.toString();
    }

    const fd = new FormData(form);
    const urlencodedData = urlencodeFormData(fd);

    if (isCreating) {
      return api.addValue(urlencodedData);
    }
    if (isEditing) {
      return api.editValue(urlencodedData);
    }
  };

  this.hidePanel = function() {
    panel.style.display = "none";
  };

  this.showPanel = function() {
    panel.style.display = "block";
  };

  this.setDateInputValue = function(date) {
    consumptionDateInput.value = date;
  };

  this.setM3InputValue = function(m3) {
    consumptionM3Input.value = m3;
  };
}

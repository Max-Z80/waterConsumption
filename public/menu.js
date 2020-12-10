function Menu() {
  let isNewMenuItemSelected = false;

  //this.getIsNewMenuItemSelected = () => isNewMenuItemSelected;
  const newitem = document.getElementById("newLink");

  this.setIsNewMenuItemSelected = function(isSelected) {
    //isNewMenuItemSelected = isSelected;
    if (isSelected) {
      newitem.className = "active";
    } else {
      newitem.className = "";
    }
  };
}

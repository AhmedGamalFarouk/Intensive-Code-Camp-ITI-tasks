function displaySelectedItems() {
    var sel = document.getElementById("menu");
    var index = sel.selectedIndex;
    var elem = sel.options[index];
    console.log(elem.text);
    console.log(elem.label);

    //=================================================================
    var selectedText = "";
    for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].selected) {

            selectedText += sel.options[i].text + "<br>";
        }
    }
    document.getElementById("div1").innerHTML = selectedText;
}
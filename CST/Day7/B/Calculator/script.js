// Calculator functions
function displayValue(myElem) {
    var TxtField = document.getElementById("txt1");
    TxtField.value += myElem.value.trim();
}

function displayContent(myElem) {
    var val = myElem.value;
    document.getElementById("div1").innerHTML = val;
}

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
            //*Write the text of selected options inside div (TASK)
            selectedText += sel.options[i].text + "<br>";
        }
    }
    document.getElementById("div1").innerHTML = selectedText;
}

function clearDisplay() {
    document.getElementById("txt1").value = "";
}

function backSpace() {
    var txtField = document.getElementById("txt1");
    txtField.value = txtField.value.slice(0, -1);
}

function add() {
    var txtField = document.getElementById("txt1");
    txtField.value += "+";
}

function subtract() {
    var txtField = document.getElementById("txt1");
    txtField.value += "-";
}

function multiply() {
    var txtField = document.getElementById("txt1");
    txtField.value += "*";
}

function divide() {
    var txtField = document.getElementById("txt1");
    txtField.value += "/";
}

function calculate() {
    var txtField = document.getElementById("txt1");
    var expression = txtField.value;

    var result;
    if (expression.includes("+")) {
        var numbers = expression.split("+");
        result = parseFloat(numbers[0]) + parseFloat(numbers[1]);
    } else if (expression.includes("-")) {
        var numbers = expression.split("-");
        result = parseFloat(numbers[0]) - parseFloat(numbers[1]);
    } else if (expression.includes("*")) {
        var numbers = expression.split("*");
        result = parseFloat(numbers[0]) * parseFloat(numbers[1]);
    } else if (expression.includes("/")) {
        var numbers = expression.split("/");
        result = parseFloat(numbers[0]) / parseFloat(numbers[1]);
    }

    txtField.value = result;
}

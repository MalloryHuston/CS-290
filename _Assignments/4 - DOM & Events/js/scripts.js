//  Author: Christopher Matian
//  OID: 933308644
//  Class: CS 290 - Web Dev
//  Date: July 21st, 2018

document.addEventListener("DOMContentLoaded", function() {

    let $body = document.getElementsByTagName('body')[0];

    // Generate Table
    let tableBody = document.createElement("table");
    tableBody.style.border = "1px solid #787878";

    // Generate Header Row
    let tableHeadRow = document.createElement('tr');
    for(let i = 0; i < 4; i++) {
        // Create th element
        let tableHeadChild = document.createElement('th');
        // Set & Style Content
        tableHeadChild.innerHTML = ("Header " + (i + 1));
        tableHeadChild.style.textAlign = "center";
        tableHeadChild.style.border = "1px solid #787878";
        tableHeadChild.style.height = "50px";
        tableHeadChild.style.width = "100px";
        // Append to tableHeadRow
        tableHeadRow.appendChild(tableHeadChild);
    }
    // Append to tableBody
    tableBody.appendChild(tableHeadRow);

    // Generate Normal Content Rows
    for(let i = 0; i < 3; i++) {

        let newRow = document.createElement('tr');

        for(let j = 0; j < 4; j++) {

            let newRowChild = document.createElement('td');
            newRowChild.innerHTML = ((i + 1) + ", " + (j + 1));
            newRowChild.style.textAlign = "center";
            newRowChild.style.border = "1px solid #787878";
            newRowChild.style.height = "50px";
            newRowChild.style.width = "100px";

            // Append to tr
            newRow.append(newRowChild);
        }
        // Append row to table body
        tableBody.appendChild(newRow);
    }

    // Append created table to body
    $body.appendChild(tableBody);

    // Generate Button Container
    let buttonContainer = document.createElement("section");

    buttonContainer.innerHTML = "Table Cell Navigation: ";
    buttonContainer.style.border = "1px solid #787878";
    buttonContainer.style.display = "inline-block";
    buttonContainer.style.marginTop = "25px";


    // Generate Navigation Buttons
    let direction = ["Up", "Down", "Left", "Right"];

    for(let i = 0; i < direction.length; i ++) {

        let button = document.createElement("button");
        button.innerHTML = direction[i];
        button.style.width = "100px";
        button.style.height = "50px";
        buttonContainer.appendChild(button);

    }

    // Generate Mark Cell Button
    let markButton = document.createElement("button");
    markButton.innerHTML = "Mark Cell";
    markButton.style.width = "100px";
    markButton.style.height = "50px";
    buttonContainer.appendChild(markButton);

    // Append Button Container to the body
    $body.appendChild(buttonContainer);

    // Set up initial table state
    let tableCell = document.getElementsByTagName('table')[0];
    let tRow = 1;
    let tCol = 0;
    let mark = tableCell.children[tRow].children[tCol];
    mark.style.border = "2px solid #2d2d2d";

    function selectNewCell() {
        // Reset current cell
        mark.style.border = "1px solid #787878";
        // Change to new cell
        mark = tableCell.children[tRow].children[tCol];
        // Change current cell
        mark.style.border = "2px solid #2d2d2d";
    }

    // Event Object
    let events = {

        cellUp: function() {
            if(tRow > 1) {
                tRow--;
                selectNewCell();
            }
        },

        cellDown: function() {
            if (tRow < 3) {
                tRow++;
                selectNewCell();
            }
        },

        cellLeft: function() {
            if (tCol > 0) {
                tCol--;
                selectNewCell();
            }
        },

        cellRight: function() {
            if (tCol < 3) {
                tCol++;
                selectNewCell();
            }
        },

        linkEvents: function() {


            let upBtn = document.getElementsByTagName('button')[0];
            upBtn.addEventListener('click', this.cellUp);

            let downBtn = document.getElementsByTagName('button')[1];
            downBtn.addEventListener('click', this.cellDown);

            let leftBtn = document.getElementsByTagName('button')[2];
            leftBtn.addEventListener('click', this.cellLeft);

            let rightBtn = document.getElementsByTagName('button')[3];
            rightBtn.addEventListener('click', this.cellRight);

            let markBtn = document.getElementsByTagName('button')[4];
            markBtn.addEventListener('click', function() {

                mark.style.backgroundColor = "yellow";

            });
        }
    };

    // Attach events to handlers
    events.linkEvents();
});


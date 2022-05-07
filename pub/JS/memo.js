const log = console.log;

function memo(){
    this.rowNum = 0;
    this.id = undefined;
    this.title = undefined;
    this.data = [];
    this.maxRow = -1;
    this.categories = [];
}

function moveUp(e){
    const rowId = e.target.parentElement.parentElement.id;
    const tbody = e.target.parentElement.parentElement.parentElement
    const tableId = tbody.parentElement.id
    const tableNum = tableId.substr(tableId.length-1)
    const rows = e.target.parentElement.parentElement.parentElement.children
    var container = [...rows]
    const rowNum = rowId.substr(rowId.length-1)
    const temp = rowNum - 1
    // not first row
    if(temp > 0){
        tbody.innerHTML = '';
        if(temp == 1){
            tbody.appendChild(container[1])
            tbody.appendChild(container[0])
            if(container.length > 2){
                for(var k = 2; k < container.length; k++){
                    tbody.appendChild(container[k])
                }
            }
            for(var i = 0; i < tbody.children.length;i++){
                tbody.children[i].children[0].innerText = i+1;
                tbody.children[i].id = 'memo-'+tableNum+' row-'+ (i+1)
            } 
        }else{
            // >= 2
            for(var j = 0; j < temp; j++){
                tbody.appendChild(container[j])
            }
            tbody.appendChild(container[temp])
            tbody.appendChild(container[temp-1])
            if(temp<container.length-1){
                for(var m = temp+1; m < container.length; m++){
                    tbody.appendChild(container[m])
                }
            }
            for(var i = 0; i < tbody.children.length;i++){
                tbody.children[i].children[0].innerText = i+1;
                tbody.children[i].id = 'memo-'+tableNum+' row-'+ (i+1)
            } 
        }
    }
}

function moveDown(e){
    const rowId = e.target.parentElement.parentElement.id;
    const tbody = e.target.parentElement.parentElement.parentElement
    const tableId = tbody.parentElement.id
    const tableNum = tableId.substr(tableId.length-1)
    const rows = e.target.parentElement.parentElement.parentElement.children
    var container = [...rows]
    const rowNum = rowId.substr(rowId.length-1)
    const temp = rowNum - 1
    if(temp < container.length-1){
        tbody.innerHTML = '';
        // second last row
        if(temp == container.length - 2){
            for(var i = 0; i < temp; i++){
                tbody.appendChild(container[i])
            }
            tbody.appendChild(container[temp+1])
            tbody.appendChild(container[temp])
            for(var k = 0; k < tbody.children.length;k++){
                tbody.children[k].children[0].innerText = k+1;
                tbody.children[k].id = 'memo-'+tableNum+' row-'+ (k+1)
            } 
        }else if(temp == 0){
            tbody.appendChild(container[1])
            tbody.appendChild(container[0])
            for(var j = 2; j < container.length; j++){
                tbody.appendChild(container[j])
            }
            for(var m = 0; m < tbody.children.length;m++){
                tbody.children[m].children[0].innerText = m+1;
                tbody.children[m].id = 'memo-'+tableNum+' row-'+ (m+1)
            } 
        }else{
            for(var a = 0; a < temp; a++){
                tbody.appendChild(container[a])
            }
            tbody.appendChild(container[temp+1])
            tbody.appendChild(container[temp])
            for(var b = temp+2; b < container.length; b++){
                tbody.appendChild(container[b])
            }
            for(var n = 0; n < tbody.children.length; n++){
                tbody.children[n].children[0].innerText = n+1;
                tbody.children[n].id = 'memo-'+tableNum+' row-'+ (n+1)
            } 
        }
    }
}

function rankbyDeadLine(e){
    var deadLineList = []
    const rows = e.target.parentElement.parentElement.children[3].children[2].children
    const tbody = e.target.parentElement.parentElement.children[3].children[2]
    var container = [...rows]
    for(var i = 0; i < container.length; i++){
        deadLineList.push(container[i].children[2].innerText)
    }
    deadLineList.sort()
    log(deadLineList)
    e.target.parentElement.parentElement.children[3].children[2].innerHTML = ''
    let length = deadLineList.length
    while(rows.length < length){
        for(var j = 0; j < deadLineList.length; j++){
            for(var k = 0; k < container.length; k++){
                if(deadLineList[j] == container[k].children[2].innerText){
                    tbody.appendChild(container[k])
                    deadLineList.splice(j, 1)
                    container.splice(k, 1)
                }
            }
        }
    }
    for(var m = 0; m < tbody.children.length; m++){
        tbody.children[m].children[0].innerText = m+1
    }
}

memo.prototype = {
    createMemo: function(selector, id, title, category, data, maxRow){
        const position = document.querySelector('#'+ selector);
        this.id = 'memo-' + id;
        this.data = data;
        this.maxRow = maxRow;
        this.categories = category

        const newMemo = document.createElement('div');
        newMemo.className = 'memo';
        
        // Title
        const titleContainer = document.createElement("h2");
        titleContainer.className = "memoTitle";
        titleContainer.innerText = title;
        newMemo.appendChild(titleContainer);

        const rank = document.createElement('div');
        const prefix = document.createElement('strong');
        prefix.innerText = 'Ranked By '
        rank.appendChild(prefix);
        const categoryButton = document.createElement('button');
        var defaultText = "DEADLINE";
        if(this.categories.indexOf('Deadline') == -1){
            defaultText = 'NULL'
        }
        categoryButton.innerText = defaultText
        if(defaultText == 'DEADLINE'){
            categoryButton.addEventListener('click', rankbyDeadLine)
        }
        rank.appendChild(categoryButton)
        const emptySpace = document.createElement('br') 
        newMemo.appendChild(rank)
        newMemo.appendChild(emptySpace)

        const columnGroup = document.createElement('colgroup');

        const rowNumCol = document.createElement('col');
        rowNumCol.className = "rowNumCol";
        columnGroup.appendChild(rowNumCol);

        const rowContent = document.createElement('col');
        rowContent.className = "rowContent";
        columnGroup.appendChild(rowContent);

        const deadline = document.createElement('col');
        deadline.className = "deadline";
        columnGroup.appendChild(deadline);

        const order = document.createElement('col');
        order.className = "order adjust";
        columnGroup.appendChild(order);

        const contentTable = document.createElement('table');
        contentTable.className = 'memoTable';
        contentTable.id = this.id;

        contentTable.appendChild(columnGroup);

        // Categories
        const tableHead = document.createElement('thead');
        const categories = document.createElement('tr');
        categories.className = 'categories';
        for(var i = 0; i < category.length; i++){
            const categoryName = document.createElement('th');
            categoryName.innerText = category[i];
            categories.appendChild(categoryName);
        }

        tableHead.appendChild(categories);
        contentTable.appendChild(tableHead);

        // data
        const tableBody = document.createElement('tbody');
        for(var row = 0; row < this.data.length; row++){
            const newRow = document.createElement('tr');
            const temp = row + 1;
            newRow.id = 'memo-' + id + ' row-' + temp;

            const rowNumber = document.createElement('td');
            rowNumber.innerText = temp;
            this.rowNum++;
            newRow.appendChild(rowNumber);

            const content = document.createElement('td');
            content.innerText = this.data[row][0];
            newRow.appendChild(content)

            const deadLine = document.createElement('td');
            deadLine.innerText = this.data[row][1];
            newRow.appendChild(deadLine)

            const buttonContainer = document.createElement('td');
            const upButton = document.createElement('button');
            upButton.innerText = 'Up';
            upButton.className = 'Up';
            upButton.addEventListener('click', moveUp);
            buttonContainer.appendChild(upButton)
            const downButton = document.createElement('button');
            downButton.innerText = 'Down';
            downButton.addEventListener('click', moveDown)
            buttonContainer.appendChild(downButton)

            newRow.appendChild(buttonContainer)

            tableBody.appendChild(newRow);
        }

        contentTable.appendChild(tableBody);
        newMemo.appendChild(contentTable);
        position.appendChild(newMemo);
    },

    // Insert new Rows with given Data in the last position
    insertdata: function(data){
        this.data = this.data.concat(data);
        var count = this.rowNum + 1;
        this.rowNum = this.data.length;

        var table = document.querySelector('#'+this.id);
        for (var row = 0; row < data.length; row++){
            var newRow = table.insertRow();
            // var temp = row + 1;
            newRow.id =  this.id + ' row-' + count
            var row_number = newRow.insertCell();
            row_number.innerText = count;
            count++;
            for (var col = 0; col < 2; col++){
                var newData = newRow.insertCell();
                newData.innerHTML = data[row][col];
            }
            var newButton = newRow.insertCell();
            // newButton.innerHTML = '<button class="Up">Up</button><button>Down</button>';
            // const buttonContainer = document.createElement('td');
            const upButton = document.createElement('button');
            upButton.innerText = 'Up';
            upButton.className = 'Up';
            upButton.addEventListener('click', moveUp);
            newButton.appendChild(upButton)
            const downButton = document.createElement('button');
            downButton.innerText = 'Down';
            downButton.addEventListener('click', moveDown)
            newButton.appendChild(downButton)
        }
    },

    // delete row
    deleteRow: function(rowNumber){
        this.data.splice(rowNumber -1, 1);
        this.numRow = this.data.length;
        var table = document.querySelector('#'+this.id);
        table.children[2].innerHTML = '';
        for (var row = 0; row < this.data.length; row++){
            var newRow = table.getElementsByTagName('tbody')[0].insertRow();
            var temp = row + 1;
            newRow.id = this.id + ' row-' + temp
            var row_number = newRow.insertCell();
            row_number.innerHTML =  temp;
            for (var col = 0; col < 2; col++){
                var newData = newRow.insertCell();
                newData.innerHTML = this.data[row][col];
            }
            var newButton = newRow.insertCell();
            // newButton.innerHTML = '<button class="Up">Up</button><button>Down</button>';
            const upButton = document.createElement('button');
            upButton.innerText = 'Up';
            upButton.className = 'Up';
            upButton.addEventListener('click', moveUp);
            newButton.appendChild(upButton)
            const downButton = document.createElement('button');
            downButton.innerText = 'Down';
            downButton.addEventListener('click', moveDown)
            newButton.appendChild(downButton)

        }
    },

    // set ideal header background color
    setHeaderColor: function(color){
        var target = document.querySelector('#'+this.id);
        if (target){
            target.children[1].children[0].style.backgroundColor = color;
        }
    },

    // set ideal row background color
    setRowColor: function(rowNum, color){
        var target = document.querySelector('#'+this.id);
        if (target){
            target.children[2].children[rowNum-1].style.backgroundColor = color;
        }
    },

    // set the general background color
    setBackgroundColor: function(color){
        var target = document.querySelector('#'+this.id).parentElement;
        if (target){
            target.style.backgroundColor = color;
        }
    },

    // set the max row
    setMaxRow: function(maxNumber){
        this.maxRow = maxNumber;
        var table = document.querySelector('#'+this.id);
        for (var row = 1; row < table.rows.length; row++){
            if (row - 1 < this.maxRow){
                table.rows[row].style = "visibility: visible";
            }
            else{
                table.rows[row].style = "visibility: collapse";
            }
        }
    },

    // add category
    addCategory: function(category){
        var table = document.querySelector('#'+this.id);
        const newCategory = document.createElement('col');
        newCategory.className = category;
        table.children[0].insertBefore(newCategory, table.children[0].children[table.children[0].children.length-1])
        this.categories.splice(this.categories.length-1, 0, category)
        // log(this.categories)

        const newCat = document.createElement('th');
        newCat.innerText = category;
        const temp = table.children[1].children[0].children.length;
        table.children[1].children[0].insertBefore(newCat, table.children[1].children[0].children[temp-1])

        for( let i = 0; i < table.children[2].children.length; i++){
            var row = table.children[2].children[i];
            const buttonAdd = document.createElement('td');
            // buttonAdd.innerHTML = '<button class="Up">Up</button><button>Down</button>';
            const upButton = document.createElement('button');
            upButton.innerText = 'Up';
            upButton.className = 'Up';
            upButton.addEventListener('click', moveUp);
            buttonAdd.appendChild(upButton)
            const downButton = document.createElement('button');
            downButton.innerText = 'Down';
            downButton.addEventListener('click', moveDown)
            buttonAdd.appendChild(downButton)

            row.appendChild(buttonAdd)
            var temp2 = row.children.length;
            row.children[temp2-2].innerHTML = ''
        }
    },

    // delete category
    deleteCategory: function(category){
        if(category == 'NOTICE' || category == 'ORDER ADJUST'){
            return;
        }
        var table = document.querySelector('#'+this.id);
        var button = table.parentElement.children[1].children[1]
        // log(button)
        var index;
        for(let i = 0; i < table.children[1].children[0].children.length; i++){
            const match = table.children[1].children[0].children[i]
            if(match.innerText == category){
                index = i
                table.children[1].children[0].removeChild(match)
            }
        }
        for(let j = 0; j < table.children[2].children.length; j++){
            var row = table.children[2].children[j]
            var removeElement = row.children[index]
            row.removeChild(removeElement)
        }
        this.categories.splice(index, 1)
        // log(this.categories)
        if(this.categories.indexOf('Deadline') == -1){
            button.innerText = 'NULL'
        }
    },

    // delete rank button
    deleteRankButton: function(){
        const memo = document.querySelector('#'+this.id);
        var removeElement = memo.parentElement.children[1]
        memo.parentElement.removeChild(removeElement)
    },

    // editContent
    editNotice: function(rowNum, newContent){
        const index = this.categories.indexOf('Notice');
        this.data[rowNum-1][index-1] = newContent
        const memo = document.querySelector('#'+this.id);
        memo.children[2].children[rowNum-1].children[index].innerText = newContent
    }
}

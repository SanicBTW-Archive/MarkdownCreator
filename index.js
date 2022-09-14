//do the griddy
class MDCreator
{
    textContent = null;
    symbols = 
    [
        {"symbol": "#", "element": 'h1'},
        {"symbol": "##", "element": "h2"},
        {"symbol": "###", "element": "h3"},
        {"symbol": "####", "element": "h4"},
        {"symbol": "#####", "element": "h5"},
        {"symbol": "######", "element": "h6"},
        {"symbol": "-", "element": "li"}
    ]
    childCount = 0;

    constructor(filePath)
    {
        fetch(filePath).then((resp) => 
        {
            resp.text().then((text) => 
            {
                this.textContent = text;
                this.make();
            });
        });
    }

    make()
    {
        if(this.textContent != null)
        {
            var mainDiv = document.createElement('div');
            document.body.insertBefore(mainDiv, document.body.childNodes[0]);

            var rawText = this.textContent.split("\n");
            for(var lineIndex in rawText)
            {
                this.symbols.forEach((entry) => 
                {
                    if(rawText[lineIndex].startsWith(entry.symbol))
                    {
                        var content = rawText[lineIndex].replace(entry.symbol, "");

                        var newElement = document.createElement(entry.element);
                        newElement.innerText = content;
                        newElement.id = "child" + this.childCount;
                        mainDiv.append(newElement);
                        this.childCount++;
                    }
                });

                /*
                if(rawText[lineIndex].startsWith("[OPTIONS]"))
                {
                    var options = rawText[lineIndex].replace("[OPTIONS]", "").split("-");
                    options.forEach((option) => 
                    {
                        if(option.includes("Center"))
                        {
                            var style = document.createElement('style');
                            style.innerHTML = ".center { width: 100%; height: 100vh; align-items: center; text-align: center; justify-content: center; display: flex; }";
                            document.head.appendChild(style);
                            mainDiv.classList.add("center");
                        }
                    });
                }

                if(rawText[lineIndex].startsWith("[STYLE]"))
                {
                    //arg0 = type, arg1 = name or key, arg2 = style
                    var styleArgs = rawText[lineIndex].replace("[STYLE]", "").split("|");
                    switch(styleArgs[0])
                    {
                        case "[CLASS]":
                            var style = document.createElement('style');
                            style.innerHTML = `.${styleArgs[1]} { ${styleArgs[2]} } `;
                            document.head.appendChild(style);
                            break;
                        case "[ID]":
                            var style = document.createElement('style');
                            style.innerHTML = `#${styleArgs[1]} { ${styleArgs[2]} } `;
                            document.head.appendChild(style);
                            break;
                        case "[ELEMENT]":
                            var style = document.createElement('style');
                            style.innerHTML = `${styleArgs[1]} { ${styleArgs[2]} } `;
                            document.head.appendChild(style);
                            break;
                    }
                }*/
            }
        }
    }
}

var shit = new MDCreator("./test.md");
async function agendasGen(){
    let baseContent = document.getElementById('baseContent')
    baseContent.classList.add('agendasGrid')

    let headersLine = document.createElement('div')
    let contentsLine = document.createElement('div')

    headersLine.classList.add('timeSect')

    baseContent.appendChild(headersLine)
    baseContent.appendChild(contentsLine)

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let fitter = document.createElement('div')
    fitter.classList.add('fitCt')
    headersLine.appendChild(fitter)

    let todayHeader = document.createElement('div')
    todayHeader.classList.add('todayHeader')
    todayHeader.textContent = `Today is ${days[new Date().getDay()]}, ${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}.`
    fitter.appendChild(todayHeader)

    let timeHeader = document.createElement('div')
    timeHeader.classList.add('timeHeader')
    timeHeader.id = 'timeHeader'
    fitter.appendChild(timeHeader)

    let overview = document.createElement('div')
    overview.classList.add('agendasOverview')
    headersLine.appendChild(overview)

    let exampleText = document.createElement('div')
    exampleText.innerHTML = `<span>3 tasks due today</span><br><strong>1 remaining</strong>`
    overview.appendChild(exampleText)

    contentsLine.classList.add('plannerSect')

    // Basic planner stuff that i'll procrastinate on

    let leftAligner = document.createElement('div')
    leftAligner.classList.add('leftAligner')
    contentsLine.appendChild(leftAligner)

    let controlBar = document.createElement('div')
    controlBar.classList.add('agendasControlBar')
    controlBar.id = 'controlBar'
    leftAligner.appendChild(controlBar)

    let leftSect = document.createElement('div')
    leftAligner.appendChild(leftSect)

    leftSect.classList.add('leftSect')

    let rightSect = document.createElement('div')
    contentsLine.appendChild(rightSect)
    rightSect.classList.add('rightSect')

    let addItemButton = document.createElement('div')
    addItemButton.classList.add('addItemButton')
    addItemButton.id = 'addItemButton'
    addItemButton.classList.add('contextMenuOpen')
    addItemButton.innerHTML = `<div style="text-align: center" " "><span style="font-size: clamp(2px, 5vw, 123px)">+</span><br><span>Add Task /<br>Event</span></div>`

    addItemButton.addEventListener('click', () => {
        getResultsFromContextMenu(["name", "eventType", "subjectOfChoice", 'date', 'time'], "Create new Task or Event", ["", "", "", "", ""]).then(
            (data) => {

                if(data[2] !== "General Purpose"){
                    JSON.parse(localStorage.getItem('swcClasses')).forEach((item, index) => {
                        if(item.name = data[2])
                    })
                }

            }
        )
    })

    addItemButton.querySelectorAll("*").forEach((element) => {element.classList.add('contextMenuOpen')})

    let label = document.createElement('div')
    label.classList.add('agendasControlBarText')
    label.textContent = "Select a time range: "
    controlBar.appendChild(label)

    rightSect.appendChild(addItemButton);

  ["1 Day", "1 Week", "2 Weeks", "1 Month", "6 Months", "All Time"].forEach(type => {
        let clickable = document.createElement('div')
        clickable.classList.add('agendasControlButton')

        clickable.id = 'clickable-' + type

        clickable.textContent = type

        controlBar.appendChild(clickable)

    })

    // Are we excited? LKJASLDIOQWDJQWDAJSOLIDJQWIO AGENDAS OIJQAWOIDQJDJQOIDQWJ YEAHHHHHHHHHHH IOQWJDQWIOQDJQWIODI D WOOO

    if(localStorage.getItem('swcAgendas') == null) {
        localStorage.setItem('swcAgendas', JSON.stringify([
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [], // classes ^
            [] // general purpose
        ]))
    }



}
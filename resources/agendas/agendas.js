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

    let todayHeader = document.createElement('div')
    todayHeader.classList.add('todayHeader')
    todayHeader.textContent = `Today is ${days[new Date().getDay()]}, ${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}.`
    headersLine.appendChild(todayHeader)

    let timeHeader = document.createElement('div')
    timeHeader.classList.add('timeHeader')
    timeHeader.id = 'timeHeader'
    headersLine.appendChild(timeHeader)

    contentsLine.classList.add('plannerSect')

}
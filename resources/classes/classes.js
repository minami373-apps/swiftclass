async function classGen(custom){
    try{
    // baseContent.classList.add('classesGrid')

    let sub1 = document.createElement('div')
    let sub2 = document.createElement('div')

    sub1.id = 'sub1'
    sub2.id = 'sub2'

    // baseContent.appendChild(sub1)
    baseContent.appendChild(sub2)

    //////////////////


    if(localStorage.getItem('swcClasses') == null){
        localStorage.setItem('swcClasses', JSON.stringify([
            {
                "name": "Example Class",
                "teacher": "SwiftClass Developers",
                "color": "#FFFFFF",
                "link": "https://swiftclass.app",
                "block": "1"
            }
        ]))
    }

    let classes = JSON.parse(localStorage.getItem('swcClasses'))

    let periods = Number(extractSetting('Number of Available Periods'))

    for(i=0; i<3; i++){
        let track = document.createElement('div')
        track.classList.add("classTrack")
        track.id = 'track' + String(i+1)
        sub2.appendChild(track)
    }

    for(let i = 0; i < periods; i++) {
        let classPane = document.createElement('div')
        if (JSON.stringify(classes[i]) === '{}') {
            classPane.classList.add('classPane')
            classPane.classList.add('contextMenuOpen')
            classPane.classList.add('addClass')
            classPane.style.backgroundColor = "#FFFFFFCA"
            if (i < 4) {
                document.getElementById('track1').appendChild(classPane)
            } else if (i < 8) {
                document.getElementById('track2').appendChild(classPane)
            } else {
                document.getElementById('track3').appendChild(classPane)
            }

            let plusSign = document.createElement('span')
            plusSign.classList.add('classPlusSign')
            plusSign.classList.add('contextMenuOpen')
            plusSign.textContent = "+"
            classPane.appendChild(plusSign)

            let sideText = document.createElement('span')
            sideText.classList.add('addClassText')
            sideText.classList.add('contextMenuOpen')
            sideText.textContent = "Add a class for Period " + String(i + 1)
            classPane.appendChild(sideText)

            classPane.dataset.period = i + 1

            classPane.addEventListener('click', (event) => {
                window.classToAdd = event.currentTarget.dataset.period - 1

                let newClass = getResultsFromContextMenu([
                        'name',
                        'teacher',
                        'link',
                        'color'
                    ],
                    'Class Creator',
                    ['', '', '', '#FFFFFF'])
                newClass.then((newClass) => {
                    let jsonRead = localStorage.getItem('swcClasses')
                    console.log(window.classToAdd)
                    jsonRead = JSON.parse(jsonRead)
                    jsonRead[window.classToAdd] = {
                        "name": newClass[0],
                        "teacher": newClass[1],
                        "link": newClass[2],
                        "color": newClass[3]
                    }
                    localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
                    updateMenus()
                })
            })
        } else {
            let classPane = document.createElement('div')
            classPane.classList.add('classPane')
            let c = classes[i]
            classPane.style.backgroundColor = c.color + 'AA'

            let redvalue = EightBitHexToDecimal(c.color.slice(1, 3))
            let greenvalue = EightBitHexToDecimal(c.color.slice(3, 5))
            let bluevalue = EightBitHexToDecimal(c.color.slice(-2))
            let average = ((redvalue + greenvalue + bluevalue) / 3)

            let textColor = '#FFFFFF'

            if (average > 180) {
                textColor = '#000000'
            }
            else {
                textColor = '#FFFFFF'
            }
            console.log(textColor)

            let classHeader = document.createElement('div')
            classHeader.classList.add('classHeader')
            classHeader.textContent = c.name
            classHeader.style.color = textColor
            classPane.appendChild(classHeader)

            let classTeacher = document.createElement('span')
            classTeacher.classList.add('classSubHeader')
            classTeacher.textContent = "With " + c.teacher
            classTeacher.style.color = textColor
            classPane.appendChild(classTeacher)

            let classPeriod = document.createElement('span')
            classPeriod.classList.add('classPeriod')
            classPeriod.textContent = "Period " + String(i + 1)
            classPeriod.style.color = textColor + "CE"
            classPane.appendChild(classPeriod)

            // Actual Buttons

            let subTrack = document.createElement('span')
            subTrack.classList.add('subTrack')
            classPane.appendChild(subTrack)

            let buttonsTrack = document.createElement('div')
            buttonsTrack.classList.add('buttonsTrack')
            subTrack.appendChild(buttonsTrack)

            let jumpToLinkButton = document.createElement('div')
            jumpToLinkButton.classList.add('trackButton')
            jumpToLinkButton.textContent = "Class Page"
            buttonsTrack.appendChild(jumpToLinkButton)
            jumpToLinkButton.addEventListener('click', (event) => {
                window.open(c.link)
            })

            let notesButton = document.createElement('div')
            notesButton.classList.add('trackButton')
            notesButton.textContent = "Open Notes"
            buttonsTrack.appendChild(notesButton)

            console.log(custom)

            if(custom !== undefined) {
                console.log(custom.period)
                if (custom.period == i) {
                    console.log("THEN DO ADLOKJw")
                    setTimeout(() => {notesButton.click()}, 100)
                }
            }

            window.notesOff = false

            notesButton.addEventListener('click', (event) => {

                if(window.notesOff) return

                window.notesOff = true

                setTimeout(() => {notesOff = false}, 1000)

                document.querySelectorAll('.classPane').forEach(async (c)=>{
                    c.classList.add('hideAway')
                    c.classList.add('cleanTransition')
                    await wait(800)
                    c.style.display = 'none'
                })

                let returnButton = document.createElement('div')
                returnButton.classList.add('returnButton')
                returnButton.textContent = "Return"
                setTimeout(() => {
                returnButton.addEventListener('click', async (event) => {

                    document.querySelectorAll('.classPane').forEach(async (c) => {
                        c.style.display = ''

                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => c.classList.remove('hideAway'));
                        });

                        await wait(800)
                        c.classList.remove('cleanTransition')
                    })

                    document.getElementById('notesBase').style.opacity = '0'
                    returnButton.style.opacity = '0'

                    await wait(300)

                    returnButton.remove()
                    document.getElementById('notesBase').remove()
                })

                if(document.getElementsByClassName('returnButton').length == 0){
                    returnButton.style.opacity = '0'
                    baseContent.appendChild(returnButton)
                    setTimeout(() => {
                        requestAnimationFrame(() => {returnButton.style.opacity = '1'})
                    }, 300)
                }

            }, 400)

            generateNotes(i)

            })

            let editButton = document.createElement('div')
            editButton.classList.add('trackButton')
            editButton.classList.add('contextMenuOpen')
            editButton.textContent = "Edit Class"
            buttonsTrack.appendChild(editButton)
            editButton.addEventListener('click', (event) => {
                let classToAdd = getResultsFromContextMenu([
                    'name',
                    'teacher',
                    'link',
                    'color'
                ],
                    'Edit Class',
                    [
                        c.name,
                        c.teacher,
                        c.link,
                        c.color
                    ]).then((newClass) => {
                        let jsonRead = JSON.parse(localStorage.getItem('swcClasses'))

                        jsonRead[i] = {
                            "name": newClass[0],
                            "teacher": newClass[1],
                            "link": newClass[2],
                            "color": newClass[3]
                        }

                        localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
                        updateMenus()
                })
            })

            let deleteButton = document.createElement('div')
            deleteButton.classList.add('trackButton')
            deleteButton.textContent = "Delete Class"
            buttonsTrack.appendChild(deleteButton)
            deleteButton.addEventListener('click', (event) => {
                if(!confirm("Are you sure you want to delete this class? This will not remove the links associated with the period.")) return
                let jsonRead = JSON.parse(localStorage.getItem('swcClasses'))
                jsonRead[i] = {}
                localStorage.setItem('swcClasses', JSON.stringify(jsonRead))
                updateMenus()
            })

            if (i < 4) {
                document.getElementById('track1').appendChild(classPane)
            } else if (i < 8) {
                document.getElementById('track2').appendChild(classPane)
            } else {
                document.getElementById('track3').appendChild(classPane)
            }
        }
    }
}catch(e){
    alert('abc')
}


document.querySelectorAll('.classPane').forEach(async (element) => {
    element.style.opacity = '0'
})

document.querySelectorAll('.classPane').forEach(async (element, index) => {
    setTimeout(() => {
        element.style.opacity = '1'
    }, 100 * index + 1)
})

}

async function generateNotes(period){

    /*
    
    swcNotes local storage syntax:
    main list [
    each class has a list []
    ]

    */

    if(localStorage.getItem('swcNotes') == null){

        localStorage.setItem("swcNotes", JSON.stringify(
            [
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
                []
            ]
        ))
    }

    await wait(300)

    let notesBase = document.createElement('section')
    notesBase.classList.add('notesBase')
    notesBase.id = "notesBase"
    baseContent.appendChild(notesBase)

    let notesHeader = document.createElement('div')
    notesHeader.classList.add('notesMainHeader')
    notesHeader.textContent = "Your notes taken for " + JSON.parse(localStorage.getItem('swcClasses'))[period].name + ":"
    notesBase.appendChild(notesHeader)

    let lineBreak = document.createElement('div')
    lineBreak.classList.add('lineBreak')
    lineBreak.style.backgroundColor = "rgb(var(--c3))"
    lineBreak.style.width = '98%'
    lineBreak.style.marginLeft = "1%"
    notesBase.appendChild(lineBreak)

    let collectiveObject = JSON.parse(localStorage.getItem('swcNotes'))

    if(collectiveObject[period].length == 0){
        let creatorHeader = document.createElement('div')
        creatorHeader.classList.add('notesSecondaryHeader')
        creatorHeader.textContent = "You have no note pages for this class. Use the button below to create some!"
        notesBase.appendChild(creatorHeader)
    }
    else
    {
        // the fun part, keep in mind this is notes and not classes, i just bundled it with classes.js

        collectiveObject[period].forEach((element, index) => {
            let baseButton = document.createElement('div')
            baseButton.classList.add('noteClickable')
            baseButton.textContent = element.name
            notesBase.appendChild(baseButton)
            baseButton.classList.add('contextMenuOpen')

            let buttonTrack = document.createElement('div')
            buttonTrack.classList.add('controlTrack')
            buttonTrack.classList.add("contextMenuOpen")
            baseButton.appendChild(buttonTrack)

            let removeButton = document.createElement('div')
            removeButton.classList.add('removalButton')
            removeButton.classList.add("contextMenuOpen")
            removeButton.innerHTML = `<i class="fa-solid fa-x contextMenuOpen"></i>`
            buttonTrack.appendChild(removeButton)

            removeButton.addEventListener('click', (event) => {
                event.stopPropagation()

                if(!confirm("Do you want to delete this note page?")) return

                collectiveObject[period].splice(index, 1)
                localStorage.setItem('swcNotes', JSON.stringify(collectiveObject))
                updateMenus({relatedMenu: "Notes", period: period})

            })

            let editButton = document.createElement('div')
            editButton.classList.add('removalButton')
            editButton.classList.add("contextMenuOpen")
            editButton.innerHTML = `<i class="fa-solid fa-pencil contextMenuOpen"></i>`
            buttonTrack.appendChild(editButton)

            editButton.addEventListener('click', (event) => {

                    event.stopPropagation()

                    getResultsFromContextMenu(["name"], "Edit Page Name", [element.name]).then((data) => {

                        collectiveObject[period][index].name = data[0]

                        localStorage.setItem('swcNotes', JSON.stringify(collectiveObject))
                        updateMenus({relatedMenu: "Notes", period: period})
                })
            })

            // Base Button Event

            baseButton.addEventListener('click', async (event) => {
                event.stopPropagation()

                collectiveObject = JSON.parse(localStorage.getItem('swcNotes'))

                let menu = new ContextMenu(["textarea"], element.name, [element.content], '')
                menu.build()

                let stupidBlocker = document.createElement('div')
                stupidBlocker.classList.add('notesDenial')
                document.body.appendChild(stupidBlocker)

                document.addEventListener('click', closeMenuOnMouse)
                document.addEventListener('keydown', closeMenuOnEsc)

                while(window.contextMenuActive){
                    console.log(window.contextMenuActive)
                    await wait(30)

                    collectiveObject[period][index].content = menu.data[0]
                    if(menu.data[0] !== null) localStorage.setItem('swcNotes', JSON.stringify(collectiveObject))
                }

                document.removeEventListener('click', closeMenuOnMouse)
                document.removeEventListener('keydown', closeMenuOnEsc)
                stupidBlocker.remove()
                updateMenus({relatedMenu: "Notes", period: period})
            })

        })
    }

    let addNoteButton = document.createElement('div')
    addNoteButton.classList.add('addNoteButton')
    addNoteButton.classList.add('contextMenuOpen')
    addNoteButton.textContent = "Add Note Page"
    addNoteButton.addEventListener('click', (event) => {

        getResultsFromContextMenu(["name"], "Note Page Name", [""]).then((data) => {
            let invalid = false
            collectiveObject[period].forEach((element) => {
                if(!invalid) {
                    if (element.name == data[0]) {
                        alert("You can't create two note pages with the same name.")
                        invalid = true
                    }
                }
            })

            if(invalid) return

            collectiveObject[period].push(
                {name: data[0], content: ""}
            )
            localStorage.setItem('swcNotes', JSON.stringify(collectiveObject))
            updateMenus({relatedMenu: "Notes", period: period})
        })

    })
    notesBase.appendChild(addNoteButton)

    notesBase.style.opacity = '0'

    setTimeout(() => { notesBase.style.opacity = '1' }, 300)
}
function linksGen(...args) {

    let linksJSON = JSON.parse(localStorage.getItem('swcLinks'))
    let classHeaders = JSON.parse(localStorage.getItem('swcClasses'))


    if(localStorage.getItem('swcLinks') == null){
        localStorage.setItem('swcLinks', JSON.stringify([
            [
                [1, []],
                [2, []],
                [3, []],
                [4, []],
                [5, []],
                [6, []],
                [7, []],
                [8, []],
                [9, []],
                [10, []],
                [11, []],
                [12, []]
            ],
            []
        ]))
    }

    linksJSON = JSON.parse(localStorage.getItem('swcLinks'))

    localStorage.setItem('swcLinks', JSON.stringify(linksJSON))

    linksJSON = JSON.parse(localStorage.getItem('swcLinks'))

    let baseContent = document.getElementById('baseContent')

    baseContent.classList.add('linksGrid')

    let headersTab = document.createElement('div')
    headersTab.classList.add('headersTab')
    headersTab.classList.add('linkPart')
    baseContent.appendChild(headersTab)

    let sectorB = document.createElement('div')
    sectorB.classList.add('sectorB')
    baseContent.appendChild(sectorB)
    
    let commonTabMain = document.createElement('div')
    commonTabMain.classList.add('commonTabMain')
    commonTabMain.classList.add('linkPart')
    sectorB.appendChild(commonTabMain)

    let commonTabText = document.createElement('span')
    commonTabText.textContent = 'Common Links'
    commonTabText.classList.add('commonTabText')
    commonTabMain.appendChild(commonTabText)

    let commonTab = document.createElement('div')
    commonTab.classList.add('commonTab')
    commonTab.classList.add('linkPart')
    commonTabMain.appendChild(commonTab)

    let linksTab = document.createElement('div')
    linksTab.classList.add('linksTab')
    linksTab.classList.add('linkPart')
    sectorB.appendChild(linksTab)

    let sectionBigHeader = document.createElement('span')
    sectionBigHeader.textContent = 'Use the tab on the left to open a section.'
    sectionBigHeader.id = 'sectionBigHeader'
    sectionBigHeader.classList.add('sectionBigHeader')
    linksTab.appendChild(sectionBigHeader)

    // such a long setup. now I can do the juicy stuff

    let classSectorHeader = document.createElement('span')
    classSectorHeader.textContent = 'Class Sections'
    classSectorHeader.classList.add('classSectorHeader')
    headersTab.appendChild(classSectorHeader)

    let lineBreak = document.createElement('div')
    lineBreak.classList.add('lineBreak')
    lineBreak.style.marginLeft = '1%'
    lineBreak.style.marginRight = '2%'
    lineBreak.style.width = '96%'
    headersTab.appendChild(lineBreak)

    for(i=0; i < Number(extractSetting("Number of Available Periods"));i++){
        let element = classHeaders[i]

        let e = document.createElement('div')
        e.classList.add('linksHeader')
        e.classList.add('linksClassHeader')

        if (element.color == undefined) {
            e.style.backgroundColor = '#FFFFFFAA'
            e.style.color = '#000000'
            e.style.cursor = 'not-allowed'
        } else {
            e.style.backgroundColor = element.color + 'AA'
            e.dataset.period = i

        }

        if (element.name == undefined) {
            e.textContent = 'Unset Class'
        } else {
            e.textContent = element.name
            e.classList.add('usable')
            e.addEventListener('click', (event) => {
                document.getElementById('sectionBigHeader').textContent = 'Links used in ' + element.name + ":"
                window.linksOpen = element.name

                window.sectionType = 'class'
                window.linkPeriod = Number(event.currentTarget.dataset.period)

                let classLinks = linksJSON[0][event.currentTarget.dataset.period]
                if(typeof classLinks[0] == "number") classLinks.splice(0, 1)
                console.log(classLinks[0])

                while(linksTab.firstChild !==  linksTab.lastChild){
                    linksTab.removeChild(linksTab.lastChild)
                }

                linksTab.appendChild(document.createElement('br'))

                if(classLinks[0].length == 0){
                    let noLinksText = document.createElement('span')
                    noLinksText.textContent = "This class's section has no links. Use the button below to add one."
                    noLinksText.classList.add('noLinksText')
                    linksTab.appendChild(noLinksText)
                }

                classLinks[0].forEach((link) => {
                    let linkClickable = document.createElement('div')
                    linkClickable.classList.add('linkClickable')
                    linkClickable.textContent = link.name
                    linkClickable.addEventListener('click', (event) => {
                        window.open(link.link)
                    })

                    let controlTrack = document.createElement('div')
                    controlTrack.classList.add('controlTrack')
                    linkClickable.appendChild(controlTrack)

                    let removalButton = document.createElement('div')
                    removalButton.classList.add('removalButton')
                    removalButton.innerHTML = '<i class="fa-solid fa-x contextMenuOpen"></i>'
                    controlTrack.appendChild(removalButton)

                    let editButton = document.createElement('div')
                    editButton.classList.add('removalButton')
                    editButton.innerHTML = '<i class="fa-solid fa-pencil contextMenuOpen"></i>'
                    controlTrack.appendChild(editButton)

                    editButton.addEventListener('click', (event) => {
                        event.stopPropagation()
                        let newLink = getResultsFromContextMenu(["name", "link"], "Edit Link", [link.name, link.link])
                            newLink.then((newLink) => {
                                let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
                                jsonRead[0][window.linkPeriod][1].forEach((element, index) => {
                                    if (element.name == link.name) {
                                        jsonRead[0][window.linkPeriod][1][index].name = newLink[0]
                                        jsonRead[0][window.linkPeriod][1][index].link = newLink[1]
                                        localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                                    }
                                    updateMenus({"relatedMenu": "Links", "header": window.linksOpen})
                                })
                            })
                    })

                    removalButton.addEventListener('click', (event) => {
                        event.stopPropagation()
                        if(!confirm("Are you sure you want to remove this link?")) return
                        let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
                        jsonRead[0][window.linkPeriod][1].forEach((element, index) => {
                            if (element.name == link.name) {
                                jsonRead[0][window.linkPeriod][1].splice(index, 1)
                                localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                            }
                            updateMenus({"relatedMenu": "Links", "header": window.linksOpen})
                        })
                    })
                    linksTab.appendChild(linkClickable)
                })

                let lineBreak = document.createElement('div')
                lineBreak.classList.add('lineBreak')
                lineBreak.style.margin = '1%'
                lineBreak.style.width = '98%'
                linksTab.appendChild(lineBreak)

                let addLinkButton = document.createElement('div')
                addLinkButton.classList.add('addLinkButton')
                addLinkButton.classList.add('contextMenuOpen')

                addLinkButton.textContent = "Add Link"

                linksTab.appendChild(addLinkButton)

                addLinkButton.addEventListener('click', (event) => {

                    let newLink = getResultsFromContextMenu(["name", "link"], "Add Link", [])

                    newLink.then((newLink) => {

                        let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))

                        jsonRead[0][window.linkPeriod][1].push(
                            {
                                "name": newLink[0],
                                "link": newLink[1]
                            }
                        )

                        localStorage.setItem("swcLinks", JSON.stringify(jsonRead))
                        updateMenus({"relatedMenu": "Links", "header": window.linksOpen})
                    })

                })
            })
        }   

        headersTab.appendChild(e)
    }

    let otherHeader = document.createElement('span')
    otherHeader.textContent = 'Other Sections'
    otherHeader.classList.add('classSectorHeader')
    headersTab.appendChild(otherHeader)

    let lineBreak2 = document.createElement('div')
    lineBreak2.classList.add('lineBreak')
    lineBreak2.style.marginLeft = '1%'
    lineBreak2.style.marginRight = '2%'
    lineBreak2.style.width = '96%'
    headersTab.appendChild(lineBreak2)

    linksJSON[1].forEach((section) => {
        let header = section[0]
        let links = section[1]
        console.log(header)

        let e = document.createElement('div')
        e.classList.add('linksHeader')
        e.classList.add('traditionalLinkHeader')
        e.classList.add('otherSectionHeader')
        e.textContent = header
        headersTab.appendChild(e)

        e.addEventListener('click', (event) => {
            window.sectionBigHeader.textContent = "Links used in " + e.textContent + ":"
            let targetHeader = event.currentTarget.textContent

            while(linksTab.firstChild !==  linksTab.lastChild){
                    linksTab.removeChild(linksTab.lastChild)
            }

            linksTab.appendChild(document.createElement('br'))

            if(links.length == 0){
                let noLinksText = document.createElement('span')
                noLinksText.textContent = "This section has no links. Use the button below to add one."
                noLinksText.classList.add('noLinksText')
                linksTab.appendChild(noLinksText)
            }

            links.forEach((link) => {
                let linkClickable = document.createElement('div')
                linkClickable.classList.add('linkClickable')
                linkClickable.textContent = link.name
                linkClickable.addEventListener('click', (event) => {
                    window.open(link.link)
                })

                linksTab.appendChild(linkClickable)

                let controlTrack = document.createElement('div')
                controlTrack.classList.add('controlTrack')
                linkClickable.appendChild(controlTrack)

                let removalButton = document.createElement('div')
                removalButton.classList.add('removalButton')
                removalButton.classList.add('contextMenuOpen')
                removalButton.innerHTML = '<i class="fa-solid fa-x"></i>'
                controlTrack.appendChild(removalButton)
                removalButton.addEventListener('click', (event) => {
                    event.stopPropagation()
                    if(!confirm("Are you sure you want to remove this link?")) return
                    let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
                    jsonRead[1].forEach((element, index) => {
                        if(element[0] == targetHeader){
                            element[1].forEach((linkElement, linkIndex) => {
                                if(linkElement.name == link.name){
                                    jsonRead[1][index][1].splice(linkIndex, 1)
                                    localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                                }
                            })
                        }
                    })
                    updateMenus({relatedMenu: "Links", header: targetHeader, mode: "customHeader"})
                }
                )

                let editButton = document.createElement('div')
                editButton.classList.add('removalButton')
                editButton.classList.add('contextMenuOpen')
                editButton.innerHTML = '<i class="fa-solid fa-pencil contextMenuOpen"></i>'
                controlTrack.appendChild(editButton)

                editButton.addEventListener('click', (event) => {
                    event.stopPropagation()
                    let newLink = getResultsFromContextMenu(["name", "link"], "Edit Link", [link.name, link.link])

                    newLink.then((newLink) => {
                        let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))

                        jsonRead[1].forEach((element, index) => {
                            if(element[0] == targetHeader){
                                element[1].forEach((linkElement, linkIndex) => {
                                    if(linkElement.name == link.name){
                                        jsonRead[1][index][1][linkIndex].name = newLink[0]
                                        jsonRead[1][index][1][linkIndex].link = newLink[1]
                                        localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                                    }
                                })
                            }
                        })
                        updateMenus({relatedMenu: "Links", header: targetHeader, mode: "customHeader"})
                    }
                    )
                })
            })

            let lineBreak = document.createElement('div')
            lineBreak.classList.add('lineBreak')
            lineBreak.style.margin = '1%'
            lineBreak.style.width = '98%'
            linksTab.appendChild(lineBreak)

            let addLinkButton = document.createElement('div')
                addLinkButton.classList.add('addLinkButton')
                addLinkButton.classList.add('contextMenuOpen')

                addLinkButton.textContent = "Add Link"

                linksTab.appendChild(addLinkButton)

                addLinkButton.addEventListener('click', (event) => {

                    let newLink = getResultsFromContextMenu(["name", "link"], "Add Link", [])

                    newLink.then((newLink) => {

                        let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))

                        jsonRead[1].forEach((element, index) => {
                            if(element[0] == targetHeader)
                            {
                                jsonRead[1][index][1].push(
                                    {
                                        "name": newLink[0],
                                        "link": newLink[1]
                                    }
                                )
                            }
                        })

                        console.log(jsonRead)
                        localStorage.setItem("swcLinks", JSON.stringify(jsonRead))
                        updateMenus({relatedMenu: "Links", header: targetHeader, mode: "customHeader"})
                    })

                })            
        })

        let controlTrack = document.createElement('div')
        controlTrack.classList.add('controlTrack')
        e.appendChild(controlTrack)

        let removalButton = document.createElement('div')
        removalButton.classList.add('removalButton')
        removalButton.classList.add('contextMenuOpen')
        removalButton.innerHTML = '<i class=\"fa-solid fa-x\"></i>'
        controlTrack.appendChild(removalButton)
        removalButton.addEventListener('click', (event) => {
            event.stopPropagation()
            if(!confirm("Are you sure you want to remove this section?")) return
            let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
            jsonRead[1].forEach((element, index) => {
                if(element[0] == header){
                    jsonRead[1].splice(index, 1)
                    localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                }
            })
            updateMenus()
        })

        let editButton = document.createElement('div')
        editButton.classList.add('removalButton')
        editButton.classList.add('contextMenuOpen')
        editButton.innerHTML = '<i class="fa-solid fa-pencil contextMenuOpen"></i>'
        controlTrack.appendChild(editButton)
        editButton.addEventListener('click', () => {
            let newHeader = getResultsFromContextMenu(["name"], "Edit Section", [header])
            newHeader.then((newHeader) => {
                let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
                jsonRead[1].forEach((element, index) => {
                    if(element[0] == header){
                        jsonRead[1][index][0] = newHeader[0]
                        localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
                    }
                })
                updateMenus({relatedMenu: "Links", header: newHeader[0], mode: "customHeader"})
            })
        })
    })

    let addHeaderButton = document.createElement('div')
    addHeaderButton.classList.add('addHeaderButton')
    addHeaderButton.classList.add('contextMenuOpen')
    addHeaderButton.textContent = "Add Section"
    headersTab.appendChild(addHeaderButton)
    addHeaderButton.addEventListener('click', (event) => {
        let newHeader = getResultsFromContextMenu(["name"], "Add Section", [])

        newHeader.then((newHeader) => {
            let otherFound = false
            let jsonRead = JSON.parse(localStorage.getItem('swcLinks'))
            
            jsonRead[1].forEach((element, index) => {
                if(element[0] == newHeader[0]) otherFound = true
            })
        
            if(otherFound === true){
                alert('There is already a section with this name!')
                return
            }

            jsonRead[1].push([newHeader[0], []])
            localStorage.setItem('swcLinks', JSON.stringify(jsonRead))
            updateMenus({relatedMenu: "Links", header: newHeader[0], mode: "customHeader"})
        })
    })

    console.log('args 0: ', args[0])

    if(args[0] !== undefined && args[0].mode == undefined){
        document.querySelectorAll('.linksClassHeader').forEach((element) => {
            if(element.textContent == args[0].header){
                element.click()
            }
        })
    }

    if(args[0] !== undefined && args[0].mode == "customHeader"){
        document.querySelectorAll('.otherSectionHeader').forEach((element) => {
            if(element.textContent == args[0].header){
                element.click()
            }
        })
    }

    // Now, common links. That mess is done

    if(localStorage.getItem('swcCommonLinks') == null){
        localStorage.setItem(
            'swcCommonLinks', JSON.stringify
            (
            [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {}
            ]
            )
    )
    }

    let commonLinks = JSON.parse(localStorage.getItem('swcCommonLinks'))
    let commonLinkContainer = document.getElementsByClassName('commonTab')[0]

    for(let i = 0;i < 8;i++){
        
        let clickable = document.createElement('div')
        clickable.classList.add('commonLinkClickable')
        commonLinkContainer.appendChild(clickable)

        if(commonLinks[i].name == undefined){
            clickable.innerHTML = '<i class="fa-solid fa-pencil contextMenuOpen"></i>'
            clickable.style.fontSize = '4vmin'
            clickable.classList.add('flexCenter')

            clickable.addEventListener('click', (event) => {

                let newLink = getResultsFromContextMenu(["name", "link"], "Add Link", [])

                newLink.then((newLink) => {

                    let jsonRead = JSON.parse(localStorage.getItem('swcCommonLinks'))
                    jsonRead[i] = {
                        "name": newLink[0],
                        "link": newLink[1]
                    }

                    localStorage.setItem("swcCommonLinks", JSON.stringify(jsonRead))
                    updateMenus()
                    
                })

            })
        }
        else
        {
            clickable.textContent = commonLinks[i].name
            clickable.addEventListener('click', (event) => {
                window.open(commonLinks[i].link)
            })   

            let controlTrack = document.createElement('div')
            controlTrack.classList.add('controlTrack')
            controlTrack.classList.add('altTrack')
            clickable.appendChild(controlTrack)

            let editButton = document.createElement('div')
            editButton.classList.add('removalButton')
            editButton.classList.add('altEdit')
            editButton.classList.add('contextMenuOpen')
            editButton.innerHTML = '<i class="fa-solid fa-pencil contextMenuOpen"></i>'

            editButton.addEventListener('click', (event) => {
                event.stopPropagation()
                let newLink = getResultsFromContextMenu(["name", "link"], "Edit Link", [commonLinks[i].name, commonLinks[i].link])
                
                newLink.then((newLink) => {
                    let jsonRead = JSON.parse(localStorage.getItem('swcCommonLinks'))
                    jsonRead[i] = {
                        "name": newLink[0],
                        "link": newLink[1]
                    }

                    localStorage.setItem("swcCommonLinks", JSON.stringify(jsonRead))
                    updateMenus() 
                })
            })

            let removalButton = document.createElement('div')
            removalButton.classList.add('removalButton')
            removalButton.classList.add('altEdit')
            
            removalButton.addEventListener('click', (event) => {
                event.stopPropagation()

                if(!confirm("Are you sure you want to remove this link?")) return

                let jsonRead = JSON.parse(localStorage.getItem('swcCommonLinks'))
                jsonRead[i] = {}
                localStorage.setItem("swcCommonLinks", JSON.stringify(jsonRead))
                updateMenus() 
            })

            removalButton.innerHTML = '<i class="fa-solid fa-x"></i>'
            controlTrack.appendChild(removalButton)
            controlTrack.appendChild(editButton)

        }
    }
}
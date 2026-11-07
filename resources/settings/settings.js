class Setting {
    constructor(name, value, type, description, header, types, minval, maxval, selectors) {
        this.name = name
        this.value = value
        this.type = type
        this.description = description
        this.header = header
        this.types = types
        this.minval = minval
        this.maxval = maxval
        this.selectors = selectors

        // adding the setting to the "baseContent" element

        // verifying types FIRST

        if (!['bool', 'dropdown', 'color', 'slider', 'text', 'background', '!ignore'].includes(this.type)) {
            throw new Error("Invalid type: " + this.type)
        }

        // verifying there are no duplicates

        if (document.getElementById(this.name) != null) throw new Error("Duplicate ID: " + this.name)
    }

    render() {
        try {
            // console.log("Rendering setting: " + this.name)
            if (this.type == 'bool') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')

                t.classList.add('boolHeader')

                t.textContent = this.name

                let i = document.createElement('div')

                i.dataset.imgSource = 'resources/svg/setting/' + this.value + '.png'

                i.classList.add('boolImageContainer')

                let img = document.createElement('img')

                img.src = i.dataset.imgSource

                i.appendChild(img)

                img.classList.add('boolImage')


                i.addEventListener('click', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    if (this.value == 'off') {
                        this.value = 'on'
                    } else {
                        this.value = 'off'
                    }

                    let settingsLoad = localStorage.getItem('swcsettings')

                    settingsLoad = JSON.parse(settingsLoad)

                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value

                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))

                    event.currentTarget.children[0].src = 'resources/svg/setting/' + this.value + '.png'
                });

                let d = document.createElement('span')

                d.textContent = this.description

                document.getElementById('baseContent').appendChild(b)

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(d)
            } else if (this.type == 'color') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let i = document.createElement('input')
                i.type = 'color'
                i.value = this.value

                i.classList.add('colorInput')

                if(this.name == "Somewhat Bright Elements"){
                    i.style.backgroundColor = "rgb(var(--c1))"
                }

                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    this.value = event.currentTarget.value
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                });

                let d = document.createElement('span')
                d.textContent = this.description

                document.getElementById('baseContent').appendChild(b)

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(document.createElement('br'))

                b.appendChild(d)

            } else if (this.type == 'slider') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let v = document.createElement('span')
                v.classList.add('valueDisplay')
                v.textContent = this.value

                let i = document.createElement('input')
                i.type = 'range'
                i.value = this.value
                i.min = this.minval
                console.log(this.maxval)
                console.log(this.minval)
                i.max = this.maxval

                i.classList.add('sliderInput')

                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    this.value = event.currentTarget.value
                    v.textContent = this.value
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = this.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })

                let d = document.createElement('span')
                d.textContent = this.description

                b.appendChild(t)
                b.appendChild(document.createElement('br'))
                b.appendChild(v)
                b.appendChild(document.createElement('br'))
                b.appendChild(i)
                b.appendChild(document.createElement('br'))
                b.appendChild(d)

                document.getElementById('baseContent').appendChild(b)
            } else if (this.type == 'dropdown') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name

                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name

                let i = document.createElement('select')
                i.classList.add('dropdownInput')

                this.selectors.forEach((element) => {
                    let option = document.createElement('option')
                    option.value = element
                    option.textContent = element
                    i.appendChild(option)
                });

                i.value = this.value

                i.addEventListener('change', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }
                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = event.currentTarget.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })

                let d = document.createElement('span')
                d.textContent = this.description

                b.appendChild(t)

                b.appendChild(document.createElement('br'))

                b.appendChild(i)

                b.appendChild(document.createElement('br'))

                b.appendChild(d)

                document.getElementById('baseContent').appendChild(b)
            }
            else if (this.type == 'text') {
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name
                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name
                let i = document.createElement('input')
                i.type = 'text'
                i.value = this.value
                i.classList.add('textInput')
                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){}
                })
                i.addEventListener('input', (event) => {
                    let reloadButton = document.querySelector('.reloadButton')
                    if(!reloadButton.classList.contains('reloadPulse')){
                        reloadButton.classList.add('reloadPulse')
                    }

                    let settingsLoad = localStorage.getItem('swcsettings')
                    settingsLoad = JSON.parse(settingsLoad)
                    settingsLoad[settingsLoad.indexOf(this.name) + 1] = event.currentTarget.value
                    localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                })
                let d = document.createElement('span')
                d.textContent = this.description
                b.appendChild(t)
                b.appendChild(document.createElement('br'))
                b.appendChild(i)
                b.appendChild(document.createElement('br'))
                b.appendChild(d)
                document.getElementById('baseContent').appendChild(b)
            }
            else if(this.type == "background"){
                console.log('new type after 500 years')
                let b = document.createElement('div')
                b.classList.add('boolInteract')
                b.id = this.name
                let t = document.createElement('span')
                t.classList.add('boolHeader')
                t.textContent = this.name
                b.appendChild(t)
                b.appendChild(document.createElement('br'))

                let selector = document.createElement('div')
                b.appendChild(selector)
                if(extractSetting('Background Image/Color').charAt(0) == "#")
                {
                    selector.dataset.typeNow = 'col'
                }
                else
                {
                    selector.dataset.typeNow = "img"
                }
                selector.classList.add('selectorButton')

                if(selector.dataset.typeNow == 'img'){
                    selector.textContent = 'Use color for BG'
                    
                    // This should be a text input bucko

                    let i = document.createElement('input')
                    i.type = 'text'
                    i.value = extractSetting('Background Image/Color')
                    i.id = 'backgroundImageInput'

                    i.classList.add('textInput')
                    b.appendChild(i)

                    i.addEventListener('input', (event) => {
                        let reloadButton = document.querySelector('.reloadButton')
                        if(!reloadButton.classList.contains('reloadPulse')){
                            reloadButton.classList.add('reloadPulse')
                        }

                        let settingsLoad = localStorage.getItem('swcsettings')
                        settingsLoad = JSON.parse(settingsLoad)
                        settingsLoad[settingsLoad.indexOf('Background Image/Color') + 1] = event.currentTarget.value
                        localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                    })
                }
                else{
                    selector.textContent = 'Use  image for BG'

                    // This should be a color input bucko

                    let i = document.createElement('input')
                    i.type = 'color'
                    i.value = extractSetting('Background Image/Color')
                    i.id = 'backgroundColorInput'

                    i.classList.add('colorInput')
                    b.appendChild(i)

                    i.addEventListener('input', (event) => {
                        let reloadButton = document.querySelector('.reloadButton')
                        if(!reloadButton.classList.contains('reloadPulse')){
                            reloadButton.classList.add('reloadPulse')
                        }

                        let settingsLoad = localStorage.getItem('swcsettings')
                        settingsLoad = JSON.parse(settingsLoad)
                        settingsLoad[settingsLoad.indexOf('Background Image/Color') + 1] = event.currentTarget.value
                        localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                    })
                }

                selector.addEventListener('click', (event) => {
                    if(event.currentTarget.dataset.typeNow == 'img'){
                        event.currentTarget.dataset.typeNow = 'col'
                        selector.textContent = 'Use image for BG'

                        document.getElementById('backgroundImageInput').remove()
                        document.getElementById('backgroundDescription').remove()
                        document.getElementById('annoyingBreak').remove()

                        let i = document.createElement('input')
                        i.type = 'color'
                        i.value = extractSetting('Background Image/Color')
                        i.id = 'backgroundColorInput'

                        i.classList.add('colorInput')
                        b.appendChild(i)

                        let painfulBreak = document.createElement('br')
                        painfulBreak.id = 'annoyingBreak'
                        b.appendChild(painfulBreak) 

                        i.addEventListener('input', (event) => {
                            let reloadButton = document.querySelector('.reloadButton')
                            if(!reloadButton.classList.contains('reloadPulse')){
                                reloadButton.classList.add('reloadPulse')
                            }

                            let settingsLoad = localStorage.getItem('swcsettings')
                            settingsLoad = JSON.parse(settingsLoad)
                            settingsLoad[settingsLoad.indexOf('Background Image/Color') + 1] = event.currentTarget.value
                            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                            
                    })

                        let d = document.createElement('span')
                         d.id = 'backgroundDescription'
                         d.textContent = this.description

                         b.appendChild(d)
                    }
                    else{
                        event.currentTarget.dataset.typeNow = 'img'
                        selector.textContent = 'Use color for BG'

                        document.getElementById('backgroundColorInput').remove()
                        document.getElementById('backgroundDescription').remove()
                        document.getElementById('annoyingBreak').remove()

                        let i = document.createElement('input')
                        i.type = 'text'
                        i.value = extractSetting('Background Image/Color')
                        i.id = 'backgroundImageInput'

                        i.classList.add('textInput')
                        b.appendChild(i)

                        let painfulBreak = document.createElement('br')
                        painfulBreak.id = 'annoyingBreak'
                        b.appendChild(painfulBreak)

                        i.addEventListener('input', (event) => {
                            let reloadButton = document.querySelector('.reloadButton')
                            if(!reloadButton.classList.contains('reloadPulse')){
                                reloadButton.classList.add('reloadPulse')
                            }

                            let settingsLoad = localStorage.getItem('swcsettings')
                            settingsLoad = JSON.parse(settingsLoad)
                            settingsLoad[settingsLoad.indexOf('Background Image/Color') + 1] = event.currentTarget.value
                            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                        })

                         let d = document.createElement('span')
                         d.id = 'backgroundDescription'
                         d.textContent = this.description

                         b.appendChild(d)
                    }
                })

                let d = document.createElement('span')
                d.id = 'backgroundDescription'
                d.textContent = this.description

                let painfulBreak = document.createElement('br')
                painfulBreak.id = 'annoyingBreak'
                b.appendChild(painfulBreak)

                b.appendChild(d)

                document.getElementById('baseContent').appendChild(b)
            }
            else if(this.type == "!ignore")
            {
                console.warn('Ignoring setting, likely to pregenerate header ' + this.header)
            }

        } catch (e) {
            console.warn(e)
        }
    }
}

window.Setting = Setting



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GENERATOR FUNCTION


async function settingsGen(){


    let settingsList = await fetch('resources/settings/list.json')
    let settingsJSON = await settingsList.json()
    let allHeaders = []

    let headerContainer = document.createElement('div')
    headerContainer.id = 'settingsHeaderContainer'
    headerContainer.classList.add('settingsHeaderContainer')
    document.getElementById('baseContent').appendChild(headerContainer)

    for (let setting of settingsJSON) {
        if (typeof setting.header != 'undefined' && !allHeaders.includes(setting.header)) {
            allHeaders.push(setting.header)
        }
    }

    window.settingHeaderType = allHeaders[0]

    window.currentMenu = 'Settings' + ' - ' + window.settingHeaderType

    let valueType = null

    let settingsLoad = localStorage.getItem('swcsettings')

    settingsLoad = JSON.parse(settingsLoad)
    // console.log('Loaded settings: ')
    // console.log(settingsLoad)

    settingsJSON.forEach((element) => {
        // console.log(element)
        if (!settingsLoad.includes(element.name)) {
            settingsLoad.push(element.name)
            settingsLoad.push(element.value)
            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
        }
        if (element.header == window.settingHeaderType) {
            let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, String(element.minval), String(element.maxval), element.selectors)
            setting.render()
        } else {
            // console.log('not of type')
        }
    })

    let headerCont = document.getElementById('settingsHeaderContainer')

    allHeaders.forEach((item) => {
            let header = document.createElement('div')

            header.classList.add('settingsHeader')
            header.textContent = item
            header.addEventListener('click', async (event) => {

                if (window.denySettingMovement || event.currentTarget.classList.contains('deny')) {
                    return
                }

                window.settingHeaderType = event.currentTarget.textContent

                window.currentMenu = 'Settings' + ' - ' + window.settingHeaderType

                document.querySelectorAll('.footerButton').forEach(element => {
                    element.classList.add('deny')
                })

                typeMenuName(true)

                let liveChildNodes = document.getElementById('baseContent').childNodes
                if (liveChildNodes && liveChildNodes.length > 1) {
                    while (liveChildNodes.length > 1) {
                        liveChildNodes[1].remove()
                    }

                }

                let valueType = null

                let settingsLoad = localStorage.getItem('swcsettings')

                settingsLoad = JSON.parse(settingsLoad)
                // console.log('Loaded settings: ')
                // console.log(settingsLoad)
                if(header.textContent != "Import/Export") {
                    settingsJSON.forEach(async (element) => {
                        if (!settingsLoad.includes(element.name)) {
                            settingsLoad.push(element.name)
                            settingsLoad.push(element.value)
                            localStorage.setItem('swcsettings', JSON.stringify(settingsLoad))
                        }
                        if (element.header == window.settingHeaderType) {
                            let setting = new Setting(element.name, settingsLoad[settingsLoad.indexOf(element.name) + 1], element.type, element.description, element.header, element.types, element.minval, element.maxval, element.selectors)
                            setting.render()
                        }
                    })
                }
                else
                {
                    generateImportExport()
                }

                let reloadButton = document.createElement('div')
                reloadButton.classList.add('reloadButton')
                reloadButton.textContent = 'Reload the Page'
                reloadButton.addEventListener('click', () => {
                    location.reload()
                })
                document.getElementById('baseContent').appendChild(reloadButton)
            })
            headerCont.appendChild(header)
        }
    )
    let reloadButton = document.createElement('div')
    reloadButton.classList.add('reloadButton')
    reloadButton.textContent = 'Reload the Page'
    reloadButton.addEventListener('click', () => {
        location.reload()
    })
    document.getElementById('baseContent').appendChild(reloadButton)
    document.getElementById('baseContent').style.overflowY = 'auto'

}

async function generateImportExport() {

    // import first

    let b = document.createElement('div')
    b.classList.add('boolInteract')
    b.classList.add('importExportInteract')

    let i = document.createElement('span')
    i.classList.add('boolHeader')
    i.classList.add('importExportHeader')
    i.textContent = 'Import SwiftClass Instance from a SwiftClass file'

    let fileDialog = document.createElement('input')
    fileDialog.classList.add('importExportFile')
    fileDialog.type = 'file'
    fileDialog.accept = '.swc'

    fileDialog.addEventListener('change', async (event) => {
        if(fileDialog.files.length > 0){
            const data = fileDialog.files[0]

            data.text().then((data) => {
                try{
                    parse = JSON.parse(data)

                    window.activelyOpenSWC = parse

                    if(parse[0] !== "SwiftClass Instance File"){
                        throw new TypeError("Improper Structure")
                    }
                    else
                    {
                        if(document.getElementById('importButton') != null) document.getElementById('importButton').remove()

                        let importButton = document.createElement('div')
                        importButton.classList.add('exportButton')
                        importButton.classList.add('contextMenuOpen')
                        importButton.id = 'importButton'
                        importButton.textContent = 'Import SwiftClass'

                        importButton.addEventListener('click', () => {
                            getResultsFromContextMenu(['selectors'], "Choose what to import! You may want to export your instance to back it up.", [Object.keys(parse[1])], "This will overwrite whatever data is currently saved. Are you REALLY sure you want to do this? You might want to export your current save for safekeeping.").then((result) => {
                                    result[0].forEach((element, index) => {
                                        if(element){
                                            console.log('will import: ' + Object.keys(parse[1])[index])

                                            if(Object.keys(parse[1])[index] == "Settings")
                                            {
                                                localStorage.setItem('swcsettings', JSON.stringify(parse[1].Settings))
                                            }

                                            if(Object.keys(parse[1])[index] == "Classes")
                                            {
                                                localStorage.setItem('swcClasses', JSON.stringify(parse[1].Classes))
                                            }

                                            if(Object.keys(parse[1])[index] == "Links")
                                            {
                                                localStorage.setItem('swcLinks', JSON.stringify(parse[1].Links))
                                            }

                                            if(Object.keys(parse[1])[index] == "CommonLinks")
                                            {
                                                localStorage.setItem('swcCommonLinks', JSON.stringify(parse[1].CommonLinks))
                                            }

                                            if(Object.keys(parse[1])[index] == "Agendas")
                                            {
                                                localStorage.setItem('swcAgendas', JSON.stringify(parse[1].Agendas))
                                            }

                                        }
                                    })
                                })
                        })

                        b.appendChild(importButton)
                    }
                }
                catch(error) {
                    alert("This file is not structured correctly, and SwiftClass cannot decode it. Please try again with a different file.")
                }
            })
        }
    })

    let d = document.createElement('span')
    d.classList.add('importExportDesc')
    d.textContent = "Use the open file button to import in a \".swc\" file. You may then select what parts of SwiftClass to import. (eg: Links, Class, Agendas, etc.) This overwrites existing data."

    b.appendChild(i)

    let lineBreak = document.createElement('div')
    lineBreak.classList.add('lineBreak')

    b.appendChild(lineBreak)
    b.appendChild(fileDialog)
    b.appendChild(document.createElement('br'))
    b.appendChild(d)

    baseContent.appendChild(b)

    //export

    let b2 = document.createElement('div')
    b2.classList.add('boolInteract')
    b2.classList.add('importExportInteract')

    let i2 = document.createElement('span')
    i2.classList.add('boolHeader')
    i2.classList.add('importExportHeader')
    i2.textContent = 'Export your SwiftClass Instance to a SwiftClass file'

    let d2 = document.createElement('span')
    d2.className = 'importExportDesc'
    d2.textContent = "Export your current SwiftClass Instance to a SwiftClass file. This will export everything saved. You can decide what parts of SwiftClass to import."

    b2.appendChild(i2)

    let lineBreak2 = document.createElement('div')
    lineBreak2.classList.add('lineBreak')
    b2.appendChild(lineBreak2)

    let exportButton = document.createElement('div')
    exportButton.classList.add('exportButton')
    exportButton.textContent = 'Export SwiftClass'
    b2.appendChild(exportButton)

    exportButton.addEventListener('click', () => {
        if(!confirm("This will download a file to your device. Are you sure you'd like to export your instance?")) return

        let settings = JSON.parse(localStorage.getItem('swcsettings'))
        let classes = JSON.parse(localStorage.getItem('swcClasses'))
        let links = JSON.parse(localStorage.getItem('swcLinks'))
        let commonLinks = JSON.parse(localStorage.getItem('swcCommonLinks'))
        let firstTime = JSON.parse(localStorage.getItem('swcFirstTime'))
        let visited = JSON.parse(localStorage.getItem('visitedMenus'))
        let agendas = JSON.parse(localStorage.getItem('swcAgendas'))

        let chunkyJSON = ["SwiftClass Instance File"]

        chunkyJSON.push({
            Settings: settings,
            Classes: classes,
            Links: links,
            CommonLinks: commonLinks,
            Agendas: agendas,
        })

        let jsonString = JSON.stringify(chunkyJSON, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })

        const url = URL.createObjectURL(blob)

        let a = document.createElement('a')
        a.href = url

        let timestamp = new Date().toLocaleString()
        timestamp.replace(/[/,: ]/g, '-')

        a.download = timestamp + ".swc"
        a.click()

        URL.revokeObjectURL(url)
    })

    b2.appendChild(d2)

    baseContent.appendChild(b2)
}
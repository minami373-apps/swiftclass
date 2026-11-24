class ContextMenu {

    constructor(menuItems, menuType, itemValues, warning) {
        this.menuItems = menuItems
        this.menuType = menuType
        this.itemValues = itemValues
        this.warning = warning
        this.data = []
    }

    async build() {
        window.contextMenuActive = true

        try {
            let validTypes =
                [
                    'link',
                    'teacher',
                    'name',
                    'color',
                    'block',
                    'selectors',
                    'textarea',
                    'eventType',
                    'subjectOfChoice'
                ]

            this.menuItems.forEach(element => {
                if (!validTypes.includes(element)) throw new Error('Invalid type: ' + element)
            })

            if (document.getElementById('contextMenu') != null) document.getElementById('contextMenu').remove()
            let contextMenuH = document.createElement('div')
            contextMenuH.classList.add('contextMenu')
            contextMenuH.classList.add('small')
            contextMenuH.id = 'contextMenu'
            document.body.appendChild(contextMenuH)

            console.log('process 1')

            let contextMenu = document.createElement('form')
            contextMenu.classList.add('contextMenuForm')
            contextMenu.addEventListener('submit', (event) => {
                event.preventDefault()
            })
            contextMenuH.appendChild(contextMenu)

            let shortTitle = document.createElement('span')
            shortTitle.textContent = this.menuType
            shortTitle.classList.add('contextTitle')
            contextMenu.appendChild(shortTitle)

            contextMenu.appendChild(document.createElement('hr'))

            this.menuItems.forEach(element => {
                this.data.push(null)
            })

            this.data.push(false)

            this.linkIndices = []

            this.overrides = []

            // Start Generator

            this.menuItems.forEach((element, index) => {


                let e = document.createElement('input')
                let l = document.createElement('span')

                switch (element) {
                    case 'link':
                        e.type = 'text'

                        if (this.menuType.toLowerCase() == 'class') {
                            e.placeholder = 'Type in the class\'s link here. This is optional.'
                            this.overrides.push(index)
                        }
                        else e.placeholder = 'Type in the link here.'

                        e.placeholder = 'Type in the associated link here.'
                        if (typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                        e.classList.add('contextInput')
                        e.classList.add('linkInput')
                        e.id = 'linkInput'

                        this.linkIndices.push(index)

                        e.addEventListener('input', (event) => {
                            this.data[index] = event.target.value
                        })

                        l.classList.add('contextTip')
                        l.textContent = "Link"

                        contextMenu.appendChild(l)
                        contextMenu.appendChild(document.createElement('br'))
                        contextMenu.appendChild(e)
                        contextMenu.appendChild(document.createElement('hr'))

                        if (index === this.menuItems.length - 1) {
                            e.dataset.test = 'aura funk'
                        }
                        break;
                    case 'teacher':
                        e.type = 'text'
                        e.placeholder = 'Type in the class\'s teacher here.'
                        if (typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value

                        e.classList.add('contextInput')
                        e.classList.add('teacherInput')
                        e.id = 'teacherInput'

                        e.addEventListener('input', (event) => {
                            this.data[index] = event.target.value
                        })

                        l.classList.add('contextTip')
                        l.textContent = "Teacher"

                        contextMenu.appendChild(l)
                        contextMenu.appendChild(document.createElement('br'))
                        contextMenu.appendChild(e)
                        contextMenu.appendChild(document.createElement('hr'))

                        if (index === this.menuItems.length - 1) {
                            e.addEventListener('keydown', (event) => {
                                if (event.key == 'Enter') {
                                    let invalid = false
                                    this.linkIndices.forEach((element, index) => {
                                        if (this.data[element] == null || this.data[element].slice(0, 4) != 'http') {
                                            alert('Please ensure all links are valid. (http:// or https://)')
                                            invalid = true
                                        }
                                    })

                                    if (this.data.includes(null)) {
                                        alert("Please fill out all fields.")
                                        console.log(this.data)
                                        invalid = true
                                    }

                                    if (invalid) return
                                    this.data[this.data.length - 1] = true
                                }
                            })
                        }
                        break;
                    case 'name':
                        e.type = 'text'
                        e.placeholder = 'Type in its name here.'
                        if (typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                        e.classList.add('contextInput')
                        e.classList.add('nameInput')
                        e.id = 'titleInput'

                        e.addEventListener('input', (event) => {
                            this.data[index] = event.target.value
                        })

                        l.classList.add('contextTip')
                        l.textContent = "Name"

                        contextMenu.appendChild(l)
                        contextMenu.appendChild(document.createElement('br'))
                        contextMenu.appendChild(e)
                        contextMenu.appendChild(document.createElement('hr'))

                        break;
                    case 'color':
                        e.type = 'color'
                        e.classList.add('contextInput')
                        if (typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                        e.classList.add('contextColorInput')
                        e.id = 'colorInput'

                        let e2 = document.createElement('span')
                        e2.classList.add('contextTip')
                        e2.textContent = "Adjust the color using the picker above."
                        e2.style.color = 'rgb(var(--c3))'

                        let subE = document.createElement('section')
                        subE.classList.add("contextColorSector")

                        e.addEventListener('input', (event) => {
                            this.data[index] = event.target.value
                        })

                        l.classList.add('contextTip')
                        l.textContent = "Color"

                        contextMenu.appendChild(l)
                        contextMenu.appendChild(document.createElement('br'))
                        contextMenu.appendChild(subE)
                        subE.appendChild(e)
                        subE.appendChild(document.createElement('br'))
                        subE.appendChild(e2)
                        contextMenu.appendChild(document.createElement('hr'))

                        if (index === this.menuItems.length - 1) {
                            e.addEventListener('keydown', (event) => {
                                if (event.key == 'Enter') {
                                    let invalid = false
                                    this.linkIndices.forEach((element, index) => {
                                        if (this.data[element] == null || this.data[element].slice(0, 4) != 'http') {
                                            alert('Please ensure all links are valid. (http:// or https://)')
                                            invalid = true
                                        }
                                    })

                                    if (this.data.includes(null)) {
                                        alert("Please fill out all fields.")
                                        console.log(this.data)
                                        invalid = true
                                    }

                                    if (invalid) return
                                    this.data[this.data.length - 1] = true
                                }
                            })
                        }

                        break;
                    case 'block':
                        let settings = JSON.parse(localStorage.getItem('swcsettings'))
                        if (settings.at(settings.indexOf('Number of Scheduled Periods') + 1) != 1) {
                            e.type = 'number'
                            e.placeholder = '#'
                            if (typeof this.itemValues[index] == 'string') e.value = this.itemValues[index]; this.data[index] = e.value
                            e.classList.add('contextInput')
                            e.min = 1
                            e.max = Number(extractSetting('Number of Available Periods'))
                            e.id = 'blockInput'
                            e.style.width = 'fit-content'
                            e.addEventListener('input', (event) => {
                                this.data[index] = event.target.value
                                if (event.target.value > Number(extractSetting('Number of Available Periods'))) event.target.value = event.target.value = Number(extractSetting('Number of Available Periods '))
                                if (event.target.value < 1) event.target.value = 1
                            })
                            l.classList.add('contextTip')
                            l.textContent = "Period #   "
                            contextMenu.appendChild(l)
                            contextMenu.appendChild(document.createElement('br'))
                            contextMenu.appendChild(e)
                        } else {
                            this.data[index] = "1"
                        }

                        if (index === this.menuItems.length - 1) {
                            e.addEventListener('keydown', (event) => {
                                if (event.key == 'Enter') {
                                    let invalid = false
                                    this.linkIndices.forEach((element, index) => {
                                        if (this.data[element] == null || this.data[element].slice(0, 4) != 'http') {
                                            alert('Please ensure all links are valid. (http:// or https://)')
                                            invalid = true
                                        }
                                    })

                                    if (this.data.includes(null)) {
                                        alert("Please fill out all fields.")
                                        console.log(this.data)
                                        invalid = true
                                    }

                                    if (invalid) return
                                    this.data[this.data.length - 1] = true
                                }
                            })
                        }
                        break;
                    case 'selectors':
                        {

                            let values = this.itemValues[index]
                            console.error(values)

                            if(values == null) throw new Error("The Checkboxes data type NEEDS a preset input")

                            this.data[index] = []

                            values.forEach((value, valueIndex) => {
                                this.data[index].push(false)

                                let input = document.createElement('input')
                                input.type = 'checkbox'
                                input.id = 'checkbox' + valueIndex
                                input.checked = false

                                let label = document.createElement('label')
                                label.classList.add('checkboxClass')
                                label.appendChild(input)
                                label.append(document.createTextNode(value))

                                input.addEventListener('change', (event) => {
                                    this.data[index][valueIndex] = event.currentTarget.checked
                                    console.log(event.currentTarget.checked)
                                })

                                contextMenu.appendChild(label)
                                contextMenu.appendChild(document.createElement('br'))
                            })

                            contextMenu.appendChild(document.createElement('hr'))
                            break;
                        }
                    case 'textarea':
                    {
                        let data = this.itemValues[index]

                        contextMenuH.style.width = "65vw"

                        let formattingToolbar = document.createElement('div')
                        formattingToolbar.classList.add('formattingToolbar')
                        contextMenu.appendChild(formattingToolbar)

                        let buttonTypes = [
                            "bold",
                            "italic",
                            "underline",
                        ]

                        buttonTypes.forEach(type => {
                            let formatButton = document.createElement('div')
                            formatButton.classList.add('formatButton')
                            formatButton.innerHTML = `<i class="fa-solid fa-` + type + `"></i>`

                            formatButton.id = type

                            formatButton.addEventListener('click', (event) => {
                                if(event.currentTarget.classList.contains('active')) {
                                    event.currentTarget.classList.remove('active')
                                }
                                else{
                                    event.currentTarget.classList.add('active')
                                }

                                document.execCommand(type)
                                textArea.hover()
                            })

                            formattingToolbar.appendChild(formatButton)
                        })

                        let textArea = document.createElement('div')
                        textArea.contentEditable = true
                        contextMenu.appendChild(textArea)

                        textArea.classList.add('contextTextArea')

                        textArea.innerHTML = this.itemValues[index]

                        setTimeout(() => { textArea.focus() }, 301)

                        textArea.addEventListener('input', (event) => {
                            this.data[index] = event.target.innerHTML
                        })

                        let formattingLoop = setInterval(() => {
                            if(!window.contextMenuActive) clearInterval(formattingLoop)

                            let types = ['bold', 'italic', 'underline']

                            types.forEach(type => {
                                if(document.queryCommandState(type)){

                                    if(!document.getElementById(type).classList.contains('active')) {

                                        document.getElementById(type).classList.add('active')

                                    }

                                }else{

                                    if(document.getElementById(type).classList.contains('active')){

                                        document.getElementById(type).classList.remove('active')

                                    }

                                }
                            })

                            console.log('alksjdoqw')
                        }, 100)
                        break;
                    }
                    case 'eventType':
                    {
                        let label = document.createElement('span')
                        label.classList.add('contextTip')

                        label.textContent = "Is this a task (has a deadline) or an event (no deadline)?:"

                        contextMenu.appendChild(label)

                        let dropdown = document.createElement('select')
                        dropdown.classList.add('contextDropdown');
                        dropdown.id = 'eventSelect';

                        ["Task", "Event"].forEach(type => {

                            let opt = document.createElement('option')
                            opt.value = type
                            opt.textContent = type

                            dropdown.appendChild(opt)

                        })

                        contextMenu.appendChild(dropdown)

                    }
                }
            })

            // End Generator

            let submitButton = document.createElement('div')
            submitButton.classList.add('contextButton')
            submitButton.textContent = 'Submit'
            submitButton.tabIndex = 0
            submitButton.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                }
            })
            submitButton.addEventListener('click', (event) => {

                console.error(this.warning)

                if(this.warning != null){
                    if(!confirm(this.warning)) return
                }

                let invalid = false
                this.linkIndices.forEach((element, index) => {
                    if (this.data[element] == null || this.data[element].slice(0, 4) != 'http') {
                        alert('Please ensure all links are valid. (http:// or https://)')
                        invalid = true
                    }
                })

                if (this.data.includes(null)) {
                    alert("Please fill out all fields.")
                    console.log(this.data)
                    invalid = true
                }

                if (invalid) return
                this.data[this.data.length - 1] = true
            })
            contextMenuH.appendChild(submitButton)
            if(this.menuItems[0] == 'textarea') submitButton.remove()

            await wait(300)
            contextMenuH.classList.remove('small')

            contextMenuH.style.left = String(window.innerWidth / 2 - (contextMenuH.clientWidth / 2)) + 'px'
            contextMenuH.style.top = String(window.innerHeight / 2 - (contextMenuH.clientHeight / 2)) + 'px'
        } catch (e) {
            console.error(e)
            alert("An error occurred while building the context menu. Please check the console for more information.")
        }
    }
}

async function getResultsFromContextMenu(menuItems, menuType, itemValues, warning) {
    try {
        let contextMenu = new ContextMenu(menuItems, menuType, itemValues, warning)
        contextMenu.build()

        await wait(300)

        document.addEventListener('click', closeMenuOnMouse)
        document.addEventListener('keydown', closeMenuOnEsc)

        while (contextMenu.data.at(-1) == false) {
            // This loop does nothing, it just waits for the user to fill out the context menu. :)

            await wait(100)
        }

        document.removeEventListener('click', closeMenuOnMouse)
        document.removeEventListener('keydown', closeMenuOnEsc)
        closeMenu(null)
        return contextMenu.data
    } catch (e) {
        console.error(e)
    }
}
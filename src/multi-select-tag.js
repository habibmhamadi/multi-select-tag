// Author: Habib Mhamadi
// Email: habibmhamadi@gmail.com


export default function MultiSelectTag (el, customs = {}) {
    var element = null
    var options = null
    var customSelectContainer = null
    var body = null
    var inputContainer = null
    var input = null
    var drawer = null
    var ul = null
    init()

    function init() {
        element = document.getElementById(el)
        createElements()
        initOptions()
        enableItemSelection()
        setValues()

        input.addEventListener('click', () => {
            initOptions()
            enableItemSelection()
            if(options.length != body.childElementCount - 1) {
                drawer.classList.remove('hidden')  
            }
        })

        input.addEventListener('keyup', (e) => {
                initOptions(e.target.value)
                enableItemSelection()
        })

        input.addEventListener('keydown', (e) => {
            if(e.key === 'Backspace' && !e.target.value && body.childElementCount > 1) {
                const child = body.children[body.childElementCount - 2].firstChild
                const option = options.find((op) => op.value == child.dataset.value)
                option.selected = false
                removeTag(child.dataset.value)
                setValues()
            }
            
        })
        
        window.addEventListener('click', (e) => {   
            if (!customSelectContainer.contains(e.target)){
                drawer.classList.add('hidden')
            }
        });

    }

    function createElements() {
        // Create custom elements
        options = getOptions();
        element.classList.add('hidden')
        
        customSelectContainer = document.createElement('div')
        customSelectContainer.classList.add(...['relative', `w-${customs.width || 'full'}`])
        
        body = document.createElement('div')
        body.classList.add(...['inline-flex', 'gap-1', 'p-1.5', 'rounded-md', 'items-center', 'flex-wrap', 'border-gray-300', 'border', 'w-full'])
        
        inputContainer = document.createElement('div')
        inputContainer.classList.add(...['inline-flex', 'flex-[1_0_100px]', 'input-container'])

        input = document.createElement('input')
        input.placeholder = `${customs.placeholder || 'Search...'}`
        input.classList.add(...['inline-block', 'w-full', 'border-none', 'outline-none', 'bg-transparent'])

        inputContainer.append(input)

        body.append(inputContainer)

        drawer = document.createElement('div');
        drawer.classList.add(...['absolute', 'bg-white', 'hidden', 'max-h-40', 'z-40', 'overflow-y-scroll', 'left-0', 'right-0', 'p-2', 'rounded', 'shadow'])
        ul = document.createElement('ul');
        
        drawer.appendChild(ul)
    
        customSelectContainer.appendChild(body)
        customSelectContainer.appendChild(drawer)

        // Place TailwindTagSelection after the element
        if (element.nextSibling) {
            element.parentNode.insertBefore(customSelectContainer, element.nextSibling)
        }
        else {
            element.parentNode.appendChild(customSelectContainer);
        }
    }

    function initOptions(val = null) {
        ul.innerHTML = ''
        for (var option of options) {
            if (option.selected) {
                !isTagSelected(option.value) && createTag(option)
            }
            else {
                const li = document.createElement('li')
                li.classList.add(...['p-2', 'hover:bg-gray-100', 'rounded', 'cursor-pointer'])
                li.innerHTML = option.label
                li.dataset.value = option.value
                
                // For search
                if(val && option.label.toLowerCase().startsWith(val.toLowerCase())) {
                    ul.appendChild(li)
                }
                else if(!val) {
                    ul.appendChild(li)
                }
            }
        }
        if(ul.childElementCount == 0 || options.length == body.childElementCount - 1) {
            drawer.classList.add('hidden')
        }
        else if (document.activeElement == input) {
            drawer.classList.remove('hidden')
        }
    }

    function createTag(option) {
        // Create and show selected item as tag
        const color = `${customs.tagColor || 'teal'}`
        const itemDiv = document.createElement('div');
        itemDiv.classList.add(...['flex', 'justify-center', 'items-center', 'font-medium', 'py-0.5', 'px-1.5', 'rounded-full', `text-${color}-700`, `bg-${color}-100`, 'border', `border-${color}-300`]);
        const itemLabel = document.createElement('div');
        itemLabel.classList.add(...[ 'text-xs', 'font-normal', 'leading-none', 'max-w-full', 'flex-initial']);
        itemLabel.innerHTML = option.label
        itemLabel.dataset.value = option.value 
        const itemClose = new DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x cursor-pointer hover:text-${color}-400 rounded-full w-4 h-4 ml-2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>`, 'image/svg+xml').documentElement
 
        itemClose.addEventListener('click', (e) => {
            const unselectOption = options.find((op) => op.value == option.value)
            unselectOption.selected = false
            removeTag(option.value)
            initOptions()
            setValues()
        })
    
        itemDiv.appendChild(itemLabel)
        itemDiv.appendChild(itemClose)
        body.insertBefore(itemDiv, inputContainer)
    }

    function enableItemSelection() {
        // Add click listener to the list items
        for(var li of ul.children) {
            li.addEventListener('click', (e) => {
                options.find((o) => o.value == e.target.dataset.value).selected = true
                input.value = null
                initOptions()
                setValues()
                input.focus()
            })
        }
    }

    function isTagSelected(val) {
        // If the item is already selected
        for(var child of body.children) {
            if(!child.classList.contains('input-container') && child.firstChild.dataset.value == val) {
                return true
            }
        }
        return false
    }
    function removeTag(val) {
        // Remove selected item
        for(var child of body.children) {
            if(!child.classList.contains('input-container') && child.firstChild.dataset.value == val) {
                body.removeChild(child)
            }
        }
    }
    function setValues() {
        // Update element final values
        for(var i = 0; i < options.length; i++) {
            element.options[i].selected = options[i].selected
        }
     
    }
    function getOptions() {
        // Map element options
        return [...element.options].map((op) => {
            return {
                value: op.value,
                label: op.label,
                selected: op.selected,
            }
        })
    }
}
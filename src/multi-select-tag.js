// Author: Habib Mhamadi
// Email: habibmhamadi@gmail.com

class MultiSelectTag {
    #element
    #values
    #options
    #customSelectContainer
    #body
    #inputContainer
    #input
    #drawer
    #ul
    #customs

    constructor(el, customs) {
        this.#element = document.getElementById(el)
        this.#customs = customs
        this.createElements()
        this.#initOptions()
        this.#enableItemSelection()
        this.#setValues()

        this.#input.addEventListener('click', () => {
            this.#initOptions()
            this.#enableItemSelection()
            if(this.#options.length != this.#body.childElementCount - 1) {
                this.#drawer.classList.remove('hidden')  
            }
        })

        this.#input.addEventListener('keyup', (e) => {
                this.#initOptions(e.target.value)
                this.#enableItemSelection()
        })

        this.#input.addEventListener('keydown', (e) => {
            if(e.key === 'Backspace' && !e.target.value && this.#body.childElementCount > 1) {
                const child = this.#body.children[this.#body.childElementCount - 2].firstChild
                const option = this.#options.find((op) => op.value == child.dataset.value)
                option.selected = false
                this.#removeTag(child.dataset.value)
                this.#setValues()
            }
            
        })
        
        window.addEventListener('click', (e) => {   
            if (!this.#customSelectContainer.contains(e.target)){
                this.#drawer.classList.add('hidden')
            }
        });

    }

    createElements() {
        // Create custom elements
        this.#values = []
        this.#options = this.#getOptions();
        this.#element.classList.add('hidden')
        
        this.#customSelectContainer = document.createElement('div')
        this.#customSelectContainer.classList.add(...['relative', `w-${this.#customs.width || 'full'}`])
        
        this.#body = document.createElement('div')
        this.#body.classList.add(...['inline-flex', 'gap-1', 'p-1.5', 'rounded-md', 'items-center', 'flex-wrap', 'border-gray-300', 'border', 'w-full'])
        
        this.#inputContainer = document.createElement('div')
        this.#inputContainer.classList.add(...['inline-flex', 'flex-[1_0_100px]', 'input-container'])

        this.#input = document.createElement('input')
        this.#input.placeholder = `${this.#customs.placeholder || 'Search...'}`
        this.#input.classList.add(...['inline-block', 'w-full', 'border-none', 'outline-none', 'bg-transparent'])

        this.#inputContainer.append(this.#input)

        this.#body.append(this.#inputContainer)

        this.#drawer = document.createElement('div');
        this.#drawer.classList.add(...['absolute', 'bg-white', 'hidden', 'max-h-40', 'z-40', 'overflow-y-scroll', 'left-0', 'right-0', 'p-2', 'rounded', 'shadow'])
        this.#ul = document.createElement('ul');
        
        this.#drawer.appendChild(this.#ul)
    
        this.#customSelectContainer.appendChild(this.#body)
        this.#customSelectContainer.appendChild(this.#drawer)

        // Place TailwindTagSelection after the element
        if (this.#element.nextSibling) {
            this.#element.parentNode.insertBefore(this.#customSelectContainer, this.#element.nextSibling)
        }
        else {
            this.#element.parentNode.appendChild(this.#customSelectContainer);
        }
    }

    #initOptions(val = null) {
        this.#ul.innerHTML = ''
        for (var option of this.#options) {
            if (option.selected) {
                !this.#isTagSelected(option.value) && this.#createTag(option)
            }
            else {
                const li = document.createElement('li')
                li.classList.add(...['p-2', 'hover:bg-gray-100', 'rounded', 'cursor-pointer'])
                li.innerHTML = option.label
                li.dataset.value = option.value
                
                // For search
                if(val && option.label.toLowerCase().startsWith(val.toLowerCase())) {
                    this.#ul.appendChild(li)
                }
                else if(!val) {
                    this.#ul.appendChild(li)
                }
            }
        }
        if(this.#ul.childElementCount == 0 || this.#options.length == this.#body.childElementCount - 1) {
            this.#drawer.classList.add('hidden')
        }
        else if (document.activeElement == this.#input) {
            this.#drawer.classList.remove('hidden')
        }
    }

    #createTag(option) {
        // Create and show selected item as tag
        const color = `${this.#customs.tagColor || 'teal'}`
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
            const unselectOption = this.#options.find((op) => op.value == option.value)
            unselectOption.selected = false
            this.#removeTag(option.value)
            this.#initOptions()
            this.#setValues()
        })
    
        itemDiv.appendChild(itemLabel)
        itemDiv.appendChild(itemClose)
        this.#body.insertBefore(itemDiv, this.#inputContainer)
    }

    #enableItemSelection() {
        // Add click listener to the list items
        for(var li of this.#ul.children) {
            li.addEventListener('click', (e) => {
                this.#options.find((o) => o.value == e.target.dataset.value).selected = true
                this.#input.value = null
                this.#initOptions()
                this.#setValues()
                this.#input.focus()
            })
        }
    }

    #isTagSelected(val) {
        // If the item is already selected
        for(var child of this.#body.children) {
            if(!child.classList.contains('input-container') && child.firstChild.dataset.value == val) {
                return true
            }
        }
        return false
    }
    #removeTag(val) {
        // Remove selected item
        for(var child of this.#body.children) {
            if(!child.classList.contains('input-container') && child.firstChild.dataset.value == val) {
                this.#body.removeChild(child)
            }
        }
    }
    #setValues() {
        // Update element final values
        for(var i = 0; i < this.#options.length; i++) {
            this.#element.options[i].selected = this.#options[i].selected
        }
     
    }
    #getOptions() {
        // Map element options
        return [...this.#element.options].map((op) => {
            return {
                value: op.value,
                label: op.label,
                selected: op.selected,
            }
        })
    }
}

if (typeof exports != 'undefined') {
    module.exports.MultiSelectTag = MultiSelectTag
}
// Author: Habib Mhamadi
// Email: habibmhamadi@gmail.com


function MultiSelectTag(el, customs = { shadow: false, rounded: true }) {
    // Initialize variables
    var element = null,
        options = null,
        customSelectContainer = null,
        wrapper = null,
        btnContainer = null,
        body = null,
        inputContainer = null,
        inputBody = null,
        input = null,
        button = null,
        drawer = null,
        ul = null;

    // Customize tag colors
    var tagColor = customs.tagColor || {};
    tagColor.textColor = "#0372B2";
    tagColor.borderColor = "#0372B2";
    tagColor.bgColor = "#C0E6FC";

    // Initialize DOM Parser
    var domParser = new DOMParser();

    // Initialize
    init();

    function init() {
        // DOM element initialization
        element = document.getElementById(el);
        createElements();
        initOptions();
        enableItemSelection();
        setValues(false);

        // Event listeners
        button.addEventListener('click', () => {
            if (drawer.classList.contains('hidden')) {
                initOptions();
                enableItemSelection();
                drawer.classList.remove('hidden');
                input.focus();
            } else {
                drawer.classList.add('hidden');
            }
        });

        input.addEventListener('keyup', (e) => {
            initOptions(e.target.value);
            enableItemSelection();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && inputContainer.childElementCount > 1) {
                const child = body.children[inputContainer.childElementCount - 2].firstChild;
                const option = options.find((op) => op.value == child.dataset.value);
                option.selected = false;
                removeTag(child.dataset.value);
                setValues();
            }
        });

        window.addEventListener('click', (e) => {
            if (!customSelectContainer.contains(e.target)) {
                if ((e.target.nodeName !== "LI") && (e.target.getAttribute("class") !== "input_checkbox")) {
                    // hide the list option only if we click outside of it
                    drawer.classList.add('hidden');
                } else {
                    // enable again the click on the list options
                    enableItemSelection();
                }
            }
        });
    }

    function createElements() {
        // Create custom elements
        options = getOptions();
        element.classList.add('hidden');

        // .multi-select-tag
        customSelectContainer = document.createElement('div');
        customSelectContainer.classList.add('mult-select-tag');

        // .container
        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        // body
        body = document.createElement('div');
        body.classList.add('body');
        if (customs.shadow) {
            body.classList.add('shadow');
        }
        if (customs.rounded) {
            body.classList.add('rounded');
        }

        // .input-container
        inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        // input
        input = document.createElement('input');
        input.classList.add('input');
        input.placeholder = `${customs.placeholder || 'Search...'}`;

        inputBody = document.createElement('inputBody');
        inputBody.classList.add('input-body');
        inputBody.append(input);

        body.append(inputContainer);

        // .btn-container
        btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');

        // button
        button = document.createElement('button');
        button.type = 'button';
        btnContainer.append(button);

        const icon = domParser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 21 6 15"></polyline>
            </svg>`, 'image/svg+xml').documentElement;

        button.append(icon);

        body.append(btnContainer);
        wrapper.append(body);

        drawer = document.createElement('div');
        drawer.classList.add(...['drawer', 'hidden']);
        if (customs.shadow) {
            drawer.classList.add('shadow');
        }
        if (customs.rounded) {
            drawer.classList.add('rounded');
        }
        drawer.append(inputBody);
        ul = document.createElement('ul');

        drawer.appendChild(ul);

        customSelectContainer.appendChild(wrapper);
        customSelectContainer.appendChild(drawer);

        // Place TailwindTagSelection after the element
        if (element.nextSibling) {
            element.parentNode.insertBefore(customSelectContainer, element.nextSibling);
        } else {
            element.parentNode.appendChild(customSelectContainer);
        }
    }

    function createElementInSelectList(option, val, selected = false) {
        // Create a <li> elmt in the drop-down list,
        // selected parameters tells if the checkbox need to be selected and the bg color changed
        const li = document.createElement('li');
        li.innerHTML = "<input type='checkbox' style='margin:0 0.5em 0 0' class='input_checkbox'>"; // add the checkbox at the left of the <li>
        li.innerHTML += option.label;
        li.dataset.value = option.value;
        const checkbox = li.firstChild;
        checkbox.dataset.value = option.value;

        // For search
        if (val && option.label.toLowerCase().startsWith(val.toLowerCase())) {
            ul.appendChild(li);
        } else if (!val) {
            ul.appendChild(li);
        }

        // Change bg color and checking the checkbox
        if (selected) {
            li.style.backgroundColor = tagColor.bgColor;
            checkbox.checked = true;
        }
    }

    function initOptions(val = null) {
        ul.innerHTML = '';
        for (var option of options) {
            // if option already selected
            if (option.selected) {
                !isTagSelected(option.value) && createTag(option);

                // We create a option in the list, but with different color
                createElementInSelectList(option, val, true);
            } else {
                createElementInSelectList(option, val);
            }
        }
    }

    function createTag(option) {
        // Create and show selected item as tag
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-container');
        itemDiv.style.color = tagColor.textColor || '#2c7a7b';
        itemDiv.style.borderColor = tagColor.borderColor || '#81e6d9';
        itemDiv.style.background = tagColor.bgColor || '#e6fffa';
        const itemLabel = document.createElement('div');
        itemLabel.classList.add('item-label');
        itemLabel.style.color = tagColor.textColor || '#2c7a7b';
        itemLabel.innerHTML = option.label;
        itemLabel.dataset.value = option.value;
        const itemClose = domParser.parseFromString(
            `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="item-close-svg">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`, 'image/svg+xml').documentElement;

        itemClose.addEventListener('click', (e) => {
            const unselectOption = options.find((op) => op.value == option.value);
            unselectOption.selected = false;
            removeTag(option.value);
            initOptions();
            setValues();
        });

        itemDiv.appendChild(itemLabel);
        itemDiv.appendChild(itemClose);
        inputContainer.append(itemDiv);
    }

    function enableItemSelection() {
        // Add click listener to the list items
        for (var li of ul.children) {
            li.addEventListener('click', (e) => {
                if (options.find((o) => o.value == e.target.dataset.value).selected === false) {
                    // if the option is not selected, we select it
                    options.find((o) => o.value == e.target.dataset.value).selected = true;
                    input.value = null;
                    initOptions();
                    setValues();
                    //input.focus() // brings up the list to the input
                } else {
                    // if it's already selected, we deselect it
                    options.find((o) => o.value == e.target.dataset.value).selected = false;
                    input.value = null;
                    initOptions();
                    setValues();
                    //input.focus() // brings up the list on the input
                    removeTag(e.target.dataset.value);
                }
            });
        }
    }

    function isTagSelected(val) {
        // If the item is already selected
        for (var child of inputContainer.children) {
            if (!child.classList.contains('input-body') && child.firstChild.dataset.value == val) {
                return true;
            }
        }
        return false;
    }

    function removeTag(val) {
        // Remove selected item
        for (var child of inputContainer.children) {
            if (!child.classList.contains('input-body') && child.firstChild.dataset.value == val) {
                inputContainer.removeChild(child);
            }
        }
    }

    function setValues(fireEvent = true) {
        // Update element final values
        selected_values = [];
        for (var i = 0; i < options.length; i++) {
            element.options[i].selected = options[i].selected;
            if (options[i].selected) {
                selected_values.push({ label: options[i].label, value: options[i].value });
            }
        }
        if (fireEvent && customs.hasOwnProperty('onChange')) {
            customs.onChange(selected_values);
        }
    }

    function getOptions() {
        // Map element options
        return [...element.options].map((op) => {
            return {
                value: op.value,
                label: op.label,
                selected: op.selected,
            };
        });
    }
}

// Author: Habib Mhamadi
// Email: habibmhamadi@gmail.com

function MultiSelectTag(selectElOrId, config) {
    // Private variables
    var selectElement,
        optionsData = [],
        container,
        onChange = config.onChange || function() {},
        required = config.required || false,
        maxSelection = typeof config.maxSelection === 'number' ? config.maxSelection : Infinity,
        placeholder = config.placeholder || 'Search',
        selectedTags = [],
        filteredOptions = [],
        highlightedIndex = -1,
        selectedTagsContainer,
        tagInput,
        dropdown;
  
    // Resolve the select element from a string id.
    selectElement = document.getElementById(selectElOrId);
    if (!selectElement) {
      throw new Error("Select element not found.");
    }
    if (selectElement.tagName !== 'SELECT') {
      throw new Error("Element is not a select element.");
    }
  
    // Hide the original select element.
    selectElement.style.display = 'none';
  
    // Read options from the select element.
    for (var i = 0; i < selectElement.options.length; i++) {
      var option = selectElement.options[i];
      optionsData.push({
        id: option.value,
        label: option.text,
        preselected: option.selected
      });
    }
  
    // Create a container for the widget and insert it after the select.
    container = document.createElement('div');
    container.className = 'multi-select-tag';
    selectElement.parentNode.insertBefore(container, selectElement.nextSibling);
  
    // Preselect any options marked as selected.
    for (var j = 0; j < optionsData.length; j++) {
      if (optionsData[j].preselected) {
        selectedTags.push({ id: optionsData[j].id, label: optionsData[j].label });
      }
    }
    filteredOptions = optionsData.slice();
  
    // Private function: Build the widget's HTML structure.
    function init() {
      container.innerHTML = `
        <div class="wrapper">
          <div id="selected-tags" class="tag-container">
            <input type="text" id="tag-input" placeholder="${placeholder}" class="tag-input" autocomplete="off">
          </div>
          <ul id="dropdown" class="dropdown hidden"></ul>
        </div>`;
      selectedTagsContainer = container.querySelector('#selected-tags');
      tagInput = container.querySelector('#tag-input');
      dropdown = container.querySelector('#dropdown');
      bindEvents();
    }
  
    // Private function: Bind event listeners.
    function bindEvents() {
      tagInput.addEventListener('input', function(e) {
        var searchTerm = e.target.value.toLowerCase();
        filteredOptions = optionsData.filter(function(opt) {
          return opt.label.toLowerCase().includes(searchTerm);
        });
        highlightedIndex = -1;
        renderDropdown();
      });
  
      tagInput.addEventListener('keydown', function(e) {
        var visibleOptions = dropdown.querySelectorAll('li');
        if (e.key === 'Backspace' && tagInput.value === '') {
          if (selectedTags.length > 0) {
            selectedTags.pop();
            renderSelectedTags();
            renderDropdown();
            syncToSelect();
            onChange(selectedTags);
            e.preventDefault();
            return;
          }
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (visibleOptions.length === 0) return;
          highlightedIndex = (highlightedIndex + 1) % visibleOptions.length;
          renderDropdown();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (visibleOptions.length === 0) return;
          highlightedIndex = (highlightedIndex - 1 + visibleOptions.length) % visibleOptions.length;
          renderDropdown();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (highlightedIndex > -1 && visibleOptions[highlightedIndex]) {
            var selectedLabel = visibleOptions[highlightedIndex].textContent;
            var option = optionsData.find(function(opt) {
              return opt.label === selectedLabel;
            });
            if (option) {
              selectTag(option);
            }
          }
        }
      });
  
      document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
          highlightedIndex = -1;
          dropdown.classList.add('hidden');
        }
      });
  
      tagInput.addEventListener('focus', function() {
        renderDropdown();
      });
    }
  
    // Private function: Render the dropdown list, excluding already selected options.
    function renderDropdown() {
      dropdown.innerHTML = '';
      var visibleOptions = filteredOptions.filter(function(opt) {
        return !selectedTags.find(function(tag) {
          return tag.id === opt.id;
        });
      });
      if (visibleOptions.length === 0) {
        dropdown.classList.add('hidden');
        return;
      }
      visibleOptions.forEach(function(option, index) {
        var li = document.createElement('li');
        li.textContent = option.label;
        li.className = 'li';
        if (index === highlightedIndex) {
          li.classList.add('li-arrow');
        }
        li.addEventListener('click', function() {
          selectTag(option);
        });
        dropdown.appendChild(li);
      });
      dropdown.classList.remove('hidden');
      if (highlightedIndex > -1) {
        var highlightedItem = dropdown.children[highlightedIndex];
        if (highlightedItem) {
          highlightedItem.scrollIntoView({ block: 'nearest' });
        }
      }
    }
  
    // Private function: Render the selected tags.
    function renderSelectedTags() {
      var tagItems = selectedTagsContainer.querySelectorAll('.tag-item');
      for (var k = 0; k < tagItems.length; k++) {
        tagItems[k].remove();
      }
      selectedTags.forEach(function(tag) {
        var span = document.createElement('span');
        span.className = 'tag-item';
        span.textContent = tag.label;
        var closeBtn = document.createElement('span');
        closeBtn.className = 'cross';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() {
          deselectTag(tag);
        });
        span.appendChild(closeBtn);
        selectedTagsContainer.insertBefore(span, tagInput);
      });
    }
  
    // Private function: Add a tag to the selection.
    function selectTag(option) {
      if (selectedTags.length >= maxSelection) return;
      if (!selectedTags.find(function(tag) { return tag.id === option.id; })) {
        selectedTags.push({ id: option.id, label: option.label });
      }
      tagInput.value = '';
      filteredOptions = optionsData.filter(function(opt) {
        return opt.label.toLowerCase().includes(tagInput.value.toLowerCase());
      });
      highlightedIndex = -1;
      renderSelectedTags();
      renderDropdown();
      syncToSelect();
      onChange(selectedTags);
    }
  
    // Private function: Remove a tag from the selection.
    function deselectTag(tag) {
      selectedTags = selectedTags.filter(function(t) {
        return t.id !== tag.id;
      });
      renderSelectedTags();
      renderDropdown();
      syncToSelect();
      onChange(selectedTags);
    }
  
    // Private function: Synchronize the widget's selection with the underlying select element.
    function syncToSelect() {
      for (var i = 0; i < selectElement.options.length; i++) {
        var optionElem = selectElement.options[i];
        var found = selectedTags.find(function(tag) {
          return tag.id === optionElem.value;
        });
        optionElem.selected = !!found;
      }
      if (required) {
        tagInput.required = selectedTags.length ? false : true;
      } else {
        tagInput.required = false;
      }
    }
  
    // Initialize the widget.
    init();
    renderSelectedTags();
    syncToSelect();
  
    // Public API: Return an object exposing only public methods.
    return {
      selectAll: function() {
        for (var i = 0; i < optionsData.length; i++) {
          if (selectedTags.length >= maxSelection) break;
          var opt = optionsData[i];
          if (!selectedTags.find(function(tag) { return tag.id === opt.id; })) {
            selectedTags.push({ id: opt.id, label: opt.label });
          }
        }
        tagInput.value = '';
        filteredOptions = optionsData.slice();
        highlightedIndex = -1;
        renderSelectedTags();
        renderDropdown();
        syncToSelect();
        onChange(selectedTags);
      },
      clearAll: function() {
        selectedTags = [];
        renderSelectedTags();
        renderDropdown();
        syncToSelect();
        onChange(selectedTags);
      },
      getSelectedTags: function() {
        return selectedTags;
      }
    };
  }   
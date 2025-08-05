# Multi-Select-Tag

MultiSelectTag is a lightweight, closure-based JavaScript library that transforms a standard HTML `<select multiple>` element into a custom, tag-based multi-select widget.

<img src="https://firebasestorage.googleapis.com/v0/b/habib08-965ea.appspot.com/o/multi-select-tag%2Fmulti-select-tag.jpg?alt=media&token=18de2bbf-d62f-4e2a-931a-4103db4eeded" style="width:75%" alt="multi select tag" />

## Features
- **Search & Filter:** Filter options dynamically as you type.
- **Keyboard Navigation:** Use arrow keys to navigate and the Enter key to select.
- **Automatic Sync:** All changes sync with the hidden `<select>` element.
- **Tag Display Control:** Limit the number of visible tags with interactive "+ X more" indicator.
- **Public API:** Helper methods `selectAll()`, `clearAll()`, and `getSelectedTags()`.
- **Multiple Instances:** Each instance is independent and encapsulated.


## Installation

Simply copy and paste the following css link and js script to your html file head and body.
```html
<!-- head: below existing links -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag@4.0.1/dist/css/multi-select-tag.min.css">
```
```html
<!-- End of <body> -->
<script src="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag@4.0.1/dist/js/multi-select-tag.min.js"></script>
```

## Usage

Create a multiple select element with options. Preselected options (via the selected attribute) will be automatically loaded.
```html
<select name="countries[]" id="countries" multiple>
    <option value="1" selected>Afghanistan</option>
    <option value="2" selected>Australia</option>
    <option value="3">Germany</option>
    <option value="4">Canada</option>
    <option value="5">Russia</option>
</select>
```
Pass the `id` of your select element and an optional configuration object to create an instance of the widget.
```html
<script>
    var tagSelector = new MultiSelectTag('countries', {
        maxSelection: 5,              // default unlimited.
        maxDisplayTags: 2,            // default unlimited - shows only 2 tags + "+ X more".
        required: true,               // default false.
        placeholder: 'Search tags',   // default 'Search'.
        onChange: function(selected) { // Callback when selection changes.
            console.log('Selection changed:', selected);
        }
    });
</script>
```
<br/>

## Configuration Options

### maxDisplayTags
Control how many selected tags are visible in the container. When more tags are selected than this limit, a clickable "+ X more" indicator is shown.

```javascript
// Show only 1 tag + "+ X more" for additional selections
var tagSelector = MultiSelectTag('countries', {
    maxDisplayTags: 1
});

// Show 3 tags + "+ X more" for additional selections  
var tagSelector = MultiSelectTag('countries', {
    maxDisplayTags: 3
});

// Show all tags (default behavior)
var tagSelector = MultiSelectTag('countries', {
    // maxDisplayTags not set - shows all tags
});
```

**Example:** If you select "India", "USA", "UK", "Canada" with `maxDisplayTags: 1`, it will display:
- "India" (visible tag)
- "+ 3 more" (clickable indicator)

Clicking the "+ 3 more" indicator opens a dropdown showing all selected tags with the ability to remove them individually.

### Interactive Features
- **Clickable "+ X more" indicator:** Click to view all selected tags
- **Individual tag removal:** Click the × button next to any tag in the dropdown to remove it
- **Automatic dropdown hiding:** The dropdown automatically closes when all tags are removed
- **Consistent styling:** Follows the same design patterns as the main dropdown

<br/>

## Using the Public API
The library exposes a minimal public API:


```javascript
tagSelector.selectAll();         // Select All Options
tagSelector.clearAll();          // Clear All Selections
tagSelector.getSelectedTags();   // Get Currently Selected Tags
```
<br/><br/>

## Customization & Styling
For customization feel free to download the css file and apply your own styles inside the defined classes.
<br/><br/>

## Contribute
Report bugs and suggest feature in [issue tracker](https://github.com/habibmhamadi/multi-select-tag/issues). Feel free to `Fork` and send `Pull Requests`.


## License

[MIT](https://github.com/habibmhamadi/multi-select-tag/blob/main/LICENSE)

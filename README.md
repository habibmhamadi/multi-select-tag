# multi-select-tag

HTML multiple tag selection input.

<img src="https://firebasestorage.googleapis.com/v0/b/flutterapp-5c015.appspot.com/o/demo_images%2Fmult-tag-select.png?alt=media&token=90fc1411-e9ad-4bcb-89ef-7ab92ab3f491" style="width:70%" alt="multi-select-tag demo" />

## Usage


- Copy and paste the following css link and js script to your html file.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag/dist/css/multi-select-tag.css">
```
```html
<script src="https://cdn.jsdelivr.net/gh/habibmhamadi/multi-select-tag@2.0.0/dist/js/multi-select-tag.js"></script>
```


 - Give an id and `multiple` attribute to your select element.
```html
<select name="countries" id="countries" multiple>
    <option value="1">Afghanistan</option>
    <option value="2">Australia</option>
    <option value="3">Germany</option>
    <option value="4">Canada</option>
    <option value="5">Russia</option>
</select>
```


 - Call the function and pass the id.
```html
<script>
    new MultiSelectTag('countries')  // id
</script>
```


- You can pass a second optional paramater for border-radius, shadow and listening to `onchange` event.

```javascript
new MultiSelectTag('countries', {
    rounded: true,    // default true
    shadow: true,      // default false
    placeholder: 'Search',  // default Search...
    onChange: function(values) {
        console.log(values)
    }
})
```


## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/habibmhamadi/multi-select-tag/issues). Feel free to `Fork` and send `Pull Requests`.


## License

[MIT](https://github.com/habibmhamadi/multi-select-tag/blob/main/LICENSE)

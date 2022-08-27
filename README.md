# multi-select-tag

HTML multiple tag selection with Tailwind CSS.

<img src="https://firebasestorage.googleapis.com/v0/b/flutterapp-5c015.appspot.com/o/demo_images%2Fmulti-select-tag-demo.JPG?alt=media&token=160a01ad-ca09-4d8a-a9dd-1e4b1f9b121f" style="width:70%" alt="multi-select-tag demo" />

## Getting Started

Install via NPM:

`npm install multi-select-tag`

```html
<select name="countries" id="countries" multiple>
    <option value="1">Afghanistan</option>
    <option value="2">Australia</option>
    <option value="3">Germany</option>
    <option value="4">Canada</option>
    <option value="5">Russia</option>
</select>
```

```javascript
import MultiSelectTag from 'multi-select-tag.js'

new MultiSelectTag('countries')  // id
```


Using CDN

```javascript
<script type="module">
    import MultiSelectTag from 'https://unpkg.com/multi-select-tag@1.0.3/src/multi-select-tag.js'
    new MultiSelectTag('countries')  // id
</script>
```


- You can pass a second optional paramater for customizing input placeholder, width and tag colors.

```javascript
new MultiSelectTag('countries', {
    placeholder: 'Start Typing...',
    width: '80',    // tailwind width values only
    tagColor: 'red'  // Tailwind color names only
})
```

## Contribute

Report bugs and suggest feature in [issue tracker](https://github.com/habibmhamadi/multi-select-tag/issues). Feel free to `Fork` and send `Pull Requests`.


## License

[MIT](https://github.com/habibmhamadi/multi-select-tag/blob/main/LICENSE)
# multi-select-tag

HTML multiple tag selection with Tailwind CSS.

<img src="https://firebasestorage.googleapis.com/v0/b/flutterapp-5c015.appspot.com/o/demo_images%2Fmulti-select-tag-demo.JPG?alt=media&token=160a01ad-ca09-4d8a-a9dd-1e4b1f9b121f" style="width:50%" alt="multi-select-tag demo" />

## Installation

Install via NPM:

`npm install multi-select-tag`

Install via CDN

```javascript
<script src="https://unpkg.com/multi-select-tag@1.0.0/src/multi-select-tag.js"></script>
```

## Usage

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
import MultiSelectTag from 'multi-select-tag.js'  // You do not need to `import` if you are using via CDN'

new MultiSelectTag('countries') // by id
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
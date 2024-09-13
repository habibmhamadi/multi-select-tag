function MultiSelectTag(e, t = { shadow: !1, rounded: !0, disabled: !1 }) {
    var l = null,
        n = null,
        a = null,
        d = null,
        s = null,
        o = null,
        i = null,
        r = null,
        c = null,
        u = null,
        v = null,
        p = null,
        h = t.tagColor || {};
    h.textColor = h.textColor || "#FF5D29";
    h.borderColor = h.borderColor || "#FF5D29";
    h.bgColor = h.bgColor || "#FFE9E2";
    var m = new DOMParser;

    function g(e, t, l = !1) {
        const n = document.createElement("li");
        n.innerHTML = "<input type='checkbox' style='margin:0 0.5em 0 0' class='input_checkbox'>";
        n.innerHTML += e.label;
        n.dataset.value = e.value;
        const a = n.firstChild;
        a.dataset.value = e.value;
        t && e.label.toLowerCase().startsWith(t.toLowerCase()) ? p.appendChild(n) : t || p.appendChild(n), l && (n.style.backgroundColor = h.bgColor, a.checked = !0)
    }

    function f(e = null) {
        for (var t of (p.innerHTML = "", n)) t.selected ? (!b(t.value) && C(t), g(t, e, !0)) : g(t, e)
    }

    function C(e) {
        const t = document.createElement("div");
        t.classList.add("item-container"), t.style.color = h.textColor || "#2c7a7b", t.style.borderColor = h.borderColor || "#81e6d9", t.style.background = h.bgColor || "#e6fffa";
        const l = document.createElement("div");
        l.classList.add("item-label"), l.style.color = h.textColor || "#2c7a7b", l.innerHTML = e.label, l.dataset.value = e.value;
        const a = m.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="item-close-svg">\n                <line x1="18" y1="6" x2="6" y2="18"></line>\n                <line x1="6" y1="6" x2="18" y2="18"></line>\n            </svg>', "image/svg+xml").documentElement;
        a.addEventListener("click", (t => {
            n.find((t => t.value == e.value)).selected = !1, w(e.value), f(), E()
        })), t.appendChild(l), t.appendChild(a), i.append(t)
    }

    function L() {
        if (t.disabled) return; // Disable click if disabled
        for (var e of p.children) e.addEventListener("click", (e => {
            !1 === n.find((t => t.value == e.target.dataset.value)).selected ? (n.find((t => t.value == e.target.dataset.value)).selected = !0, c.value = null, f(), E()) : (n.find((t => t.value == e.target.dataset.value)).selected = !1, c.value = null, f(), E(), w(e.target.dataset.value))
        }))
    }

    function b(e) {
        for (var t of i.children) if (!t.classList.contains("input-body") && t.firstChild.dataset.value == e) return !0;
        return !1
    }

    function w(e) {
        for (var t of i.children) t.classList.contains("input-body") || t.firstChild.dataset.value != e || i.removeChild(t)
    }

    function E(e = !0) {
        selected_values = [];
        for (var a = 0; a < n.length; a++) l.options[a].selected = n[a].selected, n[a].selected && selected_values.push({
            label: n[a].label,
            value: n[a].value
        });
        e && t.hasOwnProperty("onChange") && t.onChange(selected_values)
    }
    l = document.getElementById(e),
    function() {
        n = [...l.options].map((e => ({
            value: e.value,
            label: e.label,
            selected: e.selected
        }))), l.classList.add("hidden"), (a = document.createElement("div")).classList.add("mult-select-tag"), (d = document.createElement("div")).classList.add("wrapper"), (o = document.createElement("div")).classList.add("body"), t.shadow && o.classList.add("shadow"), t.rounded && o.classList.add("rounded"), (i = document.createElement("div")).classList.add("input-container"), (c = document.createElement("input")).classList.add("input"), c.placeholder = `${t.placeholder || "Search..."}`, t.disabled && (c.disabled = !0), // Disable input
        (r = document.createElement("inputBody")).classList.add("input-body"), r.append(c), o.append(i), (s = document.createElement("div")).classList.add("btn-container"), (u = document.createElement("button")).type = "button", t.disabled && (u.disabled = !0), // Disable button
        s.append(u);
        const e = m.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <polyline points="18 15 12 21 6 15"></polyline>\n            </svg>', "image/svg+xml").documentElement;
        u.append(e), o.append(s), d.append(o), (v = document.createElement("div")).classList.add("drawer", "hidden"), t.shadow && v.classList.add("shadow"), t.rounded && v.classList.add("rounded"), v.append(r), p = document.createElement("ul"), v.appendChild(p), a.appendChild(d), a.appendChild(v), l.nextSibling ? l.parentNode.insertBefore(a, l.nextSibling) : l.parentNode.appendChild(a)
    }(), f(), L(), E(!1), u.addEventListener("click", (() => {
        if (t.disabled) return; // Prevent drawer open if disabled
        v.classList.contains("hidden") ? (f(), L(), v.classList.remove("hidden"), c.focus()) : v.classList.add("hidden")
    })), c.addEventListener("keyup", (e => {
        f(e.target.value), L()
    })), c.addEventListener("keydown", (e => {
        if ("Backspace" === e.key && !e.target.value && i.childElementCount > 1) {
            const e = o.children[i.childElementCount - 2].firstChild;
            n.find((t => t.value == e.dataset.value)).selected = !1, w(e.dataset.value), E()
        }
    })), window.addEventListener("click", (e => {
        a.contains(e.target) || ("LI" !== e.target.nodeName && "input_checkbox" !== e.target.getAttribute("class") ? v.classList.add("hidden") : L())
    }))
}

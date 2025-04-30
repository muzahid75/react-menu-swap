# React.dev Menu Swap Script

This JavaScript snippet is designed to **swap the "Reference" and "Community" (or "Forum") menu items** on the [https://react.dev](https://react.dev) website when a user visits the site for the first time during a session.

---

## 🔧 Features

- ✅ Swaps only once per session using `sessionStorage`.
- ✅ Fails gracefully if target elements are not found.
- ✅ Safe DOM manipulation using `requestAnimationFrame`.
- ✅ Works even if "Community" is renamed to "Forum".
- ✅ Can be tested directly via the browser console.

---

## 🧠 How It Works

- On first page load of the session, the script:
  1. Searches for `<a>` links in the `<nav>` element with text content "Reference" and "Community" (or "Forum").
  2. Identifies their closest parent wrappers with class `flex-auto`.
  3. Checks that they are not already adjacent.
  4. Swaps the two items using DOM manipulation.
  5. Marks the operation in `sessionStorage` to prevent it from repeating.

- If the elements are not yet loaded, it retries using `requestAnimationFrame` until they appear.

---

## 💻 Usage

To test or use the code:

1. Open [https://react.dev](https://react.dev) in a browser.
2. Open the **DevTools Console**.
3. Paste the contents of `swapMenuItems.js` and press Enter.
4. The "Reference" and "Community"/"Forum" menu items will be swapped.

---

## 📁 File Structure


---

## 🚨 Failsafe

If any of the target menu items or their parent wrappers are not present or not structured correctly:
- The script will **not throw errors**.
- It will **retry safely** until the DOM is ready.
- If unsuccessful, it will **exit silently** without breaking the UI.

---

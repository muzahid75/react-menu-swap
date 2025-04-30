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
## 💡 Code Explanation
```
(function swapMenuItems() {
```
# Wraps the logic in an IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope.


```
const sessionKey = 'menuSwapped';
if (sessionStorage.getItem(sessionKey)) {
console.log('Already swapped this session.');
return;
}
```
# Checks sessionStorage to ensure the swap runs only once per session. If already swapped, the function exits early.
```
  const trySwap = () => {
```
# Defines a retrying function to safely attempt the swap after the DOM is ready.
```
    const links = document.querySelectorAll('nav a');
```
# Selects all anchor (<a>) elements inside the <nav> bar.
```
    const referenceLink = Array.from(links).find(link => link.textContent.trim() === 'Reference');
    const communityLink = Array.from(links).find(link => link.textContent.trim() === 'Community' || link.textContent.trim() === 'Forum');
```
# Finds the desired menu items by their visible text content.
```
    if (referenceLink && communityLink) {
      const refWrapper = referenceLink.closest('div.flex-auto');
      const comWrapper = communityLink.closest('div.flex-auto');
```
# Finds the outermost layout divs for each link to ensure the swap targets the correct structural elements.
```
      if (refWrapper && comWrapper && refWrapper.previousElementSibling !== comWrapper) {
        refWrapper.parentNode.insertBefore(comWrapper, refWrapper);
        console.log('Swapped Reference and Forum!');
      }
```
# Swaps the positions only if both wrappers exist and are not already in the swapped order.
```
      sessionStorage.setItem(sessionKey, 'true');
```
# Saves a session flag to ensure the swap won't repeat.
```
    } else {
      requestAnimationFrame(trySwap); // Keep trying until elements exist
    }
```
# If elements aren't loaded yet (due to async rendering), the function retries using requestAnimationFrame.
```
  };

  requestAnimationFrame(trySwap);
})();
```
# Begins the retry loop after the script is loaded.

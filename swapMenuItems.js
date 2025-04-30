(function swapMenuItems() {
    const sessionKey = 'menuSwapped';
    if (sessionStorage.getItem(sessionKey)) {
      console.log('Already swapped this session.');
      return;
    }
  
    const trySwap = () => {
      const links = document.querySelectorAll('nav a');
      const referenceLink = Array.from(links).find(link => link.textContent.trim() === 'Reference');
      const communityLink = Array.from(links).find(link => link.textContent.trim() === 'Community' || link.textContent.trim() === 'Forum');
  
      if (referenceLink && communityLink) {
        const refWrapper = referenceLink.closest('div.flex-auto');
        const comWrapper = communityLink.closest('div.flex-auto');
  
        if (refWrapper && comWrapper && refWrapper.previousElementSibling !== comWrapper) {
          refWrapper.parentNode.insertBefore(comWrapper, refWrapper);
          console.log('Swapped Reference and Forum!');
        }
  
        sessionStorage.setItem(sessionKey, 'true');
      } else {
        requestAnimationFrame(trySwap);
      }
    };
  
    requestAnimationFrame(trySwap);
  })();
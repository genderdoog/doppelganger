// Javascript file for doppelganger website
// Generated by GPT-4o, copy and pasted by genderdoog
// https://github.com/genderdoog/doppelganger

// CONSTANTS
// Sets language to chinese when page is first loaded
let languageIsEnglish = false;

// METHODS/FUNCTIONS
// Changes language from english to chinese (and vice versa)
function changeLanguage() {
	if (languageIsEnglish) { // To change language to english (languageIsEnglish = true)
		// Disables header1 chinese text and poster
		document.querySelectorAll(".chinese-flex-style").forEach((element) => {
			element.style.display = "none";
		});
		
		// Enables header1 english text
		document.querySelectorAll(".english-flex-style").forEach((element) => {
			element.style.display = "flex";
		});		
		
		// Disables header2 chinese text 
		document.querySelectorAll(".chinese-block-style").forEach((element) => {
			element.style.display = "none";
		});	

		// Enables header2 english text
		document.querySelectorAll(".english-block-style").forEach((element) => {
			element.style.display = "block";
		});		
		
		languageIsEnglish = !languageIsEnglish; // Switches languageIsEnglish from true to false
	
	} else { // To change to chinese (languageIsEnglish = false)
		// Enables header1 chinese text and poster
		document.querySelectorAll(".chinese-flex-style").forEach((element) => {
			element.style.display = "flex";
		});
		
		// Disables header1 english text
		document.querySelectorAll(".english-flex-style").forEach((element) => {
			element.style.display = "none";
		});		
		
		// Enables header2 chinese text 
		document.querySelectorAll(".chinese-block-style").forEach((element) => {
			element.style.display = "block";
		});	

		// Disables header2 english text
		document.querySelectorAll(".english-block-style").forEach((element) => {
			element.style.display = "none";
		});	
		
		languageIsEnglish = !languageIsEnglish; // Switches languageIsEnglish from false to true	
	}
}

// Copying selected text functionality (context menu)
function copySelectedText() {
	// Get the current selection (highlighted text)
	const selection = window.getSelection();

	// Check if there is any text selected
	if (selection.rangeCount > 0) {
		// Get the selected text
		const selectedText = selection.toString();

		// Copy the selected text to the clipboard
		navigator.clipboard.writeText(selectedText);
	}
}

// Simlulates saving a file (context menu)
function saveFile() {
	const content = "";
	const blob = new Blob([content], { type: 'text/plain' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = '_.html'; // Default filename for the saved file
	link.click(); // Triggers the download
}

// Function to show the custom context menu
function showCustomMenu(event) {
	event.preventDefault(); // Prevent default context menu

    // Select the context menu
    const container = document.getElementById("customMenu");

    // Store the original display style
    const originalDisplay = container.style.display;

    // Temporarily show the menu to measure its size
    container.style.display = "block";
    const menuRect = container.getBoundingClientRect();

    // Determine offset based on if device is mobile or not
    let vwOffset, vhOffset;
    if (shouldShowCustomCursor(menuRect)) { // If display size is large enough for desktop view
        vwOffset = menuRect.width * -0.3;
        vhOffset = menuRect.height * -0.55;
    } else { // If display size meets requirements for mobile view
        vwOffset = menuRect.width * -0.3; 
        vhOffset = menuRect.height * -1.3;
    }

    // Restore the original display style (hides menu)
    container.style.display = originalDisplay;

    // Set initial position of context menu (before checking overflow)
    let posX = event.pageX + vwOffset;
    let posY = event.pageY + vhOffset;

    // Get viewport dimensions
    const viewportRect = document.documentElement.getBoundingClientRect();

    // Adjust position if menu overflows the right edge
    if (posX + menuRect.width > viewportRect.width) {
        posX = viewportRect.width - menuRect.width;
    }

    // Adjust position if menu overflows the bottom edge
    if (posY + menuRect.height > viewportRect.height) {
        posY = viewportRect.height - menuRect.height;
    }

    // Adjust position if menu overflows the left edge
    if (posX < 0) {
        posX = 0;
    }

    // Adjust position if menu overflows the top edge
    if (posY < 0) {
        posY = 0;
    }

    // Display menu in the correct position
    container.style.display = "block";
    container.style.top = `${posY}px`;
    container.style.left = `${posX}px`;
}

// To hide the custom context menu
function hideCustomMenu() {
	customMenu.style.display = 'none';
}

// Used to simulate lag on custom cursor and scrolling
function blockFor(ms) {
	const start = Date.now();
	while (Date.now() - start < ms) {} // Busy-wait loop
}

// Function to determine if the custom cursor should be shown
function shouldShowCustomCursor() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // List of common mobile indicators in user agents
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

    return !isMobile; // Show custom cursor only if not a mobile device
}

// Custom cursor
function showCustomCursor() {
	// Remove any existing custom cursor to prevent duplicates
	const oldCursor = document.querySelector(".custom-cursor");
	if (oldCursor) {
		oldCursor.remove();
	}

	// Create a new cursor
	const customCursor = document.createElement("div");
	customCursor.classList.add("custom-cursor");
	document.body.appendChild(customCursor);

	// Resizes cursor image
	const updateCursorSize = () => {
		const cursorSize = Math.min(window.innerWidth, window.innerHeight) * 0.05; // 5% of the smaller dimension
		customCursor.style.setProperty("--current-size", `${cursorSize}px`);
		customCursor.style.width = `var(--current-size)`;
		customCursor.style.height = `var(--current-size)`;
	};

	// Update cursor size on window resize
	window.addEventListener("resize", updateCursorSize);
	updateCursorSize(); // Set initial size when page is first loaded
	
	// Track mouse movement
	const onMouseMove = (e) => {
		blockFor(80); // Wait for 80ms (used to simulate lag)
		customCursor.style.left = `${e.clientX}px`;
		customCursor.style.top = `${e.clientY}px`;
	};

	document.addEventListener("mousemove", onMouseMove);

	// Shrink cursor on mousedown and restore on mouseup
	const shrinkCursor = () => {
		const currentSize = parseFloat(getComputedStyle(customCursor).getPropertyValue("--current-size"));
		const newSize = currentSize * 0.9; // Shrink by 10%
		customCursor.style.setProperty("--current-size", `${newSize}px`);
		customCursor.style.width = `var(--current-size)`;
		customCursor.style.height = `var(--current-size)`;
	};

	const restoreCursor = () => {
		updateCursorSize(); // Reset to original size
	};

	document.addEventListener("mousedown", shrinkCursor);
	document.addEventListener("mouseup", restoreCursor);

	// Hides cursor when mouse leaves viewport
	document.addEventListener("mouseleave", () => {
		customCursor.style.display = "none";
	});

	// Enables cursor again when it enters viewport again
	document.addEventListener("mouseenter", () => {
		customCursor.style.display = "block";
	});
}

// MAIN
// Sets language on page startup
changeLanguage();

// Initialising custom menu styles
const customMenu = document.getElementById('customMenu');

// Add event listener for right-click
document.addEventListener('contextmenu', showCustomMenu);

// Add event listener to hide the menu on click elsewhere
document.addEventListener('click', hideCustomMenu);

// If the device is not mobile, show the custom cursor
if (shouldShowCustomCursor()) {
    showCustomCursor();
}

// Fake "scroll wheel effect" for trackpads on laptops 
document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTime = 0; // Time of the last scroll event

  document.addEventListener("wheel", (event) => {
    // Allow zoom (check for pinch zoom)
    if (event.ctrlKey) {
      return; // If the user is pressing Ctrl (for zooming), do nothing and let the browser handle it
    }

    event.preventDefault(); // Prevent default scrolling behavior

    let now = Date.now();
    let timeDiff = now - lastScrollTime;

    // Reduced step size to slow down the scroll
    let stepSize = 100; // Adjust the step size for slower scrolling

    // Determine the scroll direction
    let scrollAmount = event.deltaY;

    // Emulate distinct scroll steps like a wheel, but slower
    if (Math.abs(scrollAmount) > 0) {
      // Scroll the page in discrete steps
	  blockFor(100); // Wait for 100ms (used for pause when scrolling)
      window.scrollBy(0, scrollAmount > 0 ? stepSize : -stepSize); // Scroll down or up

      // Update the time of the last scroll
      lastScrollTime = now;
    }
  }, { passive: false });
});
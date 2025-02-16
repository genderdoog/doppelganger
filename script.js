// Javascript file for doppelganger website
// Written by GPT-4o, implmented by genderdoog
// https://github.com/genderdoog/doppelganger

// Changes language from english to chinese (and vice versa)
function changeLanguage() {
	if (languageIsChinese) { // To change language to english
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
		
		languageIsChinese = !languageIsChinese; // Switches languageIsChinese from true to false
	
	} else { // To change to chinese
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
		
		languageIsChinese = !languageIsChinese; // Switches languageIsChinese from false to true	
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

const customMenu = document.getElementById('customMenu');

// Function to show the custom context menu
function showCustomMenu(event) {
	event.preventDefault(); // Prevent the default context menu

	const vwOffset = window.innerWidth * -0.05;  // Centers menu from mouse cursor
	const vhOffset = window.innerHeight * -0.16; // Centers menu from mouse cursor
	
	const menuWidth = customMenu.offsetWidth;
	const menuHeight = customMenu.offsetHeight;

	let posX = event.pageX + vwOffset;
	let posY = event.pageY + vhOffset;

	// Displays menu
	customMenu.style.display = 'block';
	customMenu.style.left = `${posX}px`;
	customMenu.style.top = `${posY}px`;
}

// Function to hide the custom context menu
function hideCustomMenu() {
	customMenu.style.display = 'none';
}

// Sets language to chinese when page is first loaded
let languageIsChinese = true;

// Add event listener for right-click
document.addEventListener('contextmenu', showCustomMenu);

// Add event listener to hide the menu on click elsewhere
document.addEventListener('click', hideCustomMenu);

// Everything below is related to the custom cursor 
document.addEventListener("DOMContentLoaded", () => {
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
	

	// Used to simulate lag on custom cursor
	function blockFor(ms) {
		const start = Date.now();
		while (Date.now() - start < ms) {} // Busy-wait loop
	}
	
	// Track mouse movement
	document.addEventListener("mousemove", (e) => {		
		blockFor(80); // Wait for 80ms (used to simulate lag)
		customCursor.style.left = `${e.clientX}px`;
		customCursor.style.top = `${e.clientY}px`;
	});

	// Shrink cursor on mousedown and restore on mouseup
	const shrinkCursor = () => {
		const currentSize = parseFloat(getComputedStyle(customCursor).getPropertyValue("--current-size"));
		const newSize = currentSize * 0.9; // Shrink by 10%
		customCursor.style.setProperty("--current-size", `${newSize}px`);
		customCursor.style.width = `var(--current-size)`;
		customCursor.style.height = `var(--current-size)`;
	};

	// So that it doesn't keep on shrinking
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
});
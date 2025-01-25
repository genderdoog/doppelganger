// Print page functionality
function printPage() {
	window.print();
}

// Copying selected text functionality
function copySelectedText() {
	// Get the current selection (highlighted text)
	const selection = window.getSelection();

	// Check if there is any text selected
	if (selection.rangeCount > 0) {
		// Get the selected text
		const selectedText = selection.toString();

		// Copy the selected text to the clipboard
		navigator.clipboard.writeText(selectedText)
	}
}

// Simlulates saving a file 
function saveFile() {
	const content = " ";
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
  customMenu.style.display = 'block';
  customMenu.style.left = `${event.pageX}px`; // Position the menu at the mouse pointer
  customMenu.style.top = `${event.pageY}px`;
}

// Function to hide the custom context menu
function hideCustomMenu() {
  customMenu.style.display = 'none';
}

// Add event listener for right-click
document.addEventListener('contextmenu', showCustomMenu);

// Add event listener to hide the menu on click elsewhere
document.addEventListener('click', hideCustomMenu);
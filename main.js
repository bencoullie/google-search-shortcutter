// Define core variables
const results = document.querySelectorAll('.rc')
const resultsLength = results.length
const firstResult = results[0]
let currentTargetIndex = 0

// Generic cleanup function
const removeFocus = () => {
  const resultWithFocus = document.querySelector('.shortcutted')

  if (resultWithFocus) {
    document.querySelector('.shortcutted').classList.remove('shortcutted')
  }
}

// Generic target function
const targetResult = result => {
  if (result) {
    // If anything is focussed, remove focus
    removeFocus()

    // Set focus on the given result's anchor tag
    const resultLink = result.querySelector('a')
    resultLink.focus()

    // Add focus class to result
    result.classList.add('shortcutted')
  }
}

// Target the first result on page load
targetResult(firstResult)

// Handle keydown
document.addEventListener('keydown', event => {
  const tabKeyPressed = event.which === 9

  if (tabKeyPressed) {
    // Prevent tab from giving us the usual shitty 'tab' experience
    event.preventDefault()

    // Determine if we should restart the loop
    const reachedLastResult = resultsLength === currentTargetIndex + 1
    let newTarget

    if (reachedLastResult) {
      // Refocus on first result and reset loop
      newTarget = results[0]
      currentTargetIndex = 0
    } else {
      // Move to next result
      currentTargetIndex++
      newTarget = results[currentTargetIndex]
    }

    // Change focus
    targetResult(newTarget)
  }
})

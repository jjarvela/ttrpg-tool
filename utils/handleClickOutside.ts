/**
 * A utility function to detect clicks outside of specified element
 * @param refObject the HTML ref object that should be tracked
 * @param event document-wide mousedown event listener
 * initilialise with
 * document.addEventListener("mousedown", (event) => handleClickOutside(refObject, event, () => {what to do when clicked outside}));
 * @param callback whatever needs to happen if the user clicks outside of the element
 * @returns void
 */

export default function handleClickOutside(
  refObject: React.RefObject<
    HTMLDivElement | HTMLInputElement | HTMLFormElement | HTMLDialogElement
  >,
  event: MouseEvent,
  callback: () => void,
): void {
  if (refObject.current) {
    //get object position constraints
    const top = refObject.current.getBoundingClientRect().top;
    const bottom = top + refObject.current.clientHeight;
    const left = refObject.current.getBoundingClientRect().left;
    const right = left + refObject.current.clientWidth;

    //check if click falls outside of object bounds
    if (event.clientX < left || event.clientX > right) {
      callback();
    } else if (event.clientY < top || event.clientY > bottom) {
      callback();
    } else {
      return;
    }
  }
}

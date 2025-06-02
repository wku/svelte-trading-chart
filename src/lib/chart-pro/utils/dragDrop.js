import { writable } from 'svelte/store';

export const dragState = writable({
  isDragging: false,
  draggedElement: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
});

export function makeDraggable(element, options = {}) {
  const {
    handle = element,
    constrainToParent = true,
    onDragStart = () => {},
    onDrag = () => {},
    onDragEnd = () => {}
  } = options;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  function handleMouseDown(event) {
    if (event.button !== 0) return;

    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;

    const rect = element.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    element.style.position = 'fixed';
    element.style.zIndex = '9999';
    element.classList.add('dragging');

    dragState.set({
      isDragging: true,
      draggedElement: element,
      startX,
      startY,
      currentX: startX,
      currentY: startY
    });

    onDragStart(event);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    event.preventDefault();
  }

  function handleMouseMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    if (constrainToParent) {
      const parent = element.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      newLeft = Math.max(parentRect.left, Math.min(newLeft, parentRect.right - elementRect.width));
      newTop = Math.max(parentRect.top, Math.min(newTop, parentRect.bottom - elementRect.height));
    }

    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;

    dragState.update(state => ({
      ...state,
      currentX: event.clientX,
      currentY: event.clientY
    }));

    onDrag(event, { deltaX, deltaY, newLeft, newTop });
  }

  function handleMouseUp(event) {
    if (!isDragging) return;

    isDragging = false;
    element.classList.remove('dragging');

    dragState.set({
      isDragging: false,
      draggedElement: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    onDragEnd(event);
  }

  handle.addEventListener('mousedown', handleMouseDown);
  handle.style.cursor = 'move';

  return {
    destroy() {
      handle.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };
}

export function createDragHandle(element) {
  const handle = document.createElement('div');
  handle.className = 'drag-handle';
  handle.innerHTML = '⋮⋮';
  handle.title = 'Drag to move panel';

  element.insertBefore(handle, element.firstChild);

  return handle;
}
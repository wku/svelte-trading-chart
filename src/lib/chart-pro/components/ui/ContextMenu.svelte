<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { t } from '../../utils/i18n.js';
  import { openModal } from '../../stores/settingsStore.js';
  import { selectDrawingTool } from '../drawing-tools/drawing.js';
  import { takeScreenshot } from '../chart-toolbar/toolbar.js';

  export let x = 0;
  export let y = 0;
  export let visible = false;
  export let target = null;

  const dispatch = createEventDispatcher();
  let menuElement;

  $: if (visible && menuElement) {
    positionMenu();
  }

  function positionMenu() {
    if (!menuElement) return;

    const rect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    if (x + rect.width > viewportWidth) {
      adjustedX = viewportWidth - rect.width - 10;
    }

    if (y + rect.height > viewportHeight) {
      adjustedY = viewportHeight - rect.height - 10;
    }

    menuElement.style.left = `${adjustedX}px`;
    menuElement.style.top = `${adjustedY}px`;
  }

  function handleAction(action, ...args) {
    dispatch('action', { action, args });
    visible = false;

    switch (action) {
      case 'addIndicator':
        openModal('indicators');
        break;
      case 'takeScreenshot':
        takeScreenshot();
        break;
      case 'drawLine':
        selectDrawingTool('straightLine');
        break;
      case 'drawRectangle':
        selectDrawingTool('rectangle');
        break;
      case 'settings':
        openModal('settings');
        break;
    }
  }

  function handleClickOutside(event) {
    if (visible && menuElement && !menuElement.contains(event.target)) {
      visible = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && visible) {
        visible = false;
      }
    });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

{#if visible}
  <div
    class="context-menu"
    bind:this={menuElement}
    style="left: {x}px; top: {y}px;"
  >
    <div class="menu-item" on:click={() => handleAction('addIndicator')}>
      📊 {t('add_indicator')}
    </div>

    <div class="menu-separator"></div>

    <div class="menu-item" on:click={() => handleAction('drawLine')}>
      📏 {t('draw_line')}
    </div>

    <div class="menu-item" on:click={() => handleAction('drawRectangle')}>
      ⬜ {t('draw_rectangle')}
    </div>

    <div class="menu-separator"></div>

    <div class="menu-item" on:click={() => handleAction('takeScreenshot')}>
      📷 {t('screenshot')}
    </div>

    <div class="menu-item" on:click={() => handleAction('settings')}>
      ⚙️ {t('settings')}
    </div>

    {#if target?.type === 'drawing'}
      <div class="menu-separator"></div>

      <div class="menu-item" on:click={() => handleAction('editDrawing', target.id)}>
        ✏️ {t('edit')}
      </div>

      <div class="menu-item danger" on:click={() => handleAction('deleteDrawing', target.id)}>
        🗑️ {t('delete')}
      </div>
    {/if}
  </div>
{/if}

<style>
  .context-menu {
    position: fixed;
    background: var(--chart-panel-background-color, #ffffff);
    border: 1px solid var(--chart-border-color, #e8e8e8);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    min-width: 180px;
    z-index: 10000;
    font-size: 14px;
    user-select: none;
  }

  .menu-item {
    padding: 8px 16px;
    cursor: pointer;
    color: var(--chart-text-color, #051441);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .menu-item:hover {
    background-color: rgba(22, 119, 255, 0.1);
  }

  .menu-item.danger:hover {
    background-color: rgba(255, 77, 79, 0.1);
    color: #ff4d4f;
  }

  .menu-separator {
    height: 1px;
    background-color: var(--chart-border-color, #e8e8e8);
    margin: 4px 0;
  }
</style>
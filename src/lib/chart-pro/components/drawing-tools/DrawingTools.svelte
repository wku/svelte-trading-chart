<script>
  import {
    selectedDrawingTool,
    isDrawingMode,
    magnetMode,
    overlays,
    selectedOverlay
  } from '../../stores/chartStore.js';
  import { drawingBarVisible } from '../../stores/settingsStore.js';
  import {
    selectDrawingTool,
    setMagnetMode,
    removeSelectedOverlay,
    clearAllOverlays,
    getDrawingToolGroups
  } from './drawing.js';
  import { t } from '../../utils/i18n.js';

  let activeGroup = 'single';
  let showToolDropdown = false;

  $: toolGroups = getDrawingToolGroups();
  $: currentTools = toolGroups[activeGroup] || [];

  function handleToolSelect(tool) {
    selectDrawingTool(tool);
    showToolDropdown = false;
  }

  function getMagnetIcon() {
    switch ($magnetMode) {
      case 'weak_magnet': return '🧲';
      case 'strong_magnet': return '🧲🧲';
      default: return '⭕';
    }
  }

  function getMagnetTitle() {
    switch ($magnetMode) {
      case 'weak_magnet': return 'Weak Magnet (притягивание к ценам)';
      case 'strong_magnet': return 'Strong Magnet (сильное притягивание)';
      default: return 'No Magnet (свободное рисование)';
    }
  }
</script>

{#if $drawingBarVisible}
  <div class="drawing-tools">
    <div class="tool-groups">
      <button
        class="group-btn"
        class:active={activeGroup === 'single'}
        on:click={() => activeGroup = 'single'}
      >
        Lines
      </button>
      <button
        class="group-btn"
        class:active={activeGroup === 'polygon'}
        on:click={() => activeGroup = 'polygon'}
      >
        Shapes
      </button>
      <button
        class="group-btn"
        class:active={activeGroup === 'fibonacci'}
        on:click={() => activeGroup = 'fibonacci'}
      >
        Fibonacci
      </button>
      <button
        class="group-btn"
        class:active={activeGroup === 'wave'}
        on:click={() => activeGroup = 'wave'}
      >
        Waves
      </button>
    </div>

    <div class="tool-selector">
      <button
        class="tool-button"
        class:active={showToolDropdown}
        on:click={() => showToolDropdown = !showToolDropdown}
      >
        {$selectedDrawingTool ? t($selectedDrawingTool) : 'Select Tool'}
        <span class="dropdown-arrow">▼</span>
      </button>

      {#if showToolDropdown}
        <div class="tool-dropdown">
          {#each currentTools as tool}
            <button
              class="tool-item"
              class:active={$selectedDrawingTool === tool.key}
              on:click={() => handleToolSelect(tool.key)}
            >
              {tool.text}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <div class="tool-controls">
      <button
        class="control-btn"
        class:active={$magnetMode !== 'none'}
        on:click={() => {
          const modes = ['none', 'weak_magnet', 'strong_magnet'];
          const currentIndex = modes.indexOf($magnetMode);
          const nextMode = modes[(currentIndex + 1) % modes.length];
          setMagnetMode(nextMode);
        }}
        title={getMagnetTitle()}
      >
        {getMagnetIcon()}
      </button>

      {#if $selectedOverlay}
        <button
          class="control-btn remove"
          on:click={removeSelectedOverlay}
          title="Remove Selected"
        >
          🗑️
        </button>
      {/if}

      {#if $overlays.length > 0}
        <button
          class="control-btn clear"
          on:click={clearAllOverlays}
          title="Clear All"
        >
          🗑️🗑️
        </button>
      {/if}
    </div>

    <div class="overlay-list">
      <span class="overlay-count">{$overlays.length} overlays</span>
    </div>
  </div>
{/if}
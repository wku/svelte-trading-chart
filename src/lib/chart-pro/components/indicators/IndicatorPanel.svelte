<script>
  import {
    mainIndicators,
    subIndicators,
    addMainIndicator,
    removeMainIndicator,
    addSubIndicator,
    removeSubIndicator
  } from '../../stores/chartStore.js';
  import { modalStates, closeModal } from '../../stores/settingsStore.js';
  import {
    toggleMainIndicator,
    toggleSubIndicator,
    getAvailableIndicators
  } from './indicators.js';
  import { createTooltip, getIndicatorTooltip } from '../../utils/indicatorTooltips.js';
  import { t } from '../../utils/i18n.js';

  $: availableIndicators = getAvailableIndicators();
  $: isOpen = $modalStates.indicators;

  function handleMainIndicatorToggle(indicator) {
    if ($mainIndicators.includes(indicator)) {
      removeMainIndicator(indicator);
    } else {
      addMainIndicator(indicator);
    }
    toggleMainIndicator(indicator);
  }

  function handleSubIndicatorToggle(indicator) {
    if ($subIndicators.includes(indicator)) {
      removeSubIndicator(indicator);
    } else {
      addSubIndicator(indicator);
    }
    toggleSubIndicator(indicator);
  }

  function handleClose() {
    closeModal('indicators');
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  function createIndicatorTooltip(node, indicatorType) {
    return createTooltip(node, getIndicatorTooltip(indicatorType));
  }
</script>

{#if isOpen}
  <button
    class="modal-overlay"
    on:click={handleClose}
    on:keydown={handleKeydown}
    aria-label="Close modal"
  >
    <div
      class="indicator-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      on:click={handleModalClick}
    >
      <div class="panel-header">
        <h3 id="modal-title">{t('indicator')}</h3>
        <button class="close-btn" on:click={handleClose} aria-label="Close">×</button>
      </div>

      <div class="panel-content">
        <div class="indicator-section">
          <h4>{t('main_indicator')}</h4>
          <div class="indicator-grid">
            {#each availableIndicators.main as indicator}
              <label
                class="indicator-item"
                use:createIndicatorTooltip={indicator.key}
              >
                <input
                  type="checkbox"
                  checked={$mainIndicators.includes(indicator.key)}
                  on:change={() => handleMainIndicatorToggle(indicator.key)}
                  aria-describedby="indicator-{indicator.key}-desc"
                />
                <span class="indicator-name">{indicator.text}</span>
                <span class="indicator-type" id="indicator-{indicator.key}-desc">{indicator.key}</span>
              </label>
            {/each}
          </div>
        </div>

        <div class="indicator-section">
          <h4>{t('sub_indicator')}</h4>
          <div class="indicator-grid">
            {#each availableIndicators.sub as indicator}
              <label
                class="indicator-item"
                use:createIndicatorTooltip={indicator.key}
              >
                <input
                  type="checkbox"
                  checked={$subIndicators.includes(indicator.key)}
                  on:change={() => handleSubIndicatorToggle(indicator.key)}
                  aria-describedby="indicator-{indicator.key}-desc"
                />
                <span class="indicator-name">{indicator.text}</span>
                <span class="indicator-type" id="indicator-{indicator.key}-desc">{indicator.key}</span>
              </label>
            {/each}
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <button class="btn-secondary" on:click={handleClose}>
          {t('cancel')}
        </button>
        <button class="btn-primary" on:click={handleClose}>
          {t('confirm')}
        </button>
      </div>
    </div>
  </button>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .indicator-panel {
    background-color: var(--chart-background-color, #ffffff);
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: default;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--chart-border-color, #e8e8e8);
  }

  .panel-header h3 {
    margin: 0;
    color: var(--chart-text-color, #051441);
    font-size: 16px;
    font-weight: 600;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--chart-text-secondary-color, #999);
    padding: 4px;
    line-height: 1;
  }

  .close-btn:hover {
    color: var(--chart-text-color, #051441);
  }

  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  .indicator-section {
    margin-bottom: 24px;
  }

  .indicator-section h4 {
    margin: 0 0 12px 0;
    color: var(--chart-text-color, #051441);
    font-size: 14px;
    font-weight: 600;
  }

  .indicator-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px;
  }

  .indicator-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--chart-border-color, #e8e8e8);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--chart-panel-background-color, #ffffff);
  }

  .indicator-item:hover {
    border-color: var(--chart-primary-color, #1677ff);
    background-color: rgba(22, 119, 255, 0.05);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.1);
  }

  .indicator-item input[type="checkbox"] {
    margin-right: 8px;
    accent-color: var(--chart-primary-color, #1677ff);
  }

  .indicator-name {
    flex: 1;
    color: var(--chart-text-color, #051441);
    font-size: 14px;
  }

  .indicator-type {
    font-size: 12px;
    color: var(--chart-text-secondary-color, #999);
    font-family: monospace;
    background: var(--chart-panel-background-color, #f5f5f5);
    padding: 2px 6px;
    border-radius: 3px;
    margin-left: 8px;
  }

  .panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid var(--chart-border-color, #e8e8e8);
  }

  .btn-secondary,
  .btn-primary {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary {
    background: transparent;
    border: 1px solid var(--chart-border-color, #e8e8e8);
    color: var(--chart-text-color, #051441);
  }

  .btn-secondary:hover {
    background-color: var(--chart-panel-background-color, #f5f5f5);
  }

  .btn-primary {
    background: var(--chart-primary-color, #1677ff);
    border: 1px solid var(--chart-primary-color, #1677ff);
    color: #ffffff;
  }

  .btn-primary:hover {
    background: #0958d9;
    border-color: #0958d9;
  }
</style>
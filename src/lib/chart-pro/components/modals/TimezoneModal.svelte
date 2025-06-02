<script>
  import { modalStates, closeModal, timezone, setTimezone } from '../../stores/settingsStore.js';
  import { getTimezoneOptions } from './modals.js';
  import { t } from '../../utils/i18n.js';

  $: isOpen = $modalStates.timezone;
  $: timezoneOptions = getTimezoneOptions();

  function handleClose() {
    closeModal('timezone');
  }

  function handleTimezoneChange(newTimezone) {
    setTimezone(newTimezone);
    handleClose();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
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
      class="timezone-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timezone-modal-title"
      on:click={handleModalClick}
    >
      <div class="modal-header">
        <h3 id="timezone-modal-title">{t('timezone')}</h3>
        <button class="close-btn" on:click={handleClose} aria-label="Close">×</button>
      </div>

      <div class="modal-content">
        <div class="timezone-list" role="listbox" aria-label="Select timezone">
          {#each timezoneOptions as option}
            <button
              class="timezone-item"
              class:active={$timezone === option.key}
              on:click={() => handleTimezoneChange(option.key)}
              role="option"
              aria-selected={$timezone === option.key}
            >
              {option.text}
            </button>
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" on:click={handleClose}>
          {t('cancel')}
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
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .timezone-modal {
    background-color: var(--chart-background-color, #ffffff);
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: default;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--chart-border-color, #ebedf1);
    background-color: rgba(22, 119, 255, 0.02);
  }

  .modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--chart-text-color, #051441);
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #76808f;
    cursor: pointer;
    padding: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .close-btn:hover {
    color: var(--chart-text-color, #051441);
    background-color: rgba(22, 119, 255, 0.1);
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  .timezone-list {
    display: grid;
    gap: 4px;
    max-height: 400px;
    overflow-y: auto;
    padding: 8px 0;
  }

  .timezone-item {
    display: block;
    width: 100%;
    padding: 12px 20px;
    border: none;
    background: none;
    color: var(--chart-text-color, #051441);
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
  }

  .timezone-item:hover {
    background-color: rgba(22, 119, 255, 0.1);
  }

  .timezone-item:focus {
    outline: 2px solid #1677ff;
    outline-offset: -2px;
  }

  .timezone-item.active {
    background-color: #1677ff;
    color: #ffffff;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid var(--chart-border-color, #ebedf1);
    background-color: rgba(22, 119, 255, 0.02);
  }

  .btn-secondary {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    background-color: var(--chart-background-color, #ffffff);
    color: var(--chart-text-color, #051441);
    border: 1px solid var(--chart-border-color, #ebedf1);
  }

  .btn-secondary:hover {
    background-color: rgba(22, 119, 255, 0.1);
    border-color: #1677ff;
  }
</style>
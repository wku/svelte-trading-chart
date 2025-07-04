<script>
  import { modalStates, closeModal, chartStyles, setChartStyleValue, resetToDefaults } from '../../stores/settingsStore.js';
  import { getSettingsOptions, applySettings } from './modals.js';
  import { t } from '../../utils/i18n.js';

  $: isOpen = $modalStates.settings;
  $: settingsOptions = getSettingsOptions();

  function handleClose() {
    closeModal('settings');
  }

  function handleSettingChange(key, value) {
    setChartStyleValue(key, value);
  }

  function handleApply() {
    applySettings($chartStyles);
    handleClose();
  }

  function handleReset() {
    resetToDefaults();
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  function getSettingValue(key) {
    const keys = key.split('.');
    let value = $chartStyles;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
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
      class="settings-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      on:click={handleModalClick}
    >
      <div class="modal-header">
        <h3 id="settings-modal-title">{t('setting')}</h3>
        <button class="close-btn" on:click={handleClose} aria-label="Close">×</button>
      </div>

      <div class="modal-content">
        {#each settingsOptions as option, index}
          <div class="setting-item">
            {#if option.component === 'select'}
              <label class="setting-label" for="setting-{index}">{option.text}</label>
              <select
                id="setting-{index}"
                class="setting-select"
                value={getSettingValue(option.key)}
                on:change={(e) => handleSettingChange(option.key, e.target.value)}
              >
                {#each option.dataSource as item}
                  <option value={item.key}>{item.text}</option>
                {/each}
              </select>
            {:else if option.component === 'switch'}
              <span class="setting-label">{option.text}</span>
              <label class="switch" for="switch-{index}">
                <input
                  id="switch-{index}"
                  type="checkbox"
                  checked={getSettingValue(option.key)}
                  on:change={(e) => handleSettingChange(option.key, e.target.checked)}
                />
                <span class="slider"></span>
              </label>
            {/if}
          </div>
        {/each}
      </div>

      <div class="modal-footer">
        <button class="btn-reset" on:click={handleReset}>
          {t('restore_default')}
        </button>
        <div class="btn-group">
          <button class="btn-secondary" on:click={handleClose}>
            {t('cancel')}
          </button>
          <button class="btn-primary" on:click={handleApply}>
            {t('confirm')}
          </button>
        </div>
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

  .settings-modal {
    background-color: var(--chart-background-color, #ffffff);
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
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

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(22, 119, 255, 0.1);
  }

  .setting-item:last-child {
    border-bottom: none;
  }

  .setting-label {
    font-size: 14px;
    color: var(--chart-text-color, #051441);
    font-weight: 500;
  }

  .setting-select {
    padding: 6px 12px;
    border: 1px solid var(--chart-border-color, #ebedf1);
    border-radius: 4px;
    background-color: var(--chart-background-color, #ffffff);
    color: var(--chart-text-color, #051441);
    font-size: 14px;
    min-width: 120px;
  }

  .setting-select:focus {
    outline: none;
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #1677ff;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-top: 1px solid var(--chart-border-color, #ebedf1);
    background-color: rgba(22, 119, 255, 0.02);
  }

  .btn-group {
    display: flex;
    gap: 12px;
  }

  .btn-primary, .btn-secondary, .btn-reset {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .btn-primary {
    background-color: #1677ff;
    color: #ffffff;
    border: 1px solid #1677ff;
  }

  .btn-primary:hover {
    background-color: #0056cc;
    border-color: #0056cc;
  }

  .btn-secondary {
    background-color: var(--chart-background-color, #ffffff);
    color: var(--chart-text-color, #051441);
    border: 1px solid var(--chart-border-color, #ebedf1);
  }

  .btn-secondary:hover {
    background-color: rgba(22, 119, 255, 0.1);
    border-color: #1677ff;
  }

  .btn-reset {
    background-color: #ff4d4f;
    color: #ffffff;
    border: 1px solid #ff4d4f;
  }

  .btn-reset:hover {
    background-color: #d43030;
    border-color: #d43030;
  }

  @media (max-width: 768px) {
    .settings-modal {
      width: 95%;
      max-height: 90vh;
    }

    .modal-content {
      padding: 16px;
    }

    .setting-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 16px 0;
    }

    .setting-select {
      width: 100%;
    }

    .modal-footer {
      flex-direction: column;
      gap: 12px;
    }

    .btn-group {
      width: 100%;
      flex-direction: column-reverse;
    }

    .btn-primary, .btn-secondary, .btn-reset {
      width: 100%;
    }
  }
</style>
<script>
  import {
    currentSymbol,
    currentPeriod,
    availablePeriods,
    updatePeriod,
    filteredSymbols,
    setSearchQuery
  } from '../../stores/chartStore.js';
  import {
    theme,
    setTheme,
    openModal,
    toggleDrawingBar,
    setFullscreen,
    fullscreen
  } from '../../stores/settingsStore.js';
  import { handlePeriodChange, handleSymbolSearch, toggleTheme, takeScreenshot } from './toolbar.js';
  import { t } from '../../utils/i18n.js';

  let searchValue = '';
  let showSymbolDropdown = false;
  let showPeriodDropdown = false;

  function handleSearchInput(event) {
    searchValue = event.target.value;
    setSearchQuery(searchValue);
    showSymbolDropdown = searchValue.length > 0;
  }

  function selectSymbol(symbol) {
    handleSymbolSearch(symbol);
    searchValue = symbol.ticker;
    showSymbolDropdown = false;
  }

  function selectPeriod(period) {
    handlePeriodChange(period);
    showPeriodDropdown = false;
  }

  function handleFullscreen() {
    const newFullscreen = !$fullscreen;
    setFullscreen(newFullscreen);

    if (newFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
</script>

<div class="toolbar">
  <div class="toolbar-section">
    <div class="symbol-search">
      <input
        type="text"
        placeholder={t('symbol_search')}
        bind:value={searchValue}
        on:input={handleSearchInput}
        on:focus={() => showSymbolDropdown = searchValue.length > 0}
      />
      {#if showSymbolDropdown && $filteredSymbols.length > 0}
        <div class="symbol-dropdown">
          {#each $filteredSymbols.slice(0, 10) as symbol}
            <div class="symbol-item" role="button" tabindex="0"
                 on:click={() => selectSymbol(symbol)}
                 on:keydown={(e) => e.key === 'Enter' && selectSymbol(symbol)}>
              <span class="symbol-ticker">{symbol.ticker}</span>
              <span class="symbol-name">{symbol.shortName}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <div class="period-selector">
      <button
        class="period-button"
        on:click={() => showPeriodDropdown = !showPeriodDropdown}
      >
        {$currentPeriod.text}
        <span class="dropdown-arrow">▼</span>
      </button>
      {#if showPeriodDropdown}
        <div class="period-dropdown">
          {#each $availablePeriods as period}
            <button
              class="period-item"
              class:active={period.text === $currentPeriod.text}
              on:click={() => selectPeriod(period)}
            >
              {period.text}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="toolbar-section">
    <button class="toolbar-btn" on:click={() => openModal('indicators')} title={t('indicator')}>
      {t('indicator')}
    </button>

    <button class="toolbar-btn" on:click={toggleDrawingBar} title="Toggle Drawing Tools">
      Drawing
    </button>

    <button class="toolbar-btn" on:click={toggleTheme} title={$theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}>
      {$theme === 'light' ? '🌙' : '☀️'}
    </button>

    <button class="toolbar-btn" on:click={() => openModal('settings')} title={t('setting')}>
      {t('setting')}
    </button>

    <button class="toolbar-btn" on:click={() => openModal('timezone')} title={t('timezone')}>
      {t('timezone')}
    </button>

    <button class="toolbar-btn" on:click={takeScreenshot} title={t('screenshot')}>
      {t('screenshot')}
    </button>

    <button class="toolbar-btn" on:click={handleFullscreen} title={$fullscreen ? t('exit_full_screen') : t('full_screen')}>
      {$fullscreen ? t('exit_full_screen') : t('full_screen')}
    </button>
  </div>
</div>
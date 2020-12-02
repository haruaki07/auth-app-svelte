<style lang="postcss">
  .error {
    @apply flex justify-center items-center flex-col h-full;
    &-code {
      font-size: 26px;
      padding: 0 15px 0 15px;
      @apply text-center border-black border-r-2;
    }
    &-message {
      font-size: 18px;
      @apply text-center;
    }
  }
</style>

<div class="error">
  <div class="flex items-center">
    <div class="error-code">404</div>
    <div class="error-message" style="padding: 10px;">The requested path couldn't be found</div>
  </div>
</div>
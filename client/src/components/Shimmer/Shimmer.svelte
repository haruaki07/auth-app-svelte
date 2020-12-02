<script>
  export let width = "100%";
  export let height = "100px";
  export let borderRadius = "0px";
  export let backgroundColor = "#f6f7f8";
  export let highlightColor = "#edeef1";
</script>

<style lang="postcss">
  .shimmer {
    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    animation: shimmer-slide 1s infinite linear;
    background: var(--background-color);
    background-image: linear-gradient(
      to right,
      var(--background-color) 0%,
      var(--highlight-color) 20%,
      var(--background-color) 40%,
      var(--background-color) 100%
    );
    background-size: 800px;
    background-repeat: no-repeat;
  }

  @keyframes shimmer-slide {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }
</style>

<div
  class="shimmer"
  style="--width:{width}; --height:{height}; --border-radius:{borderRadius}; --background-color:{backgroundColor}; --highlight-color:{highlightColor};"
/>
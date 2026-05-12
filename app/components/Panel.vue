<script lang="ts">
import type { ComponentConfig } from "@nuxt/ui";
import type { AppConfig } from "@nuxt/schema";

const MDC = resolveComponent("MDC");

const theme = {
  slots: {
    root: "max-w-7xl mx-auto py-4",
    header: "px-4 sm:px-6",
    label: "font-space-grotesk text-3xl md:text-4xl font-bold text-foreground uppercase",
    labelSuffix: "text-transparent [-webkit-text-stroke:1.5px_var(--color-foreground)]",
    body: "px-4 sm:px-6 a[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  },
};

type Panel = ComponentConfig<typeof theme, AppConfig, "panel">;

interface PanelProps {
  id?: string;
  label?: string;
  value?: string;
  class?: string;
  ui?: Panel["slots"];
}

interface PanelSlots {
  default?(props: {}): VNode[];
  header?(props: {}): VNode[];
  label?(props: {}): VNode[];
  body?(props: {}): VNode[];
}
</script>

<script setup lang="ts">
import { splitByCase } from "scule";
import { tv } from "tailwind-variants";

const props = withDefaults(defineProps<PanelProps>(), {
  id: undefined,
  value: "",
});

const labelParts = computed(() => splitByCase(props.label ?? ""));
const labelSuffix = computed(() => labelParts.value.at(-1));
const labelPrefix = computed(() => {
  const suffix = labelSuffix.value;
  return suffix ? props.label?.replace(new RegExp(`${suffix}$`), "") : props.label;
});

const slots = defineSlots<PanelSlots>();

const ui = computed(() => tv({ extend: theme })());
</script>

<template>
  <section :id="id" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <slot>
      <div :class="ui.header({ class: props.ui?.header })">
        <slot name="header">
          <h2 :class="ui.label({ class: props.ui?.label })">
            <slot name="label">
              {{ labelPrefix }}
              <span :class="ui.labelSuffix({ class: props.ui?.labelSuffix })">
                {{ labelSuffix }}
              </span>
            </slot>
          </h2>
        </slot>
      </div>

      <component
        :is="!!props.value ? MDC : 'div'"
        :value="props.value"
        :class="ui.body({ class: props.ui?.body })"
      >
        <slot name="body" />
      </component>
    </slot>
  </section>
</template>

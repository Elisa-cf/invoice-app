<template>
  <div class="w-11/12 mx-auto max-w-2xl py-6 flex justify-between items-center">
    <div
      v-for="step in numberOfSteps"
      :key="step"
      :class="dynamicWizardClasses(step)"
      class="flex items-center justify-center font-bold w-full h-12 border-t-2 border-b-2"
    >
      {{ step === numberOfSteps ? 'FINALIZE' : `STEP ${step}` }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['currentStep', 'numberOfSteps']);

const baseStyles = {
  active:
    'bg-gradient-to-r from-blue1 via-blue5 via-85% to-grey4 text-white border-blue5',
  inactive: 'bg-blue1 text-blue1 border-blue5',
  inactiveGrey: 'bg-grey4 text-grey4 border-blue5',
  leftBorder: 'border-l-2 rounded-l-md',
  rightBorder: 'border-r-2 rounded-r-full',
};

const dynamicWizardClasses = step => {
  const classes = [];

  if (step === props.currentStep) {
    classes.push(baseStyles.active);
  } else if (step < props.currentStep) {
    classes.push(baseStyles.inactive);
  } else {
    classes.push(baseStyles.inactiveGrey);
  }

  if (step === 1) classes.push(baseStyles.leftBorder);
  if (step === props.numberOfSteps) classes.push(baseStyles.rightBorder);

  return classes.join(' ');
};
</script>

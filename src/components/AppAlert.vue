<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

type AlertType = 'info' | 'success' | 'warning' | 'error'

interface Props {
    type: AlertType
    dismissible: boolean
}

interface Map extends Record<AlertType, string> {
    info: string
    success: string
    warning: string
    error: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'info',
    dismissible: false,
})

const emit = defineEmits<{
    dismiss: [payload: boolean]
}>()

const classes = computed(() => {
    const map: Map = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error',
    }

    return `alert ${map[props.type]}`
})

const dismissed = ref<boolean>(false)

const transitionDuration: number = 500
const transitionCssRule: string = `all ${transitionDuration}ms`

function handleDismiss(): void {
    dismissed.value = true
    setTimeout(() => {
        emit('dismiss', true)
    }, transitionDuration)
}

const icon = computed<string>(() => {
    if (!props.type) {
        return 'carbon:information'
    }

    const map: Map = {
        info: 'carbon:information',
        success: 'carbon:checkmark-outline',
        warning: 'carbon:warning',
        error: 'carbon:error',
    }

    return map[props.type]
})
</script>
<template>
    <Transition>
        <div v-if="!dismissed" role="alert" class="alert" :class="classes">
            <Icon :icon="icon" width="1.5rem" />
            <span><slot></slot></span>
            <button
                @click="handleDismiss"
                v-if="dismissible"
                type="button"
                class="text-lg close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </Transition>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: v-bind(transitionCssRule);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>

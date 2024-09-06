import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

// you should write tests in order to verify the user's solution
// these test will run to verify the user's solution

beforeEach(() => {
    mount(App)
})

describe('The challenge', () => {
    it('sanity check', () => {
        expect(true).toBe(true)
    })
})

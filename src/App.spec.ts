import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import '@testing-library/jest-dom/vitest'
import App from './App.vue'

describe('App', () => {
  it('initially shows user is not authenticated', () => {
    render(App)
    expect(screen.getByText('Not authenticated')).toBeInTheDocument()
  })
})

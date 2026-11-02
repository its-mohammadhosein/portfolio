'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useSyncExternalStore } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

export const ThemeSelector: React.FC = () => {
  // Re-renders via the theme context after setTheme, which re-reads the stored preference
  const { setTheme } = useTheme()
  const value = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(themeLocalStorageKey) ?? 'auto',
    () => '',
  )

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    setTheme(themeToSet === 'auto' ? null : themeToSet)
  }

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}

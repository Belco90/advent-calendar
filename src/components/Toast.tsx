'use client'

import { Toast as ArkToast } from '@ark-ui/react'

import { createStyleContext } from '@/lib/create-style-context'
import { panda } from '@/styled-system/jsx'
import { toast } from '@/styled-system/recipes'

const { withProvider, withContext } = createStyleContext(toast)

export const ToastRoot = withProvider(panda(ArkToast.Root), 'root')
export const ToastCloseTrigger = withContext(
	panda(ArkToast.CloseTrigger),
	'closeTrigger',
)
export const ToastDescription = withContext(
	panda(ArkToast.Description),
	'description',
)
export const ToastTitle = withContext(panda(ArkToast.Title), 'title')

export const Toast = Object.assign(ToastRoot, {
	Root: ToastRoot,
	CloseTrigger: ToastCloseTrigger,
	Description: ToastDescription,
	Title: ToastTitle,
})

export type ToastProps = typeof ToastRoot
export type ToastCloseTriggerProps = typeof ToastCloseTrigger
export type ToastDescriptionProps = typeof ToastDescription
export type ToastTitleProps = typeof ToastTitle

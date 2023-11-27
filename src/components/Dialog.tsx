'use client'

import * as Ark from '@ark-ui/react/dialog'

import { createStyleContext } from '@/lib/create-style-context'
import { panda } from '@/styled-system/jsx'
import { dialog, type DialogVariantProps } from '@/styled-system/recipes'

const { withProvider, withContext } = createStyleContext(dialog)

export * from '@ark-ui/react/dialog'
export type DialogProps = Ark.DialogProps & DialogVariantProps

const DialogRoot = withProvider(panda(Ark.Dialog.Root))
export const DialogBackdrop = withContext(
	panda(Ark.Dialog.Backdrop),
	'backdrop',
)
export const DialogCloseTrigger = withContext(
	panda(Ark.Dialog.CloseTrigger),
	'closeTrigger',
)
export const DialogContent = withContext(panda(Ark.Dialog.Content), 'content')
export const DialogDescription = withContext(
	panda(Ark.Dialog.Description),
	'description',
)
export const DialogPositioner = withContext(
	panda(Ark.Dialog.Positioner),
	'positioner',
)
export const DialogTitle = withContext(panda(Ark.Dialog.Title), 'title')
export const DialogTrigger = withContext(panda(Ark.Dialog.Trigger), 'trigger')

export const Dialog = Object.assign(DialogRoot, {
	Root: DialogRoot,
	Backdrop: DialogBackdrop,
	CloseTrigger: DialogCloseTrigger,
	Positioner: DialogPositioner,
	Content: DialogContent,
	Description: DialogDescription,
	Title: DialogTitle,
	Trigger: DialogTrigger,
})

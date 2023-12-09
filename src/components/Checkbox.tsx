import { Checkbox as ArkCheckbox } from '@ark-ui/react'

import { createStyleContext } from '@/lib/create-style-context'
import { panda, type HTMLPandaProps } from '@/styled-system/jsx'
import { checkbox } from '@/styled-system/recipes'

const { withProvider, withContext } = createStyleContext(checkbox)

const Checkbox = withProvider(panda(ArkCheckbox.Root), 'root')
const CheckboxControl = withContext(panda(ArkCheckbox.Control), 'control')
const CheckboxIndicator = withContext(panda(ArkCheckbox.Indicator), 'indicator')
const CheckboxLabel = withContext(panda(ArkCheckbox.Label), 'label')

const Root = Checkbox
const Control = CheckboxControl
const Indicator = CheckboxIndicator
const Label = CheckboxLabel

export {
	Checkbox,
	CheckboxControl,
	CheckboxIndicator,
	CheckboxLabel,
	Control,
	Indicator,
	Label,
	Root,
}

export type CheckboxProps = HTMLPandaProps<typeof Checkbox>
export type CheckboxControlProps = HTMLPandaProps<typeof CheckboxControl>
export type CheckboxIndicatorProps = HTMLPandaProps<typeof CheckboxIndicator>
export type CheckboxLabelProps = HTMLPandaProps<typeof CheckboxLabel>

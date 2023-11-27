'use client'

import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'

import { createStyleContext } from '@/lib/create-style-context'
import { panda } from '@/styled-system/jsx'
import { card, type CardVariantProps } from '@/styled-system/recipes'

const { withProvider, withContext } = createStyleContext(card)

export type CardProps = CardVariantProps &
	ComponentPropsWithoutRef<typeof ark.div>

const CardRoot = withProvider(panda(ark.div), 'root')
export const CardBody = withContext(panda(ark.div), 'body')
export const CardDescription = withContext(panda(ark.p), 'description')
export const CardFooter = withContext(panda(ark.div), 'footer')
export const CardHeader = withContext(panda(ark.div), 'header')
export const CardTitle = withContext(panda(ark.h3), 'title')

export const Card = Object.assign(CardRoot, {
	Root: CardRoot,
	Body: CardBody,
	Description: CardDescription,
	Footer: CardFooter,
	Header: CardHeader,
	Title: CardTitle,
})

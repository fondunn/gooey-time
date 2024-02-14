'use client'
import { numbers } from '@/constants/numbers'
import { animate } from 'framer-motion'
import { memo, useEffect, useRef } from 'react'
import styles from './style.module.scss'

const SvgNumber = ({ number }: { number: number }) => {
	const paths = useRef<SVGPathElement[]>([])
	const circles = useRef<SVGPathElement[]>([])
	const nbOfCircles = 25
	const radius = 10

	useEffect(() => {
		const pathsArray = paths.current as SVGPathElement[]
		const length = pathsArray[number].getTotalLength()
		const step = length / nbOfCircles
		circles.current.forEach((circle, i) => {
			const { x, y } = pathsArray[number].getPointAtLength(i * step)
			animate(circle, { cx: x, cy: y }, { delay: 0.012 * i, ease: 'easeOut' })
		})
	}, [number])

	return (
		<svg viewBox='0 0 256 256' className={styles.svg}>
			<defs>
				<filter id='filter'>
					<feGaussianBlur in='SourceAlpha' stdDeviation={5} result='blur' />
					<feColorMatrix
						in='blur'
						mode='matrix'
						values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -5'
						result='filter'
					/>
				</filter>
			</defs>
			{numbers.map((d, i) => (
				<path
					key={i}
					ref={(ref: SVGPathElement | null) => (paths.current[i] = ref!)}
					d={d}
				/>
			))}
			<g>
				{[...Array(nbOfCircles)].map((_, i) => (
					<circle
						key={i}
						r={radius}
						cx={64}
						cy={64}
						ref={(ref: SVGPathElement | null) => (circles.current[i] = ref!)}
					/>
				))}
			</g>
		</svg>
	)
}

export default memo(SvgNumber)

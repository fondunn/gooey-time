'use client'

import { useEffect, useMemo, useState } from 'react'
import SvgNumber from '../SvgNumber'
import styles from './style.module.scss'
export const Clock = () => {
	const [timeDigits, setTimeDigits] = useState<null | number[]>(null)
	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date()
			const hours = currentTime.getHours()
			const minutes = currentTime.getMinutes()
			const seconds = currentTime.getSeconds()

			const hoursTensDigit = Math.floor(hours / 10)
			const hoursOnesDigit = hours % 10
			const minutesTensDigit = Math.floor(minutes / 10)
			const minutesOnesDigit = minutes % 10
			const secondsTensDigit = Math.floor(seconds / 10)
			const secondsOnesDigit = seconds % 10

			setTimeDigits([
				hoursTensDigit,
				hoursOnesDigit,
				minutesTensDigit,
				minutesOnesDigit,
				secondsTensDigit,
				secondsOnesDigit,
			])
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const memoizedSvgNumbers = useMemo(
		() =>
			timeDigits &&
			timeDigits.map((digit, index) => (
				<SvgNumber key={index} number={digit} />
			)),
		[timeDigits]
	)

	return (
		<div className={styles.clock}>
			{memoizedSvgNumbers && (
				<>
					<div className={styles.hours}>
						{memoizedSvgNumbers[0]}
						{memoizedSvgNumbers[1]}
					</div>
					<span className={[styles.divider, styles['d-1']].join(' ')}></span>
					<div className={styles.minutes}>
						{memoizedSvgNumbers[2]}
						{memoizedSvgNumbers[3]}
					</div>
					<span className={[styles.divider, styles['d-2']].join(' ')}></span>
					<div className={styles.seconds}>
						{memoizedSvgNumbers[4]}
						{memoizedSvgNumbers[5]}
					</div>
				</>
			)}
		</div>
	)
}

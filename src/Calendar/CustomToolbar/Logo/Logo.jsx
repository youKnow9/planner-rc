import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import styles from './Logo.module.scss'

const Trail = ({ open, children }) => {
	const items = React.Children.toArray(children)
	const trail = useTrail(items.length, {
		config: { mass: 5, tension: 700, friction: 250 },
		opacity: open ? 1 : 0,
		x: open ? 0 : 20,
		height: open ? 110 : 0,
		from: { opacity: 0, x: 20, height: 0 },
	})
	return (
		<div>
		{trail.map(({ height, ...style }, index) => (
			<a.div key={index} className={styles.trailsText} style={style}>
				{items[index].props.children === 'event' ? (
					<a.div className={styles.event} style={{ height }}>
						{items[index]}
					</a.div>
					) : (
					<a.div style={{ height }}>{items[index]}</a.div>
				)}
			</a.div>
		))}
		</div>
	)
}

export default function Model() {
	const [open, set] = useState(true)
	return (
		<div className={styles.container} onClick={() => set(state => !state)}>
			<Trail open={open}>
				<span>planner</span>
				<span>event</span>
			</Trail>
		</div>
	)
}
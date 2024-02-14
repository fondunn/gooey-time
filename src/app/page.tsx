import { Clock } from '@/components/Clock'
import { GooeyTitle } from '@/components/GooeyTitle'

const Home: React.FC = () => {
	return (
		<main>
			<GooeyTitle />
			<Clock />
		</main>
	)
}

export default Home

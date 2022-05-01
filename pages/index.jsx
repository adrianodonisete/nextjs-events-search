import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
	return (
		<div>
			<EventList items={props.events} />
		</div>
	);
}

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();

	const halfHour = 1800;

	return {
		props: {
			events: featuredEvents,
		},
		revalidate: halfHour,
	};
};

export default HomePage;

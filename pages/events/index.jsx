import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util';

function AllEventsPage(props) {
	const router = useRouter();

	const events = props.events;

	function findEventsHandler(year, month) {
		router.push(`/events/${year}/${month}`);
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export const getStaticProps = async () => {
	const events = await getAllEvents();

	const thirtySeconds = 30;

	return {
		props: {
			events: events ?? [],
		},
		revalidate: thirtySeconds,
	};
};

export default AllEventsPage;

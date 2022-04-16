import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
	const allEvents = getAllEvents();
	const router = useRouter();

	function findEventsHandler(year, month) {
		router.push(`/events/${year}/${month}`);
	}

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={allEvents} />
		</Fragment>
	);
}

export default AllEventsPage;

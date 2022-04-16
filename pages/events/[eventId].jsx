import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getEventById } from '../../dummy-data';

function EventDetailPage() {
	const router = useRouter();

	const eventId = router.query.eventId;
	const event = getEventById(eventId);

	if (!event) {
		return <p>No event found!</p>;
	}

	const { title, description, location, date, image } = event;

	return (
		<Fragment>
			<EventSummary title={title} />
			<EventLogistics date={date} address={location} image={image} imageAlt={title} />
			<EventContent>
				<p>{description}</p>
			</EventContent>
		</Fragment>
	);
}

export default EventDetailPage;

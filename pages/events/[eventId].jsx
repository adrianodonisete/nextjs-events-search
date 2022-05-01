import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
	if (props.event === null) {
		return (
			<ErrorAlert>
				<p>Event not found!</p>
			</ErrorAlert>
		);
	}

	if (!props.event) {
		return (
			<div classname="center">
				<p>Loading...</p>
			</div>
		);
	}

	const { title, description, location, date, image } = props.event;

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

export const getStaticProps = async context => {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	const thirtySeconds = 30;

	return {
		props: {
			event: event ?? null,
		},
		revalidate: thirtySeconds,
	};
};

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map(event => ({ params: { eventId: event.id } }));

	return {
		paths: paths,
		fallback: 'blocking',
	};
};

export default EventDetailPage;

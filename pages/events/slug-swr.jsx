import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { FIREBASE_URL } from '../../utils/constants';

function FilteredEventsPage() {
	const [events, setEvents] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	function findEventsHandler(year, month) {
		router.push(`/events/${year}/${month}`);
	}

	function errorShowMessage(message, year, month) {
		return (
			<Fragment>
				<EventsSearch onSearch={findEventsHandler} year={year} month={month} />
				<ErrorAlert>{message}</ErrorAlert>
			</Fragment>
		);
	}

	const arrData = router.query.slug;

	const { data, error } = useSWR(FIREBASE_URL);

	useEffect(() => {
		if (data) {
			const auxEvents = [];

			for (const key in data) {
				auxEvents.push({
					id: key,
					...data[key],
				});
			}

			setEvents(auxEvents);
			setIsLoading(false);
		}
	}, [data]);

	if (isLoading || !events) {
		return errorShowMessage('Loading...', '', '');
	}

	const filteredYear = arrData[0];
	const filteredMonth = arrData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2020 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return errorShowMessage('Error! Invalid filters.', '', '');
	}

	const filteredEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return errorShowMessage('No events found!', numYear ?? '', numMonth ?? '');
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} year={numYear} month={numMonth} />
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;

import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {
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
	if (!arrData) {
		return errorShowMessage('Loading...', '', '');
	}

	const filteredYear = arrData[0];
	const filteredMonth = arrData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2020 || numMonth < 1 || numMonth > 12) {
		return errorShowMessage('Error! Invalid filters.', '', '');
	}

	const events = getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	if (!events || events.length === 0) {
		return errorShowMessage('No events found!', numYear, numMonth);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} year={numYear} month={numMonth} />
			<ResultsTitle date={date} />
			<EventList items={events} />
		</Fragment>
	);
}

export default FilteredEventsPage;

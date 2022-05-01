import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventsPage(props) {
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

	if (props.error) {
		return errorShowMessage(props.error, '', '');
	}

	const events = props.events;
	const numYear = props.numYear;
	const numMonth = props.numMonth;

	if (!events || events.length === 0) {
		return errorShowMessage('No events found!', numYear ?? '', numMonth ?? '');
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

export const getStaticProps = async context => {
	const arrData = context.params.slug;

	if (!arrData) {
		return {
			props: {
				error: 'Loading...',
			},
		};
	}

	const filteredYear = arrData[0];
	const filteredMonth = arrData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2020 || numMonth < 1 || numMonth > 12) {
		return {
			props: {
				error: 'Error! Invalid filters.',
			},
		};
	}

	const events = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: events ?? [],
			numYear,
			numMonth,
		},
		revalidate: 1800,
	};
};

export const getStaticPaths = async () => {
	const paths = [];
	for (let year = 2020; year <= 2022; year++) {
		for (let month = 1; month <= 12; month++) {
			paths.push({ params: { slug: [`${year}`, `${month}`] } });
		}
	}

	/**
	 * opções:
	 * 		1: montar todos os paths possíveis
	 * 		2: criar um path e setar fallback ='blocking'
	 */

	return {
		// paths: [{ params: { slug: ['2021', '4'] } }],
		// fallback: 'blocking',
		paths,
		fallback: true,
	};
};

export default FilteredEventsPage;

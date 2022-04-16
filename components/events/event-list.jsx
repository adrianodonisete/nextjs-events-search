import EventItem from './event-item';

import classes from './event-list.module.css';

function EventList(props) {
	const { items } = props;
	return (
		<ul className={classes.list}>
			{items.map(event => {
				const { id, title, description, location, date, image, isFeatured } = event;

				return (
					<EventItem
						key={id}
						id={id}
						title={title}
						description={description}
						location={location}
						date={date}
						image={image}
						isFeatured={isFeatured}
					/>
				);
			})}
		</ul>
	);
}

export default EventList;

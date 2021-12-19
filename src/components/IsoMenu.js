export let IsoMenu = ({
	options,
	id,
	selectedValue,
	onSelectedValueChange,
	data,
}) => (
	<select
		id={id}
		onChange={(event) => onSelectedValueChange(event.target.value)}
		defaultValue={selectedValue}
	>
		{options.map((d) => (
			<option value={d}>{data[d]["location"]}</option>
		))}
	</select>
);

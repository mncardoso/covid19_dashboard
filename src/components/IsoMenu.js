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
			<option key={d} value={d}>
				{data[d]["location"]}
			</option>
		))}
	</select>
);

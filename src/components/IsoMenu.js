export let IsoMenu = ({
	options,
	id,
	selectedValue,
	onSelectedValueChange,
	data,
}) => (
	<div className="isoMenu">
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
	</div>
);

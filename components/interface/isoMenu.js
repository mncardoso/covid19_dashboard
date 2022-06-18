import { useRouter } from "next/router";

export let IsoMenu = ({
	options,
	id,
	selectedValue,
	onSelectedValueChange,
	data,
}) => {
	let router = useRouter();

	return (
		<select
			id={id}
			onChange={(event) => (
				onSelectedValueChange(event.target.value),
				router.push(`/?isoCode=${event.target.value}`)
			)}
			defaultValue={selectedValue}
		>
			{options.map((d) => (
				<option key={d} value={d}>
					{data[d]["location"]}
				</option>
			))}
		</select>
	);
};

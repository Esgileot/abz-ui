import { TextField } from "@mui/material";

interface MUIFormField {
	id?: string;
	name?: string;
	label?: string;
	type?: React.InputHTMLAttributes<unknown>["type"];
	value?: string;
	onChange?: (e: React.ChangeEvent<any>) => void;
	fullWidth?: boolean;
	multiline?: boolean;
	error?: boolean | undefined;
	helperText?: string | false | undefined;
}

export const MUIFormField: React.FC<MUIFormField> = ({
	id,
	name,
	label,
	type,
	value,
	onChange,
	fullWidth,
	multiline,
	error,
	helperText,
}) => {
	return (
		<TextField
			color={"primary"}
			sx={{
				color: "#242424",
				"& .MuiOutlinedInput-root": {
					"&:hover fieldset": {
						borderColor: "#242424",
					},
				},
			}}
			inputProps={{ style: { color: "#242424" } }}
			InputLabelProps={{
				style: {
					color: "#242424",
					border: "#242424",
					textTransform: "uppercase",
				},
			}}
			fullWidth={fullWidth}
			id={id}
			name={name}
			label={label}
			type={type}
			value={value}
			onChange={onChange}
			error={error}
			helperText={helperText}
			multiline={multiline}
			rows={multiline ? "4" : 0}
		/>
	);
};

import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { MUIFormField } from "../fields/MUIFormField";

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	email: yup.string().required("Email is required"),
	phoneNumber: yup
		.string()
		.matches(/^[\+]{0,1}380([0-9]{9})$/, {
			message: 'Phone number must match the following: "+380#########"',
		})
		.required("A phone number is required"),
	position: yup.number().min(1).required(),
});

export const CreateUserForm: React.FC = () => {
	const theme = useTheme();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phoneNumber: "",
			position: 1,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			if (!file) {
				setMissingPhoto(true);
				return;
			}
			const formData = new FormData();
			formData.append("name", values.name);
			formData.append("email", values.email);
			formData.append("phone", `+${values.phoneNumber}`);
			formData.append("position_id", values.position.toString());
			formData.append("photo", file);

			axios
				.get(`${process.env.REACT_APP_API_DOMAIN}token`)
				.then((res) => {
					const token = res.data.token;
					axios
						.post(`${process.env.REACT_APP_API_DOMAIN}users`, formData, {
							headers: { Token: token, "Content-Type": "multipart/form-data" },
						})
						.then((res) => {
							console.log("User created!");
						});
				})
				.catch((err) => {
					alert(`User creation faild, check console :)`);
					console.log(`User creation faild: ${err}`);
				});
		},
	});
	const [positions, setPositions] = useState<
		[{ id: number; name: string }] | null
	>();
	const [file, setFile] = useState<File | null>();
	const [missingPhoto, setMissingPhoto] = useState(false);
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_DOMAIN}positions`).then((res) => {
			res && res.data && setPositions(res.data.position);
		});
	});
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "start",
			}}
			disableGutters={true}
		>
			<Box width={"100%"} mt={"5px"}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						[theme.breakpoints.down(992)]: {
							flexDirection: "column-reverse",
							alignItems: "center",
						},
					}}
				>
					<Box
						sx={{
							border: "1px solid black",
							padding: "25px",
							width: "50%",
							[theme.breakpoints.down(992)]: { width: "75%" },
							[theme.breakpoints.down(445)]: { width: "100%" },
						}}
					>
						<Typography>CREATE USER FORM</Typography>
						<form onSubmit={formik.handleSubmit}>
							<Box marginTop={theme.spacing(3)}>
								<MUIFormField
									id={"frmName"}
									name={"name"}
									label={"name"}
									type={"string"}
									value={formik.values.name}
									onChange={formik.handleChange}
									fullWidth={true}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Box>
							<Box marginTop={theme.spacing(3)}>
								<MUIFormField
									id={"frmMessageEmail"}
									name={"email"}
									label={"email"}
									type={"string"}
									value={formik.values.email}
									onChange={formik.handleChange}
									fullWidth={true}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Box>
							<Box marginTop={theme.spacing(3)}>
								<MUIFormField
									id={"frmMessagePhoneNumber"}
									name={"phoneNumber"}
									label={"Phone Number"}
									type={"number"}
									value={formik.values.phoneNumber}
									onChange={formik.handleChange}
									fullWidth={true}
									error={
										formik.touched.phoneNumber &&
										Boolean(formik.errors.phoneNumber)
									}
									helperText={
										formik.touched.phoneNumber && formik.errors.phoneNumber
									}
								/>
							</Box>
							<Box marginTop={theme.spacing(3)}>
								{positions ? (
									<FormControl fullWidth>
										<InputLabel id="select-label">Position</InputLabel>
										<Select
											labelId="select-label"
											value={formik.values.position}
											id={"frmPosition"}
											name={"position"}
											label={"position"}
											type={"file"}
											onChange={formik.handleChange}
											error={
												formik.touched.position &&
												Boolean(formik.errors.position)
											}
										>
											{positions &&
												positions.map((position) => {
													return (
														<MenuItem key={position.id} value={position.id}>
															{position.name}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								) : null}
							</Box>
							<Box marginTop={theme.spacing(3)}>
								<input
									id={"frmPhoto"}
									accept={"image/jpeg"}
									name={"photo"}
									type={"file"}
									onChange={(e: any) => {
										setMissingPhoto(false);
										setFile(e.target.files[0]);
									}}
								/>
								{missingPhoto ? (
									<Typography color={"error"}>Photo is required</Typography>
								) : null}
							</Box>

							<Box marginTop={theme.spacing(3)}>
								<Button
									color="primary"
									type="submit"
									sx={{
										width: "200px",
										height: "50px",
										color: "white",
										background: "black",
									}}
								>
									Create User
								</Button>
							</Box>
						</form>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

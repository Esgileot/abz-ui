import {
	Avatar,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface Props {
	users: any[];
}

export const UserSection = (props: Props) => {
	return (
		<Box>
			{props.users
				? props.users.map((user) => {
						return (
							<div key={user.id}>
								<List sx={{ display: "flex" }}>
									<ListItem sx={{ display: "flex" }}>
										<Avatar
											alt={user.name}
											src={user.photo}
											sx={{ mr: "10px" }}
										/>
										<Typography variant="h5">{user.name}</Typography>
									</ListItem>
									<ListItem>
										<ListItemText primary="Email" secondary={user.email} />
									</ListItem>
									<ListItem>
										<ListItemText primary="ID" secondary={user.id} />
									</ListItem>
									<ListItem>
										<ListItemText primary="Phone" secondary={user.phone} />
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Position"
											secondary={user.position}
										/>
									</ListItem>
									<ListItem>
										<ListItemText
											primary="Registration Timestamp"
											secondary={new Date(
												user.registration_timestamp * 1000
											).toLocaleDateString()}
										/>
									</ListItem>
								</List>
							</div>
						);
				  })
				: null}
		</Box>
	);
};

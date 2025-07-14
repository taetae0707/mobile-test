import { Button } from "@mui/material";

interface ProfileBadgeProps {
	badgeString: string;
	onClick: () => void;
	selected?: boolean;
}

export function ProfileBadge({
	badgeString,
	onClick,
	selected,
}: ProfileBadgeProps) {
	return (
		<Button
			onClick={() => onClick()}
			variant="contained"
			sx={{
				marginRight: "7px",
				marginBottom: "10px",
				padding: "7px 10px",
				borderRadius: "20px",
				fontWeight: "700",
				color: selected ? "#3ECDBA" : "#9B9EA2",
				backgroundColor: selected ? "#EBFFFC" : "#F7F7F7",
				border: selected ? "1px solid #3ECDBA" : "",
				...badgeMobileStyles(selected ?? false),
				boxShadow: "none",
			}}>
			#{badgeString}
		</Button>
	);
}

const badgeMobileStyles = (selected: boolean) => ({
	"@media (max-width: 1024px)": {
		fontSize: ".75rem",
		padding: "4px 12px",
		borderRadius: "20px",
		fontWeight: "700",
		minWidth: "auto",
		whiteSpace: "nowrap",
		border: selected ? "1.5px solid #3ECDBA" : "none",
		backgroundColor: selected ? "#EBFFFC" : "#F4F4F4",
		color: selected ? "#3ECDBA" : "#9B9EA2",
		"&:hover": {
			backgroundColor: selected ? "#EBFFFC" : "#EAEAEA",
		},
	},
});

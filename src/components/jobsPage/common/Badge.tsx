interface BadgeProps {
	text: string;
	variant: "gray" | "blue" | "green" | "red" | "yellow";
	size?: "sm" | "md";
}

export function Badge({ text, variant, size = "md" }: BadgeProps) {
	const baseClass = "inline-flex items-center rounded font-medium";

	const sizeClasses = {
		sm: "px-2 py-0.5 text-xs",
		md: "px-2 py-1 text-xs",
	};

	const variantClasses = {
		gray: "bg-gray-100 text-gray-700",
		blue: "bg-blue-100 text-blue-700",
		green: "bg-green-100 text-green-700",
		red: "bg-red-100 text-red-700",
		yellow: "bg-yellow-100 text-yellow-700",
	};

	return (
		<span
			className={`${baseClass} ${sizeClasses[size]} ${variantClasses[variant]}`}>
			{text}
		</span>
	);
}

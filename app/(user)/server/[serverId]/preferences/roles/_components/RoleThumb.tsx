export default function RoleThumb({
  roleName,
  roleColour,
}: {
  roleName: string;
  roleColour: string;
}) {
  return (
    <div
      className="rounded-full border-4 px-2"
      style={{ borderColor: roleColour }}
    >
      {roleName}
    </div>
  );
}

export default function DateFormatter({ date }: { date: Date }) {
  return <>{date.toLocaleDateString()}</>;
}
